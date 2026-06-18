(function () {
  var T = {
    "ESO": {
      label: "ESO",
      description: "Educaci\u00F3n Secundaria Obligatoria (12-16 a\u00F1os)",
      emoji: "\uD83C\uDF93",
      subjects: [
        {
          key: "matematicas-12-eso",
          name: "Matem\u00E1ticas 1\u00BA-2\u00BA ESO",
          description: "N\u00FAmeros enteros, fracciones, decimales, proporcionalidad, geometr\u00EDa b\u00E1sica y estad\u00EDstica elemental",
          concepts: [
            { id: "c1", name: "N\u00FAmeros enteros", description: "Operaciones con positivos y negativos, valor absoluto, m\u00FAltiplos y divisores", weight: 4, tags: ["n\u00FAmeros"] },
            { id: "c2", name: "Fracciones y decimales", description: "Suma, resta, multiplicaci\u00F3n y divisi\u00F3n de fracciones, paso a decimal", weight: 5, tags: ["n\u00FAmeros"] },
            { id: "c3", name: "Potencia y ra\u00EDces", description: "Potencias de base entera, ra\u00EDz cuadrada, propiedades", weight: 4, tags: ["n\u00FAmeros"] },
            { id: "c4", name: "Proporcionalidad", description: "Regla de tres simple, porcentajes, repartos proporcionales", weight: 5, tags: ["proporcionalidad"] },
            { id: "c5", name: "Ecuaciones de primer grado", description: "Resoluci\u00F3n de ecuaciones sencillas, transposici\u00F3n de t\u00E9rminos", weight: 6, tags: ["\u00E1lgebra"] },
            { id: "c6", name: "Geometr\u00EDa del plano", description: "Per\u00EDmetros, \u00E1reas, teorema de Pit\u00E1goras", weight: 5, tags: ["geometr\u00EDa"] },
            { id: "c7", name: "Geometr\u00EDa del espacio", description: "Vol\u00FAmenes de cuerpos simples, \u00E1reas laterales", weight: 6, tags: ["geometr\u00EDa"] },
            { id: "c8", name: "Estad\u00EDstica b\u00E1sica", description: "Frecuencias, media, moda, mediana, gr\u00E1ficos de barras", weight: 3, tags: ["estad\u00EDstica"] },
            { id: "c9", name: "Probabilidad elemental", description: "Sucesos, probabilidad simple, ley de Laplace", weight: 4, tags: ["probabilidad"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c4", type: "prerrequisito" },
            { from: "c1", to: "c5", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c3", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "prerrequisito" }
          ]
        },
        {
          key: "matematicas-34-eso",
          name: "Matem\u00E1ticas 3\u00BA-4\u00BA ESO",
          description: "\u00C1lgebra avanzada, funciones, trigonometr\u00EDa, probabilidad y estad\u00EDstica",
          concepts: [
            { id: "c1", name: "Polinomios", description: "Operaciones con polinomios, factorizaci\u00F3n, identidades notables", weight: 5, tags: ["\u00E1lgebra"] },
            { id: "c2", name: "Ecuaciones de segundo grado", description: "F\u00F3rmula general, ecuaciones bicuadradas, sistemas", weight: 6, tags: ["\u00E1lgebra"] },
            { id: "c3", name: "Sistemas de ecuaciones", description: "M\u00E9todos de sustituci\u00F3n, igualaci\u00F3n, reducci\u00F3n y gr\u00E1fico", weight: 6, tags: ["\u00E1lgebra"] },
            { id: "c4", name: "Funciones y gr\u00E1ficas", description: "Estudio de funciones lineales, cuadr\u00E1ticas, dominio y recorrido", weight: 5, tags: ["funciones"] },
            { id: "c5", name: "Trigonometr\u00EDa", description: "Razones trigonom\u00E9tricas, resoluci\u00F3n de tri\u00E1ngulos", weight: 7, tags: ["trigonometr\u00EDa"] },
            { id: "c6", name: "Vectores y rectas", description: "Operaciones vectoriales, ecuaci\u00F3n de la recta", weight: 5, tags: ["geometr\u00EDa"] },
            { id: "c7", name: "Probabilidad compuesta", description: "Probabilidad condicionada, diagramas de \u00E1rbol, tablas de contingencia", weight: 6, tags: ["probabilidad"] },
            { id: "c8", name: "Estad\u00EDstica descriptiva", description: "Medidas de dispersi\u00F3n, cuartiles, diagramas de caja", weight: 4, tags: ["estad\u00EDstica"] },
            { id: "c9", name: "Sucesiones y progresiones", description: "Progresiones aritm\u00E9ticas y geom\u00E9tricas, t\u00E9rmino general", weight: 4, tags: ["\u00E1lgebra"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c4", type: "prerrequisito" },
            { from: "c6", to: "c5", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c1", to: "c9", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "relacionado" }
          ]
        },
        {
          key: "lengua-eso",
          name: "Lengua Espa\u00F1ola ESO",
          description: "Morfolog\u00EDa, sintaxis, ortograf\u00EDa, literatura y comentario de texto",
          concepts: [
            { id: "c1", name: "Categor\u00EDas gramaticales", description: "Sustantivo, adjetivo, verbo, adverbio, preposici\u00F3n, conjunci\u00F3n", weight: 4, tags: ["morfolog\u00EDa"] },
            { id: "c2", name: "Sintagmas", description: "Sintagma nominal, verbal, adjetival, adverbial y preposicional", weight: 5, tags: ["sintaxis"] },
            { id: "c3", name: "Oraci\u00F3n simple", description: "Sujeto y predicado, complementos verbales, tipos de oraci\u00F3n", weight: 6, tags: ["sintaxis"] },
            { id: "c4", name: "Oraci\u00F3n compuesta", description: "Coordinaci\u00F3n, subordinaci\u00F3n sustantiva, adjetiva y adverbial", weight: 8, tags: ["sintaxis"] },
            { id: "c5", name: "Ortograf\u00EDa", description: "Acentuaci\u00F3n, puntuaci\u00F3n, uso de b/v, g/j, ll/y", weight: 3, tags: ["ortograf\u00EDa"] },
            { id: "c6", name: "Texto narrativo y descriptivo", description: "Estructura, caracter\u00EDsticas, recursos literarios b\u00E1sicos", weight: 4, tags: ["literatura"] },
            { id: "c7", name: "Texto expositivo y argumentativo", description: "Estructura, tesis, argumentos, conectores textuales", weight: 5, tags: ["literatura"] },
            { id: "c8", name: "Literatura medieval y Renacimiento", description: "Mester de juglar\u00EDa, Garcilaso, La Celestina", weight: 6, tags: ["literatura"] },
            { id: "c9", name: "Barroco y Neoclasicismo", description: "Lope, Quevedo, G\u00F3ngora, Feijoo", weight: 5, tags: ["literatura"] },
            { id: "c10", name: "Literatura del siglo XIX", description: "Romanticismo, Realismo, Gald\u00F3s, Clar\u00EDn", weight: 6, tags: ["literatura"] },
            { id: "c11", name: "Comentario de texto", description: "An\u00E1lisis formal, tem\u00E1tico, cr\u00EDtico y conclusi\u00F3n", weight: 7, tags: ["comentario"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c5", to: "c3", type: "relacionado" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c7", to: "c11", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "prerrequisito" },
            { from: "c9", to: "c10", type: "prerrequisito" },
            { from: "c10", to: "c11", type: "prerrequisito" }
          ]
        },
        {
          key: "ingles-eso",
          name: "Ingl\u00E9s ESO (A1-B1)",
          description: "Gram\u00E1tica inglesa, vocabulario, reading, writing, listening y speaking para nivel A1 a B1",
          concepts: [
            { id: "c1", name: "Verb to be and have got", description: "Presente simple del verbo ser/estar y tener, formas afirmativa/negativa/interrogativa", weight: 3, tags: ["grammar"] },
            { id: "c2", name: "Present Simple vs Continuous", description: "Uso del presente simple y continuo, adverbios de frecuencia", weight: 4, tags: ["grammar"] },
            { id: "c3", name: "Past Simple and Continuous", description: "Pasado simple, verbos regulares e irregulares, pasado continuo", weight: 5, tags: ["grammar"] },
            { id: "c4", name: "Present Perfect", description: "Presente perfecto, for/since, ever/never, just/already/yet", weight: 6, tags: ["grammar"] },
            { id: "c5", name: "Future tenses", description: "Will, going to, presente continuo para futuro", weight: 5, tags: ["grammar"] },
            { id: "c6", name: "Conditionals", description: "Zero, first and second conditional, unless", weight: 7, tags: ["grammar"] },
            { id: "c7", name: "Passive voice", description: "Voz pasiva en presente, pasado y futuro", weight: 7, tags: ["grammar"] },
            { id: "c8", name: "Modals", description: "Can, must, should, have to, may, might", weight: 5, tags: ["grammar"] },
            { id: "c9", name: "Relative clauses", description: "Defining and non-defining relative clauses, who/which/that/whose", weight: 6, tags: ["grammar"] },
            { id: "c10", name: "Writing: essays and emails", description: "Estructura de emails formales e informales, opinion essay", weight: 5, tags: ["writing"] },
            { id: "c11", name: "Reported speech", description: "Estilo indirecto, cambios de tiempo y pronombres", weight: 8, tags: ["grammar"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "relacionado" },
            { from: "c4", to: "c7", type: "prerrequisito" },
            { from: "c2", to: "c8", type: "prerrequisito" },
            { from: "c3", to: "c9", type: "prerrequisito" },
            { from: "c6", to: "c11", type: "prerrequisito" },
            { from: "c10", to: "c4", type: "relacionado" }
          ]
        },
        {
          key: "biologia-eso",
          name: "Biolog\u00EDa y Geolog\u00EDa ESO",
          description: "La vida, los ecosistemas, el cuerpo humano, gen\u00E9tica b\u00E1sica y geolog\u00EDa",
          concepts: [
            { id: "c1", name: "La c\u00E9lula", description: "C\u00E9lula animal y vegetal, org\u00E1nulos, membrana y n\u00FAcleo", weight: 5, tags: ["biolog\u00EDa"] },
            { id: "c2", name: "Seres vivos y clasificaci\u00F3n", description: "Los cinco reinos, caracter\u00EDsticas, taxonom\u00EDa b\u00E1sica", weight: 4, tags: ["biolog\u00EDa"] },
            { id: "c3", name: "Ecosistemas", description: "Cadenas tr\u00F3ficas, h\u00E1bitats, relaciones intraespec\u00EDficas", weight: 5, tags: ["ecolog\u00EDa"] },
            { id: "c4", name: "Aparato digestivo y respiratorio", description: "\u00D3rganos, funciones, proceso digestivo, intercambio de gases", weight: 5, tags: ["cuerpo humano"] },
            { id: "c5", name: "Aparato circulatorio y excretor", description: "Coraz\u00F3n, vasos sangu\u00EDneos, ri\u00F1ones, funci\u00F3n excretora", weight: 5, tags: ["cuerpo humano"] },
            { id: "c6", name: "Sistema nervioso y endocrino", description: "Neuronas, sistema nervioso central, hormonas principales", weight: 6, tags: ["cuerpo humano"] },
            { id: "c7", name: "Reproducci\u00F3n humana", description: "Aparatos reproductores, ciclo menstrual, fecundaci\u00F3n", weight: 5, tags: ["cuerpo humano"] },
            { id: "c8", name: "Gen\u00E9tica b\u00E1sica", description: "ADN, genes, cromosomas, herencia mendeliana", weight: 7, tags: ["gen\u00E9tica"] },
            { id: "c9", name: "Minerales y rocas", description: "Tipos de rocas, formaci\u00F3n, minerales, ciclo de las rocas", weight: 4, tags: ["geolog\u00EDa"] },
            { id: "c10", name: "La Tierra y el universo", description: "Estructura interna, placas tect\u00F3nicas, sistema solar", weight: 4, tags: ["geolog\u00EDa"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c1", to: "c8", type: "prerrequisito" },
            { from: "c9", to: "c10", type: "prerrequisito" },
            { from: "c8", to: "c6", type: "relacionado" }
          ]
        },
        {
          key: "geografia-historia-eso",
          name: "Geograf\u00EDa e Historia ESO",
          description: "Geograf\u00EDa f\u00EDsica y pol\u00EDtica, Prehistoria, Edad Antigua, Media, Moderna y Contempor\u00E1nea",
          concepts: [
            { id: "c1", name: "Geograf\u00EDa f\u00EDsica mundial", description: "Continentes, oc\u00E9anos, relieves, r\u00EDos y climas del mundo", weight: 4, tags: ["geograf\u00EDa"] },
            { id: "c2", name: "Geograf\u00EDa de Espa\u00F1a", description: "Relieve, r\u00EDos, climas, comunidades aut\u00F3nomas y provincias", weight: 4, tags: ["geograf\u00EDa"] },
            { id: "c3", name: "Prehistoria y primeras civilizaciones", description: "Paleol\u00EDtico, Neol\u00EDtico, Mesopotamia, Egipto", weight: 5, tags: ["historia"] },
            { id: "c4", name: "Grecia", description: "Polis, democracia ateniense, guerras m\u00E9dicas, Alejandro Magno", weight: 5, tags: ["historia"] },
            { id: "c5", name: "Roma", description: "Rep\u00FAblica, Imperio, conquistas, crisis y ca\u00EDda", weight: 5, tags: ["historia"] },
            { id: "c6", name: "Edad Media", description: "Feudalismo, Castilla, Al-\u00C1ndalus, cruzadas", weight: 6, tags: ["historia"] },
            { id: "c7", name: "Edad Moderna", description: "Descubrimiento de Am\u00E9rica, monarqu\u00EDa hisp\u00E1nica, Reforma y Contrarreforma", weight: 6, tags: ["historia"] },
            { id: "c8", name: "Edad Contempor\u00E1nea I", description: "Revoluci\u00F3n Francesa, Revoluci\u00F3n Industrial, Restauraci\u00F3n", weight: 6, tags: ["historia"] },
            { id: "c9", name: "Edad Contempor\u00E1nea II", description: "Guerras Mundiales, Franquismo, Transici\u00F3n, UE", weight: 7, tags: ["historia"] },
            { id: "c10", name: "Poblaci\u00F3n y urbanizaci\u00F3n", description: "Estructura de poblaci\u00F3n, migraciones, crecimiento urbano", weight: 4, tags: ["geograf\u00EDa"] }
          ],
          relations: [
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "prerrequisito" },
            { from: "c1", to: "c10", type: "prerrequisito" },
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c10", type: "relacionado" }
          ]
        },
        {
          key: "tecnologia-eso",
          name: "Tecnología y Digitalización ESO",
          description: "Proceso tecnológico, materiales, electricidad, programación básica, robótica y competencia digital",
          concepts: [
            { id: "c1", name: "Proceso de resolución de problemas", description: "Fases del proyecto técnico, documentación, planificación, evaluación", weight: 4, tags: ["método"] },
            { id: "c2", name: "Materiales técnicos", description: "Madera, metales, plásticos, cerámicas, propiedades y aplicaciones", weight: 3, tags: ["materiales"] },
            { id: "c3", name: "Electricidad y electrónica básica", description: "Circuito eléctrico, ley de Ohm, componentes, protoboard", weight: 5, tags: ["electricidad"] },
            { id: "c4", name: "Estructuras y mecanismos", description: "Tipos de estructuras, esfuerzos, máquinas simples, transmisión", weight: 5, tags: ["mecánica"] },
            { id: "c5", name: "Programación por bloques", description: "Scratch, algoritmos, secuencias, bucles, condicionales, variables", weight: 5, tags: ["programación"] },
            { id: "c6", name: "Robótica educativa", description: "Sensores, actuadores, placas programables (Arduino/Micro:bit)", weight: 6, tags: ["robótica"] },
            { id: "c7", name: "Ofimática y herramientas digitales", description: "Procesador de texto, hoja de cálculo, presentaciones, Drive", weight: 3, tags: ["digital"] },
            { id: "c8", name: "Seguridad y ciudadanía digital", description: "Contraseñas, privacidad, huella digital, netiqueta, ciberacoso", weight: 4, tags: ["digital"] },
            { id: "c9", name: "Pensamiento computacional", description: "Descomposición, abstracción, reconocimiento de patrones, diseño de algoritmos", weight: 5, tags: ["programación"] },
            { id: "c10", name: "Diseño e impresión 3D", description: "Modelado 3D básico, Tinkercad, formatos STL, impresión por capas", weight: 5, tags: ["diseño"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c4", type: "prerrequisito" },
            { from: "c1", to: "c7", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c5", to: "c9", type: "prerrequisito" },
            { from: "c5", to: "c10", type: "relacionado" },
            { from: "c8", to: "c7", type: "relacionado" },
            { from: "c3", to: "c6", type: "relacionado" }
          ]
        }
      ]
    },

    "Bachillerato": {
      label: "Bachillerato",
      description: "Bachillerato (16-18 a\u00F1os)",
      emoji: "\uD83C\uDFEB",
      subjects: [
        {
          key: "matematicas-i",
          name: "Matem\u00E1ticas I (Ciencias)",
          description: "\u00C1lculo, \u00E1lgebra lineal, trigonometr\u00EDa y geometr\u00EDa anal\u00EDtica para 1\u00BA de Bachillerato de Ciencias",
          concepts: [
            { id: "c1", name: "Matrices y determinantes", description: "Operaciones con matrices, determinantes 2x2 y 3x3, rango", weight: 6, tags: ["\u00E1lgebra"] },
            { id: "c2", name: "Sistemas de ecuaciones lineales", description: "M\u00E9todo de Gauss, discusi\u00F3n de sistemas, regla de Cramer", weight: 7, tags: ["\u00E1lgebra"] },
            { id: "c3", name: "N\u00FAmeros reales y complejos", description: "Propiedades de reales, operaciones con complejos, forma bin\u00F3mica y polar", weight: 5, tags: ["\u00E1lgebra"] },
            { id: "c4", name: "Funciones y l\u00EDmites", description: "L\u00EDmites, continuidad, as\u00EDntotas, teorema de Bolzano", weight: 7, tags: ["an\u00E1lisis"] },
            { id: "c5", name: "Derivadas", description: "Reglas de derivaci\u00F3n, recta tangente, optimizaci\u00F3n", weight: 8, tags: ["an\u00E1lisis"] },
            { id: "c6", name: "Trigonometr\u00EDa", description: "Razones, identidades, ecuaciones trigonom\u00E9tricas", weight: 6, tags: ["trigonometr\u00EDa"] },
            { id: "c7", name: "Geometr\u00EDa anal\u00EDtica", description: "Vectores, producto escalar/vectorial, rectas y planos", weight: 7, tags: ["geometr\u00EDa"] },
            { id: "c8", name: "Probabilidad", description: "Probabilidad condicionada, teorema de Bayes, independencia", weight: 6, tags: ["probabilidad"] },
            { id: "c9", name: "Estad\u00EDstica bidimensional", description: "Correlaci\u00F3n, regresi\u00F3n lineal, coeficiente de correlaci\u00F3n", weight: 5, tags: ["estad\u00EDstica"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "prerrequisito" },
            { from: "c5", to: "c7", type: "relacionado" }
          ]
        },
        {
          key: "matematicas-ccss",
          name: "Matem\u00E1ticas CCSS",
          description: "Matem\u00E1ticas aplicadas a las Ciencias Sociales para 1\u00BA-2\u00BA de Bachillerato",
          concepts: [
            { id: "c1", name: "\u00C1lculo de derivadas", description: "Derivadas de funciones polin\u00F3micas, racionales y exponenciales", weight: 6, tags: ["an\u00E1lisis"] },
            { id: "c2", name: "Optimizaci\u00F3n", description: "M\u00E1ximos y m\u00EDnimos, problemas de aplicaci\u00F3n econ\u00F3mica", weight: 7, tags: ["an\u00E1lisis"] },
            { id: "c3", name: "Integrales", description: "Integral definida, \u00E1rea bajo la curva, regla de Barrow", weight: 7, tags: ["an\u00E1lisis"] },
            { id: "c4", name: "Matrices", description: "Operaciones, matrices inversa, aplicaciones a problemas sociales", weight: 5, tags: ["\u00E1lgebra"] },
            { id: "c5", name: "Programaci\u00F3n lineal", description: "Inecuaciones, regi\u00F3n factible, optimizaci\u00F3n lineal", weight: 6, tags: ["\u00E1lgebra"] },
            { id: "c6", name: "Probabilidad y distribuciones", description: "Distribuci\u00F3n binomial, normal, teorema central del l\u00EDmite", weight: 7, tags: ["probabilidad"] },
            { id: "c7", name: "Muestreo e inferencia", description: "Intervalos de confianza, contraste de hip\u00F3tesis", weight: 8, tags: ["estad\u00EDstica"] },
            { id: "c8", name: "Series temporales", description: "N\u00FAmeros \u00EDndice, tasas, tendencias y estacionalidad", weight: 5, tags: ["estad\u00EDstica"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c1", to: "c6", type: "relacionado" }
          ]
        },
        {
          key: "fisica",
          name: "F\u00EDsica 2\u00BA Bachillerato",
          description: "Mec\u00E1nica cl\u00E1sica, gravitaci\u00F3n, electromagnetismo, ondas y \u00F3ptica",
          concepts: [
            { id: "c1", name: "Cinem\u00E1tica", description: "MRU, MRUA, tiro parab\u00F3lico, MCU, movimiento arm\u00F3nico simple", weight: 5, tags: ["mec\u00E1nica"] },
            { id: "c2", name: "Din\u00E1mica", description: "Leyes de Newton, fuerzas, momento lineal, impulso", weight: 6, tags: ["mec\u00E1nica"] },
            { id: "c3", name: "Trabajo y energ\u00EDa", description: "Energ\u00EDa cin\u00E9tica/potencial, teorema de conservaci\u00F3n", weight: 6, tags: ["mec\u00E1nica"] },
            { id: "c4", name: "Gravitaci\u00F3n universal", description: "Ley de gravitaci\u00F3n, campo gravitatorio, \u00F3rbitas", weight: 7, tags: ["gravitaci\u00F3n"] },
            { id: "c5", name: "Campo el\u00E9ctrico", description: "Ley de Coulomb, campo el\u00E9ctrico, potencial, teorema de Gauss", weight: 8, tags: ["electromagnetismo"] },
            { id: "c6", name: "Campo magn\u00E9tico", description: "Fuerza de Lorentz, campo creado por corrientes, inducci\u00F3n", weight: 8, tags: ["electromagnetismo"] },
            { id: "c7", name: "Ondas", description: "Propiedades, ecuaci\u00F3n de onda, sonido, efecto Doppler", weight: 6, tags: ["ondas"] },
            { id: "c8", name: "\u00D3ptica geom\u00E9trica", description: "Reflexi\u00F3n, refracci\u00F3n, lentes, espejos, \u00F3ptica del ojo", weight: 6, tags: ["ondas"] },
            { id: "c9", name: "F\u00EDsica nuclear", description: "Radiactividad, desintegraciones, fisión y fusi\u00F3n nuclear", weight: 7, tags: ["nuclear"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "prerrequisito" },
            { from: "c1", to: "c7", type: "prerrequisito" },
            { from: "c3", to: "c5", type: "relacionado" }
          ]
        },
        {
          key: "quimica",
          name: "Qu\u00EDmica 2\u00BA Bachillerato",
          description: "Estructura at\u00F3mica, enlace, termoqu\u00EDmica, cin\u00E9tica, equilibrio y reacciones org\u00E1nicas",
          concepts: [
            { id: "c1", name: "Estructura at\u00F3mica", description: "Modelos at\u00F3micos, n\u00FAmeros cu\u00E1nticos, configuraciones electr\u00F3nicas", weight: 5, tags: ["atomo"] },
            { id: "c2", name: "Enlace qu\u00EDmico", description: "Enlace i\u00F3nico, covalente, met\u00E1lico, hibridaci\u00F3n", weight: 6, tags: ["enlace"] },
            { id: "c3", name: "Termoqu\u00EDmica", description: "Entalp\u00EDa, ley de Hess, energ\u00EDa libre de Gibbs", weight: 7, tags: ["termodin\u00E1mica"] },
            { id: "c4", name: "Cin\u00E9tica qu\u00EDmica", description: "Velocidad de reacci\u00F3n, orden de reacci\u00F3n, catalizadores", weight: 6, tags: ["cin\u00E9tica"] },
            { id: "c5", name: "Equilibrio qu\u00EDmico", description: "Constante de equilibrio, principio de Le Ch\u00E2telier, pH", weight: 8, tags: ["equilibrio"] },
            { id: "c6", name: "\u00C1cido-base", description: "Teor\u00EDas \u00E1cido-base, pH, valoraciones, indicadores", weight: 7, tags: ["equilibrio"] },
            { id: "c7", name: "Redox", description: "Oxidaci\u00F3n-reducci\u00F3n, ajuste redox, pilas galv\u00E1nicas", weight: 7, tags: ["redox"] },
            { id: "c8", name: "Qu\u00EDmica org\u00E1nica", description: "Grupos funcionales, nomenclatura, reacciones org\u00E1nicas", weight: 7, tags: ["org\u00E1nica"] },
            { id: "c9", name: "Pol\u00EDmeros", description: "Tipos de pol\u00EDmeros, reacciones de polimerizaci\u00F3n, aplicaciones", weight: 5, tags: ["org\u00E1nica"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c5", to: "c7", type: "prerrequisito" },
            { from: "c2", to: "c8", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "prerrequisito" }
          ]
        },
        {
          key: "biologia-bach",
          name: "Biolog\u00EDa 2\u00BA Bachillerato",
          description: "Bioqu\u00EDmica, gen\u00E9tica molecular, microbiolog\u00EDa, inmunolog\u00EDa y evoluci\u00F3n",
          concepts: [
            { id: "c1", name: "Biomol\u00E9culas inorg\u00E1nicas", description: "Agua, sales minerales, iones", weight: 3, tags: ["bioqu\u00EDmica"] },
            { id: "c2", name: "Gl\u00FAcidos y l\u00EDpidos", description: "Monosac\u00E1ridos, disac\u00E1ridos, polisac\u00E1ridos, \u00E1cidos grasos", weight: 5, tags: ["bioqu\u00EDmica"] },
            { id: "c3", name: "Prote\u00EDnas y enzimas", description: "Amino\u00E1cidos, estructura proteica, funci\u00F3n enzim\u00E1tica, cin\u00E9tica", weight: 6, tags: ["bioqu\u00EDmica"] },
            { id: "c4", name: "\u00C1cidos nucleicos", description: "ADN, ARN, replicaci\u00F3n, transcripci\u00F3n, traducci\u00F3n", weight: 8, tags: ["gen\u00E9tica"] },
            { id: "c5", name: "Gen\u00E9tica molecular", description: "C\u00F3digo gen\u00E9tico, mutaciones, ingenier\u00EDa gen\u00E9tica, PCR", weight: 8, tags: ["gen\u00E9tica"] },
            { id: "c6", name: "Microbiolog\u00EDa", description: "Bacterias, virus, hongos, cultivos microbianos", weight: 6, tags: ["microbiolog\u00EDa"] },
            { id: "c7", name: "Inmunolog\u00EDa", description: "Sistema inmune, anticuerpos, vacunas, alergias, SIDA", weight: 7, tags: ["inmunolog\u00EDa"] },
            { id: "c8", name: "Evoluci\u00F3n", description: "Teor\u00EDas evolutivas, selecci\u00F3n natural, especiaci\u00F3n", weight: 6, tags: ["evoluci\u00F3n"] },
            { id: "c9", name: "Ecolog\u00EDa", description: "Ecosistemas, ciclos biogeoqu\u00EDmicos, din\u00E1mica de poblaciones", weight: 5, tags: ["ecolog\u00EDa"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "relacionado" },
            { from: "c8", to: "c9", type: "relacionado" }
          ]
        },
        {
          key: "lengua-bach",
          name: "Lengua y Literatura 2\u00BA Bachillerato",
          description: "Sintaxis avanzada, literatura del siglo XX, comentario de texto cr\u00EDtico y morfolog\u00EDa",
          concepts: [
            { id: "c1", name: "Morfolog\u00EDa avanzada", description: "Formaci\u00F3n de palabras, prefijos, sufijos, composici\u00F3n", weight: 4, tags: ["morfolog\u00EDa"] },
            { id: "c2", name: "Sintaxis compleja", description: "Oraciones subordinadas avanzadas, an\u00E1lisis sint\u00E1ctico completo", weight: 7, tags: ["sintaxis"] },
            { id: "c3", name: "Sem\u00E1ntica y l\u00E9xico", description: "Significado, relaciones sem\u00E1nticas, campos l\u00E9xicos", weight: 5, tags: ["sem\u00E1ntica"] },
            { id: "c4", name: "Modernismo y 98", description: "Rub\u00E9n Dar\u00EDo, Unamuno, Machado, Azor\u00EDn", weight: 6, tags: ["literatura"] },
            { id: "c5", name: "Novecentismo y 27", description: "Ortega y Gasset, Juan Ram\u00F3n Jim\u00E9nez, Generaci\u00F3n del 27", weight: 7, tags: ["literatura"] },
            { id: "c6", name: "Literatura de posguerra", description: "Cela, Laforet, literatura social, medio siglo", weight: 6, tags: ["literatura"] },
            { id: "c7", name: "Literatura actual", description: "Narrativa \u00FAltimos 40 a\u00F1os, tendencias po\u00E9ticas actuales", weight: 5, tags: ["literatura"] },
            { id: "c8", name: "Comentario de texto cr\u00EDtico", description: "An\u00E1lisis formal, tem\u00E1tico, contexto y valoraci\u00F3n cr\u00EDtica", weight: 8, tags: ["comentario"] },
            { id: "c9", name: "Historia de la lengua", description: "Or\u00EDgenes del castellano, evoluci\u00F3n fon\u00E9tica, cambios sem\u00E1nticos", weight: 6, tags: ["lengua"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c3", to: "c2", type: "relacionado" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "prerrequisito" },
            { from: "c9", to: "c1", type: "relacionado" }
          ]
        },
        {
          key: "historia-espana",
          name: "Historia de Espa\u00F1a 2\u00BA Bachillerato",
          description: "De la Prehistoria a la democracia, con \u00E9nfasis en los siglos XIX y XX",
          concepts: [
            { id: "c1", name: "Prehistoria y Romanizaci\u00F3n", description: "Pueblos prerromanos, conquista romana, legado cultural", weight: 4, tags: ["antigua"] },
            { id: "c2", name: "Al-\u00C1ndalus y Reconquista", description: "Invasi\u00F3n musulmana, califato, reinos cristianos, convivencia", weight: 6, tags: ["medieval"] },
            { id: "c3", name: "Monarqu\u00EDa Hisp\u00E1nica", description: "RRCC, Imperio, Austrias, siglo de oro", weight: 6, tags: ["moderna"] },
            { id: "c4", name: "Crisis del Antiguo R\u00E9gimen", description: "Guerra Independencia, Cortes de C\u00E1diz, Fernando VII", weight: 6, tags: ["contempor\u00E1nea"] },
            { id: "c5", name: "Construcci\u00F3n del Estado liberal", description: "Isabel II, Sexenio Revolucionario, Restauraci\u00F3n", weight: 7, tags: ["contempor\u00E1nea"] },
            { id: "c6", name: "II Rep\u00FAblica y Guerra Civil", description: "Reformas republicanas, golpe de Estado, guerra, consecuencias", weight: 8, tags: ["contempor\u00E1nea"] },
            { id: "c7", name: "Franquismo", description: "Dictadura, autarqu\u00EDa, desarrollismo, represi\u00F3n", weight: 7, tags: ["contempor\u00E1nea"] },
            { id: "c8", name: "Transici\u00F3n y Democracia", description: "Constituci\u00F3n 1978, gobiernos democr\u00E1ticos, UE, ETA", weight: 7, tags: ["contempor\u00E1nea"] },
            { id: "c9", name: "Historia econ\u00F3mica y social", description: "Industrializaci\u00F3n, cambios sociales, feminismo, migraciones", weight: 5, tags: ["contempor\u00E1nea"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "prerrequisito" },
            { from: "c9", to: "c5", type: "relacionado" },
            { from: "c9", to: "c6", type: "relacionado" }
          ]
        },
        {
          key: "economia-bach",
          name: "Econom\u00EDa 1\u00BA Bachillerato",
          description: "Microeconom\u00EDa, macroeconom\u00EDa, sistema financiero y pol\u00EDtica econ\u00F3mica",
          concepts: [
            { id: "c1", name: "Conceptos b\u00E1sicos de econom\u00EDa", description: "Escasez, coste de oportunidad, agentes econ\u00F3micos, factores productivos", weight: 3, tags: ["fundamentos"] },
            { id: "c2", name: "Oferta y demanda", description: "Ley de oferta y demanda, equilibrio de mercado, elasticidad", weight: 6, tags: ["microeconom\u00EDa"] },
            { id: "c3", name: "Producci\u00F3n y costes", description: "Funci\u00F3n de producci\u00F3n, costes fijos/variables, punto muerto", weight: 5, tags: ["microeconom\u00EDa"] },
            { id: "c4", name: "Estructuras de mercado", description: "Competencia perfecta, monopolio, oligopolio, competencia monopol\u00EDstica", weight: 6, tags: ["microeconom\u00EDa"] },
            { id: "c5", name: "Macromagnitudes", description: "PIB, inflaci\u00F3n, desempleo, balanza de pagos", weight: 6, tags: ["macroeconom\u00EDa"] },
            { id: "c6", name: "Sistema financiero", description: "Bancos, tipos de inter\u00E9s, bolsa, productos financieros", weight: 5, tags: ["finanzas"] },
            { id: "c7", name: "Pol\u00EDtica fiscal y monetaria", description: "Presupuestos, impuestos, BCE, pol\u00EDtica monetaria \u00FAnica", weight: 7, tags: ["macroeconom\u00EDa"] },
            { id: "c8", name: "Comercio internacional", description: "Ventaja comparativa, proteccionismo, UE, globalizaci\u00F3n", weight: 6, tags: ["internacional"] },
            { id: "c9", name: "Desarrollo sostenible", description: "Crecimiento econ\u00F3mico, medio ambiente, ODS, econom\u00EDa circular", weight: 4, tags: ["actualidad"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c1", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c7", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c2", to: "c5", type: "relacionado" }
          ]
        },
        {
          key: "dibujo-bach",
          name: "Dibujo Técnico (Bachillerato)",
          description: "Geometría plana, sistemas de representación, normalización y diseño asistido por ordenador",
          concepts: [
            { id: "c1", name: "Trazados fundamentales", description: "Mediatriz, bisectriz, arco capaz, proporcionalidad, escala", weight: 4, tags: ["geometría"] },
            { id: "c2", name: "Polígonos", description: "Triángulos, cuadriláteros, polígonos regulares, construcciones", weight: 5, tags: ["geometría"] },
            { id: "c3", name: "Transformaciones geométricas", description: "Traslación, giro, simetría, homotecia, semejanza", weight: 5, tags: ["geometría"] },
            { id: "c4", name: "Tangencias y enlaces", description: "Rectas tangentes, circunferencias tangentes, enlaces", weight: 6, tags: ["geometría"] },
            { id: "c5", name: "Curvas cónicas", description: "Elipse, hipérbola, parábola, definición y trazado", weight: 7, tags: ["curvas"] },
            { id: "c6", name: "Sistema diédrico", description: "Punto, recta, plano, intersecciones, verdadera magnitud", weight: 8, tags: ["diedrico"] },
            { id: "c7", name: "Sistema axonométrico", description: "Perspectiva isométrica y caballera, coeficientes de reducción", weight: 7, tags: ["axonometrico"] },
            { id: "c8", name: "Perspectiva cónica", description: "Cónica frontal y oblicua, punto de fuga, líneas de horizonte", weight: 8, tags: ["perspectiva"] },
            { id: "c9", name: "Normalización y acotación", description: "Vistas normalizadas, cortes, secciones, acotación según normas", weight: 6, tags: ["normalización"] },
            { id: "c10", name: "CAD / Diseño asistido", description: "AutoCAD básico, capas, bloques, cotas, impresión a escala", weight: 5, tags: ["CAD"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "prerrequisito" },
            { from: "c1", to: "c9", type: "prerrequisito" },
            { from: "c9", to: "c10", type: "prerrequisito" },
            { from: "c6", to: "c8", type: "relacionado" }
          ]
        }
      ]
    },

    "FP Inform\u00E1tica": {
      label: "FP Inform\u00E1tica",
      description: "Ciclos formativos de Inform\u00E1tica (SMX, ASIR, DAW, DAM)",
      emoji: "\uD83D\uDCBB",
      subjects: [
        {
          key: "programacion",
          name: "Programaci\u00F3n (1\u00BA DAW/DAM)",
          description: "Fundamentos de programaci\u00F3n, algoritmos, estructuras de datos y POO con Java",
          concepts: [
            { id: "c1", name: "Variables y tipos de datos", description: "Tipos primitivos, declaraci\u00F3n, \u00E1mbito de variables, constantes", weight: 3, tags: ["b\u00E1sicos"] },
            { id: "c2", name: "Estructuras de control", description: "if/else, switch, operadores l\u00F3gicos y relacionales", weight: 4, tags: ["b\u00E1sicos"] },
            { id: "c3", name: "Bucles", description: "for, while, do-while, bucles anidados, break/continue", weight: 5, tags: ["b\u00E1sicos"] },
            { id: "c4", name: "Arrays y cadenas", description: "Arrays unidimensionales y multidimensionales, String, StringBuilder", weight: 5, tags: ["estructuras"] },
            { id: "c5", name: "Funciones y m\u00E9todos", description: "Declaraci\u00F3n, par\u00E1metros, retorno, sobrecarga, recursividad", weight: 6, tags: ["programaci\u00F3n"] },
            { id: "c6", name: "Programaci\u00F3n orientada a objetos", description: "Clases, objetos, atributos, m\u00E9todos, encapsulaci\u00F3n", weight: 7, tags: ["POO"] },
            { id: "c7", name: "Herencia y polimorfismo", description: "Herencia, super, interfaces, clases abstractas, polimorfismo", weight: 8, tags: ["POO"] },
            { id: "c8", name: "Colecciones", description: "ArrayList, HashMap, HashSet, Iterator, gen\u00E9ricos", weight: 7, tags: ["estructuras"] },
            { id: "c9", name: "Ficheros y excepciones", description: "Lectura/escritura de ficheros, try/catch, try-with-resources", weight: 6, tags: ["entrada/salida"] },
            { id: "c10", name: "Bases de datos con JDBC", description: "Conexi\u00F3n, consultas, PreparedStatement, transacciones", weight: 8, tags: ["BBDD"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "prerrequisito" },
            { from: "c7", to: "c9", type: "prerrequisito" },
            { from: "c10", to: "c9", type: "relacionado" }
          ]
        },
        {
          key: "bases-datos",
          name: "Bases de Datos (1\u00BA DAW/DAM)",
          description: "Dise\u00F1o conceptual, modelo relacional, SQL, normalizaci\u00F3n y administraci\u00F3n",
          concepts: [
            { id: "c1", name: "Modelo entidad-relaci\u00F3n", description: "Entidades, atributos, relaciones, cardinalidad, claves", weight: 5, tags: ["dise\u00F1o"] },
            { id: "c2", name: "Modelo relacional", description: "Tablas, claves primarias/for\u00E1neas, integridad referencial", weight: 5, tags: ["dise\u00F1o"] },
            { id: "c3", name: "Normalizaci\u00F3n", description: "1FN, 2FN, 3FN, dependencias funcionales", weight: 7, tags: ["dise\u00F1o"] },
            { id: "c4", name: "SQL: DDL", description: "CREATE, ALTER, DROP, restricciones, \u00EDndices", weight: 5, tags: ["SQL"] },
            { id: "c5", name: "SQL: DML", description: "SELECT, INSERT, UPDATE, DELETE, WHERE, ORDER BY", weight: 5, tags: ["SQL"] },
            { id: "c6", name: "Joins y subconsultas", description: "INNER/LEFT/RIGHT JOIN, subconsultas correlacionadas", weight: 7, tags: ["SQL"] },
            { id: "c7", name: "Funciones y agregaci\u00F3n", description: "COUNT, SUM, AVG, GROUP BY, HAVING, funciones de fecha/cadena", weight: 6, tags: ["SQL"] },
            { id: "c8", name: "Vistas y procedimientos", description: "CREATE VIEW, stored procedures, funciones, triggers", weight: 8, tags: ["SQL"] },
            { id: "c9", name: "Transacciones y concurrencia", description: "COMMIT, ROLLBACK, niveles de aislamiento, bloqueos", weight: 7, tags: ["admin"] },
            { id: "c10", name: "NoSQL", description: "MongoDB, documentos, colecciones, diferencias con SQL", weight: 6, tags: ["NoSQL"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c5", to: "c7", type: "prerrequisito" },
            { from: "c6", to: "c8", type: "prerrequisito" },
            { from: "c5", to: "c9", type: "prerrequisito" },
            { from: "c10", to: "c6", type: "relacionado" }
          ]
        },
        {
          key: "lenguajes-marcas",
          name: "Lenguajes de Marcas (1\u00BA)",
          description: "HTML5, CSS3, XML, XPath, XSLT, JSON y sistemas de gesti\u00F3n de informaci\u00F3n",
          concepts: [
            { id: "c1", name: "HTML5", description: "Estructura, etiquetas sem\u00E1nticas, formularios, multimedia, accesibilidad", weight: 4, tags: ["HTML"] },
            { id: "c2", name: "CSS3", description: "Selectores, modelo de caja, flexbox, grid, responsive design", weight: 5, tags: ["CSS"] },
            { id: "c3", name: "XML", description: "Estructura, sintaxis bien formada, DTD, namespaces", weight: 5, tags: ["XML"] },
            { id: "c4", name: "XPath", description: "Expresiones de ruta, predicados, ejes, funciones", weight: 6, tags: ["XML"] },
            { id: "c5", name: "XSLT", description: "Transformaciones, templates, copia, ordenaci\u00F3n", weight: 7, tags: ["XML"] },
            { id: "c6", name: "JSON", description: "Sintaxis, arrays, objetos, anidamiento, validaci\u00F3n", weight: 4, tags: ["JSON"] },
            { id: "c7", name: "Sindicaci\u00F3n RSS", description: "Estructura de canales, items, lectura de feeds", weight: 3, tags: ["XML"] },
            { id: "c8", name: "Sistemas de gesti\u00F3n de contenidos", description: "WordPress, Joomla, estructura de plugins y temas", weight: 4, tags: ["CMS"] },
            { id: "c9", name: "APIs REST", description: "HTTP methods, JSON como formato, consumo de APIs", weight: 6, tags: ["JSON"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c1", to: "c6", type: "relacionado" },
            { from: "c1", to: "c7", type: "prerrequisito" },
            { from: "c8", to: "c7", type: "relacionado" },
            { from: "c6", to: "c9", type: "prerrequisito" }
          ]
        },
        {
          key: "entornos-desarrollo",
          name: "Entornos de Desarrollo (1\u00BA)",
          description: "IDEs, depuraci\u00F3n, control de versiones, testing, documentaci\u00F3n y UML",
          concepts: [
            { id: "c1", name: "Entornos integrados de desarrollo", description: "Eclipse, IntelliJ, VS Code, configuraci\u00F3n y plugins", weight: 3, tags: ["IDE"] },
            { id: "c2", name: "Control de versiones con Git", description: "init, add, commit, branch, merge, push, pull, conflictos", weight: 7, tags: ["Git"] },
            { id: "c3", name: "GitHub y repositorios remotos", description: "Clonar, forks, pull requests, issues, README", weight: 6, tags: ["Git"] },
            { id: "c4", name: "Depuraci\u00F3n", description: "Breakpoints, paso a paso, watch, pila de ejecuci\u00F3n", weight: 5, tags: ["debug"] },
            { id: "c5", name: "Testing unitario", description: "JUnit, casos de prueba, aserciones, cobertura", weight: 7, tags: ["testing"] },
            { id: "c6", name: "Diagramas UML", description: "Casos de uso, clases, secuencia, actividades", weight: 6, tags: ["UML"] },
            { id: "c7", name: "Documentaci\u00F3n", description: "Javadoc, comentarios, manuales t\u00E9cnicos", weight: 3, tags: ["documentaci\u00F3n"] },
            { id: "c8", name: "Refactorizaci\u00F3n", description: "Renombrar, extraer m\u00E9todo, simplificar condicionales", weight: 5, tags: ["calidad"] },
            { id: "c9", name: "Automatizaci\u00F3n de builds", description: "Maven, Gradle, dependencias, ciclo de vida", weight: 6, tags: ["build"] }
          ],
          relations: [
            { from: "c1", to: "c4", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c6", to: "c5", type: "relacionado" },
            { from: "c7", to: "c8", type: "relacionado" },
            { from: "c8", to: "c9", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" }
          ]
        },
        {
          key: "sistemas-informaticos",
          name: "Sistemas Inform\u00E1ticos (1\u00BA SMX/ASIR)",
          description: "Hardware, software, sistemas operativos, redes, virtualizaci\u00F3n y seguridad",
          concepts: [
            { id: "c1", name: "Arquitectura de computadores", description: "CPU, memoria, buses, perif\u00E9ricos, placa base", weight: 4, tags: ["hardware"] },
            { id: "c2", name: "Sistemas operativos", description: "Windows, Linux, procesos, archivos, permisos", weight: 5, tags: ["SO"] },
            { id: "c3", name: "Administraci\u00F3n de Linux", description: "Comandos b\u00E1sicos, usuarios, grupos, paquetes, servicios", weight: 6, tags: ["SO"] },
            { id: "c4", name: "Redes de computadores", description: "Modelo OSI, TCP/IP, direccionamiento IP, subredes", weight: 7, tags: ["redes"] },
            { id: "c5", name: "Virtualizaci\u00F3n", description: "VirtualBox, VMware, m\u00E1quinas virtuales, contenedores Docker", weight: 6, tags: ["virtualizaci\u00F3n"] },
            { id: "c6", name: "Seguridad inform\u00E1tica", description: "Cortafuegos, antivirus, cifrado, copias de seguridad", weight: 6, tags: ["seguridad"] },
            { id: "c7", name: "Gesti\u00F3n de almacenamiento", description: "RAID, particiones, sistemas de archivos, backups", weight: 5, tags: ["almacenamiento"] },
            { id: "c8", name: "Mantenimiento de equipos", description: "Montaje, diagnosis, sustituci\u00F3n de componentes", weight: 4, tags: ["hardware"] },
            { id: "c9", name: "Documentaci\u00F3n t\u00E9cnica", description: "Informes, manuales, inventarios, partes de incidencias", weight: 3, tags: ["documentaci\u00F3n"] }
          ],
          relations: [
            { from: "c1", to: "c8", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c7", type: "prerrequisito" },
            { from: "c4", to: "c6", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "relacionado" },
            { from: "c3", to: "c6", type: "relacionado" }
          ]
        },
        {
          key: "dwc",
          name: "Desarrollo Web Cliente (2\u00BA DAW)",
          description: "JavaScript, DOM, eventos, AJAX, frameworks frontend y testing",
          concepts: [
            { id: "c1", name: "JavaScript b\u00E1sico", description: "Variables, funciones, objetos, arrays, ES6+", weight: 4, tags: ["JS"] },
            { id: "c2", name: "DOM", description: "Selecci\u00F3n de elementos, manipulaci\u00F3n, creaci\u00F3n din\u00E1mica", weight: 5, tags: ["JS"] },
            { id: "c3", name: "Eventos", description: "Captura/burbujeo, delegaci\u00F3n, eventos t\u00E1ctiles", weight: 5, tags: ["JS"] },
            { id: "c4", name: "Formularios y validaci\u00F3n", description: "FormData, validaci\u00F3n nativa, expresiones regulares", weight: 5, tags: ["JS"] },
            { id: "c5", name: "AJAX y Fetch", description: "XMLHttpRequest, fetch, async/await, promesas", weight: 7, tags: ["JS"] },
            { id: "c6", name: "JSON y APIs REST", description: "Consumo de APIs, JSON.parse/stringify, POST/GET", weight: 7, tags: ["JS"] },
            { id: "c7", name: "Vue.js / React b\u00E1sico", description: "Componentes, estado, props, ciclo de vida", weight: 8, tags: ["framework"] },
            { id: "c8", name: "Testing en cliente", description: "Jest, pruebas unitarias, mocks, cobertura", weight: 7, tags: ["testing"] },
            { id: "c9", name: "LocalStorage y cookies", description: "Almacenamiento local, sesi\u00F3n, cookies, IndexedDB", weight: 5, tags: ["JS"] },
            { id: "c10", name: "Accesibilidad web", description: "WCAG, ARIA, alt text, navegaci\u00F3n por teclado", weight: 4, tags: ["accesibilidad"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c1", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "prerrequisito" },
            { from: "c1", to: "c9", type: "prerrequisito" },
            { from: "c2", to: "c10", type: "relacionado" }
          ]
        },
        {
          key: "dws",
          name: "Desarrollo Web Servidor (2\u00BA DAW)",
          description: "PHP, MVC, sesiones, ORM, seguridad web y despliegue",
          concepts: [
            { id: "c1", name: "PHP b\u00E1sico", description: "Sintaxis, variables, arrays, funciones, formularios", weight: 4, tags: ["PHP"] },
            { id: "c2", name: "POO en PHP", description: "Clases, herencia, interfaces, traits, namespaces", weight: 6, tags: ["PHP"] },
            { id: "c3", name: "Autenticaci\u00F3n y sesiones", description: "session, cookies, login, registro, seguridad de sesi\u00F3n", weight: 6, tags: ["PHP"] },
            { id: "c4", name: "MySQL con PHP", description: "PDO, consultas preparadas, transacciones, relaciones", weight: 6, tags: ["BBDD"] },
            { id: "c5", name: "Arquitectura MVC", description: "Modelo, vista, controlador, enrutamiento, front controller", weight: 7, tags: ["arquitectura"] },
            { id: "c6", name: "ORM (Doctrine/Elixir)", description: "Entidades, repositorios, DQL, migraciones", weight: 7, tags: ["BBDD"] },
            { id: "c7", name: "Seguridad web", description: "XSS, CSRF, SQL injection, cifrado, HTTPS", weight: 8, tags: ["seguridad"] },
            { id: "c8", name: "APIs REST con PHP", description: "Routing, JSON response, autenticaci\u00F3n JWT", weight: 7, tags: ["API"] },
            { id: "c9", name: "Despliegue", description: "Apache/Nginx, hosting, FTP, variables de entorno", weight: 5, tags: ["despliegue"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c4", type: "prerrequisito" },
            { from: "c2", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c3", to: "c7", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "prerrequisito" },
            { from: "c5", to: "c9", type: "prerrequisito" }
          ]
        },
        {
          key: "despliegue",
          name: "Despliegue Apps Web (2\u00BA DAW)",
          description: "Servidores web, despliegue, CI/CD, contenedores, monitorizaci\u00F3n",
          concepts: [
            { id: "c1", name: "Servidores web", description: "Apache, Nginx, configuraci\u00F3n, virtual hosts, HTTPS", weight: 5, tags: ["servidores"] },
            { id: "c2", name: "Despliegue manual", description: "FTP, SFTP, rsync, permisos, estructura de directorios", weight: 4, tags: ["despliegue"] },
            { id: "c3", name: "Docker", description: "Contenedores, Dockerfile, docker-compose, vol\u00FAmenes", weight: 7, tags: ["contenedores"] },
            { id: "c4", name: "CI/CD", description: "GitHub Actions, Jenkins, pipelines, tests autom\u00E1ticos", weight: 8, tags: ["automatizaci\u00F3n"] },
            { id: "c5", name: "Bases de datos en producci\u00F3n", description: "Migraciones, backups, replicaci\u00F3n, tuning", weight: 6, tags: ["BBDD"] },
            { id: "c6", name: "Monitorizaci\u00F3n y logs", description: "Gesti\u00F3n de logs, monit, alertas, rendimiento", weight: 6, tags: ["monitorizaci\u00F3n"] },
            { id: "c7", name: "Seguridad en producci\u00F3n", description: "Certificados SSL, firewalls, actualizaciones, pentesting b\u00E1sico", weight: 7, tags: ["seguridad"] },
            { id: "c8", name: "Dominios y DNS", description: "Tipos de registro, configuraci\u00F3n, propagaci\u00F3n, subdominios", weight: 4, tags: ["DNS"] },
            { id: "c9", name: "Cloud (AWS/Azure)", description: "M\u00E1quinas virtuales en cloud, S3, balanceadores", weight: 7, tags: ["cloud"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c1", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c1", to: "c7", type: "prerrequisito" },
            { from: "c1", to: "c8", type: "prerrequisito" },
            { from: "c3", to: "c9", type: "prerrequisito" }
          ]
        },
        {
          key: "fol",
          name: "FOL (Formaci\u00F3n y Orientaci\u00F3n Laboral)",
          description: "Derecho laboral, contratos, n\u00F3minas, seguridad social, prevenci\u00F3n de riesgos",
          concepts: [
            { id: "c1", name: "Fuentes del derecho laboral", description: "Constituci\u00F3n, Estatuto Trabajadores, convenios colectivos", weight: 4, tags: ["derecho"] },
            { id: "c2", name: "Contrato de trabajo", description: "Tipos de contrato, periodo de prueba, jornada, modificaciones", weight: 6, tags: ["contrato"] },
            { id: "c3", name: "Salario y n\u00F3mina", description: "SMI, pagas extra, deducciones, IRPF, Seguridad Social", weight: 7, tags: ["salario"] },
            { id: "c4", name: "Derechos y deberes del trabajador", description: "Vacaciones, permisos, excedencias, representaci\u00F3n sindical", weight: 5, tags: ["derecho"] },
            { id: "c5", name: "Suspensi\u00F3n y extinci\u00F3n del contrato", description: "Despido, indemnizaci\u00F3n, fin de contrato, causas", weight: 7, tags: ["contrato"] },
            { id: "c6", name: "Seguridad Social", description: "Afiliaci\u00F3n, cotizaci\u00F3n, prestaciones, desempleo", weight: 6, tags: ["seguridad social"] },
            { id: "c7", name: "Riesgos laborales", description: "Evaluaci\u00F3n, EPIs, se\u00F1alizaci\u00F3n, planes de emergencia", weight: 6, tags: ["prevenci\u00F3n"] },
            { id: "c8", name: "Medidas de prevenci\u00F3n", description: "Ergonom\u00EDa, riesgos psicosociales, pantallas, carga f\u00EDsica", weight: 5, tags: ["prevenci\u00F3n"] },
            { id: "c9", name: "B\u00FAsqueda de empleo", description: "CV, carta presentaci\u00F3n, entrevistas, portales de empleo", weight: 4, tags: ["empleo"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c2", to: "c5", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "relacionado" }
          ]
        },
        {
          key: "ingles-tecnico",
          name: "Ingl\u00E9s T\u00E9cnico Inform\u00E1tica",
          description: "Vocabulario t\u00E9cnico, reading comprehension, documentaci\u00F3n, comunicaci\u00F3n profesional en TI",
          concepts: [
            { id: "c1", name: "Basic IT vocabulary", description: "Hardware, software, network, database, programming terms", weight: 3, tags: ["vocabulary"] },
            { id: "c2", name: "Technical documentation", description: "Reading manuals, README, API docs, technical specifications", weight: 5, tags: ["reading"] },
            { id: "c3", name: "Email communication", description: "Formal emails, bug reports, status updates, meeting requests", weight: 5, tags: ["writing"] },
            { id: "c4", name: "Code comments and docs", description: "Writing clear comments, docstrings, inline documentation", weight: 4, tags: ["writing"] },
            { id: "c5", name: "Presentations and meetings", description: "Stand-up meetings, demos, presenting technical concepts", weight: 6, tags: ["speaking"] },
            { id: "c6", name: "Interview preparation", description: "Technical vocabulary, common questions, behavioral answers", weight: 6, tags: ["career"] },
            { id: "c7", name: "Job listings and applications", description: "Understanding job postings, CV, cover letter in English", weight: 5, tags: ["career"] },
            { id: "c8", name: "Tech news and blogs", description: "Reading tech articles, staying updated, summarising", weight: 4, tags: ["reading"] },
            { id: "c9", name: "Error messages and debugging", description: "Understanding and explaining errors, stack traces, logs", weight: 5, tags: ["vocabulary"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c3", to: "c5", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "relacionado" },
            { from: "c1", to: "c6", type: "prerrequisito" }
          ]
        },
        {
          key: "inteligencia-artificial",
          name: "Inteligencia Artificial (2º DAW/DAM)",
          description: "Fundamentos de IA, machine learning, deep learning, NLP, visión artificial y ética algorítmica",
          concepts: [
            { id: "c1", name: "Fundamentos de IA", description: "Historia, tipos de IA, test de Turing, agentes inteligentes, problemas y soluciones", weight: 4, tags: ["fundamentos"] },
            { id: "c2", name: "Aprendizaje supervisado", description: "Regresión lineal/logística, KNN, árboles de decisión, SVM, métricas de evaluación", weight: 8, tags: ["ML"] },
            { id: "c3", name: "Aprendizaje no supervisado", description: "K-means, clustering jerárquico, DBSCAN, PCA, reducción de dimensionalidad", weight: 7, tags: ["ML"] },
            { id: "c4", name: "Redes neuronales", description: "Perceptrón, backpropagation, activaciones, capas densas, dropout, batch normalization", weight: 8, tags: ["deep learning"] },
            { id: "c5", name: "Procesamiento del lenguaje", description: "Tokenización, embeddings, RNN, LSTM, transformers, BERT, GPT", weight: 8, tags: ["NLP"] },
            { id: "c6", name: "Visión artificial", description: "CNN, detección de objetos, segmentación, YOLO, transfer learning", weight: 7, tags: ["visión"] },
            { id: "c7", name: "Preprocesamiento y features", description: "Limpieza de datos, normalización, codificación, feature engineering, pipelines", weight: 6, tags: ["datos"] },
            { id: "c8", name: "Frameworks y herramientas", description: "TensorFlow, PyTorch, scikit-learn, Jupyter, Hugging Face, entrenamiento en GPU", weight: 5, tags: ["herramientas"] },
            { id: "c9", name: "Ética y sesgos algorítmicos", description: "Sesgo en datos, fairness, explicabilidad, regulación, impacto social", weight: 5, tags: ["ética"] },
            { id: "c10", name: "Despliegue de modelos", description: "API REST, Docker, cloud endpoints, edge AI, monitorización", weight: 6, tags: ["despliegue"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c4", to: "c6", type: "prerrequisito" },
            { from: "c2", to: "c7", type: "prerrequisito" },
            { from: "c3", to: "c7", type: "prerrequisito" },
            { from: "c4", to: "c8", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "relacionado" },
            { from: "c8", to: "c10", type: "prerrequisito" },
            { from: "c9", to: "c2", type: "relacionado" },
            { from: "c9", to: "c5", type: "relacionado" }
          ]
        },
        {
          key: "ciberseguridad",
          name: "Ciberseguridad (2º ASIR/DAW)",
          description: "Seguridad informática, criptografía, análisis de vulnerabilidades, hardening, normativa y ethical hacking",
          concepts: [
            { id: "c1", name: "Fundamentos de seguridad", description: "CIA triad, autenticación, autorización, no repudio, análisis de riesgos", weight: 4, tags: ["fundamentos"] },
            { id: "c2", name: "Criptografía", description: "Cifrado simétrico/asimétrico, hash, certificados digitales, PKI, SSL/TLS", weight: 7, tags: ["cripto"] },
            { id: "c3", name: "Seguridad en redes", description: "Firewalls, IDS/IPS, VPN, segmentación, Wireshark, sniffing", weight: 7, tags: ["redes"] },
            { id: "c4", name: "Seguridad web", description: "OWASP Top 10, XSS, SQL injection, CSRF, JWT, CORS, CSP", weight: 8, tags: ["web"] },
            { id: "c5", name: "Malware y amenazas", description: "Tipos de malware, ransomware, APT, exploits, análisis de muestras", weight: 6, tags: ["amenazas"] },
            { id: "c6", name: "Ethical hacking", description: "Metodología, reconocimiento, escaneo, explotación, post-explotación, Metasploit", weight: 8, tags: ["hacking"] },
            { id: "c7", name: "Hardening de sistemas", description: "Linux/Windows hardening, actualizaciones, SELinux, AppArmor, políticas de seguridad", weight: 6, tags: ["hardening"] },
            { id: "c8", name: "Gestión de identidades", description: "LDAP, Active Directory, OAuth 2.0, SSO, MFA, IAM", weight: 6, tags: ["identidad"] },
            { id: "c9", name: "Normativa y cumplimiento", description: "RGPD, LOPDGDD, ISO 27001, ENS, auditoría, plan de continuidad", weight: 5, tags: ["normativa"] },
            { id: "c10", name: "SOC y respuesta a incidentes", description: "SIEM, SOAR, análisis forense, cadena de custodia, playbooks", weight: 7, tags: ["operaciones"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c5", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c4", to: "c6", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c1", to: "c7", type: "prerrequisito" },
            { from: "c3", to: "c8", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c1", to: "c9", type: "prerrequisito" },
            { from: "c6", to: "c10", type: "prerrequisito" },
            { from: "c3", to: "c10", type: "relacionado" }
          ]
        }
      ]
    },

    "FP Administrativo": {
      label: "FP Administrativo",
      description: "Gesti\u00F3n Administrativa y Administraci\u00F3n y Finanzas",
      emoji: "\uD83D\uDCC4",
      subjects: [
        {
          key: "gestion-administrativa",
          name: "Gesti\u00F3n Administrativa (1\u00BA GA)",
          description: "Documentaci\u00F3n empresarial, archivo, registro y comunicaciones",
          concepts: [
            { id: "c1", name: "Documentos administrativos", description: "Facturas, albaranes, pedidos, notas de d\u00E9bito/cr\u00E9dito", weight: 5, tags: ["documentaci\u00F3n"] },
            { id: "c2", name: "Archivo y clasificaci\u00F3n", description: "Sistemas de archivo, ordenaci\u00F3n alfab\u00E9tica, num\u00E9rica, gesti\u00F3n documental", weight: 4, tags: ["archivo"] },
            { id: "c3", name: "Comunicaci\u00F3n empresarial escrita", description: "Cartas comerciales, oficios, circulares, actas, informes", weight: 5, tags: ["comunicaci\u00F3n"] },
            { id: "c4", name: "Atenci\u00F3n al cliente", description: "Presencial, telef\u00F3nica, escrita, reclamaciones, calidad", weight: 5, tags: ["atenci\u00F3n"] },
            { id: "c5", name: "Registro y sellado", description: "Registro de entrada/salida, sellado de documentos, trazabilidad", weight: 3, tags: ["registro"] },
            { id: "c6", name: "Agenda y gesti\u00F3n del tiempo", description: "Organizaci\u00F3n de agendas, planificaci\u00F3n, priorizaci\u00F3n", weight: 3, tags: ["organizaci\u00F3n"] },
            { id: "c7", name: "Reuniones y actas", description: "Convocatoria, orden del d\u00EDa, actas, seguimiento de acuerdos", weight: 4, tags: ["comunicaci\u00F3n"] },
            { id: "c8", name: "Proveedores y compras", description: "Selecci\u00F3n, presupuestos, comparativas, pedidos", weight: 5, tags: ["compras"] },
            { id: "c9", name: "Protocolo empresarial", description: "Imagen corporativa, tratamiento, precedencias", weight: 3, tags: ["protocolo"] }
          ],
          relations: [
            { from: "c1", to: "c8", type: "prerrequisito" },
            { from: "c3", to: "c7", type: "prerrequisito" },
            { from: "c5", to: "c2", type: "relacionado" },
            { from: "c4", to: "c9", type: "relacionado" },
            { from: "c6", to: "c7", type: "prerrequisito" }
          ]
        },
        {
          key: "contabilidad",
          name: "Contabilidad (1\u00BA GA / 2\u00BA AF)",
          description: "Plan General Contable, registro contable, cuentas anuales, impuestos",
          concepts: [
            { id: "c1", name: "Patrimonio empresarial", description: "Activo, pasivo, neto, masa patrimonial, equilibrio", weight: 5, tags: ["conceptos"] },
            { id: "c2", name: "Plan General Contable", description: "Estructura, grupos, cuentas, codificaci\u00F3n", weight: 5, tags: ["PGC"] },
            { id: "c3", name: "Libro Diario", description: "Asientos contables, partida doble, registro cronol\u00F3gico", weight: 6, tags: ["registro"] },
            { id: "c4", name: "Libro Mayor", description: "Mayorizaci\u00F3n, saldos de cuentas, comprobaci\u00F3n", weight: 5, tags: ["registro"] },
            { id: "c5", name: "Regularizaci\u00F3n", description: "Periodificaciones, amortizaciones, deterioros", weight: 7, tags: ["cierre"] },
            { id: "c6", name: "Cuentas anuales", description: "Balance, P y G, memoria, EFE, estado cambios neto", weight: 8, tags: ["cierre"] },
            { id: "c7", name: "IVA", description: "Sujetos pasivos, devengado, soportado, liquidaci\u00F3n trimestral", weight: 6, tags: ["impuestos"] },
            { id: "c8", name: "IRPF", description: "Retenciones, declaraci\u00F3n, m\u00EDnimos, tramos", weight: 6, tags: ["impuestos"] },
            { id: "c9", name: "Impuesto de Sociedades", description: "Base imponible, tipo, deducciones, cuota diferencial", weight: 7, tags: ["impuestos"] },
            { id: "c10", name: "An\u00E1lisis financiero", description: "Ratios, fondo de maniobra, rentabilidad, liquidez", weight: 7, tags: ["an\u00E1lisis"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c3", to: "c7", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "relacionado" },
            { from: "c6", to: "c10", type: "prerrequisito" }
          ]
        },
        {
          key: "ofimatica",
          name: "Ofim\u00E1tica y Procesamiento de Datos",
          description: "Word, Excel, Access, PowerPoint, Google Workspace, automatizaci\u00F3n de oficina",
          concepts: [
            { id: "c1", name: "Procesador de textos", description: "Word, formato, estilos, tablas, \u00EDndices, combinaci\u00F3n correspondencia", weight: 4, tags: ["Word"] },
            { id: "c2", name: "Hoja de c\u00E1lculo b\u00E1sica", description: "Excel, celdas, f\u00F3rmulas, funciones, referencias", weight: 5, tags: ["Excel"] },
            { id: "c3", name: "F\u00F3rmulas y funciones avanzadas", description: "BuscarV, SI anidados, \u00EDndice/Coincidir, tablas din\u00E1micas", weight: 7, tags: ["Excel"] },
            { id: "c4", name: "Gr\u00E1ficos y dashboards", description: "Tipos de gr\u00E1ficos, formato, paneles interactivos", weight: 5, tags: ["Excel"] },
            { id: "c5", name: "Bases de datos Access", description: "Tablas, consultas, formularios, informes, relaciones", weight: 6, tags: ["Access"] },
            { id: "c6", name: "Presentaciones", description: "PowerPoint, plantillas, animaciones, presentaci\u00F3n eficaz", weight: 3, tags: ["PowerPoint"] },
            { id: "c7", name: "Google Workspace", description: "Docs, Sheets, Slides, Drive, formularios", weight: 4, tags: ["Google"] },
            { id: "c8", name: "Automatizaci\u00F3n con macros", description: "VBA b\u00E1sico, grabaci\u00F3n, edici\u00F3n de macros", weight: 7, tags: ["automatizaci\u00F3n"] },
            { id: "c9", name: "Documentos colaborativos", description: "Compartir, coedici\u00F3n, control de cambios, versiones", weight: 3, tags: ["colaboraci\u00F3n"] }
          ],
          relations: [
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c2", to: "c5", type: "prerrequisito" },
            { from: "c1", to: "c9", type: "prerrequisito" },
            { from: "c3", to: "c8", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "relacionado" }
          ]
        },
        {
          key: "comunicacion-empresarial",
          name: "Comunicaci\u00F3n Empresarial",
          description: "Comunicaci\u00F3n oral y escrita, negociaci\u00F3n, atenci\u00F3n al cliente y marketing",
          concepts: [
            { id: "c1", name: "Comunicaci\u00F3n verbal y no verbal", description: "Elementos, barreras, lenguaje corporal, escucha activa", weight: 4, tags: ["comunicaci\u00F3n"] },
            { id: "c2", name: "Comunicaci\u00F3n telef\u00F3nica", description: "Protocolo, filtro de llamadas, toma de mensajes, dificultades", weight: 4, tags: ["comunicaci\u00F3n"] },
            { id: "c3", name: "T\u00E9cnicas de negociaci\u00F3n", description: "Estilos, fases, t\u00E1cticas, cierre de acuerdos", weight: 6, tags: ["negociaci\u00F3n"] },
            { id: "c4", name: "Gesti\u00F3n de reclamaciones", description: "Tipos de reclamaciones, protocolo, resoluci\u00F3n, seguimiento", weight: 6, tags: ["atenci\u00F3n"] },
            { id: "c5", name: "Marketing empresarial", description: "Marketing mix, segmentaci\u00F3n, posicionamiento, marca", weight: 5, tags: ["marketing"] },
            { id: "c6", name: "Comunicaci\u00F3n digital", description: "Email marketing, redes sociales, web, SEO b\u00E1sico", weight: 6, tags: ["digital"] },
            { id: "c7", name: "Imagen corporativa", description: "Identidad visual, manual de imagen, coherencia comunicativa", weight: 4, tags: ["imagen"] },
            { id: "c8", name: "Comunicaci\u00F3n interna", description: "Clima laboral, canales internos, motivaci\u00F3n, feedback", weight: 5, tags: ["comunicaci\u00F3n"] },
            { id: "c9", name: "\u00C9tica empresarial", description: "C\u00F3digo \u00E9tico, RSC, transparencia, compliance", weight: 4, tags: ["\u00E9tica"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "relacionado" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "relacionado" },
            { from: "c3", to: "c4", type: "prerrequisito" }
          ]
        },
        {
          key: "rrhh",
          name: "Recursos Humanos (2\u00BA AF)",
          description: "Selecci\u00F3n, formaci\u00F3n, evaluaci\u00F3n, n\u00F3minas y gesti\u00F3n de personal",
          concepts: [
            { id: "c1", name: "Planificaci\u00F3n de RRHH", description: "Previsi\u00F3n de plantillas, an\u00E1lisis de puestos, perfiles profesionales", weight: 5, tags: ["planificaci\u00F3n"] },
            { id: "c2", name: "Reclutamiento y selecci\u00F3n", description: "Fuentes de reclutamiento, CV, entrevistas, pruebas, acogida", weight: 6, tags: ["selecci\u00F3n"] },
            { id: "c3", name: "Formaci\u00F3n y desarrollo", description: "Detecci\u00F3n de necesidades, planes de formaci\u00F3n, evaluaci\u00F3n", weight: 5, tags: ["formaci\u00F3n"] },
            { id: "c4", name: "Evaluaci\u00F3n del desempe\u00F1o", description: "M\u00E9todos de evaluaci\u00F3n, KPIs, feedback, planes de mejora", weight: 6, tags: ["desempe\u00F1o"] },
            { id: "c5", name: "N\u00F3minas y cotizaciones", description: "Estructura salarial, seguros sociales, IRPF, finiquito", weight: 8, tags: ["n\u00F3minas"] },
            { id: "c6", name: "Clima laboral y motivaci\u00F3n", description: "Encuestas, factores motivacionales, conciliaci\u00F3n", weight: 5, tags: ["clima"] },
            { id: "c7", name: "Gesti\u00F3n de conflictos", description: "Tipos, mediaci\u00F3n, disciplinario, acoso laboral", weight: 6, tags: ["conflictos"] },
            { id: "c8", name: "Despido y extinci\u00F3n", description: "Tipos de despido, indemnizaciones, documentaci\u00F3n, juicios", weight: 7, tags: ["despido"] },
            { id: "c9", name: "Legislaci\u00F3n laboral", description: "Estatuto Trabajadores, convenios, reformas", weight: 6, tags: ["legislaci\u00F3n"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c9", to: "c1", type: "prerrequisito" },
            { from: "c9", to: "c5", type: "prerrequisito" }
          ]
        },
        {
          key: "gestion-financiera",
          name: "Gesti\u00F3n Financiera (2\u00BA AF)",
          description: "An\u00E1lisis financiero, presupuestos, inversiones, financiaci\u00F3n, tesorer\u00EDa",
          concepts: [
            { id: "c1", name: "An\u00E1lisis de balances", description: "Fondo de maniobra, ratios financieros, an\u00E1lisis patrimonial", weight: 6, tags: ["an\u00E1lisis"] },
            { id: "c2", name: "Presupuestos empresariales", description: "Presupuesto maestro, desviaciones, control presupuestario", weight: 6, tags: ["presupuestos"] },
            { id: "c3", name: "Selecci\u00F3n de inversiones", description: "VAN, TIR, payback, criterios de decisi\u00F3n", weight: 8, tags: ["inversiones"] },
            { id: "c4", name: "Fuentes de financiaci\u00F3n", description: "Pr\u00E9stamos, leasing, renting, cr\u00E9dito, subvenciones", weight: 6, tags: ["financiaci\u00F3n"] },
            { id: "c5", name: "Costes y punto muerto", description: "Costes fijos/variables, umbral de rentabilidad, margen", weight: 6, tags: ["costes"] },
            { id: "c6", name: "Gesti\u00F3n de tesorer\u00EDa", description: "Presupuesto de tesorer\u00EDa, d\u00E9ficit/super\u00E1vit, negociaci\u00F3n bancaria", weight: 7, tags: ["tesorer\u00EDa"] },
            { id: "c7", name: "Productos financieros", description: "Dep\u00F3sitos, fondos, acciones, bonos, derivados", weight: 6, tags: ["productos"] },
            { id: "c8", name: "An\u00E1lisis de riesgos", description: "Riesgo financiero, operativo, de mercado, coberturas", weight: 7, tags: ["riesgos"] },
            { id: "c9", name: "Planificaci\u00F3n fiscal", description: "Calendario fiscal, impuestos directos/indirectos, planificaci\u00F3n", weight: 7, tags: ["fiscal"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c5", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c2", to: "c6", type: "prerrequisito" },
            { from: "c7", to: "c8", type: "prerrequisito" },
            { from: "c4", to: "c7", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "relacionado" }
          ]
        }
      ]
    },

    "Transversales": {
      label: "Transversales",
      description: "M\u00F3dulos transversales comunes a todos los ciclos formativos",
      emoji: "\uD83D\uDCDA",
      subjects: [
        {
          key: "eie",
          name: "EIE (Empresa e Iniciativa Emprendedora)",
          description: "Cultura emprendedora, plan de negocio, formas jur\u00EDdicas, viabilidad y puesta en marcha",
          concepts: [
            { id: "c1", name: "Iniciativa emprendedora", description: "Perfil emprendedor, ideas de negocio, creatividad e innovaci\u00F3n", weight: 4, tags: ["emprendimiento"] },
            { id: "c2", name: "Formas jur\u00EDdicas", description: "Aut\u00F3nomo, sociedad limitada, cooperativa, comparativa", weight: 5, tags: ["jur\u00EDdico"] },
            { id: "c3", name: "Plan de empresa", description: "Estructura, contenido, resumen ejecutivo, plan de acci\u00F3n", weight: 7, tags: ["plan"] },
            { id: "c4", name: "An\u00E1lisis de mercado", description: "P\u00FAblico objetivo, competencia, DAFO, encuestas", weight: 6, tags: ["marketing"] },
            { id: "c5", name: "Plan de marketing", description: "Producto, precio, distribuci\u00F3n, promoci\u00F3n, ventas", weight: 6, tags: ["marketing"] },
            { id: "c6", name: "Plan econ\u00F3mico-financiero", description: "Inversi\u00F3n inicial, previsi\u00F3n ingresos/gastos, tesorer\u00EDa", weight: 8, tags: ["finanzas"] },
            { id: "c7", name: "Viabilidad del negocio", description: "Umbral de rentabilidad, VAN, TIR, an\u00E1lisis de sensibilidad", weight: 7, tags: ["finanzas"] },
            { id: "c8", name: "Tr\u00E1mites de constituci\u00F3n", description: "Pasos, organismos, licencias, registros, plazos", weight: 5, tags: ["jur\u00EDdico"] },
            { id: "c9", name: "Ayudas y subvenciones", description: "Programas, becas, incubadoras, crowdfunding", weight: 4, tags: ["financiaci\u00F3n"] }
          ],
          relations: [
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "prerrequisito" },
            { from: "c2", to: "c8", type: "prerrequisito" },
            { from: "c9", to: "c7", type: "relacionado" }
          ]
        },
        {
          key: "prevencion-riesgos",
          name: "Prevenci\u00F3n de Riesgos Laborales",
          description: "Conceptos b\u00E1sicos de seguridad, riesgos espec\u00EDficos, emergencias y normativa",
          concepts: [
            { id: "c1", name: "Conceptos b\u00E1sicos de PRL", description: "Riesgo, da\u00F1o, prevenci\u00F3n, protecci\u00F3n, condiciones de trabajo", weight: 3, tags: ["b\u00E1sicos"] },
            { id: "c2", name: "Normativa de prevenci\u00F3n", description: "Ley PRL, derechos y deberes, delegados, comit\u00E9", weight: 5, tags: ["normativa"] },
            { id: "c3", name: "Riesgos generales", description: "Ca\u00EDdas, golpes, cortes, incendios, riesgo el\u00E9ctrico", weight: 5, tags: ["riesgos"] },
            { id: "c4", name: "Riesgos ergon\u00F3micos", description: "Posturas, movimientos repetitivos, carga f\u00EDsica, pantallas", weight: 5, tags: ["ergonom\u00EDa"] },
            { id: "c5", name: "Riesgos psicosociales", description: "Estr\u00E9s, burnout, acoso, carga mental, organización", weight: 6, tags: ["psicosociales"] },
            { id: "c6", name: "Equipos de protecci\u00F3n", description: "EPIs, selecci\u00F3n, mantenimiento, se\u00F1alizaci\u00F3n", weight: 4, tags: ["protecci\u00F3n"] },
            { id: "c7", name: "Planes de emergencia", description: "Evacuaci\u00F3n, primeros auxilios, simulacros, brigadas", weight: 5, tags: ["emergencia"] },
            { id: "c8", name: "Vigilancia de la salud", description: "Reconocimientos m\u00E9dicos, enfermedades profesionales", weight: 4, tags: ["salud"] },
            { id: "c9", name: "Investigaci\u00F3n de accidentes", description: "Notificaci\u00F3n, an\u00E1lisis de causas, estad\u00EDsticas", weight: 5, tags: ["accidentes"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c3", to: "c7", type: "prerrequisito" },
            { from: "c3", to: "c9", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c6", to: "c8", type: "relacionado" }
          ]
        },
        {
          key: "educacion-financiera",
          name: "Educación Financiera",
          description: "Gestión del dinero, ahorro, inversión, presupuesto personal, productos bancarios y protección al consumidor",
          concepts: [
            { id: "c1", name: "Presupuesto personal", description: "Ingresos y gastos, ahorro, control de gastos, hojas de cálculo", weight: 4, tags: ["básico"] },
            { id: "c2", name: "Productos bancarios", description: "Cuenta corriente, depósitos, tarjetas, comisiones, comparativa", weight: 5, tags: ["banca"] },
            { id: "c3", name: "Ahorro e inversión", description: "Interés compuesto, fondos, acciones, bonos, ETFs, perfil inversor", weight: 7, tags: ["inversión"] },
            { id: "c4", name: "Préstamos e hipotecas", description: "TAE, interés fijo/variable, amortización, cuadro de pagos, riesgos", weight: 6, tags: ["crédito"] },
            { id: "c5", name: "Planificación financiera", description: "Objetivos financieros, fondo de emergencia, plan de pensiones, seguros", weight: 6, tags: ["planificación"] },
            { id: "c6", name: "Fiscalidad básica", description: "IRPF, declaración de la renta, deducciones, retenciones, impuestos indirectos", weight: 6, tags: ["fiscal"] },
            { id: "c7", name: "Criptomonedas y nuevas finanzas", description: "Blockchain, Bitcoin, DeFi, wallets, riesgos, regulación", weight: 5, tags: ["cripto"] },
            { id: "c8", name: "Protección del consumidor", description: "Reclamaciones, arbitraje, estafas financieras, derecho de desistimiento", weight: 4, tags: ["protección"] },
            { id: "c9", name: "Seguros", description: "Seguros de vida, hogar, salud, accidentes, coberturas, primas", weight: 5, tags: ["seguros"] }
          ],
          relations: [
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c1", to: "c5", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c3", to: "c7", type: "relacionado" },
            { from: "c1", to: "c6", type: "prerrequisito" },
            { from: "c5", to: "c9", type: "relacionado" },
            { from: "c4", to: "c8", type: "relacionado" }
          ]
        },
        {
          key: "primeros-auxilios",
          name: "Primeros Auxilios",
          description: "Actuación ante emergencias, soporte vital básico, heridas, fracturas, intoxicaciones y RCP",
          concepts: [
            { id: "c1", name: "Principios generales", description: "PAS (Proteger-Avisar-Socorrer), botiquín, número de emergencias, consentimiento", weight: 4, tags: ["básico"] },
            { id: "c2", name: "Soporte Vital Básico", description: "RCP adultos/niños/lactantes, posición lateral de seguridad, cadena de supervivencia", weight: 8, tags: ["RCP"] },
            { id: "c3", name: "Atragantamiento", description: "Maniobra de Heimlich, golpes en la espalda, obstrucción parcial/total", weight: 7, tags: ["emergencia"] },
            { id: "c4", name: "Heridas y hemorragias", description: "Limpieza, desinfección, vendajes, hemorragias externas/internas, torniquete", weight: 6, tags: ["trauma"] },
            { id: "c5", name: "Fracturas y esguinces", description: "Inmovilización, férulas, cabestrillo, hielo, signos de gravedad", weight: 5, tags: ["trauma"] },
            { id: "c6", name: "Quemaduras y congelación", description: "Tipos de quemadura, actuación, prevención, shock eléctrico", weight: 5, tags: ["lesiones"] },
            { id: "c7", name: "Intoxicaciones", description: "Vía de entrada, antídotos, intoxicación por alimentos, alcohol, drogas, monóxido", weight: 6, tags: ["emergencia"] },
            { id: "c8", name: "Emergencias médicas", description: "Infarto, ictus, crisis asmática, convulsiones, diabetes, alergias graves", weight: 7, tags: ["médico"] },
            { id: "c9", name: "Actuación en catástrofes", description: "Triaje, evacuación, refugio, primeros auxilios psicológicos", weight: 5, tags: ["catástrofe"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c1", to: "c3", type: "prerrequisito" },
            { from: "c2", to: "c7", type: "relacionado" },
            { from: "c1", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c4", to: "c6", type: "relacionado" },
            { from: "c3", to: "c8", type: "relacionado" },
            { from: "c2", to: "c9", type: "prerrequisito" },
            { from: "c8", to: "c9", type: "prerrequisito" }
          ]
        }
      ]
    },

    "Idiomas": {
      label: "Idiomas",
      description: "Lenguas extranjeras por niveles del MCER (A1 a C1)",
      emoji: "\uD83C\uDF0D",
      subjects: [
        {
          key: "frances-a1-a2",
          name: "Francés A1-A2 (Iniciación)",
          description: "Francés básico: saludos, presentaciones, rutina diaria, viajes, compras y restaurante",
          concepts: [
            { id: "c1", name: "Pronunciación y fonética", description: "Alfabeto, acentos, liaisons, sonidos nasales, entonación", weight: 4, tags: ["fonética"] },
            { id: "c2", name: "Saludos y presentaciones", description: "Bonjour/salut, se présenter, demander comment ça va, formules de politesse", weight: 3, tags: ["social"] },
            { id: "c3", name: "Números y fechas", description: "Números 1-1000, jours/mois, heures, dates, prix", weight: 3, tags: ["básico"] },
            { id: "c4", name: "Verbos être, avoir, aller", description: "Conjugación presente, usos principales, expresiones comunes", weight: 5, tags: ["verbos"] },
            { id: "c5", name: "Rutina diaria y actividades", description: "Verbos en -er, presente, jours de la semaine, loisirs, momentos del día", weight: 5, tags: ["cotidiano"] },
            { id: "c6", name: "Comida y restaurante", description: "Aliments, boissons, commander au restaurant, l'addition, les goûts", weight: 4, tags: ["comida"] },
            { id: "c7", name: "Direcciones y viajes", description: "Demander son chemin, moyens de transport, acheter un billet, à l'hôtel", weight: 5, tags: ["viajes"] },
            { id: "c8", name: "Compras y ropa", description: "Magasins, vêtements, tailles, couleurs, payer, le marché", weight: 4, tags: ["compras"] },
            { id: "c9", name: "El tiempo y clima", description: "Météo, saisons, prévisions, expressions avec faire/avoir", weight: 3, tags: ["naturaleza"] },
            { id: "c10", name: "Passé composé", description: "Formación con avoir/être, participes passés, négation, accords", weight: 6, tags: ["gramática"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c4", type: "prerrequisito" },
            { from: "c3", to: "c6", type: "prerrequisito" },
            { from: "c3", to: "c7", type: "prerrequisito" },
            { from: "c3", to: "c8", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c4", to: "c9", type: "relacionado" },
            { from: "c5", to: "c10", type: "prerrequisito" },
            { from: "c6", to: "c7", type: "relacionado" }
          ]
        }
      ]
    },

    "Ciencias": {
      label: "Ciencias",
      description: "Ciencias experimentales: Biología, Geología, Física y Química",
      emoji: "\uD83D\uDD2C",
      subjects: [
        {
          key: "biologia-2o-bach",
          name: "Biología 2º Bachillerato",
          description: "Bioquímica, genética molecular, evolución, ecología y microbiología para la prueba de acceso a la universidad",
          concepts: [
            { id: "c1", name: "Bioelementos y biomoléculas", description: "Bioelementos primarios/secundarios, agua, sales minerales, enlaces químicos", weight: 5, tags: ["bioquímica"] },
            { id: "c2", name: "Glúcidos y lípidos", description: "Monosacáridos, disacáridos, polisacáridos, ácidos grasos, triglicéridos, fosfolípidos", weight: 5, tags: ["bioquímica"] },
            { id: "c3", name: "Proteínas y enzimas", description: "Aminoácidos, estructura proteica, función enzimática, cinética, inhibición", weight: 6, tags: ["bioquímica"] },
            { id: "c4", name: "ADN y replicación", description: "Estructura del ADN, replicación semiconservativa, enzimas, telómeros", weight: 7, tags: ["genética"] },
            { id: "c5", name: "Transcripción y traducción", description: "ARN mensajero, transferente y ribosomal, código genético, síntesis de proteínas", weight: 8, tags: ["genética"] },
            { id: "c6", name: "Regulación génica", description: "Operón, factores de transcripción, epigenética, microARN, splicing alternativo", weight: 7, tags: ["genética"] },
            { id: "c7", name: "Genética mendeliana y evolutiva", description: "Leyes de Mendel, herencia ligada al sexo, mutaciones, selección natural, especiación", weight: 7, tags: ["evolución"] },
            { id: "c8", name: "Microbiología e inmunología", description: "Microorganismos, bacterias, virus, sistema inmune, vacunas, anticuerpos", weight: 6, tags: ["micro"] },
            { id: "c9", name: "Ecología y medio ambiente", description: "Ecosistemas, ciclos biogeoquímicos, dinámica de poblaciones, cambio climático", weight: 5, tags: ["ecología"] },
            { id: "c10", name: "Biotecnología", description: "Ingeniería genética, PCR, CRISPR, clonación, transgénicos, bioética", weight: 6, tags: ["biotec"] }
          ],
          relations: [
            { from: "c1", to: "c2", type: "prerrequisito" },
            { from: "c2", to: "c3", type: "prerrequisito" },
            { from: "c3", to: "c4", type: "prerrequisito" },
            { from: "c4", to: "c5", type: "prerrequisito" },
            { from: "c5", to: "c6", type: "prerrequisito" },
            { from: "c5", to: "c7", type: "prerrequisito" },
            { from: "c5", to: "c8", type: "relacionado" },
            { from: "c6", to: "c10", type: "prerrequisito" },
            { from: "c7", to: "c9", type: "relacionado" },
            { from: "c8", to: "c10", type: "relacionado" }
          ]
        }
      ]
    }
  };

  GC.templates = T;
})();
