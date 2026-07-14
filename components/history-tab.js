(function() {
  if (!GC.components) GC.components = {};
  GC.components['history-tab'] = {
    props: {
      subjectAssessmentsList: Array,
      root: Object
    },
    template: `
      <div class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold">Historial de evaluaciones</h3>
        </div>
        <p v-if="subjectAssessmentsList.length === 0" class="text-sm text-slate-400 dark:text-slate-500 py-8 text-center">A\u00fan no hay evaluaciones para esta asignatura</p>
        <div class="space-y-3">
          <div v-for="a in subjectAssessmentsList" :key="a.id"
               class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700 transition">
            <div class="flex items-start gap-3">
              <div class="flex-1 min-w-0">
                <div @click="root.viewAssessment(a)" class="cursor-pointer">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-sm font-medium" v-text="new Date(a.date).toLocaleDateString()"></span>
                    <span class="text-xs text-slate-400 dark:text-slate-500" v-text="Object.keys(a.results).length + ' conceptos'"></span>
                  </div>
                  <div class="flex gap-2">
                    <span class="text-xs px-2 py-0.5 rounded bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 font-medium" v-text="GC.heatCount(a.results,'red')+' repasar'"></span>
                    <span class="text-xs px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-medium" v-text="GC.heatCount(a.results,'yellow')+' reforzar'"></span>
                    <span class="text-xs px-2 py-0.5 rounded bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 font-medium" v-text="GC.heatCount(a.results,'green')+' dominado'"></span>
                  </div>
                </div>
                <button @click.stop="root.deleteAssessment(a.id)" class="mt-2 text-xs text-red-400 hover:text-red-600 transition">Eliminar evaluaci\u00f3n</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  };
})();
