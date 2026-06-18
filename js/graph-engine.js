GC.graph = {

  render(containerId, concepts, relations, options) {
    const container = document.getElementById(containerId);
    if (!container || !concepts.length) return null;

    const opts = options || {};
    const positions = opts.positions || {};
    delete opts.positions;
    const onDragEnd = opts.onDragEnd;
    delete opts.onDragEnd;

    const nodeSize = (c) => 20 + (c.weight || 5) * 3;

    const nodes = concepts.map(c => {
      const pos = positions[c.id];
      const n = {
        id: c.id,
        label: c.name + (c.weight ? '\n[peso: ' + c.weight + ']' : ''),
        shape: 'ellipse',
        size: nodeSize(c),
        color: c.color || { background: '#e0e7ff', border: '#6366f1', highlight: { background: '#c7d2fe', border: '#4f46e5' } },
        font: { family: 'Inter', size: 14 },
        title: c.description || c.name
      };
      if (pos) { n.x = pos.x; n.y = pos.y; n.fixed = true; }
      return n;
    });

    const colors = { prerrequisito: '#3b82f6', pertenece: '#22c55e', relacionado: '#f59e0b', profundiza: '#a855f7' };
    const dashes = { prerrequisito: false, pertenece: [10, 5], relacionado: [5, 5], profundiza: false };
    const widths = { prerrequisito: 2, pertenece: 2, relacionado: 1, profundiza: 3 };

    const edges = relations.map(r => ({
      from: r.from, to: r.to, label: r.type,
      color: { color: colors[r.type] || '#94a3b8', highlight: colors[r.type] || '#94a3b8' },
      dashes: dashes[r.type] || false,
      width: widths[r.type] || 2,
      arrows: r.type !== 'relacionado' ? 'to' : undefined,
      font: { size: 10, color: '#64748b' }
    }));

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };

    const hasPositions = Object.keys(positions).length > 0;
    const defaults = {
      layout: { hierarchical: { enabled: false } },
      physics: hasPositions ? { enabled: false } : {
        solver: 'forceAtlas2Based',
        forceAtlas2Based: { gravitationalConstant: -40, centralGravity: 0.005, springLength: 150, springConstant: 0.02 }
      },
      interaction: { hover: true, tooltipDelay: 200, dragView: true, zoomView: true },
      edges: { smooth: true }
    };

    const merged = this._mergeOptions(defaults, opts);
    const network = new vis.Network(container, data, merged);

    if (!hasPositions) {
      network.once('stabilizationIterationsDone', () => {
        network.setOptions({ physics: { enabled: false } });
      });
    }

    if (onDragEnd) {
      network.on('dragEnd', () => {
        const pos = network.getPositions();
        const saved = {};
        Object.keys(pos).forEach(id => { saved[id] = { x: pos[id].x, y: pos[id].y }; });
        onDragEnd(saved);
      });
    }

    return network;
  },

  renderHeat(containerId, concepts, relations, results, onNodeClick) {
    const container = document.getElementById(containerId);
    if (!container || !concepts.length) return null;

    const nodes = concepts.map(c => {
      const score = results[c.id] || 0;
      return {
        id: c.id,
        label: c.name + '\n' + score + '%',
        shape: 'ellipse',
        color: {
          background: GC.heatBg(score),
          border: GC.heatColor(score),
          highlight: { background: GC.heatBg(score), border: GC.heatColor(score) }
        },
        font: { size: 13, face: 'Inter' },
        title: c.name + ': ' + score + '% - ' + GC.heatLabel(score)
      };
    });

    const edges = relations.map(r => ({
      from: r.from, to: r.to, label: r.type,
      color: { color: '#94a3b8' },
      font: { size: 9 },
      dashes: r.type === 'relacionado' || r.type === 'pertenece',
      arrows: r.type !== 'relacionado' ? 'to' : undefined
    }));

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
      layout: { hierarchical: { enabled: false } },
      physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -30, centralGravity: 0.005, springLength: 140 } },
      interaction: { hover: true, tooltipDelay: 200 }
    };

    const network = new vis.Network(container, data, options);
    network.once('stabilizationIterationsDone', () => {
      network.setOptions({ physics: { enabled: false } });
    });
    if (onNodeClick) {
      network.on('click', (params) => {
        if (params.nodes.length > 0) onNodeClick(params.nodes[0]);
      });
    }
    return network;
  },

  renderGlobal(containerId, subjects, crossRelations) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const allConcepts = GC.allConcepts(subjects);
    if (!allConcepts.length) return null;

    const subjectMap = {};
    subjects.forEach((s, i) => { subjectMap[s.id] = { name: s.name, color: GC.subjectColor(i) }; });

    const nodes = allConcepts.map(c => ({
      id: c.id,
      label: c.name,
      shape: 'ellipse',
      size: 20 + (c.weight || 5) * 2,
      color: {
        background: subjectMap[c.subjectId]?.color + '33' || '#e0e7ff',
        border: subjectMap[c.subjectId]?.color || '#6366f1',
        highlight: {
          background: subjectMap[c.subjectId]?.color + '66' || '#c7d2fe',
          border: subjectMap[c.subjectId]?.color || '#4f46e5'
        }
      },
      font: { family: 'Inter', size: 13 },
      title: c.name + ' (' + c.subjectName + ')\n' + (c.description || '')
    }));

    const allRels = GC.allRelations(subjects, crossRelations);
    const colors = { prerrequisito: '#3b82f6', pertenece: '#22c55e', relacionado: '#f59e0b', profundiza: '#a855f7' };
    const dashes = { prerrequisito: false, pertenece: [10, 5], relacionado: [5, 5], profundiza: false };

    const edges = allRels.map(r => ({
      from: r.from, to: r.to,
      color: { color: colors[r.type] || '#94a3b8' },
      dashes: dashes[r.type] || false,
      width: r.type === 'profundiza' ? 3 : r.type === 'relacionado' ? 1 : 2,
      arrows: r.type !== 'relacionado' ? 'to' : undefined,
      font: { size: 9, color: '#64748b' }
    }));

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
      layout: { hierarchical: { enabled: false } },
      physics: { solver: 'forceAtlas2Based', forceAtlas2Based: { gravitationalConstant: -50, centralGravity: 0.003, springLength: 180, springConstant: 0.01 } },
      interaction: { hover: true, tooltipDelay: 200 },
      edges: { smooth: true }
    };

    const network = new vis.Network(container, data, options);
    network.once('stabilizationIterationsDone', () => {
      network.setOptions({ physics: { enabled: false } });
    });
    return { network, subjectMap };
  },

  destroy(network) {
    if (network) { network.destroy(); }
  },

  setupClickHandler(network, subjectId, onRelation) {
    if (!network) return;
    let clickFrom = null;
    network.on('click', (params) => {
      if (params.nodes.length > 0) {
        const id = params.nodes[0];
        if (clickFrom === null) {
          clickFrom = id;
        } else if (clickFrom !== id) {
          onRelation(subjectId, clickFrom, id);
          clickFrom = null;
        } else {
          clickFrom = null;
        }
      }
    });
  },

  _mergeOptions(base, custom) {
    const result = JSON.parse(JSON.stringify(base));
    if (custom.layout) Object.assign(result.layout, custom.layout);
    if (custom.physics) Object.assign(result.physics, custom.physics);
    if (custom.interaction) Object.assign(result.interaction, custom.interaction);
    if (custom.edges) Object.assign(result.edges, custom.edges);
    return result;
  }
};
