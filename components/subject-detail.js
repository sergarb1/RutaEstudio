(function() {
  if (!GC.components) GC.components = {};

  GC.components['subject-detail'] = {
    props: {
      root: Object,
      currentSubject: Object,
      filteredConcepts: Array,
      allRelationTypes: Array,
      lastAssessment: Object,
      overallScore: Number,
      stats: Object,
      roadmapGroups: Object,
      planAlgorithm: String,
      subjectAssessmentsList: Array,
      graphLoading: Boolean,
      graphRelFilter: String,
      graphWeightMin: Number,
      showLegend: Boolean,
      assessScores: Object
    },
    emits: ['back', 'edit-subject', 'export-json'],
    template: `
      <div class="fade-enter-active">
        <button @click="$emit('back')" class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4 flex items-center gap-1.5 hover:underline transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          {{ GC.t('btn.back') }}
        </button>

        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold" v-text="currentSubject.name"></h2>
            <p class="text-sm text-slate-500 dark:text-slate-400" v-text="currentSubject.description"></p>
          </div>
          <div class="flex gap-2">
            <button @click="$emit('export-json')" class="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 font-medium transition hover:bg-slate-50 dark:hover:bg-slate-700" :title="GC.t('subject.export')">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
              {{ GC.t('subject.export') }}
            </button>
            <button @click="$emit('edit-subject')" class="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 font-medium transition hover:bg-slate-50 dark:hover:bg-slate-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/></svg>
              {{ GC.t('btn.edit') }}
            </button>
          </div>
        </div>

        <div class="flex gap-3 mb-4 text-xs">
          <span class="flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            <span v-text="currentSubject.concepts.length"></span> {{ GC.t('tab.concepts') }}
          </span>
          <span class="flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.04 1.757-1.757a4.5 4.5 0 0 1 6.364 6.364l-4.5 4.5a4.5 4.5 0 0 1-1.242-7.244"/></svg>
            <span v-text="currentSubject.relations.length"></span> {{ GC.t('relation.new') }}
          </span>
          <span class="flex items-center gap-1.5 bg-white dark:bg-slate-800 rounded-lg px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>
            <span v-text="subjectAssessmentsList.length"></span> {{ GC.t('assess.title') }}
          </span>
          <span v-if="root.isolatedCount > 0" class="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-1.5 border border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 text-xs font-medium">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/></svg>
            <span v-text="root.isolatedCount"></span> aislados
          </span>
        </div>

        <div class="relative mb-4">
          <div class="flex gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 text-sm font-medium overflow-x-auto tabs-scroll">
            <button @click="root.tab='concepts'"
                    :class="root.tab==='concepts'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                    class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
              {{ GC.t('tab.concepts') }}
            </button>
            <button @click="root.tab='graph'"
                    :class="root.tab==='graph'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                    class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.04 1.757-1.757a4.5 4.5 0 0 1 6.364 6.364l-4.5 4.5a4.5 4.5 0 0 1-1.242-7.244"/></svg>
              {{ GC.t('tab.graph') }}
            </button>
            <button @click="root.tab='assess'"
                    :class="root.tab==='assess'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                    class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Zm0 0h6.75"/></svg>
              {{ GC.t('tab.assess') }}
            </button>
            <button @click="root.tab='results'"
                    :class="root.tab==='results'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                    class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
              {{ GC.t('tab.results') }}
            </button>
            <button @click="root.tab='history'"
                    :class="root.tab==='history'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                    class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
              <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
              {{ GC.t('tab.history') }}
            </button>
          </div>
        </div>

        <concepts-tab v-if="root.tab === 'concepts'"
          :subject="currentSubject"
          :filtered-concepts="filteredConcepts"
          :all-relation-types="allRelationTypes"
          :root="root" />

        <graph-tab v-if="root.tab === 'graph'"
          :subject="currentSubject"
          :all-relation-types="allRelationTypes"
          :graph-loading="graphLoading"
          :graph-rel-filter="graphRelFilter"
          :graph-weight-min="graphWeightMin"
          :show-legend="showLegend"
          :root="root" />

        <assess-tab v-if="root.tab === 'assess'"
          :subject="currentSubject"
          :assess-scores="assessScores"
          :root="root" />

        <results-tab v-if="root.tab === 'results'"
          :subject="currentSubject"
          :last-assessment="lastAssessment"
          :overall-score="overallScore"
          :stats="stats"
          :roadmap-groups="roadmapGroups"
          :plan-algorithm="planAlgorithm"
          :subject-assessments-list="subjectAssessmentsList"
          :root="root" />

        <history-tab v-if="root.tab === 'history'"
          :subject-assessments-list="subjectAssessmentsList"
          :root="root" />
      </div>
    `
  };
})();
