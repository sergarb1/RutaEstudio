GC.studyPlan = {

  calculate(subject, assessment, algorithm) {
    if (!assessment || !subject) {
      return { repasar: [], reforzar: [], avanzar: [], roadmap: GC.roadmap(subject, null) };
    }
    const r = assessment.results;
    const cat = { repasar: [], reforzar: [], avanzar: [] };

    if (algorithm === 'desbloqueador') {
      this._desbloqueador(subject, r, cat);
    } else {
      const sorted = algorithm === 'dfs'
        ? this._topologicalDFS(subject)
        : this._topologicalBFS(subject);
      sorted.forEach(id => {
        const c = subject.concepts.find(x => x.id === id);
        if (!c) return;
        const m = r[id] || 0;
        const item = {
          id, name: c.name, mastery: m, weight: c.weight,
          recommendation: this._recommendation(c, m, subject, r),
          unlockScore: GC.unlockScore(subject, id, r)
        };
        if (m < 40) cat.repasar.push(item);
        else if (m < 70) cat.reforzar.push(item);
        else cat.avanzar.push(item);
      });
    }

    cat.roadmap = GC.roadmap(subject, r);
    return cat;
  },

  _desbloqueador(subject, results, cat) {
    const scored = subject.concepts.map(c => {
      const m = results[c.id] || 0;
      const score = GC.unlockScore(subject, c.id, results);
      return {
        id: c.id, name: c.name, mastery: m, weight: c.weight,
        score,
        recommendation: this._recommendation(c, m, subject, results)
      };
    });

    const weakBlockers = scored.filter(s => {
      if (s.mastery >= 40) return false;
      const prereqs = subject.relations.filter(r => r.to === s.id && r.type === 'prerrequisito');
      return !prereqs.some(p => (results[p.from] || 0) < 40);
    }).sort((a, b) => b.score - a.score || a.mastery - b.mastery);

    const mid = scored.filter(s => s.mastery >= 40 && s.mastery < 70)
      .sort((a, b) => b.score - a.score || b.mastery - a.mastery);

    const mastered = scored.filter(s => s.mastery >= 70)
      .sort((a, b) => b.score - a.score);

    // Re-check weakBlockers for hidden blockers
    const ordered = [];
    const visited = new Set();
    const addWithDeps = (id) => {
      const prereqs = subject.relations.filter(r => r.to === id && r.type === 'prerrequisito');
      prereqs.forEach(p => {
        const pm = results[p.from] || 0;
        if (pm < 40 && !visited.has(p.from)) {
          visited.add(p.from);
          const pc = subject.concepts.find(c => c.id === p.from);
          if (pc) {
            ordered.push({ ...pc, mastery: pm, weight: pc.weight,
              recommendation: this._recommendation(pc, pm, subject, results),
              unlockScore: GC.unlockScore(subject, p.from, results)
            });
          }
        }
      });
      if (!visited.has(id)) {
        visited.add(id);
        ordered.push(scored.find(s => s.id === id));
      }
    };

    weakBlockers.forEach(s => addWithDeps(s.id));
    mid.forEach(s => { if (!visited.has(s.id)) addWithDeps(s.id); });
    mastered.forEach(s => { if (!visited.has(s.id)) ordered.push(s); });

    ordered.forEach(item => {
      if (!item) return;
      if (item.mastery < 40) cat.repasar.push(item);
      else if (item.mastery < 70) cat.reforzar.push(item);
      else cat.avanzar.push(item);
    });
  },

  _topologicalBFS(subject) {
    const visited = new Set();
    const inDegree = {};
    subject.concepts.forEach(c => { inDegree[c.id] = 0; });
    subject.relations
      .filter(r => r.type === 'prerrequisito')
      .forEach(r => { inDegree[r.to] = (inDegree[r.to] || 0) + 1; });

    const queue = subject.concepts
      .filter(c => (inDegree[c.id] || 0) === 0)
      .map(c => c.id);

    const sorted = [];
    while (queue.length) {
      const id = queue.shift();
      if (visited.has(id)) continue;
      visited.add(id);
      sorted.push(id);
      subject.relations
        .filter(r => r.from === id && r.type === 'prerrequisito')
        .forEach(r => {
          inDegree[r.to] = (inDegree[r.to] || 0) - 1;
          if (inDegree[r.to] === 0) queue.push(r.to);
        });
    }
    subject.concepts.forEach(c => { if (!visited.has(c.id)) sorted.push(c.id); });
    return sorted;
  },

  _topologicalDFS(subject) {
    const visited = new Set();
    const sorted = [];
    const dfs = (id) => {
      if (visited.has(id)) return;
      visited.add(id);
      subject.relations
        .filter(r => r.from === id && r.type === 'prerrequisito')
        .forEach(r => dfs(r.to));
      sorted.push(id);
    };
    const inDegree = {};
    subject.concepts.forEach(c => { inDegree[c.id] = 0; });
    subject.relations
      .filter(r => r.type === 'prerrequisito')
      .forEach(r => { inDegree[r.to] = (inDegree[r.to] || 0) + 1; });
    subject.concepts
      .filter(c => (inDegree[c.id] || 0) === 0)
      .forEach(c => dfs(c.id));
    subject.concepts.forEach(c => { if (!visited.has(c.id)) sorted.push(c.id); });
    return sorted;
  },

  _recommendation(concept, mastery, subject, results) {
    if (mastery < 40) {
      const prereqs = subject.relations.filter(x => x.to === concept.id && x.type === 'prerrequisito');
      const weakPrereqs = prereqs.filter(p => (results[p.from] || 0) < 40);
      if (weakPrereqs.length) {
        return '\u26a0\ufe0f Bloqueado por: ' + weakPrereqs.map(p => GC.conceptName([subject], p.from) + ' (' + (results[p.from] || 0) + '%)').join(', ');
      }
      return '\uD83D\uDCD6 Prioridad: ' + concept.name + '. Haz ejercicios b\u00e1sicos.';
    }
    if (mastery < 70) {
      const next = subject.relations.filter(x => x.from === concept.id && x.type === 'prerrequisito');
      if (next.length) {
        return '\uD83D\uDCC8 Desbloquea: ' + next.map(x => GC.conceptName([subject], x.to)).join(', ');
      }
      return '\uD83D\uDCC8 Refuerza con ejercicios de nivel medio.';
    }
    const next = subject.relations.filter(x => x.from === concept.id && x.type === 'prerrequisito');
    if (next.length) {
      return '\u2705 Puedes ense\u00f1ar: ' + next.map(x => GC.conceptName([subject], x.to)
        + ((results[x.to] || 0) < 70 ? ' (pendiente)' : '')).join(', ');
    }
    return '\u2705 Dominado. Sin dependientes.';
  }
};
