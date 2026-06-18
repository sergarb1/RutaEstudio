(function() {
  if (!GC.components) GC.components = {};

  GC.components['subject-list'] = {
    template: `
      <div>
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold">Mis asignaturas</h2>
          <div class="flex gap-2">
            <button @click="$emit('aiGenerator')" class="text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition" title="Generar con IA">\uD83E\uDD16 IA</button>
            <button @click="$emit('help')" class="text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition" title="Ayuda">\u2753 Ayuda</button>
            <button @click="$emit('add')" class="bg-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">+ Nueva</button>
          </div>
        </div>

        <div v-if="subjects.length === 0" class="text-center py-12 text-slate-400 dark:text-slate-500">
          <p class="text-5xl mb-4">\uD83E\uDDE0</p>
          <p class="text-lg font-medium text-slate-600 dark:text-slate-300">Tu ruta de estudio est\u00e1 vac\u00eda</p>
          <p class="text-sm mt-1 max-w-md mx-auto">Conecta conceptos, domina tu ruta. Estudia con prop\u00f3sito.</p>
          <p class="text-xs mt-1 text-slate-400">A\u00f1ade asignaturas, conceptos y relaciones para empezar.</p>

          <div class="flex flex-wrap justify-center gap-3 mt-6">
            <button @click="$emit('add')" class="bg-indigo-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition text-sm">\uD83D\uDCCB Crear asignatura</button>
            <button @click="$emit('import')" class="bg-white dark:bg-slate-800 border dark:border-slate-600 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition text-sm">\u2B07 Importar datos</button>
            <button @click="$emit('aiGenerator')" class="bg-amber-500 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-amber-600 transition text-sm">\uD83E\uDD16 Generar con IA</button>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 max-w-sm mx-auto">
            <p class="text-xs mb-2">\u00bfPrimera vez? Prueba con datos de ejemplo:</p>
            <button @click="$emit('example')" class="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 font-medium px-4 py-2 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition">\uD83D\uDE80 Cargar ejemplo</button>
          </div>
        </div>

        <div v-if="subjects.length > 0">
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="s in subjects" :key="s.id"
                 @click="$emit('select', s)"
                 class="subject-card bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 cursor-pointer">
              <h3 class="font-bold text-lg" v-text="s.name"></h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 mt-1" v-text="s.description || 'Sin descripci\u00f3n'"></p>
              <div class="flex items-center gap-3 mt-3 text-xs text-slate-400 dark:text-slate-500">
                <span v-text="s.concepts.length + ' conceptos'"></span>
                <span v-text="s.relations.length + ' relaciones'"></span>
              </div>
            </div>
          </div>

          <div v-if="subjects.length >= 2" class="mt-6">
            <button @click="$emit('globalGraph')" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-indigo-300 dark:hover:border-indigo-500 transition cursor-pointer">
              <span class="text-lg font-bold text-indigo-600 dark:text-indigo-400">\uD83D\uDD17 Ver grafo global de todas las asignaturas</span>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Relaciones entre conceptos de diferentes materias</p>
            </button>
          </div>

          <div v-if="subjects.length >= 1" class="mt-4">
            <button @click="$emit('suggestions')" class="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 text-center hover:border-amber-300 dark:hover:border-amber-500 transition cursor-pointer">
              <span class="text-lg font-bold text-amber-600 dark:text-amber-400">\uD83D\uDCA1 Sugerencias y an\u00e1lisis</span>
              <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">Recomendaciones basadas en tus evaluaciones</p>
            </button>
          </div>

          <div class="flex gap-2 mt-4">
            <button @click="$emit('exportTemplate')" class="text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">\uD83D\uDCDD Plantilla</button>
            <button @click="$emit('import')" class="text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">\u2B07 Importar todo</button>
            <button @click="$emit('importSubject')" class="text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium transition">\u2B07 Importar asignatura</button>
          </div>
        </div>
      </div>
    `,
    props: {
      subjects: Array
    },
    emits: ['select', 'add', 'help', 'example', 'globalGraph', 'suggestions', 'aiGenerator', 'import', 'exportTemplate', 'importSubject']
  };
})();
