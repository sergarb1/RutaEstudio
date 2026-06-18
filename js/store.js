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

    }, {
      id: 'ex-mat2-6',
      name: 'Matem\u00e1ticas II (2\u00ba Bach)',
      description: 'An\u00e1lisis matem\u00e1tico, \u00e1lgebra lineal, geometr\u00eda y probabilidad para 2\u00ba de Bachillerato de Ciencias',
      concepts: [
        { id: 'ma1', name: 'L\u00edmites y continuidad', description: 'l\u00edmites laterales, infinitos, indeterminaciones, funci\u00f3n continua, teorema de Bolzano', weight: 6, tags: ['an\u00e1lisis'] },
        { id: 'ma2', name: 'Derivadas', description: 'regla de la cadena, derivaci\u00f3n impl\u00edcita, m\u00e1ximos/m\u00ednimos, monoton\u00eda, curvatura, optimizaci\u00f3n', weight: 7, tags: ['an\u00e1lisis'] },
        { id: 'ma3', name: 'Integrales', description: 'integral indefinida, inmediatas, por partes, cambio de variable, \u00e1reas bajo la curva, Barrow', weight: 8, tags: ['an\u00e1lisis'] },
        { id: 'ma4', name: 'Matrices y determinantes', description: 'operaciones con matrices, inversa, rango, determinantes 2x2 y 3x3, propiedades', weight: 6, tags: ['\u00e1lgebra'] },
        { id: 'ma5', name: 'Sistemas de ecuaciones lineales', description: 'm\u00e9todo de Gauss, Rouch\u00e9-Frobenius, sistemas homog\u00e9neos, discusi\u00f3n de par\u00e1metros', weight: 6, tags: ['\u00e1lgebra'] },
        { id: 'ma6', name: 'Geometr\u00eda vectorial', description: 'vectores en R\u00b2 y R\u00b3, producto escalar/vectorial, rectas y planos, posiciones relativas', weight: 6, tags: ['geometr\u00eda'] },
        { id: 'ma7', name: 'Probabilidad y distribuciones', description: 'probabilidad condicionada, teorema de Bayes, distribuci\u00f3n binomial y normal, tipificaci\u00f3n', weight: 5, tags: ['probabilidad'] },
        { id: 'ma8', name: 'Teorema central del l\u00edmite', description: 'muestreo, intervalo de confianza, contraste de hip\u00f3tesis, nivel de significaci\u00f3n', weight: 6, tags: ['probabilidad'] }
      ],
      relations: [
        { from: 'ma1', to: 'ma2', type: 'prerrequisito' },
        { from: 'ma2', to: 'ma3', type: 'prerrequisito' },
        { from: 'ma4', to: 'ma5', type: 'prerrequisito' },
        { from: 'ma7', to: 'ma8', type: 'prerrequisito' },
        { from: 'ma1', to: 'ma6', type: 'relacionado' },
        { from: 'ma4', to: 'ma6', type: 'prerrequisito' }
      ]
    }, {
      id: 'ex-len-7',
      name: 'Lengua Castellana y Literatura II (2\u00ba Bach)',
      description: 'Morfolog\u00eda, sintaxis, comentario de texto y literatura desde la Edad Media hasta la Generaci\u00f3n del 27',
      concepts: [
        { id: 'l1', name: 'Morfolog\u00eda y clases de palabras', description: 'categor\u00edas gramaticales, formaci\u00f3n de palabras, derivaci\u00f3n y composici\u00f3n, siglas y acr\u00f3nimos', weight: 4, tags: ['lengua'] },
        { id: 'l2', name: 'Sintaxis: oraci\u00f3n simple', description: 'sujeto y predicado, complementos verbales, atributo, CD, CI, CC, CR\u00e9g, Agente', weight: 5, tags: ['lengua'] },
        { id: 'l3', name: 'Sintaxis: oraci\u00f3n compuesta', description: 'coordinaci\u00f3n, subordinaci\u00f3n sustantiva/adjetiva/adverbial, nexos, an\u00e1lisis sint\u00e1ctico completo', weight: 7, tags: ['lengua'] },
        { id: 'l4', name: 'Comentario de texto', description: 'adecuaci\u00f3n, coherencia, cohesi\u00f3n, modalizaci\u00f3n, tipolog\u00eda textual, resumen y tesis', weight: 7, tags: ['texto'] },
        { id: 'l5', name: 'Literatura medieval y Renacimiento', description: 'Mester de Juglar\u00eda, Poema del Mio Cid, Jorge Manrique, Garcilaso, \u00e9glogas y sonetos', weight: 5, tags: ['literatura'] },
        { id: 'l6', name: 'Barroco y Neoclasicismo', description: 'G\u00f3ngora, Quevedo, Lope, Calder\u00f3n, Feijoo, Jovellanos, prosa ilustrada', weight: 5, tags: ['literatura'] },
        { id: 'l7', name: 'Romanticismo y Realismo', description: 'Espronceda, B\u00e9quer, Larra, Gald\u00f3s, Clar\u00edn, Pardo Baz\u00e1n, novela realista', weight: 6, tags: ['literatura'] },
        { id: 'l8', name: 'Generaci\u00f3n del 98 y Modernismo', description: 'Unamuno, Azor\u00edn, Baroja, Machado, Valle-Incl\u00e1n, Juan Ram\u00f3n Jim\u00e9nez', weight: 6, tags: ['literatura'] },
        { id: 'l9', name: 'Generaci\u00f3n del 27', description: 'Lorca, Alberti, Salinas, Cernuda, Aleixandre, Dal\u00ed y el Surrealismo', weight: 5, tags: ['literatura'] },
        { id: 'l10', name: 'Variedades del espa\u00f1ol', description: 'dialectos del espa\u00f1ol, andaluz, canario, espa\u00f1ol de Am\u00e9rica, biling\u00fcismo, diglosia', weight: 4, tags: ['lengua'] }
      ],
      relations: [
        { from: 'l1', to: 'l2', type: 'prerrequisito' },
        { from: 'l2', to: 'l3', type: 'prerrequisito' },
        { from: 'l1', to: 'l4', type: 'prerrequisito' },
        { from: 'l5', to: 'l6', type: 'prerrequisito' },
        { from: 'l6', to: 'l7', type: 'prerrequisito' },
        { from: 'l7', to: 'l8', type: 'prerrequisito' },
        { from: 'l8', to: 'l9', type: 'prerrequisito' },
        { from: 'l3', to: 'l4', type: 'relacionado' },
        { from: 'l10', to: 'l4', type: 'relacionado' }
      ]
    }, {
      id: 'ex-qui-8',
      name: 'Qu\u00edmica (2\u00ba Bach)',
      description: 'Estructura at\u00f3mica, enlace qu\u00edmico, termoqu\u00edmica, cin\u00e9tica, equilibrio, \u00e1cido-base y redox para 2\u00ba de Bachillerato',
      concepts: [
        { id: 'q1', name: 'Estructura at\u00f3mica y tabla peri\u00f3dica', description: 'n\u00fameros cu\u00e1nticos, orbitales, configuraci\u00f3n electr\u00f3nica, propiedades peri\u00f3dicas (electronegatividad, afinidad)', weight: 5, tags: ['atomo'] },
        { id: 'q2', name: 'Enlace qu\u00edmico', description: 'enlace i\u00f3nico, covalente y met\u00e1lico, geometr\u00eda molecular (RPECV), hibridaci\u00f3n, fuerzas intermoleculares', weight: 6, tags: ['enlace'] },
        { id: 'q3', name: 'Termoqu\u00edmica', description: 'energ\u00eda interna, entalp\u00eda, ley de Hess, entalp\u00eda de formaci\u00f3n/enlace, espontaneidad (G=H-TS)', weight: 7, tags: ['energ\u00eda'] },
        { id: 'q4', name: 'Cin\u00e9tica qu\u00edmica', description: 'velocidad de reacci\u00f3n, ecuaciones de velocidad, orden de reacci\u00f3n, teor\u00eda de colisiones, catalizadores', weight: 6, tags: ['cin\u00e9tica'] },
        { id: 'q5', name: 'Equilibrio qu\u00edmico', description: 'constante Kc/Kp, principio de Le Ch\u00e2telier, desplazamientos, grado de disociaci\u00f3n, presi\u00f3n y temperatura', weight: 7, tags: ['equilibrio'] },
        { id: 'q6', name: '\u00c1cido-base', description: 'teor\u00edas de \u00e1cido-base (Arrhenius, Br\u00f6nsted), pH, fuerza de \u00e1cidos/bases, hidr\u00f3lisis, tampones', weight: 7, tags: ['\u00e1cido-base'] },
        { id: 'q7', name: 'Reacciones redox', description: 'n\u00famero de oxidaci\u00f3n, ajuste i\u00f3nico, potencial de electrodo, pilas galv\u00e1nicas, electrolisis', weight: 7, tags: ['redox'] },
        { id: 'q8', name: 'Qu\u00edmica org\u00e1nica (formulaci\u00f3n)', description: 'hidrocarburos, grupos funcionales, isometr\u00eda, nomenclatura IUPAC, reacciones org\u00e1nicas b\u00e1sicas', weight: 5, tags: ['org\u00e1nica'] }
      ],
      relations: [
        { from: 'q1', to: 'q2', type: 'prerrequisito' },
        { from: 'q2', to: 'q5', type: 'prerrequisito' },
        { from: 'q1', to: 'q3', type: 'prerrequisito' },
        { from: 'q4', to: 'q5', type: 'prerrequisito' },
        { from: 'q5', to: 'q6', type: 'prerrequisito' },
        { from: 'q5', to: 'q7', type: 'prerrequisito' },
        { from: 'q3', to: 'q4', type: 'relacionado' },
        { from: 'q2', to: 'q8', type: 'prerrequisito' }
      ]
    }, {
      id: 'ex-fil-9',
      name: 'Historia de la Filosof\u00eda (2\u00ba Bach)',
      description: 'Principales corrientes y autores de la filosof\u00eda occidental desde Plat\u00f3n hasta Nietzsche',
      concepts: [
        { id: 'f1', name: 'Plat\u00f3n', description: 'teor\u00eda de las Ideas, dualismo ontol\u00f3gico, mito de la caverna, alma tripartita, Estado ideal', weight: 7, tags: ['filosof\u00eda antigua'] },
        { id: 'f2', name: 'Arist\u00f3teles', description: 'hilemorfismo, acto y potencia, causas, \u00e9tica nicom\u00e1quea, pol\u00edtica, l\u00f3gica silog\u00edstica', weight: 7, tags: ['filosof\u00eda antigua'] },
        { id: 'f3', name: 'Filosof\u00eda medieval (Agust\u00edn y Tom\u00e1s)', description: 'Agust\u00edn: raz\u00f3n y fe, iluminaci\u00f3n; Tom\u00e1s de Aquino: cinco v\u00edas, ley natural, esencia y existencia', weight: 6, tags: ['filosof\u00eda medieval'] },
        { id: 'f4', name: 'Descartes y el racionalismo', description: 'duda met\u00f3dica, "pienso luego existo", dualismo cartesiano, m\u00e9todo deductivo, ideas innatas', weight: 6, tags: ['filosof\u00eda moderna'] },
        { id: 'f5', name: 'Hume y el empirismo', description: 'impresiones e ideas, h\u00e1bito y causalidad, cr\u00edtica a la sustancia, escepticismo moderado', weight: 6, tags: ['filosof\u00eda moderna'] },
        { id: 'f6', name: 'Kant', description: 'idealismo trascendental, giro copernicano, imperativo categ\u00f3rico, Cr\u00edtica de la Raz\u00f3n Pura y Pr\u00e1ctica', weight: 8, tags: ['filosof\u00eda moderna'] },
        { id: 'f7', name: 'Marx', description: 'materialismo hist\u00f3rico, alienaci\u00f3n, lucha de clases, plusval\u00eda, ideolog\u00eda, cr\u00edtica al capitalismo', weight: 6, tags: ['filosof\u00eda contempor\u00e1nea'] },
        { id: 'f8', name: 'Nietzsche', description: 'nihilismo, muerte de Dios, superhombre, voluntad de poder, eterno retorno, cr\u00edtica a la moral', weight: 7, tags: ['filosof\u00eda contempor\u00e1nea'] }
      ],
      relations: [
        { from: 'f1', to: 'f2', type: 'prerrequisito' },
        { from: 'f1', to: 'f3', type: 'prerrequisito' },
        { from: 'f3', to: 'f4', type: 'prerrequisito' },
        { from: 'f5', to: 'f6', type: 'prerrequisito' },
        { from: 'f4', to: 'f5', type: 'relacionado' },
        { from: 'f6', to: 'f7', type: 'relacionado' },
        { from: 'f6', to: 'f8', type: 'relacionado' }
      ]
    }, {
      id: 'ex-fis-10',
      name: 'F\u00edsica (2\u00ba Bach)',
      description: 'Cinem\u00e1tica, din\u00e1mica, campo gravitatorio, electromagnetismo, ondas y \u00f3ptica para 2\u00ba de Bachillerato de Ciencias',
      concepts: [
        { id: 'fi1', name: 'Cinem\u00e1tica del punto', description: 'MRU, MRUA, MCU, lanzamiento proyectiles, composici\u00f3n de movimientos, vectores posici\u00f3n/velocidad/aceleraci\u00f3n', weight: 5, tags: ['mec\u00e1nica'] },
        { id: 'fi2', name: 'Din\u00e1mica y leyes de Newton', description: '1\u00aa/2\u00aa/3\u00aa ley, diagramas de fuerzas, rozamiento, plano inclinado, poleas, din\u00e1mica del MCU', weight: 6, tags: ['mec\u00e1nica'] },
        { id: 'fi3', name: 'Trabajo y energ\u00eda', description: 'trabajo mec\u00e1nico, energ\u00eda cin\u00e9tica/potencial, teorema conservaci\u00f3n, fuerza conservativa, potencia', weight: 6, tags: ['mec\u00e1nica'] },
        { id: 'fi4', name: 'Campo gravitatorio', description: 'ley de gravitaci\u00f3n universal, campo gravitatorio, energ\u00eda potencial, \u00f3rbitas, velocidad de escape, leyes de Kepler', weight: 7, tags: ['gravedad'] },
        { id: 'fi5', name: 'Campo el\u00e9ctrico', description: 'ley de Coulomb, campo y potencial el\u00e9ctrico, trabajo, flujo, teorema de Gauss, superficies equipotenciales', weight: 7, tags: ['electromagnetismo'] },
        { id: 'fi6', name: 'Campo magn\u00e9tico', description: 'fuerza de Lorentz, campo creado por corrientes (Biot-Savart), fuerza entre conductores, inducci\u00f3n (Faraday-Lenz)', weight: 7, tags: ['electromagnetismo'] },
        { id: 'fi7', name: 'Movimiento ondulatorio', description: 'ecuaci\u00f3n de onda, tipos de ondas, principios de Huygens, interferencia, difracci\u00f3n, sonido, efecto Doppler', weight: 5, tags: ['ondas'] },
        { id: 'fi8', name: '\u00d3ptica geom\u00e9trica', description: 'reflexi\u00f3n y refracci\u00f3n (Snell), lentes delgadas, espejos, f\u00f3rmula fundamental, aumento, defectos visuales', weight: 5, tags: ['\u00f3ptica'] }
      ],
      relations: [
        { from: 'fi1', to: 'fi2', type: 'prerrequisito' },
        { from: 'fi2', to: 'fi3', type: 'prerrequisito' },
        { from: 'fi3', to: 'fi4', type: 'prerrequisito' },
        { from: 'fi5', to: 'fi6', type: 'prerrequisito' },
        { from: 'fi1', to: 'fi7', type: 'relacionado' },
        { from: 'fi7', to: 'fi8', type: 'prerrequisito' },
        { from: 'fi3', to: 'fi4', type: 'relacionado' }
      ]
    }, {
      id: 'ex-bio-11',
      name: 'Biolog\u00eda (2\u00ba Bach)',
      description: 'Bioqu\u00edmica, gen\u00e9tica, evoluci\u00f3n, microbiolog\u00eda e inmunolog\u00eda para 2\u00ba de Bachillerato de Ciencias',
      concepts: [
        { id: 'b1', name: 'Bioelementos y biomol\u00e9culas', description: 'gl\u00facidos, l\u00edpidos, prote\u00ednas, enzimas, \u00e1cidos nucleicos (ADN/ARN), vitaminas, agua y sales', weight: 6, tags: ['bioqu\u00edmica'] },
        { id: 'b2', name: 'Estructura y fisiolog\u00eda celular', description: 'c\u00e9lula procariota/eucariota, org\u00e1nulos, membrana, transporte, endocitosis/exocitosis, divisi\u00f3n celular (mitosis/meiosis)', weight: 7, tags: ['c\u00e9lula'] },
        { id: 'b3', name: 'Metabolismo celular', description: 'respiraci\u00f3n celular, gluc\u00f3lisis, ciclo de Krebs, cadena transportadora, fotos\u00edntesis (fases lum\u00ednica/oscura)', weight: 7, tags: ['metabolismo'] },
        { id: 'b4', name: 'Gen\u00e9tica molecular', description: 'replicaci\u00f3n ADN, transcripci\u00f3n, traducci\u00f3n, c\u00f3digo gen\u00e9tico, mutaciones, ingenier\u00eda gen\u00e9tica', weight: 8, tags: ['gen\u00e9tica'] },
        { id: 'b5', name: 'Gen\u00e9tica mendeliana', description: 'leyes de Mendel, cruces monoh\u00edbridos/dih\u00edbridos, herencia ligada al sexo, \u00e1rboles geneal\u00f3gicos', weight: 6, tags: ['gen\u00e9tica'] },
        { id: 'b6', name: 'Evoluci\u00f3n y biodiversidad', description: 'teor\u00edas evolutivas (Lamarck, Darwin), selecci\u00f3n natural, especiaci\u00f3n, filogenia, \u00e1rboles evolutivos', weight: 5, tags: ['evoluci\u00f3n'] },
        { id: 'b7', name: 'Microbiolog\u00eda', description: 'bacterias, virus, hongos, protozoos, ciclos de infecci\u00f3n, antibi\u00f3ticos, microbioma humano', weight: 5, tags: ['microbiolog\u00eda'] },
        { id: 'b8', name: 'Inmunolog\u00eda', description: 'defensas innatas y adaptativas, anticuerpos, vacunas, alergias, autoinmunidad, VIH/SIDA', weight: 6, tags: ['inmunolog\u00eda'] }
      ],
      relations: [
        { from: 'b1', to: 'b2', type: 'prerrequisito' },
        { from: 'b2', to: 'b3', type: 'prerrequisito' },
        { from: 'b2', to: 'b4', type: 'prerrequisito' },
        { from: 'b4', to: 'b5', type: 'prerrequisito' },
        { from: 'b5', to: 'b6', type: 'prerrequisito' },
        { from: 'b2', to: 'b7', type: 'relacionado' },
        { from: 'b7', to: 'b8', type: 'prerrequisito' }
      ]
    }, {
      id: 'ex-dam-12',
      name: 'DAM — Desarrollo de Aplicaciones Multiplataforma',
      description: 'Ciclo Formativo de Grado Superior: programaci\u00f3n de apps para escritorio, m\u00f3viles y entornos empresariales',
      concepts: [
        { id: 'dam1', name: 'Programaci\u00f3n', description: 'fundamentos de programaci\u00f3n, POO, estructuras de datos, algoritmos, Java como lenguaje principal', weight: 8, tags: ['1\u00ba'] },
        { id: 'dam2', name: 'Bases de Datos', description: 'modelo E-R, SQL, normalizaci\u00f3n, procedimientos almacenados, SGBD relacionales (MySQL, PostgreSQL)', weight: 7, tags: ['1\u00ba'] },
        { id: 'dam3', name: 'Sistemas Inform\u00e1ticos', description: 'hardware, SO Windows/Linux, virtualizaci\u00f3n, redes b\u00e1sicas, administraci\u00f3n del sistema', weight: 5, tags: ['1\u00ba'] },
        { id: 'dam4', name: 'Entornos de Desarrollo', description: 'IDEs, control de versiones (Git), debugging, testing, documentaci\u00f3n, UML', weight: 4, tags: ['1\u00ba'] },
        { id: 'dam5', name: 'Lenguajes de Marcas', description: 'HTML5, XML, JSON, XPath, XSLT, YAML, validaci\u00f3n con DTD y schema', weight: 4, tags: ['1\u00ba'] },
        { id: 'dam6', name: 'Acceso a Datos', description: 'JDBC, JPA/Hibernate, MongoDB, ficheros XML/JSON, conexiones, transacciones', weight: 7, tags: ['2\u00ba'] },
        { id: 'dam7', name: 'Desarrollo de Interfaces', description: 'JavaFX/Swing, MVC, eventos, gr\u00e1ficos, layouts, UX, internacionalizaci\u00f3n', weight: 6, tags: ['2\u00ba'] },
        { id: 'dam8', name: 'Programaci\u00f3n Multimedia y M\u00f3viles', description: 'Android (Kotlin/Java), actividades, sensores, c\u00e1mara, notificaciones, google maps', weight: 7, tags: ['2\u00ba'] },
        { id: 'dam9', name: 'Programaci\u00f3n de Servicios y Procesos', description: 'hilos, sockets, servicios REST, procesos, comunicaciones, Java NIO, patrones', weight: 6, tags: ['2\u00ba'] },
        { id: 'dam10', name: 'Sistemas de Gesti\u00f3n Empresarial', description: 'ERP, CRM, Odoo, personalizaci\u00f3n de software empresarial, an\u00e1lisis de requisitos', weight: 4, tags: ['2\u00ba'] }
      ],
      relations: [
        { from: 'dam1', to: 'dam6', type: 'prerrequisito' },
        { from: 'dam1', to: 'dam7', type: 'prerrequisito' },
        { from: 'dam1', to: 'dam9', type: 'prerrequisito' },
        { from: 'dam2', to: 'dam6', type: 'prerrequisito' },
        { from: 'dam1', to: 'dam8', type: 'prerrequisito' },
        { from: 'dam3', to: 'dam10', type: 'relacionado' },
        { from: 'dam4', to: 'dam7', type: 'relacionado' },
        { from: 'dam5', to: 'dam6', type: 'relacionado' }
      ]
    }, {
      id: 'ex-daw-13',
      name: 'DAW — Desarrollo de Aplicaciones Web',
      description: 'Ciclo Formativo de Grado Superior: desarrollo frontend, backend, despliegue y dise\u00f1o de aplicaciones web',
      concepts: [
        { id: 'daw1', name: 'Programaci\u00f3n', description: 'fundamentos, POO, estructuras de datos, algoritmos, Java como lenguaje base', weight: 8, tags: ['1\u00ba'] },
        { id: 'daw2', name: 'Bases de Datos', description: 'modelo E-R, SQL, normalizaci\u00f3n, procedimientos, MySQL/MariaDB, administraci\u00f3n', weight: 7, tags: ['1\u00ba'] },
        { id: 'daw3', name: 'Lenguajes de Marcas', description: 'HTML5, CSS3, XML, JSON, XPath, XSLT, SVG, validaci\u00f3n de esquemas', weight: 4, tags: ['1\u00ba'] },
        { id: 'daw4', name: 'Sistemas Inform\u00e1ticos', description: 'hardware, SO, virtualizaci\u00f3n, redes TCP/IP, administraci\u00f3n servidores Linux/Windows', weight: 5, tags: ['1\u00ba'] },
        { id: 'daw5', name: 'Entornos de Desarrollo', description: 'IDEs (VSCode, IntelliJ), Git, testing, depuraci\u00f3n, documentaci\u00f3n, UML', weight: 4, tags: ['1\u00ba'] },
        { id: 'daw6', name: 'Desarrollo Web en Entorno Cliente', description: 'JavaScript, DOM, AJAX, fetch, Vue.js/React, validaci\u00f3n formularios, APIs del navegador', weight: 7, tags: ['2\u00ba'] },
        { id: 'daw7', name: 'Desarrollo Web en Entorno Servidor', description: 'PHP, Laravel/Symfony, MVC, sesiones, cookies, PHP + SQL, APIs REST', weight: 7, tags: ['2\u00ba'] },
        { id: 'daw8', name: 'Despliegue de Aplicaciones Web', description: 'Apache/Nginx, Docker, hosting, dominios, certificados SSL, CI/CD, monitorizaci\u00f3n', weight: 6, tags: ['2\u00ba'] },
        { id: 'daw9', name: 'Dise\u00f1o de Interfaces Web', description: 'UX/UI, Figma, prototipado, accesibilidad (WCAG), responsive design, Tailwind/Bootstrap', weight: 5, tags: ['2\u00ba'] },
        { id: 'daw10', name: 'Empresa e Iniciativa Emprendedora', description: 'plan de empresa, marketing digital, facturaci\u00f3n, aut\u00f3nomos, propiedad intelectual', weight: 3, tags: ['2\u00ba'] }
      ],
      relations: [
        { from: 'daw1', to: 'daw6', type: 'prerrequisito' },
        { from: 'daw1', to: 'daw7', type: 'prerrequisito' },
        { from: 'daw2', to: 'daw7', type: 'prerrequisito' },
        { from: 'daw3', to: 'daw6', type: 'prerrequisito' },
        { from: 'daw3', to: 'daw9', type: 'prerrequisito' },
        { from: 'daw4', to: 'daw8', type: 'prerrequisito' },
        { from: 'daw6', to: 'daw9', type: 'relacionado' },
        { from: 'daw7', to: 'daw8', type: 'prerrequisito' }
      ]
    }, {
      id: 'ex-asir-14',
      name: 'ASIR — Administraci\u00f3n de Sistemas Inform\u00e1ticos en Red',
      description: 'Ciclo Formativo de Grado Superior: gesti\u00f3n de servidores, redes, seguridad y servicios cloud',
      concepts: [
        { id: 'as1', name: 'Fundamentos de Hardware', description: 'arquitectura de ordenadores, componentes, perif\u00e9ricos, ensamblaje, blade servers, racks', weight: 5, tags: ['1\u00ba'] },
        { id: 'as2', name: 'Sistemas Operativos Monopuesto y en Red', description: 'Windows Server, Linux (Ubuntu, CentOS), particionado, usuarios, permisos, scripting bash', weight: 7, tags: ['1\u00ba'] },
        { id: 'as3', name: 'Planificaci\u00f3n y Administraci\u00f3n de Redes', description: 'modelo OSI/TCP-IP, direccionamiento IP/VLSM, conmutaci\u00f3n, enrutamiento, VLANs, ACLs', weight: 7, tags: ['1\u00ba'] },
        { id: 'as4', name: 'Gesti\u00f3n de Bases de Datos', description: 'instalaci\u00f3n y administraci\u00f3n de SGBD (MySQL, PostgreSQL), backups, rendimiento, usuarios', weight: 5, tags: ['1\u00ba'] },
        { id: 'as5', name: 'Servicios de Red e Internet', description: 'DNS, DHCP, HTTP/Apache, correo (Postfix), FTP, proxy, LDAP, balanceo de carga', weight: 7, tags: ['2\u00ba'] },
        { id: 'as6', name: 'Implantaci\u00f3n de Aplicaciones Web', description: 'LAMP stack, WordPress, SSL/TLS, virtual hosts, contenedores Docker, orquestaci\u00f3n', weight: 6, tags: ['2\u00ba'] },
        { id: 'as7', name: 'Seguridad y Alta Disponibilidad', description: 'firewalls (iptables), IDS/IPS, VPN, RAID, copias de seguridad, clustering, disaster recovery', weight: 7, tags: ['2\u00ba'] },
        { id: 'as8', name: 'Cloud computing y virtualizaci\u00f3n', description: 'VMware, Proxmox, AWS/Azure b\u00e1sico, infraestructura como c\u00f3digo (Terraform), Kubernetes', weight: 6, tags: ['2\u00ba'] }
      ],
      relations: [
        { from: 'as1', to: 'as2', type: 'prerrequisito' },
        { from: 'as2', to: 'as3', type: 'prerrequisito' },
        { from: 'as2', to: 'as5', type: 'prerrequisito' },
        { from: 'as3', to: 'as5', type: 'prerrequisito' },
        { from: 'as4', to: 'as6', type: 'prerrequisito' },
        { from: 'as5', to: 'as7', type: 'prerrequisito' },
        { from: 'as3', to: 'as7', type: 'relacionado' },
        { from: 'as5', to: 'as8', type: 'prerrequisito' }
      ]
    }, {
      id: 'ex-smr-15',
      name: 'SMR — Sistemas Microinform\u00e1ticos y Redes',
      description: 'Ciclo Formativo de Grado Medio: montaje de equipos, redes locales, ofim\u00e1tica y soporte inform\u00e1tico',
      concepts: [
        { id: 'sm1', name: 'Montaje y Mantenimiento de Equipos', description: 'componentes internos, ensamblaje, BIOS/UEFI, mantenimiento preventivo, diagn\u00f3stico de aver\u00edas', weight: 6, tags: ['1\u00ba'] },
        { id: 'sm2', name: 'Sistemas Operativos Monopuesto', description: 'Windows 11, Linux (Ubuntu), instalaci\u00f3n, configuraci\u00f3n, usuarios, escritorio, archivos', weight: 5, tags: ['1\u00ba'] },
        { id: 'sm3', name: 'Redes Locales', description: 'cableado estructurado, switches, routers, direccionamiento IP b\u00e1sico, configuraci\u00f3n de red', weight: 6, tags: ['1\u00ba'] },
        { id: 'sm4', name: 'Aplicaciones Ofim\u00e1ticas', description: 'Word, Excel, Access, PowerPoint, Google Workspace, macros, plantillas, formatos', weight: 4, tags: ['1\u00ba'] },
        { id: 'sm5', name: 'Sistemas Operativos en Red', description: 'Windows Server, Linux Server, dominio, Active Directory, pol\u00edticas de grupo, permisos', weight: 6, tags: ['2\u00ba'] },
        { id: 'sm6', name: 'Aplicaciones Web', description: 'instalaci\u00f3n de CMS (WordPress), HTML/CSS b\u00e1sico, hosting, FTP, tiendas online', weight: 4, tags: ['2\u00ba'] },
        { id: 'sm7', name: 'Seguridad Inform\u00e1tica', description: 'antivirus, cortafuegos, contrase\u00f1as, cifrado, copias de seguridad, phishing, protecci\u00f3n de datos', weight: 5, tags: ['2\u00ba'] },
        { id: 'sm8', name: 'Servicios en Red', description: 'DHCP, DNS, web, correo, impresi\u00f3n en red, protocolos TCP/IP b\u00e1sicos, monitorizaci\u00f3n', weight: 5, tags: ['2\u00ba'] }
      ],
      relations: [
        { from: 'sm1', to: 'sm2', type: 'prerrequisito' },
        { from: 'sm2', to: 'sm5', type: 'prerrequisito' },
        { from: 'sm3', to: 'sm5', type: 'prerrequisito' },
        { from: 'sm3', to: 'sm8', type: 'prerrequisito' },
        { from: 'sm2', to: 'sm4', type: 'relacionado' },
        { from: 'sm5', to: 'sm6', type: 'prerrequisito' },
        { from: 'sm3', to: 'sm7', type: 'relacionado' }
      ]
    }];

    this.crossRelations = [
      { from: 'c2', to: 'm1', type: 'relacionado' },
      { from: 'c4', to: 'm5', type: 'relacionado' },
      { from: 'w4', to: 'c5', type: 'relacionado' },
      { from: 'w5', to: 'c8', type: 'profundiza' },
      { from: 'e5', to: 'w6', type: 'relacionado' },
      { from: 'h9', to: 'e6', type: 'relacionado' },
      { from: 'ma2', to: 'q3', type: 'relacionado' },
      { from: 'l4', to: 'h9', type: 'relacionado' },
      { from: 'f1', to: 'l5', type: 'relacionado' },
      { from: 'f6', to: 'e9', type: 'relacionado' },
      { from: 'ma2', to: 'fi1', type: 'prerrequisito' },
      { from: 'q5', to: 'b3', type: 'relacionado' },
      { from: 'q1', to: 'fi5', type: 'relacionado' },
      { from: 'b4', to: 'f7', type: 'relacionado' },
      { from: 'dam1', to: 'daw1', type: 'relacionado' },
      { from: 'dam5', to: 'daw3', type: 'relacionado' },
      { from: 'dam6', to: 'daw6', type: 'profundiza' },
      { from: 'as2', to: 'dam3', type: 'relacionado' },
      { from: 'sm3', to: 'as3', type: 'relacionado' },
      { from: 'dam1', to: 'c5', type: 'relacionado' },
      { from: 'daw7', to: 'w5', type: 'profundiza' }
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
    // Math II assessments
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[5].id, date: dates[0], results: { ma1: 70, ma2: 55, ma3: 30, ma4: 85, ma5: 75, ma6: 60, ma7: 80, ma8: 40 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[5].id, date: dates[2], results: { ma1: 80, ma2: 65, ma3: 45, ma4: 90, ma5: 85, ma6: 70, ma7: 85, ma8: 55 }, notes: {} });
    // Language assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[6].id, date: dates[1], results: { l1: 90, l2: 80, l3: 50, l4: 60, l5: 85, l6: 75, l7: 70, l8: 55, l9: 45, l10: 80 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[6].id, date: dates[2], results: { l1: 95, l2: 85, l3: 65, l4: 70, l5: 90, l6: 80, l7: 75, l8: 65, l9: 55, l10: 85 }, notes: {} });
    // Chemistry assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[7].id, date: dates[0], results: { q1: 80, q2: 65, q3: 40, q4: 55, q5: 35, q6: 50, q7: 30, q8: 75 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[7].id, date: dates[2], results: { q1: 85, q2: 75, q3: 55, q4: 65, q5: 50, q6: 60, q7: 45, q8: 80 }, notes: {} });
    // Philosophy assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[8].id, date: dates[2], results: { f1: 85, f2: 70, f3: 60, f4: 75, f5: 55, f6: 40, f7: 65, f8: 50 }, notes: {} });
    // Physics assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[9].id, date: dates[1], results: { fi1: 75, fi2: 60, fi3: 65, fi4: 40, fi5: 55, fi6: 30, fi7: 70, fi8: 80 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[9].id, date: dates[2], results: { fi1: 85, fi2: 70, fi3: 75, fi4: 55, fi5: 65, fi6: 45, fi7: 75, fi8: 85 }, notes: {} });
    // Biology assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[10].id, date: dates[1], results: { b1: 80, b2: 65, b3: 45, b4: 55, b5: 85, b6: 70, b7: 60, b8: 40 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[10].id, date: dates[2], results: { b1: 85, b2: 75, b3: 60, b4: 65, b5: 90, b6: 75, b7: 70, b8: 55 }, notes: {} });
    // DAM assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[11].id, date: dates[1], results: { dam1: 75, dam2: 60, dam3: 80, dam4: 85, dam5: 90, dam6: 40, dam7: 35, dam8: 25, dam9: 30, dam10: 50 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[11].id, date: dates[2], results: { dam1: 85, dam2: 70, dam3: 85, dam4: 90, dam5: 95, dam6: 55, dam7: 50, dam8: 40, dam9: 45, dam10: 60 }, notes: {} });
    // DAW assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[12].id, date: dates[1], results: { daw1: 80, daw2: 65, daw3: 90, daw4: 70, daw5: 85, daw6: 55, daw7: 40, daw8: 35, daw9: 75, daw10: 60 }, notes: {} });
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[12].id, date: dates[2], results: { daw1: 85, daw2: 75, daw3: 95, daw4: 80, daw5: 90, daw6: 65, daw7: 55, daw8: 50, daw9: 80, daw10: 65 }, notes: {} });
    // ASIR assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[13].id, date: dates[2], results: { as1: 80, as2: 70, as3: 55, as4: 65, as5: 40, as6: 50, as7: 35, as8: 30 }, notes: {} });
    // SMR assessment
    this.assessments.push({ id: crypto.randomUUID(), subjectId: subjects_[14].id, date: dates[2], results: { sm1: 85, sm2: 75, sm3: 60, sm4: 90, sm5: 50, sm6: 70, sm7: 55, sm8: 45 }, notes: {} });

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
