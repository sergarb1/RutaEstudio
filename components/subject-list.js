(function() {
  if (!GC.components) GC.components = {};

  GC.components['subject-list'] = {
    template: `
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold">Mis asignaturas</h2>
          <div class="flex gap-2">
            <button @click="$emit('aiGenerator')" class="flex items-center gap-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition" title="Copiar prompts para ChatGPT, Claude o Gemini">
              <span v-html="icon('sparkles')" class="w-3.5 h-3.5 text-amber-500 shrink-0 inline-flex items-center justify-center"></span> Prompts
            </button>
            <button @click="$emit('help')" class="flex items-center gap-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition" title="Ayuda">
              <span v-html="icon('questionMarkCircle')" class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-flex items-center justify-center"></span> Ayuda
            </button>
            <button @click="$emit('add')" class="flex items-center gap-1 bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
              <span v-html="icon('plus')" class="w-4 h-4 shrink-0 inline-flex items-center justify-center"></span> Nueva asignatura
            </button>
          </div>
        </div>

        <div v-if="subjects.length === 0" class="text-center py-12 text-slate-400 dark:text-slate-500">
          <div class="flex justify-center mb-3">
            <span class="w-12 h-12 text-indigo-400 inline-flex items-center justify-center" v-html="icon('academicCap')"></span>
          </div>
          <p class="text-lg font-medium text-slate-600 dark:text-slate-300">Tu ruta de estudio est\u00e1 vac\u00eda</p>
          <p class="text-sm mt-1 max-w-md mx-auto">Crea tu primera asignatura, a\u00f1ade conceptos y con\u00e9ctalos con relaciones.</p>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-3 max-w-md mx-auto leading-relaxed">
            Define conceptos, con\u00e9ctalos con relaciones,<br class="hidden sm:inline" />
            eval\u00faa tu dominio y recibe un plan de estudio personalizado.
            <span class="block mt-1 text-[10px] text-slate-400/60">100% gratis \u00b7 sin registro \u00b7 sin internet</span>
          </p>

          <div class="flex flex-wrap justify-center gap-3 mt-6">
            <button @click="$emit('add')" class="flex items-center gap-1.5 bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition text-sm">
              <span v-html="icon('plus')" class="w-4 h-4 shrink-0 inline-flex items-center justify-center"></span> Crear asignatura
            </button>
            <button @click="$emit('import')" class="flex items-center gap-1.5 bg-white dark:bg-slate-800 border dark:border-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm">
              <span v-html="icon('arrowUpTray')" class="w-4 h-4 shrink-0 text-slate-400 inline-flex items-center justify-center"></span> Importar datos
            </button>
            <button @click="$emit('aiGenerator')" class="flex items-center gap-1.5 bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-amber-600 transition text-sm">
              <span v-html="icon('sparkles')" class="w-4 h-4 shrink-0 inline-flex items-center justify-center"></span> Prompts IA
            </button>
          </div>

          <div class="mt-8 max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700">
            <p class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">\u00bfPrimera vez? Prueba con datos de ejemplo:</p>
            <button @click="$emit('example')" class="flex items-center gap-1.5 text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium px-4 py-2 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition mx-auto">
              <span v-html="icon('rocketLaunch')" class="w-4 h-4 shrink-0 inline-flex items-center justify-center"></span> Cargar ejemplo
            </button>
          </div>
        </div>

        <div v-if="subjects.length > 0">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="s in subjects" :key="s.id"
                 @click="$emit('select', s)"
                 class="subject-card bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-500 transition">
              <div class="flex items-center gap-2 mb-1">
                <span class="shrink-0 w-4 h-4 text-indigo-400 inline-flex items-center justify-center" v-html="icon('bookOpen')"></span>
                <h3 class="font-bold text-lg" v-text="s.name"></h3>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-6" v-text="s.description || 'Sin descripci\u00f3n'"></p>
              <div class="flex items-center gap-3 mt-3 ml-6 text-xs text-slate-400 dark:text-slate-500">
                <span v-text="s.concepts.length + ' conceptos'"></span>
                <span v-text="s.relations.length + ' relaciones'"></span>
              </div>
            </div>
          </div>

          <div v-if="subjects.length >= 2" class="mt-6">
            <button @click="$emit('globalGraph')" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-indigo-300 dark:hover:border-indigo-500 transition cursor-pointer">
              <div class="flex items-center justify-center gap-2">
                <span class="w-5 h-5 text-indigo-500 shrink-0 inline-flex items-center justify-center" v-html="icon('globeAlt')"></span>
                <span class="font-bold text-indigo-600 dark:text-indigo-400">Ver grafo global de todas las asignaturas</span>
              </div>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Relaciones entre conceptos de diferentes materias</p>
            </button>
          </div>

          <div v-if="subjects.length >= 1" class="mt-4">
            <button @click="$emit('suggestions')" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-amber-300 dark:hover:border-amber-500 transition cursor-pointer">
              <div class="flex items-center justify-center gap-2">
                <span class="w-5 h-5 text-amber-500 shrink-0 inline-flex items-center justify-center" v-html="icon('lightbulb')"></span>
                <span class="font-bold text-amber-600 dark:text-amber-400">Sugerencias y an\u00e1lisis</span>
              </div>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Recomendaciones basadas en tus evaluaciones</p>
            </button>
          </div>

          <div class="flex flex-wrap gap-2 mt-4">
            <button @click="$emit('exportTemplate')" class="flex items-center gap-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">
              <span v-html="icon('documentText')" class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-flex items-center justify-center"></span> Plantilla
            </button>
            <button @click="$emit('import')" class="flex items-center gap-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">
              <span v-html="icon('arrowUpTray')" class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-flex items-center justify-center"></span> Importar todo
            </button>
            <button @click="$emit('importSubject')" class="flex items-center gap-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">
              <span v-html="icon('arrowUpTray')" class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-flex items-center justify-center"></span> Importar asignatura
            </button>
          </div>
        </div>
      </div>
    `,
    props: {
      subjects: Array
    },
    emits: ['select', 'add', 'help', 'example', 'globalGraph', 'suggestions', 'aiGenerator', 'import', 'exportTemplate', 'importSubject'],
    methods: {
      icon(name) { return (GC.SVG || {})[name] || ''; }
    }
  };
})();
