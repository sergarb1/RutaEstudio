(function() {
  if (!GC.components) GC.components = {};
  GC.components['results-tab'] = {
    props: {
      subject: Object,
      lastAssessment: Object,
      overallScore: Number,
      stats: Object,
      roadmapGroups: Object,
      planAlgorithm: String,
      subjectAssessmentsList: Array,
      root: Object
    },
    template: `
      <div class="tab-fade-in space-y-4">
        <div v-if="!lastAssessment"
             class="text-center py-12 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <svg class="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          <p class="font-medium">A\u00fan no hay evaluaciones</p>
          <p class="text-sm mt-1">Haz una evaluaci\u00f3n en la pesta\u00f1a "Evaluar"</p>
        </div>
        <div v-if="lastAssessment">
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-bold">Resumen</h3>
              <div class="flex items-center gap-2">
                <span class="text-lg font-black text-indigo-600 dark:text-indigo-400" v-text="overallScore + '% global'"></span>
                <span class="text-xs text-slate-400 dark:text-slate-500" v-text="new Date(lastAssessment.date).toLocaleDateString()"></span>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="bg-red-50 dark:bg-red-900/20 rounded-xl p-3">
                <p class="text-2xl font-black text-red-600 dark:text-red-400" v-text="stats.red"></p>
                <p class="text-xs text-red-500 dark:text-red-400">Repasar</p>
              </div>
              <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3">
                <p class="text-2xl font-black text-amber-600 dark:text-amber-400" v-text="stats.yellow"></p>
                <p class="text-xs text-amber-500 dark:text-amber-400">Reforzar</p>
              </div>
              <div class="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
                <p class="text-2xl font-black text-green-600 dark:text-green-400" v-text="stats.green"></p>
                <p class="text-xs text-green-500 dark:text-green-400">Dominado</p>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 mb-4 overflow-hidden">
            <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5 text-white/90 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
                <h3 class="font-bold text-white text-lg">Recomendaci\u00f3n de estudio</h3>
              </div>
              <p class="text-indigo-100 text-sm mt-1">Basado en tu \u00faltima evaluaci\u00f3n del {{ new Date(lastAssessment.date).toLocaleDateString() }}</p>
            </div>
            <div class="p-5 space-y-4">
              <div class="flex items-center gap-3 text-sm">
                <span class="font-medium text-slate-700 dark:text-slate-300">Progreso global:</span>
                <div class="flex-1 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div class="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500 transition-all duration-700"
                       :style="{ width: overallScore + '%' }"></div>
                </div>
                <span class="font-bold text-lg" :class="overallScore >= 70 ? 'text-green-600' : overallScore >= 40 ? 'text-amber-600' : 'text-red-600'" v-text="overallScore + '%'"></span>
              </div>

              <div>
                <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-3">Tu ruta de estudio</p>
                <div class="space-y-2">
                  <div v-if="roadmapGroups.ahora.length">
                    <p class="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1 mb-1.5">
                      <svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg>
                      Ahora \u2014 prioritarios ({{ roadmapGroups.ahora.length }})
                    </p>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="item in roadmapGroups.ahora" :key="item.id"
                            @click="root.openInspector(item.id)"
                            class="roadmap-tag text-xs px-2.5 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800/40 cursor-pointer hover:bg-red-100 dark:hover:bg-red-800/40 transition font-medium">
                        {{ item.name }}
                        <span class="opacity-60" v-text="' ' + item.mastery + '%'"></span>
                      </span>
                    </div>
                  </div>
                  <div v-if="roadmapGroups.siguiente.length">
                    <p class="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-1.5">
                      <svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg>
                      Siguiente \u2014 preparados ({{ roadmapGroups.siguiente.length }})
                    </p>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="item in roadmapGroups.siguiente" :key="item.id"
                            @click="root.openInspector(item.id)"
                            class="text-xs px-2.5 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40 cursor-pointer hover:bg-amber-100 dark:hover:bg-amber-800/40 transition font-medium">
                        {{ item.name }}
                        <span class="opacity-60" v-text="' ' + item.mastery + '%'"></span>
                      </span>
                    </div>
                  </div>
                  <div v-if="roadmapGroups.pronto.length">
                    <p class="text-xs font-bold text-green-600 dark:text-green-400 flex items-center gap-1 mb-1.5">
                      <svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg>
                      Pronto \u2014 avanzados / bloqueados ({{ roadmapGroups.pronto.length }})
                    </p>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="item in roadmapGroups.pronto" :key="item.id"
                            @click="root.openInspector(item.id)"
                            class="text-xs px-2.5 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/40 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800/40 transition font-medium">
                        {{ item.name }}
                        <span class="opacity-60" v-text="' ' + item.mastery + '%'"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div class="flex items-center justify-between mb-3">
                  <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Plan detallado</p>
                  <div class="flex gap-1 text-xs bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
                    <button @click="root.planAlgorithm='bfs'"
                            :class="planAlgorithm==='bfs'?'bg-white dark:bg-slate-600 shadow-sm':'hover:bg-slate-50 dark:hover:bg-slate-600'"
                            class="px-3 py-1.5 rounded font-medium transition">BFS</button>
                    <button @click="root.planAlgorithm='dfs'"
                            :class="planAlgorithm==='dfs'?'bg-white dark:bg-slate-600 shadow-sm':'hover:bg-slate-50 dark:hover:bg-slate-600'"
                            class="px-3 py-1.5 rounded font-medium transition">DFS</button>
                    <button @click="root.planAlgorithm='desbloqueador'"
                            :class="planAlgorithm==='desbloqueador'?'bg-amber-500 text-white shadow-sm':'hover:bg-slate-50 dark:hover:bg-slate-600'"
                            class="px-3 py-1.5 rounded font-medium transition"><svg class="w-3.5 h-3.5 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 012 12 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/></svg> Desbloqueador</button>
                  </div>
                </div>
                <p v-if="root.studyPlan().repasar.length === 0 && root.studyPlan().reforzar.length === 0"
                   class="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> \u00a1Todo dominado! Sigue as\u00ed</p>
                <div v-if="root.studyPlan().repasar.length > 0" class="mb-4">
                  <p class="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-1 mb-2"><svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg> Repasar (dominio &lt; 40%)</p>
                  <div class="space-y-2">
                    <div v-for="item in root.studyPlan().repasar" :key="item.id"
                         class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-xl p-3">
                      <p class="font-medium text-sm" v-text="item.name"></p>
                      <p class="text-xs text-red-500 dark:text-red-400 mt-0.5" v-text="'Dominio: '+lastAssessment.results[item.id]+'%'"></p>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" v-text="item.recommendation"></p>
                    </div>
                  </div>
                </div>
                <div v-if="root.studyPlan().reforzar.length > 0" class="mb-4">
                  <p class="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-2"><svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg> Reforzar (dominio 40-70%)</p>
                  <div class="space-y-2">
                    <div v-for="item in root.studyPlan().reforzar" :key="item.id"
                         class="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 rounded-xl p-3">
                      <p class="font-medium text-sm" v-text="item.name"></p>
                      <p class="text-xs text-amber-500 dark:text-amber-400 mt-0.5" v-text="'Dominio: '+lastAssessment.results[item.id]+'%'"></p>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" v-text="item.recommendation"></p>
                    </div>
                  </div>
                </div>
                <div v-if="root.studyPlan().avanzar.length > 0">
                  <p class="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1 mb-2"><svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg> Listo para avanzar (dominio &gt; 70%)</p>
                  <div class="space-y-2">
                    <div v-for="item in root.studyPlan().avanzar" :key="item.id"
                         class="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40 rounded-xl p-3">
                      <p class="font-medium text-sm" v-text="item.name"></p>
                      <p class="text-xs text-green-500 dark:text-green-400 mt-0.5" v-text="'Dominio: '+lastAssessment.results[item.id]+'%'"></p>
                      <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" v-text="item.recommendation"></p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <button @click="root.startAssessment()"
                        class="flex items-center gap-1.5 text-xs min-h-[40px] sm:min-h-[36px] bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
                  <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
                  Nueva evaluaci\u00f3n
                </button>
                <button @click="root.exportStudyPlanText()"
                        class="flex items-center gap-1.5 text-xs min-h-[40px] sm:min-h-[36px] bg-white dark:bg-slate-700 border dark:border-slate-600 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition">
                  <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
                  Exportar plan
                </button>
                <button @click="root.startStudy()"
                        class="flex items-center gap-1.5 text-xs min-h-[40px] sm:min-h-[36px] bg-white dark:bg-slate-700 border dark:border-slate-600 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition">
                  <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
                  Flashcards
                </button>
              </div>
            </div>
          </div>

          <div v-if="subjectAssessmentsList.length >= 2"
               class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-4">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-bold flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg> {{ GC.t('results.evolution') }}</h3>
              <span class="text-xs text-slate-400 dark:text-slate-500" v-text="subjectAssessmentsList.length + ' evaluaciones'"></span>
            </div>
            <div class="progress-chart" v-html="root.progressChartSVG()"></div>
          </div>

          <div class="grid sm:grid-cols-2 gap-4 mb-4">
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <h3 class="font-bold text-sm mb-2">{{ GC.t('results.summary') }}</h3>
              <div v-html="root.distributionDonutSVG()"></div>
            </div>
            <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
              <h3 class="font-bold text-sm mb-2">{{ GC.t('tab.concepts') }}</h3>
              <div v-html="root.conceptBarsSVG()"></div>
            </div>
          </div>

          <div v-if="subjectAssessmentsList.length >= 2"
               class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-4">
            <h3 class="font-bold text-sm mb-2 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg> Actividad por semana</h3>
            <div v-html="root.activityBarsSVG()"></div>
          </div>

          <div v-if="subjectAssessmentsList.length >= 2"
               class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-4">
            <h3 class="font-bold text-sm mb-2 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg> Predicci\u00f3n de puntuaciones (regresi\u00f3n lineal)</h3>
            <p class="text-xs text-slate-400 mb-3">Cambio estimado en la pr\u00f3xima evaluaci\u00f3n por concepto</p>
            <div v-html="root.predictionChartSVG()"></div>
          </div>
        </div>
      </div>
    `
  };
})();
