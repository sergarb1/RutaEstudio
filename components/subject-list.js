(function() {
  if (!GC.components) GC.components = {};

  GC.components['subject-list'] = {
    template: `
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold">Mis asignaturas</h2>
          <div class="flex gap-2">
            <button @click="$emit('help')" class="flex items-center gap-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition" title="Ayuda">
              <span v-html="icon('questionMarkCircle')" class="w-3.5 h-3.5 text-slate-400 shrink-0 inline-flex items-center justify-center"></span> Ayuda
            </button>
            <button @click="$emit('tutorial')" class="flex items-center gap-1 text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/40 rounded-lg px-3 py-2 hover:bg-indigo-100 dark:hover:bg-indigo-800/50 font-medium transition" title="Primeros pasos">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
              Primeros pasos
            </button>
            <button @click="$emit('add')" class="flex items-center gap-1 bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
              <span v-html="icon('plus')" class="w-4 h-4 shrink-0 inline-flex items-center justify-center"></span> Nueva asignatura
            </button>
          </div>
        </div>

        <div v-if="subjects.length === 0" class="text-center py-16 text-slate-400 dark:text-slate-500">
          <div class="flex justify-center mb-4">
            <span class="w-16 h-16 text-indigo-400 inline-flex items-center justify-center" v-html="icon('academicCap')"></span>
          </div>
          <p class="text-xl font-bold text-slate-700 dark:text-slate-200">Tu ruta de estudio está vacía</p>
          <p class="text-base mt-2 max-w-lg mx-auto text-slate-500 dark:text-slate-400">Empieza creando tu primera asignatura, añade conceptos y conéctalos con relaciones.</p>
          <div class="mt-4 mx-auto max-w-lg bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-800/40">
            <p class="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed font-medium">
              Define conceptos, conéctalos con relaciones, evalúa tu dominio y recibe un plan de estudio personalizado.
            </p>
            <p class="text-xs text-indigo-500/60 dark:text-indigo-400/60 mt-2 font-medium">100% gratis · sin registro · sin internet</p>
          </div>

          <div class="flex flex-wrap justify-center gap-3 mt-6">
            <button @click="$emit('add')" class="flex items-center gap-1.5 bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition text-sm">
              <span v-html="icon('plus')" class="w-4 h-4 shrink-0 inline-flex items-center justify-center"></span> Crear asignatura
            </button>
            <button @click="$emit('import')" class="flex items-center gap-1.5 bg-white dark:bg-slate-800 border dark:border-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm">
              <span v-html="icon('arrowUpTray')" class="w-4 h-4 shrink-0 text-slate-400 inline-flex items-center justify-center"></span> Importar datos
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
          <div class="mb-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl p-5 border border-indigo-100 dark:border-indigo-800/40">
            <p class="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed font-medium">
              Define conceptos, conéctalos con relaciones, evalúa tu dominio y recibe un plan de estudio personalizado.
            </p>
            <p class="text-xs text-indigo-500/60 dark:text-indigo-400/60 mt-2 font-medium">100% gratis · sin registro · sin internet</p>
          </div>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="s in subjects" :key="s.id"
                 @click="$emit('select', s)"
                 class="subject-card card-hover bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 cursor-pointer relative group">
              <div class="flex items-center gap-2 mb-1">
                <span class="shrink-0 w-4 h-4 text-indigo-400 inline-flex items-center justify-center" v-html="icon('bookOpen')"></span>
                <h3 class="font-bold text-lg" v-text="s.name"></h3>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 ml-6" v-text="s.description || 'Sin descripci\u00f3n'"></p>
              <div class="flex items-center gap-3 mt-3 ml-6 text-xs text-slate-400 dark:text-slate-500">
                <span v-text="s.concepts.length + ' conceptos'"></span>
                <span v-text="s.relations.length + ' relaciones'"></span>
              </div>
              <button @click.stop="$emit('deleteSubject', s)"
                      class="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-lg bg-white/80 dark:bg-slate-700/80 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition border border-slate-200 dark:border-slate-600"
                      :title="'Borrar ' + s.name">
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg>
              </button>
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

          <div class="flex flex-wrap gap-2 mt-4 justify-start">
            <button @click="$emit('templateInfo')" class="flex items-center gap-1 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">
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
    emits: ['select', 'add', 'help', 'tutorial', 'example', 'globalGraph', 'import', 'exportTemplate', 'importSubject', 'deleteSubject'],
    methods: {
      icon(name) { return (GC.SVG || {})[name] || ''; }
    }
  };
})();
