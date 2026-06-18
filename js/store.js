const STORAGE_KEY = 'grafo-conocimiento';
const MAX_HISTORY = 50;

GC.store = Vue.reactive({
  subjects: [],
  assessments: [],
  crossRelations: [],
  _history: [],
  _historyIndex: -1,
  _isRestoring: false,

  get canUndo() { return this._historyIndex > 0; },
  get canRedo() { return this._historyIndex < this._history.length - 1; },

  _pushHistory() {
    if (this._isRestoring) return;
    // Remove any future history beyond current index
    this._history = this._history.slice(0, this._historyIndex + 1);
    this._history.push({
      subjects: JSON.parse(JSON.stringify(this.subjects)),
      assessments: JSON.parse(JSON.stringify(this.assessments)),
      crossRelations: JSON.parse(JSON.stringify(this.crossRelations))
    });
    if (this._history.length > MAX_HISTORY) this._history.shift();
    this._historyIndex = this._history.length - 1;
  },

  undo() {
    if (!this.canUndo) return;
    this._historyIndex--;
    const s = this._history[this._historyIndex];
    this._restore(s);
  },

  redo() {
    if (!this.canRedo) return;
    this._historyIndex++;
    const s = this._history[this._historyIndex];
    this._restore(s);
  },

  _restore(s) {
    this._isRestoring = true;
    this.subjects = s.subjects;
    this.assessments = s.assessments;
    this.crossRelations = s.crossRelations;
    this._saveOnly();
    this._isRestoring = false;
  },

  init() {
    try {
      const d = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      if (d) {
        this.subjects = d.subjects || [];
        this.assessments = d.assessments || [];
        this.crossRelations = d.crossRelations || [];
      }
      this._pushHistory();
    } catch (e) {
      console.warn('Failed to load data, starting fresh');
    }
  },

  _saveOnly() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      subjects: this.subjects,
      assessments: this.assessments,
      crossRelations: this.crossRelations
    }));
  },

  save() {
    this._saveOnly();
    this._pushHistory();
  },

  loadExample() {
    this.subjects = [{
      id: 'ex-py-1',
      name: 'Programación en Python',
      description: 'Curso completo de programación con Python 3: desde cero hasta orientación a objetos y librerías estándar',
      concepts: [
        { id: 'c1', name: 'Variables y tipos', description: '**int**, **float**, **str**, **bool**, asignación dinámica, type(), conversiones básicas', weight: 3, tags: ['básico'], resources: [{ id: 'r1', type: 'link', title: 'W3Schools Python', url: 'https://www.w3schools.com/python/python_variables.asp' }] },
        { id: 'c2', name: 'Estructuras de control', description: '`if` / `elif` / `else`, operadores de comparación y lógicos, cortocircuito', weight: 4, tags: ['básico'] },
        { id: 'c3', name: 'Bucles', description: '`for` con `range()`, `while`, `break`, `continue`, `else` en bucles', weight: 5, tags: ['básico'] },
        { id: 'c4', name: 'Listas y tuplas', description: 'listas, indexing, slicing, `append()`/`pop()`, **list comprehensions**, tuplas inmutables', weight: 5, tags: ['estructuras'] },
        { id: 'c5', name: 'Funciones', description: '`def`, `return`, argumentos posicionales y nombrados, valores por defecto, `*args`/`**kwargs`, scope', weight: 6, tags: ['esencial'] },
        { id: 'c6', name: 'Diccionarios y conjuntos', description: '`dict`, `keys()`/`values()`/`items()`, `set`, operaciones de conjunto', weight: 5, tags: ['estructuras'] },
        { id: 'c7', name: 'Cadenas y formato', description: 'métodos de string, f-strings, slicing, `join()`/`split()`, expresiones regulares básicas', weight: 4, tags: ['esencial'] },
        { id: 'c8', name: 'Manejo de errores', description: '`try`/`except`/`else`/`finally`, excepciones comunes, `raise` personalizado', weight: 6, tags: ['intermedio'] },
        { id: 'c9', name: 'Archivos y JSON', description: '`open()`, modos lectura/escritura, `with`, `json.dump()`/`json.load()`', weight: 6, tags: ['intermedio'] },
        { id: 'c10', name: 'Módulos y paquetes', description: '`import`, `from`, `__name__==__main__`, pip, creación de paquetes', weight: 5, tags: ['intermedio'] },
        { id: 'c11', name: 'POO con Python', description: 'clases, `__init__`, `self`, atributos/métodos, herencia, `super()`, dunder methods', weight: 8, tags: ['avanzado'] },
        { id: 'c12', name: 'Librería estándar', description: '`math`, `random`, `datetime`, `os`, `sys`, `collections`, `itertools`', weight: 4, tags: ['avanzado'] }
      ],
      relations: [
        { from: 'c1', to: 'c2', type: 'prerrequisito' },
        { from: 'c1', to: 'c3', type: 'prerrequisito' },
        { from: 'c1', to: 'c4', type: 'prerrequisito' },
        { from: 'c1', to: 'c7', type: 'prerrequisito' },
        { from: 'c2', to: 'c5', type: 'prerrequisito' },
        { from: 'c3', to: 'c4', type: 'prerrequisito' },
        { from: 'c4', to: 'c6', type: 'prerrequisito' },
        { from: 'c5', to: 'c8', type: 'prerrequisito' },
        { from: 'c5', to: 'c10', type: 'prerrequisito' },
        { from: 'c8', to: 'c9', type: 'prerrequisito' },
        { from: 'c5', to: 'c11', type: 'prerrequisito' },
        { from: 'c10', to: 'c12', type: 'prerrequisito' },
        { from: 'c7', to: 'c9', type: 'relacionado' },
        { from: 'c6', to: 'c11', type: 'relacionado' }
      ]
    }, {
      id: 'ex-mat-2',
      name: 'Matemáticas discretas',
      description: 'Fundamentos matemáticos para ciencias de la computación: lógica, conjuntos, grafos, combinatoria',
      concepts: [
        { id: 'm1', name: 'Lógica proposicional', description: 'operadores lógicos (∧, ∨, ¬, →, ↔), tablas de verdad, tautologías y equivalencias', weight: 5, tags: ['lógica'] },
        { id: 'm2', name: 'Teoría de conjuntos', description: 'conjuntos, subconjuntos, unión/intersección/complemento, producto cartesiano', weight: 5, tags: ['básico'] },
        { id: 'm3', name: 'Demostración matemática', description: 'inducción, contraejemplo, demostración directa e indirecta', weight: 6, tags: ['lógica'] },
        { id: 'm4', name: 'Combinatoria y probabilidad', description: 'permutaciones, combinaciones, variaciones, regla de Laplace, probabilidad condicionada', weight: 6, tags: ['conteo'] },
        { id: 'm5', name: 'Grafos', description: 'grafos dirigidos/no dirigidos, adyacencia, caminos, ciclos, grafos completos y bipartitos', weight: 7, tags: ['grafos'] },
        { id: 'm6', name: 'Árboles', description: 'árboles binarios, árboles de búsqueda, recorridos pre/in/post-order, árboles de expansión', weight: 6, tags: ['grafos'] },
        { id: 'm7', name: 'Relaciones de recurrencia', description: 'sucesiones, resolución de recurrencias lineales, aplicación a algoritmos', weight: 7, tags: ['avanzado'] },
        { id: 'm8', name: 'Autómatas y lenguajes', description: 'autómatas finitos deterministas y no deterministas, expresiones regulares, gramáticas', weight: 8, tags: ['avanzado'] }
      ],
      relations: [
        { from: 'm1', to: 'm2', type: 'prerrequisito' },
        { from: 'm1', to: 'm3', type: 'prerrequisito' },
        { from: 'm2', to: 'm4', type: 'prerrequisito' },
        { from: 'm2', to: 'm5', type: 'prerrequisito' },
        { from: 'm5', to: 'm6', type: 'prerrequisito' },
        { from: 'm4', to: 'm7', type: 'prerrequisito' },
        { from: 'm5', to: 'm8', type: 'prerrequisito' },
        { from: 'm3', to: 'm7', type: 'relacionado' }
      ]
    }, {
      id: 'ex-web-3',
      name: 'Desarrollo Web Frontend',
      description: 'Fundamentos de desarrollo web: HTML, CSS, JavaScript, frameworks y herramientas modernas',
      concepts: [
        { id: 'w1', name: 'HTML semántico', description: 'estructura de documento, etiquetas semánticas (`header`, `main`, `article`, `section`), atributos', weight: 3, tags: ['básico'] },
        { id: 'w2', name: 'CSS selectores y modelo de caja', description: 'selectores, cascada, especificidad, `box-model`, `display`, `position`', weight: 4, tags: ['básico'] },
        { id: 'w3', name: 'CSS Flexbox y Grid', description: '`flex-direction`, `justify-content`, `grid-template`, layouts responsive', weight: 5, tags: ['maquetación'] },
        { id: 'w4', name: 'JavaScript DOM', description: '`querySelector`, eventos, manipulación del DOM, `createElement`, `classList`', weight: 6, tags: ['interactividad'] },
        { id: 'w5', name: 'JavaScript asíncrono', description: '`fetch`, `async/await`, promesas, manejo de errores en peticiones', weight: 7, tags: ['intermedio'] },
        { id: 'w6', name: 'Responsive design', description: 'media queries, unidades relativas, mobile-first, `min-width`/`max-width`', weight: 5, tags: ['maquetación'] },
        { id: 'w7', name: 'Git y control de versiones', description: '`git init`/`add`/`commit`/`push`, ramas, `merge`, `pull`, GitHub Pages', weight: 4, tags: ['herramientas'] },
        { id: 'w8', name: 'NPM y bundlers', description: '`npm init`, `package.json`, scripts, Vite/Webpack básico, módulos ES', weight: 5, tags: ['herramientas'] },
        { id: 'w9', name: 'Vue.js / React (introducción)', description: 'componentes, estado reactivo, `v-for`/`v-if`, props, eventos, ciclo de vida básico', weight: 8, tags: ['framework'] },
        { id: 'w10', name: 'Accesibilidad y SEO', description: 'atributos ARIA, `alt`, contraste, etiquetas meta, Open Graph, Lighthouse', weight: 4, tags: ['avanzado'] }
      ],
      relations: [
        { from: 'w1', to: 'w2', type: 'prerrequisito' },
        { from: 'w2', to: 'w3', type: 'prerrequisito' },
        { from: 'w1', to: 'w4', type: 'prerrequisito' },
        { from: 'w4', to: 'w5', type: 'prerrequisito' },
        { from: 'w2', to: 'w6', type: 'prerrequisito' },
        { from: 'w3', to: 'w6', type: 'prerrequisito' },
        { from: 'w5', to: 'w9', type: 'prerrequisito' },
        { from: 'w7', to: 'w8', type: 'prerrequisito' },
        { from: 'w8', to: 'w9', type: 'prerrequisito' },
        { from: 'w6', to: 'w10', type: 'relacionado' },
        { from: 'w1', to: 'w10', type: 'relacionado' }
      ]
    }, {
      id: 'ex-en-4',
      name: 'Inglés B2 (Intermedio-Alto)',
      description: 'Gramática, vocabulario y expresión oral/escrita para nivel B2 del MCER',
      concepts: [
        { id: 'e1', name: 'Present perfect y past simple', description: 'diferencia de uso, `for`/`since`, `already`/`yet`/`just`, contrastes con pasado simple', weight: 5, tags: ['gramática'] },
        { id: 'e2', name: 'Condicionales (0, 1, 2, 3)', description: 'zero, first, second, third conditional, `unless`, `provided that`, `in case`', weight: 6, tags: ['gramática'] },
        { id: 'e3', name: 'Voz pasiva', description: 'pasiva en todos los tiempos, pasiva con agentes, `get` passive, impersonal `it is said`', weight: 5, tags: ['gramática'] },
        { id: 'e4', name: 'Estilo indirecto', description: '`said`/`told`/`asked`, cambios de tiempo, preguntas indirectas, verbos reporting', weight: 6, tags: ['gramática'] },
        { id: 'e5', name: 'Vocabulario académico', description: 'collocations, phrasal verbs, formality register, academic word list', weight: 5, tags: ['vocabulario'] },
        { id: 'e6', name: 'Writing formal e informal', description: 'ensayos, emails formales, informes, artículos, conectores discursivos', weight: 7, tags: ['escritura'] },
        { id: 'e7', name: 'Listening comprensión', description: 'escuchar extractos, identificar idea principal, detalles, inferencias, acentos', weight: 6, tags: ['comprensión'] },
        { id: 'e8', name: 'Speaking y pronunciación', description: 'debates, presentaciones, entonación, fonemas difíciles, connected speech', weight: 7, tags: ['oral'] },
        { id: 'e9', name: 'Modales y matices', description: '`must`/`have to`/`should`/`ought to`/`needn\'t`, deducción con modales (`must be`, `can\'t be`)', weight: 5, tags: ['gramática'] },
        { id: 'e10', name: 'First Certificate (B2) prep', description: 'estructura del examen, técnicas de Reading/Use of English, timing, errores comunes', weight: 6, tags: ['examen'] }
      ],
      relations: [
        { from: 'e1', to: 'e2', type: 'prerrequisito' },
        { from: 'e1', to: 'e3', type: 'prerrequisito' },
        { from: 'e1', to: 'e4', type: 'prerrequisito' },
        { from: 'e2', to: 'e9', type: 'prerrequisito' },
        { from: 'e3', to: 'e4', type: 'relacionado' },
        { from: 'e5', to: 'e6', type: 'prerrequisito' },
        { from: 'e7', to: 'e8', type: 'relacionado' },
        { from: 'e6', to: 'e10', type: 'prerrequisito' },
        { from: 'e8', to: 'e10', type: 'prerrequisito' },
        { from: 'e9', to: 'e10', type: 'relacionado' }
      ]
    }, {
      id: 'ex-his-5',
      name: 'Historia de España (Siglo XX)',
      description: 'Desde la crisis de 1898 hasta la transición democrática: políticos, sociales y económicos',
      concepts: [
        { id: 'h1', name: 'Crisis del 98', description: 'pérdida de las últimas colonias, regeneracionismo, generación del 98', weight: 4, tags: ['política'] },
        { id: 'h2', name: 'Restauración borbónica', description: 'sistema turnista, Cánovas y Sagasta, caciquismo, oposición política', weight: 5, tags: ['política'] },
        { id: 'h3', name: 'Dictadura de Primo de Rivera', description: 'golpe de 1923, Directorio militar y civil, fin de la dictadura', weight: 4, tags: ['política'] },
        { id: 'h4', name: 'Segunda República', description: 'Constitución de 1931, bienios reformista y radical-cedista, Frente Popular', weight: 6, tags: ['política'] },
        { id: 'h5', name: 'Guerra Civil Española', description: 'sublevación, bandos, batallas clave, Brigadas Internacionales, consecuencias', weight: 8, tags: ['conflicto'] },
        { id: 'h6', name: 'Franquismo: autarquía y aislamiento', description: 'primer franquismo, racionamiento, maquis, bloqueo internacional', weight: 6, tags: ['política'] },
        { id: 'h7', name: 'Franquismo: desarrollismo', description: 'Plan de Estabilización, milagro económico, turismo, emigración, technocrats', weight: 5, tags: ['economía'] },
        { id: 'h8', name: 'Transición democrática', description: 'muerte de Franco, Ley para la Reforma, Suárez, Pactos de la Moncloa, Constitución 1978', weight: 7, tags: ['política'] },
        { id: 'h9', name: 'Movimientos sociales y culturales', description: 'movimiento obrero, feminismo, movilizaciones estudiantiles, contracultura', weight: 4, tags: ['sociedad'] },
        { id: 'h10', name: 'España en la UE y la actualidad', description: 'ingreso en la CEE, modernización, 23-F, alternancia política, crisis 2008', weight: 5, tags: ['actualidad'] }
      ],
      relations: [
        { from: 'h1', to: 'h2', type: 'prerrequisito' },
        { from: 'h2', to: 'h3', type: 'prerrequisito' },
        { from: 'h2', to: 'h4', type: 'prerrequisito' },
        { from: 'h4', to: 'h5', type: 'prerrequisito' },
        { from: 'h3', to: 'h5', type: 'prerrequisito' },
        { from: 'h5', to: 'h6', type: 'prerrequisito' },
        { from: 'h6', to: 'h7', type: 'prerrequisito' },
        { from: 'h7', to: 'h8', type: 'prerrequisito' },
        { from: 'h5', to: 'h9', type: 'relacionado' },
        { from: 'h8', to: 'h10', type: 'prerrequisito' },
        { from: 'h9', to: 'h8', type: 'relacionado' }
      ]
    }];

    this.crossRelations = [
      { from: 'c2', to: 'm1', type: 'relacionado' },
      { from: 'c4', to: 'm5', type: 'relacionado' },
      { from: 'w4', to: 'c5', type: 'relacionado' },
      { from: 'w5', to: 'c8', type: 'profundiza' },
      { from: 'e5', to: 'w6', type: 'relacionado' },
      { from: 'h9', to: 'e6', type: 'relacionado' }
    ];

    this.assessments = [];
    const dates = [
      new Date(Date.now() - 7 * 86400000).toISOString(),
      new Date(Date.now() - 3 * 86400000).toISOString(),
      new Date(Date.now()).toISOString()
    ];
    const subjects_ = this.subjects;
    // Python assessments
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[0].id, date: dates[0], results: { c1: 85, c2: 70, c3: 60, c4: 75, c5: 40, c6: 30, c7: 80, c8: 15, c9: 10, c10: 20, c11: 5, c12: 0 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[0].id, date: dates[1], results: { c1: 90, c2: 80, c3: 75, c4: 85, c5: 55, c6: 45, c7: 85, c8: 30, c9: 20, c10: 35, c11: 10, c12: 5 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[0].id, date: dates[2], results: { c1: 95, c2: 85, c3: 80, c4: 90, c5: 65, c6: 50, c7: 90, c8: 45, c9: 30, c10: 50, c11: 20, c12: 10 }, notes: {} });
    // Discrete math assessments
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[1].id, date: dates[0], results: { m1: 90, m2: 80, m3: 60, m4: 40, m5: 30, m6: 20, m7: 10, m8: 5 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[1].id, date: dates[2], results: { m1: 95, m2: 85, m3: 70, m4: 55, m5: 45, m6: 35, m7: 20, m8: 10 }, notes: {} });
    // Web dev assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[2].id, date: dates[1], results: { w1: 90, w2: 80, w3: 60, w4: 70, w5: 40, w6: 75, w7: 85, w8: 50, w9: 20, w10: 10 }, notes: {} });
    // English assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[3].id, date: dates[1], results: { e1: 75, e2: 60, e3: 70, e4: 50, e5: 65, e6: 55, e7: 80, e8: 70, e9: 60, e10: 40 }, notes: {} });
    // History assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[4].id, date: dates[2], results: { h1: 85, h2: 70, h3: 80, h4: 60, h5: 50, h6: 40, h7: 55, h8: 30, h9: 65, h10: 45 }, notes: {} });

    this.save();
  },

  getSubject(id) {
    return this.subjects.find(s => s.id === id);
  },

  subjectAssessments(subjectId) {
    return this.assessments.filter(a => a.subjectId === subjectId);
  },

  lastAssessment(subjectId) {
    const ass = this.subjectAssessments(subjectId);
    return ass.length ? ass[0] : null;
  },

  addSubject(name, desc) {
    const s = { id: crypto.randomUUID(), name, description: desc, concepts: [], relations: [] };
    this.subjects.push(s);
    this.save();
    return s;
  },

  updateSubject(id, name, desc) {
    const s = this.getSubject(id);
    if (s) { s.name = name; s.description = desc; this.save(); }
  },

  deleteSubject(id) {
    this.subjects = this.subjects.filter(s => s.id !== id);
    this.assessments = this.assessments.filter(a => a.subjectId !== id);
    this.crossRelations = this.crossRelations.filter(r => {
      const fromSub = GC.conceptSubject(this.subjects, r.from);
      const toSub = GC.conceptSubject(this.subjects, r.to);
      return fromSub || toSub;
    });
    this.save();
  },

  addConcept(subjectId, name, desc, weight, tags) {
    const s = this.getSubject(subjectId);
    if (!s) return null;
    const c = { id: crypto.randomUUID(), name, description: desc, weight, tags: tags || [] };
    s.concepts.push(c);
    this.save();
    return c;
  },

  addConceptTag(subjectId, conceptId, tag) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    const c = s.concepts.find(x => x.id === conceptId);
    if (c) {
      if (!c.tags) c.tags = [];
      if (!c.tags.includes(tag)) { c.tags.push(tag); this.save(); }
    }
  },

  removeConceptTag(subjectId, conceptId, tag) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    const c = s.concepts.find(x => x.id === conceptId);
    if (c && c.tags) { c.tags = c.tags.filter(t => t !== tag); this.save(); }
  },

  allTags(subjectId) {
    const s = this.getSubject(subjectId);
    if (!s) return [];
    const set = new Set();
    s.concepts.forEach(c => (c.tags || []).forEach(t => set.add(t)));
    return [...set].sort();
  },

  updateConcept(subjectId, conceptId, data) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    const c = s.concepts.find(x => x.id === conceptId);
    if (c) { Object.assign(c, data); this.save(); }
  },

  addResource(subjectId, conceptId, resource) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    const c = s.concepts.find(x => x.id === conceptId);
    if (c) {
      if (!c.resources) c.resources = [];
      c.resources.push({ id: crypto.randomUUID(), ...resource });
      this.save();
    }
  },

  removeResource(subjectId, conceptId, resourceId) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    const c = s.concepts.find(x => x.id === conceptId);
    if (c && c.resources) {
      c.resources = c.resources.filter(r => r.id !== resourceId);
      this.save();
    }
  },

  deleteConcept(subjectId, conceptId) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    s.concepts = s.concepts.filter(c => c.id !== conceptId);
    s.relations = s.relations.filter(r => r.from !== conceptId && r.to !== conceptId);
    this.crossRelations = this.crossRelations.filter(r => r.from !== conceptId && r.to !== conceptId);
    this.save();
  },

  addRelation(subjectId, from, to, type) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    if (from === to) return;
    if (s.relations.some(r => r.from === from && r.to === to)) return;
    s.relations.push({ from, to, type });
    this.save();
  },

  removeRelation(subjectId, index) {
    const s = this.getSubject(subjectId);
    if (!s) return;
    s.relations.splice(index, 1);
    this.save();
  },

  addCrossRelation(from, to, type) {
    if (from === to) return;
    if (this.crossRelations.some(r => r.from === from && r.to === to)) return;
    this.crossRelations.push({ from, to, type });
    this.save();
  },

  removeCrossRelation(index) {
    this.crossRelations.splice(index, 1);
    this.save();
  },

  submitAssessment(subjectId, scores, notes) {
    const a = {
      id: crypto.randomUUID(),
      subjectId,
      date: new Date().toISOString(),
      results: { ...scores },
      notes: { ...notes }
    };
    this.assessments.unshift(a);
    this.save();
    return a;
  },

  deleteAssessment(id) {
    this.assessments = this.assessments.filter(a => a.id !== id);
    this.save();
  },

  exportConceptsCSV(subjectId) {
    const s = this.getSubject(subjectId);
    if (!s) return '';
    const esc = v => '"' + String(v).replace(/"/g, '""') + '"';
    const lines = ['nombre,descripci\u00f3n,peso,etiquetas'];
    s.concepts.forEach(c => {
      lines.push([esc(c.name), esc(c.description || ''), c.weight || 5, esc((c.tags || []).join('; '))].join(','));
    });
    return lines.join('\n');
  },

  importConceptsCSV(subjectId, csvText) {
    const s = this.getSubject(subjectId);
    if (!s) return 0;
    const lines = csvText.split('\n').filter(Boolean);
    if (lines.length < 2) return 0;
    let count = 0;
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.replace(/^"|"$/g, '').replace(/""/g, '"').trim());
      const name = parts[0];
      if (!name) continue;
      const desc = parts[1] || '';
      const weight = Math.min(10, Math.max(1, parseInt(parts[2]) || 5));
      const tags = parts[3] ? parts[3].split(';').map(t => t.trim()).filter(Boolean) : [];
      this.addConcept(subjectId, name, desc, weight, tags);
      count++;
    }
    return count;
  },

  exportTemplate() {
    return JSON.stringify({
      subjects: [{
        name: 'Nombre de la asignatura',
        description: 'Describe de qu\u00e9 va esta asignatura',
        concepts: [
          { name: 'Concepto 1', description: 'Explica brevemente este concepto', weight: 3 },
          { name: 'Concepto 2', description: 'Otro concepto importante', weight: 5 },
          { name: 'Concepto 3', description: 'Concepto avanzado', weight: 8 }
        ],
        relations: [
          { from: 'Concepto 1', to: 'Concepto 2', type: 'prerrequisito' },
          { from: 'Concepto 2', to: 'Concepto 3', type: 'prerrequisito' }
        ]
      }],
      crossRelations: [],
      assessments: []
    }, null, 2);
  },

  exportData() {
    return JSON.stringify({
      subjects: this.subjects,
      assessments: this.assessments,
      crossRelations: this.crossRelations
    }, null, 2);
  },

  importData(json) {
    try {
      const d = JSON.parse(json);
      if (!d.subjects) throw new Error('Formato inv\u00e1lido: falta subjects');
      this.subjects = d.subjects;
      this.assessments = d.assessments || [];
      this.crossRelations = d.crossRelations || [];
      this.save();
      return true;
    } catch (e) {
      throw e;
    }
  },

  getSuggestions() {
    const suggestions = [];
    if (!this.subjects.length) return suggestions;

    for (const subject of this.subjects) {
      const ass = this.subjectAssessments(subject.id);
      if (!ass.length) continue;

      const latest = ass[0];
      const results = latest.results;

      const weak = subject.concepts.filter(c => (results[c.id] || 0) < 40);
      const mid = subject.concepts.filter(c => {
        const s = results[c.id] || 0;
        return s >= 40 && s < 70;
      });

      if (weak.length) {
        const critical = weak.filter(c =>
          subject.relations.some(r => r.from === c.id && r.type === 'prerrequisito')
        );
        if (critical.length) {
          suggestions.push({
            type: 'critical',
            subject: subject.name,
            text: critical.length === 1
              ? `"${critical[0].name}" es prerrequisito de otros conceptos y est\u00e1 en rojo. Prioriza repasarlo.`
              : `${critical.length} conceptos prerrequisito est\u00e1n en rojo en "${subject.name}". Rep\u00e1salos antes de avanzar.`
          });
        }
        if (weak.length > 2) {
          suggestions.push({
            type: 'warning',
            subject: subject.name,
            text: `Tienes ${weak.length} conceptos con dominio bajo en "${subject.name}". Dedica tiempo a reforzar las bases.`
          });
        }
      }

      if (mid.length >= weak.length && mid.length > 0 && weak.length === 0) {
        suggestions.push({
          type: 'encourage',
          subject: subject.name,
          text: `Buen progreso en "${subject.name}" — no hay conceptos en rojo. Sigue reforzando los ${mid.length} que est\u00e1n en proceso.`
        });
      }

      if (ass.length >= 2) {
        const prev = ass[1];
        const currAvg = GC.overallScore(latest.results);
        const prevAvg = GC.overallScore(prev.results);
        const diff = currAvg - prevAvg;
        if (diff > 5) {
          suggestions.push({
            type: 'improvement',
            subject: subject.name,
            text: `Has mejorado un ${diff}% en "${subject.name}" desde la \u00faltima evaluaci\u00f3n. \u00a1Sigue as\u00ed!`
          });
        } else if (diff < -5) {
          suggestions.push({
            type: 'decline',
            subject: subject.name,
            text: `Has bajado un ${Math.abs(diff)}% en "${subject.name}". Revisa los conceptos que antes dominabas.`
          });
        }
      }
    }

    const allConcepts = GC.allConcepts(this.subjects);
    for (const cr of this.crossRelations) {
      const from = allConcepts.find(c => c.id === cr.from);
      const to = allConcepts.find(c => c.id === cr.to);
      if (from && to) {
        suggestions.push({
          type: 'crosslink',
          subject: `${from.subjectName} ↔ ${to.subjectName}`,
          text: `"${from.name}" (${from.subjectName}) est\u00e1 relacionado con "${to.name}" (${to.subjectName}). Coordina el estudio de ambas asignaturas.`
        });
      }
    }

    return suggestions.slice(0, 8);
  }
});
