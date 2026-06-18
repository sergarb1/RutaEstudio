window.GC = window.GC || {};

GC.heatColor = function(score) {
  if (score >= 70) return '#22c55e';
  if (score >= 40) return '#eab308';
  return '#ef4444';
};

GC.heatBg = function(score) {
  if (score >= 70) return '#bbf7d0';
  if (score >= 40) return '#fef08a';
  return '#fecaca';
};

GC.heatLabel = function(score) {
  if (score >= 70) return 'Dominado';
  if (score >= 40) return 'En proceso';
  return 'No dominado';
};

GC.overallScore = function(results) {
  const vals = Object.values(results);
  if (!vals.length) return 0;
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
};

GC.heatCount = function(results, type) {
  let count = 0;
  Object.values(results).forEach(v => {
    if (type === 'red' && v < 40) count++;
    else if (type === 'yellow' && v >= 40 && v < 70) count++;
    else if (type === 'green' && v >= 70) count++;
  });
  return count;
};

GC.conceptName = function(subjects, id) {
  for (const s of subjects) {
    const c = s.concepts.find(x => x.id === id);
    if (c) return c.name;
  }
  return '?';
};

GC.conceptSubject = function(subjects, id) {
  for (const s of subjects) {
    if (s.concepts.some(x => x.id === id)) return s;
  }
  return null;
};

GC.subjectColor = function(index) {
  const palette = [
    '#6366f1', '#ec4899', '#14b8a6', '#f97316',
    '#8b5cf6', '#06b6d4', '#84cc16', '#e11d48'
  ];
  return palette[index % palette.length];
};

GC.allConcepts = function(subjects) {
  const map = {};
  subjects.forEach(s => {
    s.concepts.forEach(c => {
      map[c.id] = { ...c, subjectId: s.id, subjectName: s.name };
    });
  });
  return Object.values(map);
};

GC.allRelations = function(subjects, crossRelations) {
  const rels = [];
  subjects.forEach(s => {
    s.relations.forEach(r => {
      rels.push({ ...r, fromSubject: s.id });
    });
  });
  if (crossRelations) {
    crossRelations.forEach(r => rels.push({ ...r }));
  }
  return rels;
};

// --- Walkthrough / Inspector ---

GC.walkthrough = function(subject, conceptId, results) {
  if (!subject || !conceptId) return null;
  const concept = subject.concepts.find(c => c.id === conceptId);
  if (!concept) return null;

  const mastery = results ? (results[conceptId] || 0) : 0;

  const findBlockers = (id, depth = 0, visited = new Set()) => {
    if (visited.has(id) || depth > 20) return [];
    visited.add(id);
    const blockers = [];
    const prereqs = subject.relations.filter(r => r.to === id && r.type === 'prerrequisito');
    for (const p of prereqs) {
      const pc = subject.concepts.find(c => c.id === p.from);
      if (!pc) continue;
      const pm = results ? (results[p.from] || 0) : 0;
      blockers.push({
        id: p.from, name: pc.name, mastery: pm, weight: pc.weight, depth,
        isBlocker: pm < 40, isWeak: pm >= 40 && pm < 70
      });
      if (pm < 70) {
        blockers.push(...findBlockers(p.from, depth + 1, visited));
      }
    }
    return blockers;
  };

  const findDependents = (id, depth = 0, visited = new Set()) => {
    if (visited.has(id) || depth > 10) return [];
    visited.add(id);
    const deps = [];
    const next = subject.relations.filter(r => r.from === id && r.type === 'prerrequisito');
    for (const n of next) {
      const nc = subject.concepts.find(c => c.id === n.to);
      if (!nc) continue;
      const nm = results ? (results[n.to] || 0) : 0;
      deps.push({ id: n.to, name: nc.name, mastery: nm, depth });
      deps.push(...findDependents(n.to, depth + 1, visited));
    }
    return deps;
  };

  const blockers = findBlockers(conceptId);
  const weakBlockers = blockers.filter(b => b.isBlocker);
  const midBlockers = blockers.filter(b => b.isWeak && !b.isBlocker);
  const chain = weakBlockers.map(b => b.name);
  const dependents = findDependents(conceptId);
  const uniqueDeps = [...new Map(dependents.map(d => [d.id, d])).values()];

  const isIsolated = subject.relations.filter(r => r.from === conceptId || r.to === conceptId).length === 0;

  let recommendation = '';
  if (mastery >= 70) {
    if (weakBlockers.length) {
      recommendation = `Dominas "${concept.name}" pero ${weakBlockers.length} prerreq. no. Ayuda a compa\u00f1eros con: ${weakBlockers.map(b => b.name).join(', ')}.`;
    } else if (uniqueDeps.length) {
      recommendation = `${concept.name} dominado (${mastery}%). Puedes avanzar a: ${uniqueDeps.slice(0, 3).map(d => d.name).join(', ')}.`;
    } else {
      recommendation = `"${concept.name}" dominado. No dependen m\u00e1s conceptos de \u00e9l.`;
    }
  } else if (mastery >= 40) {
    if (weakBlockers.length) {
      recommendation = `Para afianzar "${concept.name}", repasa primero: ${weakBlockers.slice(0, 3).map(b => b.name + ' (' + b.mastery + '%)').join(', ')}.`;
    } else if (midBlockers.length) {
      recommendation = `"${concept.name}" al ${mastery}%. Refuerza tambi\u00e9n: ${midBlockers.slice(0, 2).map(b => b.name).join(', ')}.`;
    } else {
      recommendation = `"${concept.name}" va bien (${mastery}%). Practica con ejercicios.`;
    }
  } else {
    if (weakBlockers.length) {
      recommendation = `${weakBlockers.length} prerreq. bloquean "${concept.name}". Empieza por: ${weakBlockers[0].name} (${weakBlockers[0].mastery}%).`;
    } else {
      recommendation = `Dedica tiempo a "${concept.name}". Haz ejercicios b\u00e1sicos.`;
    }
  }

  return {
    concept: { id: conceptId, name: concept.name, mastery, weight: concept.weight, description: concept.description },
    blockers: blockers.sort((a, b) => a.mastery - b.mastery),
    weakBlockers,
    chain,
    dependents: uniqueDeps,
    isIsolated,
    recommendation,
    resources: concept.resources || [],
    mastered: mastery >= 70,
    inProgress: mastery >= 40 && mastery < 70,
    failed: mastery < 40
  };
};

GC.unlockScore = function(subject, conceptId, results) {
  const visited = new Set();
  let count = 0;
  const countDependents = (id) => {
    if (visited.has(id)) return;
    visited.add(id);
    subject.relations.filter(r => r.from === id && r.type === 'prerrequisito').forEach(r => {
      count++;
      countDependents(r.to);
    });
  };
  countDependents(conceptId);
  const mastery = results ? (results[conceptId] || 0) : 0;
  const c = subject.concepts.find(x => x.id === conceptId);
  return count * (100 - mastery) * (c ? c.weight : 5);
};

GC.roadmap = function(subject, results) {
  if (!subject) return { ahora: [], siguiente: [], pronto: [] };
  const groups = { ahora: [], siguiente: [], pronto: [] };

  const inDegree = {};
  subject.concepts.forEach(c => { inDegree[c.id] = 0; });
  subject.relations.filter(r => r.type === 'prerrequisito').forEach(r => {
    inDegree[r.to] = (inDegree[r.to] || 0) + 1;
  });

  subject.concepts.forEach(c => {
    const m = results ? (results[c.id] || 0) : 0;
    const prereqs = subject.relations.filter(r => r.to === c.id && r.type === 'prerrequisito');
    const hasWeakPrereqs = prereqs.some(p => (results ? (results[p.from] || 0) : 0) < 40);
    const blockedBy = prereqs.filter(p => (results ? (results[p.from] || 0) : 0) < 40).map(p => GC.conceptName([subject], p.from));
    const unlocks = subject.relations.filter(r => r.from === c.id && r.type === 'prerrequisito').length;
    const unlockScore = GC.unlockScore(subject, c.id, results);

    const entry = {
      id: c.id, name: c.name, mastery: m, weight: c.weight,
      blockedBy, unlocks, unlockScore
    };

    if (m < 40 && hasWeakPrereqs) {
      groups.pronto.push(entry);
    } else if (m < 40) {
      groups.ahora.push(entry);
    } else if (m < 70) {
      if (unlocks > 0) {
        groups.ahora.push(entry);
      } else {
        groups.siguiente.push(entry);
      }
    } else {
      if (unlocks > 0) {
        groups.siguiente.push(entry);
      } else {
        groups.pronto.push(entry);
      }
    }
  });

  groups.ahora.sort((a, b) => b.unlockScore - a.unlockScore);
  groups.siguiente.sort((a, b) => b.unlockScore - a.unlockScore);
  groups.pronto.sort((a, b) => a.unlockScore - b.unlockScore);

  return groups;
};

GC.md = function(text) {
  if (!text) return '';
  let h = text
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-indigo-600 dark:text-indigo-400 hover:underline">$1</a>')
    .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-1 rounded text-xs">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  // bullet lists
  h = h.replace(/^- (.+)$/gm, '<span class="block ml-2">• $1</span>');
  // newlines
  h = h.replace(/\n/g, '<br>');
  return h;
};
