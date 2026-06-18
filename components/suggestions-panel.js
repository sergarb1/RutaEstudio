(function() {
  if (!GC.components) GC.components = {};

  GC.components['suggestions-panel'] = {
    template: `
      <div>
        <button @click="$emit('back')" class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4 flex items-center gap-1 hover:underline transition">&larr; Volver</button>

        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">\uD83D\uDCA1</span>
            <div>
              <h2 class="text-lg font-bold">Sugerencias y an\u00e1lisis</h2>
              <p class="text-xs text-slate-400 dark:text-slate-500">Recomendaciones basadas en tus evaluaciones</p>
            </div>
          </div>

          <div v-if="!assessments.length" class="text-center py-8 text-slate-400 dark:text-slate-500">
            <p class="text-3xl mb-2">\uD83D\uDCCA</p>
            <p class="font-medium">A\u00fan no hay evaluaciones</p>
            <p class="text-sm mt-1">Selecciona una asignatura y ve a la pesta\u00f1a <strong>Evaluar</strong> para valorar tu dominio de cada concepto.</p>
            <p class="text-xs mt-2">Las sugerencias aparecer\u00e1n autom\u00e1ticamente despu\u00e9s de evaluar.</p>
          </div>

          <div v-else-if="!suggestions.length" class="text-center py-8 text-slate-400 dark:text-slate-500">
            <p class="text-lg mb-1">\uD83C\uDF89</p>
            <p>No hay sugerencias por ahora. \u00a1Todo va bien!</p>
          </div>

          <div v-else class="space-y-3">
            <div v-for="(s, i) in suggestions" :key="i"
                 class="rounded-xl p-4 border"
                 :class="cardClass(s.type)">
              <div class="flex items-start gap-3">
                <span class="text-lg" v-text="iconFor(s.type)"></span>
                <div>
                  <p class="text-sm font-medium" v-text="s.subject ? 'En ' + s.subject : 'General'"></p>
                  <p class="text-sm mt-0.5 opacity-90" v-text="s.text"></p>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 class="font-bold text-sm mb-2">\uD83D\uDCCC Estad\u00edsticas r\u00e1pidas</h3>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400" v-text="subjects.length"></p>
                <p class="text-xs text-slate-400 dark:text-slate-500">Asignaturas</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400" v-text="totalConcepts"></p>
                <p class="text-xs text-slate-400 dark:text-slate-500">Conceptos</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400" v-text="totalRelations"></p>
                <p class="text-xs text-slate-400 dark:text-slate-500">Relaciones</p>
              </div>
              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 text-center">
                <p class="text-2xl font-black text-indigo-600 dark:text-indigo-400" v-text="assessments.length"></p>
                <p class="text-xs text-slate-400 dark:text-slate-500">Evaluaciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      subjects: Array,
      assessments: Array,
      suggestions: Array
    },
    emits: ['back'],
    computed: {
      totalConcepts() {
        return this.subjects.reduce((sum, s) => sum + s.concepts.length, 0);
      },
      totalRelations() {
        return this.subjects.reduce((sum, s) => sum + s.relations.length, 0);
      }
    },
    methods: {
      cardClass(type) {
        const map = {
          critical: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/40',
          warning: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800/40',
          encourage: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/40',
          improvement: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/40',
          decline: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/40',
          crosslink: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800/40'
        };
        return map[type] || 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700';
      },
      iconFor(type) {
        const map = {
          critical: '\u26A0\uFE0F',
          warning: '\u26A0\uFE0F',
          encourage: '\uD83D\uDCAA',
          improvement: '\uD83D\uDCC8',
          decline: '\uD83D\uDCC9',
          crosslink: '\uD83D\uDD17'
        };
        return map[type] || '\uD83D\uDCA1';
      }
    }
  };
})();
