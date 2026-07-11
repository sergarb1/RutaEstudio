GC.graph = {

  _isDark() {
    return document.documentElement.classList.contains('dark');
  },

  _arrow(val) {
    if (val === 'none' || !val) return undefined;
    if (val === 'both') return { to: true, from: true };
    if (val === 'to') return 'to';
    if (val === 'from') return 'from';
    return val;
  },

  _nodeColors(dark) {
    return dark
      ? { bg: '#1e293b', border: '#818cf8', hiliteBg: '#334155', hiliteBorder: '#a5b4fc', shadow: '#818cf833' }
      : { bg: '#eef2ff', border: '#6366f1', hiliteBg: '#e0e7ff', hiliteBorder: '#4f46e5', shadow: '#6366f140' };
  },

  _edgeFont(dark) {
    return { size: 10, color: dark ? '#94a3b8' : '#64748b', strokeWidth: 0, face: 'Inter' };
  },

  _nodeShape(c) {
    const w = c.weight || 5;
    if (w >= 8) return 'star';
    if (w >= 5) return 'hexagon';
    if (w >= 3) return 'diamond';
    return 'ellipse';
  },

  _nodeSize(c) {
    return 16 + (c.weight || 5) * 4;
  },

  _shadow(dark) {
    return {
      enabled: true,
      size: 12,
      x: 0,
      y: 3,
      color: dark ? 'rgba(0,0,0,0.5)' : 'rgba(99,102,241,0.15)'
    };
  },

  render(containerId, concepts, relations, options) {
    const container = document.getElementById(containerId);
    if (!container || !concepts.length) return null;

    const opts = options || {};
    const positions = opts.positions || {};
    delete opts.positions;
    const onDragEnd = opts.onDragEnd;
    delete opts.onDragEnd;
    const dark = this._isDark();
    const nc = this._nodeColors(dark);

    const nodes = concepts.map(c => {
      const pos = positions[c.id];
      const shape = this._nodeShape(c);
      const size = this._nodeSize(c);
      const n = {
        id: c.id,
        label: c.name,
        shape,
        size,
        color: c.color || {
          background: nc.bg,
          border: nc.border,
          highlight: { background: nc.hiliteBg, border: nc.hiliteBorder }
        },
        font: {
          family: 'Outfit, Inter, sans-serif',
          size: shape === 'star' ? 15 : shape === 'hexagon' ? 14 : 13,
          color: dark ? '#e2e8f0' : '#1e293b',
          strokeWidth: shape === 'star' ? 0 : 0,
          face: 'Outfit'
        },
        title: c.name + (c.description ? '\n' + c.description : '') + (c.weight ? '\nPeso: ' + c.weight : ''),
        borderWidth: shape === 'star' ? 3 : shape === 'hexagon' ? 2.5 : 2,
        borderWidthSelected: shape === 'star' ? 4 : 3,
        shadow: this._shadow(dark),
        shapeProperties: { borderRadius: 6 }
      };
      if (pos) { n.x = pos.x; n.y = pos.y; n.fixed = true; }
      return n;
    });

    const edges = relations.map(r => {
      const info = GC.store.getRelationTypeInfo(r.type);
      return {
        from: r.from, to: r.to, label: info.name,
        color: { color: info.color, highlight: info.color },
        dashes: info.dash || false,
        width: info.width || 2,
        arrows: this._arrow(info.arrow),
        font: this._edgeFont(dark)
      };
    });

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };

    const hasPositions = Object.keys(positions).length > 0;
    const defaults = {
      layout: { hierarchical: { enabled: false } },
      physics: hasPositions ? { enabled: false } : {
        solver: 'forceAtlas2Based',
        forceAtlas2Based: {
          gravitationalConstant: -35,
          centralGravity: 0.004,
          springLength: 180,
          springConstant: 0.03,
          damping: 0.6
        },
        stabilization: { iterations: 200 }
      },
      interaction: {
        hover: true,
        tooltipDelay: 150,
        dragView: true,
        zoomView: true,
        navigationButtons: true,
        hoverConnectedEdges: true,
        selectConnectedEdges: true
      },
      edges: {
        smooth: {
          type: 'continuous',
          roundness: 0.4
        }
      },
      groups: undefined,
      autoResize: true
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

    const dark = this._isDark();

    const nodes = concepts.map(c => {
      const score = results[c.id] || 0;
      const w = c.weight || 5;
      const size = 16 + w * 3;
      return {
        id: c.id,
        label: c.name + '\n' + score + '%',
        shape: w >= 8 ? 'star' : w >= 5 ? 'hexagon' : w >= 3 ? 'diamond' : 'ellipse',
        size,
        color: {
          background: GC.heatBg(score),
          border: GC.heatColor(score),
          highlight: { background: GC.heatBg(score), border: GC.heatColor(score) }
        },
        font: { size: 12, face: 'Outfit, Inter, sans-serif', color: dark ? '#e2e8f0' : '#1e293b', strokeWidth: 0 },
        title: c.name + ': ' + score + '% - ' + GC.heatLabel(score) + (c.weight ? '\nPeso: ' + c.weight : ''),
        borderWidth: 2.5,
        borderWidthSelected: 3.5,
        shadow: this._shadow(dark)
      };
    });

    const edges = relations.map(r => {
      const info = GC.store.getRelationTypeInfo(r.type);
      return {
        from: r.from, to: r.to, label: info.name,
        color: { color: dark ? '#475569' : '#94a3b8' },
        font: { size: 9, color: dark ? '#94a3b8' : '#64748b' },
        dashes: info.dash || false,
        width: info.width || 2,
        arrows: this._arrow(info.arrow)
      };
    });

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
      layout: { hierarchical: { enabled: false } },
      physics: {
        solver: 'forceAtlas2Based',
        forceAtlas2Based: { gravitationalConstant: -25, centralGravity: 0.004, springLength: 160, damping: 0.5 },
        stabilization: { iterations: 150 }
      },
      interaction: {
        hover: true,
        tooltipDelay: 150,
        navigationButtons: true,
        hoverConnectedEdges: true,
        selectConnectedEdges: true
      },
      edges: { smooth: { type: 'continuous', roundness: 0.4 } },
      autoResize: true
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

    const dark = this._isDark();
    const allConcepts = GC.allConcepts(subjects);
    if (!allConcepts.length) return null;

    const subjectMap = {};
    subjects.forEach((s, i) => { subjectMap[s.id] = { name: s.name, color: GC.subjectColor(i) }; });

    const nodes = allConcepts.map(c => {
      const w = c.weight || 5;
      return {
        id: c.id,
        label: c.name,
        shape: w >= 8 ? 'star' : w >= 5 ? 'hexagon' : w >= 3 ? 'diamond' : 'dot',
        size: 14 + w * 3,
        color: {
          background: subjectMap[c.subjectId]?.color + '33' || '#e0e7ff',
          border: subjectMap[c.subjectId]?.color || '#6366f1',
          highlight: {
            background: subjectMap[c.subjectId]?.color + '66' || '#c7d2fe',
            border: subjectMap[c.subjectId]?.color || '#4f46e5'
          }
        },
        font: { family: 'Outfit, Inter, sans-serif', size: 12, color: dark ? '#e2e8f0' : '#1e293b', strokeWidth: 0 },
        title: c.name + ' (' + c.subjectName + ')\n' + (c.description || ''),
        borderWidth: 2,
        borderWidthSelected: 3,
        shadow: this._shadow(dark)
      };
    });

    const allRels = GC.allRelations(subjects, crossRelations);

    const edges = allRels.map(r => {
      const info = GC.store.getRelationTypeInfo(r.type);
      return {
        from: r.from, to: r.to,
        color: { color: info.color },
        dashes: info.dash || false,
        width: info.width || 2,
        arrows: this._arrow(info.arrow),
        font: { size: 9, color: dark ? '#94a3b8' : '#64748b' }
      };
    });

    const data = { nodes: new vis.DataSet(nodes), edges: new vis.DataSet(edges) };
    const options = {
      layout: { hierarchical: { enabled: false } },
      physics: {
        solver: 'forceAtlas2Based',
        forceAtlas2Based: { gravitationalConstant: -40, centralGravity: 0.003, springLength: 200, springConstant: 0.02, damping: 0.5 },
        stabilization: { iterations: 200 }
      },
      interaction: {
        hover: true,
        tooltipDelay: 150,
        navigationButtons: true,
        hoverConnectedEdges: true,
        selectConnectedEdges: true
      },
      edges: { smooth: { type: 'continuous', roundness: 0.4 } },
      autoResize: true
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
