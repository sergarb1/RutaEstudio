(function() {
  if (!GC.components) GC.components = {};

  var dataKeys = ['view','currentSubject','tab','conceptSearch','tagFilter','bulkTagMode','bulkTagValue','bulkChecked','inlineEditId','inlineEditName','inlineEditDesc','dragId','showRelationForm','relFormFrom','relFormTo','relFormType','showLegend','graphRelFilter','graphWeightMin','currentRelationType','assessScores','planAlgorithm','inspectorConcept','inspectorTab','newResourceType','newResourceUrl','newResourceTitle'];
  var computedKeys = ['GC','store','subjects','assessments','filteredConcepts','allRelationTypes','isolatedCount','subjectAssessmentsList','lastAssessment','overallScore','stats','roadmapGroups','inspector','availableTags','graphLoading'];
  var methodKeys = ['destroyGraph','exportSubjectJSON','editSubject','addConcept','toggleBulkTag','exportConceptsCSV','importConceptsCSV','applyBulkTag','dragStart','dragOver','dropConcept','dragEnd','startInlineEdit','saveInlineEdit','cancelInlineEdit','openInspector','editConcept','deleteConcept','addRelationFromForm','deleteRelation','conceptName','relBadgeClass','relBadgeStyle','openCustomTypes','submitAssessment','startAssessment','exportStudyPlanText','startStudy','studyPlan','progressChartSVG','distributionDonutSVG','conceptBarsSVG','activityBarsSVG','predictionChartSVG','viewAssessment','deleteAssessment','weightLevel','tagColor','closeInspector','addResource','removeResource'];

  var computed = {};
  dataKeys.forEach(function(k) {
    computed[k] = { get: function() { return this.$parent[k]; }, set: function(v) { this.$parent[k] = v; } };
  });
  computedKeys.forEach(function(k) {
    computed[k] = function() { return this.$parent[k]; };
  });

  var methods = {};
  methodKeys.forEach(function(k) {
    methods[k] = function() { return this.$parent[k].apply(this.$parent, arguments); };
  });

  // Special: toggleFocusMode and $parent.$parent.check is not needed since we handle focus outside the component
  methods.toggleFocusMode = function() { return this.$parent.toggleFocusMode ? this.$parent.toggleFocusMode() : null; };

  GC.components['subject-detail'] = {
    template: `
      <div class="fade-enter-active">
        <button @click="view='subjects'; destroyGraph()" class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4 flex items-center gap-1.5 hover:underline transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"/></svg>
          {{ GC.t('btn.back') }}
        </button>

        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-xl font-bold" v-text="currentSubject.name"></h2>
            <p class="text-sm text-slate-500 dark:text-slate-400" v-text="currentSubject.description"></p>
          </div>
          <div class="flex gap-2">
            <button @click="exportSubjectJSON()" class="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 font-medium transition hover:bg-slate-50 dark:hover:bg-slate-700" :title="GC.t('subject.export')">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
              {{ GC.t('subject.export') }}
            </button>
            <button @click="editSubject()" class="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-3 py-2 font-medium transition hover:bg-slate-50 dark:hover:bg-slate-700">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"/></svg>
              {{ GC.t('btn.edit') }}
            </button>
          </div>
        </div>

        <!-- Quick stats -->
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
          <span v-if="isolatedCount > 0" class="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-1.5 border border-amber-200 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 text-xs font-medium">
            <svg class="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"/></svg>
            <span v-text="isolatedCount"></span> aislados
          </span>
        </div>

        <!-- Tabs -->
        <div class="relative mb-4">
          <div class="flex gap-1 bg-white dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 text-sm font-medium overflow-x-auto tabs-scroll">
          <button @click="tab='concepts'"
                  :class="tab==='concepts'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            {{ GC.t('tab.concepts') }}
          </button>
          <button @click="tab='graph'"
                  :class="tab==='graph'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.04 1.757-1.757a4.5 4.5 0 0 1 6.364 6.364l-4.5 4.5a4.5 4.5 0 0 1-1.242-7.244"/></svg>
            {{ GC.t('tab.graph') }}
          </button>
          
          <button @click="tab='assess'"
                  :class="tab==='assess'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15a2.25 2.25 0 0 1 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25Zm0 0h6.75"/></svg>
            {{ GC.t('tab.assess') }}
          </button>
          <button @click="tab='results'"
                  :class="tab==='results'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
            {{ GC.t('tab.results') }}
          </button>
          <button @click="tab='history'"
                  :class="tab==='history'?'bg-indigo-600 text-white':'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'"
                  class="flex items-center gap-1.5 px-4 py-2 rounded-lg transition flex-shrink-0">
            <svg class="w-4 h-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            {{ GC.t('tab.history') }}
          </button>
          
        </div>
        </div>

        <div v-if="tab === 'concepts'" class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h3 class="font-bold">Conceptos</h3>
            <div class="flex items-center gap-2 flex-wrap">
              <input v-model="conceptSearch" :placeholder="GC.t('concept.search')"
                     class="border dark:border-slate-600 rounded-lg px-3 py-2 sm:py-1.5 text-xs bg-transparent w-32 sm:w-36 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
              <select v-if="availableTags.length" v-model="tagFilter"
                      class="border dark:border-slate-600 rounded-lg px-2 py-2 sm:py-1.5 text-xs bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400">
                <option value="">{{ GC.t('concept.allTags') }}</option>
                <option v-for="t in availableTags" :key="t" :value="t" v-text="t"></option>
              </select>
              <button @click="addConcept()" class="min-h-[36px] bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition flex-shrink-0">{{ GC.t('concept.add') }}</button>
              <button @click="toggleBulkTag()"
                      :class="bulkTagMode ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 border dark:border-slate-600'"
                       class="min-h-[36px] text-xs border rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition"><svg class="w-3 h-3 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/></svg> {{ GC.t('concept.bulk') }}</button>
              <button @click="exportConceptsCSV()" class="min-h-[36px] text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition" title="Exportar CSV">CSV</button>
              <button @click="importConceptsCSV()" class="min-h-[36px] text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition" title="Importar CSV"><svg class="w-3 h-3 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg> CSV</button>
            </div>
          </div>

          <!-- Bulk tag bar -->
          <div v-if="bulkTagMode" class="flex items-center gap-2 mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/40">
            <span class="text-xs text-amber-700 dark:text-amber-300 font-medium flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/></svg> Marca los conceptos y asigna etiqueta:</span>
            <input v-model="bulkTagValue" placeholder="Nombre de etiqueta" class="flex-1 border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-2 py-1.5 text-xs" />
            <button @click="applyBulkTag()" class="bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-amber-700 transition">Aplicar</button>
            <button @click="toggleBulkTag()" class="text-xs text-slate-400 hover:underline">Cancelar</button>
          </div>

          <p v-if="currentSubject.concepts.length === 0" class="text-sm text-slate-400 dark:text-slate-500 py-12 text-center">
            <svg class="w-8 h-8 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
            Aún no hay conceptos. ¡Añade el primero o usa el asistente IA!
          </p>
          <p v-if="currentSubject.concepts.length > 0 && filteredConcepts.length === 0" class="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">Ningún concepto coincide con "{{ conceptSearch }}"</p>

          <div class="space-y-1">
            <div v-for="c in filteredConcepts" :key="c.id"
                 draggable="true"
                 @dragstart="dragStart(c, $event)"
                 @dragover.prevent="dragOver(c, $event)"
                 @drop.prevent="dropConcept(c)"
                 @dragend="dragEnd()"
                 class="concept-row flex items-center gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-2 sm:p-3 border border-slate-100 dark:border-slate-700"
                 :class="{'opacity-40 border-dashed border-indigo-400': dragId === c.id}">
              <input v-if="bulkTagMode" type="checkbox" v-model="bulkChecked[c.id]" class="rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
              <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 w-6 cursor-grab active:cursor-grabbing shrink-0" v-text="currentSubject.concepts.indexOf(c)+1"></span>
              <div class="flex-1 min-w-0">
                <template v-if="inlineEditId === c.id">
                  <input v-model="inlineEditName" @keyup.enter="saveInlineEdit()" @keyup.escape="cancelInlineEdit()"
                         class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded px-2 py-1 text-sm mb-1 font-medium" />
                  <textarea v-model="inlineEditDesc" @keyup.escape="cancelInlineEdit()"
                            class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded px-2 py-1 text-xs" rows="1"></textarea>
                  <div class="flex gap-1 mt-1">
                    <button @click="saveInlineEdit()" class="text-xs text-green-600 font-medium">Guardar</button>
                    <button @click="cancelInlineEdit()" class="text-xs text-slate-400">Cancelar</button>
                  </div>
                </template>
                <template v-if="inlineEditId !== c.id">
                  <p class="font-medium text-sm" @dblclick="startInlineEdit(c.id)" v-text="c.name"></p>
                  <p class="text-xs text-slate-400 dark:text-slate-500 truncate" @dblclick="startInlineEdit(c.id)" v-html="GC.md(c.description) || '<span class=text-slate-300>\u2014</span>'"></p>
                </template>
                <div v-if="c.tags?.length && inlineEditId !== c.id" class="flex flex-wrap gap-1.5 mt-1.5">
                  <span v-for="t in c.tags" :key="t"
                        class="tag-badge" :style="{ backgroundColor: tagColor(t).bg, color: tagColor(t).fg }" v-text="t"></span>
                </div>
              </div>
              <span class="weight-badge" :class="'weight-' + weightLevel(c.weight)" v-text="c.weight"></span>
              <button @click="openInspector(c.id)" class="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] flex items-center justify-center text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20" title="Inspector">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
              </button>
              <button @click="editConcept(c.id)" class="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] flex items-center justify-center text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">✏️</button>
              <button @click="deleteConcept(c.id)" class="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] flex items-center justify-center text-red-400 hover:text-red-600 dark:hover:text-red-300 transition rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">✕</button>
            </div>
          </div>

          <!-- Relations section -->
          <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div class="flex items-center justify-between mb-3">
              <h3 class="font-bold">Relaciones</h3>
              <div class="flex gap-2">
                <button @click="showRelationForm = !showRelationForm"
                        class="text-xs bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                        v-text="showRelationForm ? 'Cerrar' : '+ Nueva relaci\u00f3n'"></button>
                <button @click="openCustomTypes()"
                        class="text-xs bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition">
                  Gestionar tipos
                </button>
              </div>
            </div>

            <div v-if="showRelationForm"
                 class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-3 space-y-2">
              <div class="grid sm:grid-cols-3 gap-2">
                <select v-model="relFormFrom" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                  <option value="">Concepto origen</option>
                  <option v-for="c in currentSubject.concepts" :key="c.id" :value="c.id" v-text="c.name"></option>
                </select>
                <select v-model="relFormType" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                  <option v-for="t in allRelationTypes" :key="t.id" :value="t.id" v-text="t.name"></option>
                </select>
                <select v-model="relFormTo" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                  <option value="">Concepto destino</option>
                  <option v-for="c in currentSubject.concepts" :key="c.id" :value="c.id" v-text="c.name"></option>
                </select>
              </div>
              <button @click="addRelationFromForm()" class="w-full bg-indigo-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-indigo-700 transition" :disabled="!relFormFrom || !relFormTo">Crear relacione</button>
            </div>

            <div class="space-y-2">
              <div v-for="(r, i) in currentSubject.relations" :key="i"
                   class="flex items-center gap-2 text-sm bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-100 dark:border-slate-700">
                <span class="font-medium text-indigo-600 dark:text-indigo-400" v-text="conceptName(r.from)"></span>
                <span class="text-xs px-1.5 py-0.5 rounded font-medium"
                      :class="relBadgeClass(r.type) || 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'"
                      :style="relBadgeStyle(r.type)"
                      v-text="GC.store.getRelationTypeInfo(r.type).name"></span>
                <span class="font-medium text-indigo-600 dark:text-indigo-400" v-text="conceptName(r.to)"></span>
                <button @click="deleteRelation(i)" class="ml-auto text-xs text-red-500 dark:text-red-400 hover:underline">✕</button>
              </div>
            </div>
            <p v-if="currentSubject.relations.length === 0" class="text-xs text-slate-400 dark:text-slate-500">Usa el formulario o la pesta\u00f1a Grafo para conectar conceptos</p>
          </div>
        </div>

        <!-- Graph tab -->
        <div v-if="tab === 'graph'" class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 relative">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <h3 class="font-bold">Grafo de conceptos</h3>
            <div class="flex items-center gap-2">
              <div v-if="graphLoading" class="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
                <span class="inline-block w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                Renderizando...
              </div>
              <button @click="showLegend = !showLegend" class="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-2 py-1 hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium">
                <svg v-if="showLegend" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6l12 12"/></svg>
                <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>
                {{ GC.t('graph.legend') }}
              </button>
            </div>
          </div>
          <!-- Filters row -->
          <div class="flex flex-wrap items-center gap-2 mb-3 text-xs">
            <span class="text-slate-400 dark:text-slate-500 font-medium">Filtrar:</span>
            <select v-model="graphRelFilter" class="border dark:border-slate-600 rounded-lg px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">{{ GC.t('graph.allRelations') }}</option>
              <option v-for="t in allRelationTypes" :key="t.id" :value="t.id" v-text="t.name"></option>
            </select>
            <div class="flex items-center gap-1">
              <span class="text-slate-400">Peso min:</span>
              <input type="range" min="1" max="10" v-model.number="graphWeightMin" class="w-20 h-1 accent-indigo-600" />
              <span class="text-slate-400 w-4" v-text="graphWeightMin"></span>
            </div>
          </div>
          <!-- Legend overlay -->
          <div v-if="showLegend" class="absolute top-20 right-2 z-10 bg-white dark:bg-slate-800 rounded-xl p-3 shadow-lg border border-slate-200 dark:border-slate-700 text-xs space-y-1.5 w-44">
            <p class="font-bold mb-1.5 text-slate-500 dark:text-slate-400 uppercase tracking-wide">Tipos de relaci\u00f3n</p>
            <div v-for="t in allRelationTypes" :key="t.id" class="flex items-center gap-2">
              <span class="w-4" :style="{ borderTop: t.dash ? '2px dashed ' + t.color : t.width >= 3 ? '3px solid ' + t.color : '2px solid ' + t.color, borderColor: t.color }"></span>
              <span v-text="t.name"></span>
            </div>
            <p class="font-bold mt-2 mb-1 text-slate-500 dark:text-slate-400 uppercase tracking-wide">Colores de nodo</p>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-green-500 inline-block"></span> &gt;70% Dominado</div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span> 40-70% En proceso</div>
            <div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span> &lt;40% No dominado</div>
          </div>
          <div class="flex flex-wrap gap-1 text-xs">
            <button @click="graphRelFilter=''"
                    :class="!graphRelFilter ? 'text-white bg-slate-500' : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'"
                    class="px-2 py-1 rounded font-medium transition">Todas</button>
            <button v-for="t in allRelationTypes" :key="t.id"
                    @click="currentRelationType=t.id; graphRelFilter=t.id"
                    :class="graphRelFilter===t.id?'text-white':'bg-slate-100 dark:bg-slate-700 dark:text-slate-300'"
                    :style="graphRelFilter===t.id ? { backgroundColor: t.color } : {}"
                    class="px-2 py-1 rounded font-medium transition" v-text="t.name"></button>
          </div>
          <p class="text-xs text-slate-400 dark:text-slate-500 mb-2 mt-2">Haz clic en un concepto origen, luego en un concepto destino para crear una relaci\u00f3n</p>
          <div id="graph-container" class="dark:border dark:border-slate-700"></div>
        </div>

        <!-- Dependency Tree tab -->
        <!-- Assessment tab -->
         <div v-if="tab === 'assess'" class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold">Evaluaci\u00f3n r\u00e1pida</h3>
            <button @click="submitAssessment()" class="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-4 py-2.5 sm:py-2 rounded-xl hover:bg-green-700 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
              Guardar todo
            </button>
          </div>
          <p class="text-xs text-slate-400 dark:text-slate-500 mb-4">Ajusta los sliders para puntuar todos los conceptos de una sola vez</p>
          <div class="space-y-3 max-h-[60vh] overflow-y-auto">
            <div v-for="c in currentSubject.concepts" :key="c.id"
                 class="flex items-center gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl px-3 sm:px-4 py-3 border border-slate-100 dark:border-slate-700">
               <div class="flex-1 min-w-0">
                 <p class="text-sm font-medium truncate" v-text="c.name"></p>
                 <p class="text-xs text-slate-400 truncate" v-text="c.description || '\u2014'"></p>
               </div>
               <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                 <input type="range" min="0" max="100" step="5"
                        v-model.number="assessScores[c.id]"
                        class="w-20 sm:w-28 h-1.5 accent-indigo-600" />
                 <span class="text-xs font-bold w-8 sm:w-10 text-center" v-text="(assessScores[c.id] || 0) + '%'"></span>
               </div>
            </div>
          </div>
        </div>

        <!-- Results tab -->
        <div v-if="tab === 'results'" class="tab-fade-in space-y-4">
          <div v-if="!lastAssessment"
               class="text-center py-12 text-slate-400 dark:text-slate-500 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <svg class="w-10 h-10 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
            <p class="font-medium">A\u00fan no hay evaluaciones</p>
            <p class="text-sm mt-1">Haz una evaluaci\u00f3n en la pesta\u00f1a "Evaluar"</p>
          </div>
          <div v-if="lastAssessment">
            <!-- Summary -->
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

            <!-- Study recommendation + Roadmap -->
            <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 mb-4 overflow-hidden">
              <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4">
                <div class="flex items-center gap-2">
                  <svg class="w-5 h-5 text-white/90 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
                  <h3 class="font-bold text-white text-lg">Recomendaci\u00f3n de estudio</h3>
                </div>
                <p class="text-indigo-100 text-sm mt-1">Basado en tu \u00faltima evaluaci\u00f3n del {{ new Date(lastAssessment.date).toLocaleDateString() }}</p>
              </div>
              <div class="p-5 space-y-4">
                <!-- Summary bar -->
                <div class="flex items-center gap-3 text-sm">
                  <span class="font-medium text-slate-700 dark:text-slate-300">Progreso global:</span>
                  <div class="flex-1 h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div class="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500 transition-all duration-700"
                         :style="{ width: overallScore + '%' }"></div>
                  </div>
                  <span class="font-bold text-lg" :class="overallScore >= 70 ? 'text-green-600' : overallScore >= 40 ? 'text-amber-600' : 'text-red-600'" v-text="overallScore + '%'"></span>
                </div>

                <!-- Roadmap -->
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
                              @click="openInspector(item.id)"
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
                              @click="openInspector(item.id)"
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
                              @click="openInspector(item.id)"
                              class="text-xs px-2.5 py-1.5 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800/40 cursor-pointer hover:bg-green-100 dark:hover:bg-green-800/40 transition font-medium">
                          {{ item.name }}
                          <span class="opacity-60" v-text="' ' + item.mastery + '%'"></span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Detailed study plan -->
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Plan detallado</p>
                    <div class="flex gap-1 text-xs bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5">
                      <button @click="planAlgorithm='bfs'"
                              :class="planAlgorithm==='bfs'?'bg-white dark:bg-slate-600 shadow-sm':'hover:bg-slate-50 dark:hover:bg-slate-600'"
                              class="px-3 py-1.5 rounded font-medium transition">BFS</button>
                      <button @click="planAlgorithm='dfs'"
                              :class="planAlgorithm==='dfs'?'bg-white dark:bg-slate-600 shadow-sm':'hover:bg-slate-50 dark:hover:bg-slate-600'"
                              class="px-3 py-1.5 rounded font-medium transition">DFS</button>
                      <button @click="planAlgorithm='desbloqueador'"
                              :class="planAlgorithm==='desbloqueador'?'bg-amber-500 text-white shadow-sm':'hover:bg-slate-50 dark:hover:bg-slate-600'"
                              class="px-3 py-1.5 rounded font-medium transition"><svg class="w-3.5 h-3.5 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 012 12 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"/></svg> Desbloqueador</button>
                    </div>
                  </div>
                  <p v-if="studyPlan().repasar.length === 0 && studyPlan().reforzar.length === 0"
                     class="text-sm text-green-600 dark:text-green-400 font-medium flex items-center gap-1"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> \u00a1Todo dominado! Sigue as\u00ed</p>
                  <div v-if="studyPlan().repasar.length > 0" class="mb-4">
                    <p class="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-1 mb-2"><svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg> Repasar (dominio &lt; 40%)</p>
                    <div class="space-y-2">
                      <div v-for="item in studyPlan().repasar" :key="item.id"
                           class="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/40 rounded-xl p-3">
                        <p class="font-medium text-sm" v-text="item.name"></p>
                        <p class="text-xs text-red-500 dark:text-red-400 mt-0.5" v-text="'Dominio: '+lastAssessment.results[item.id]+'%'"></p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" v-text="item.recommendation"></p>
                      </div>
                    </div>
                  </div>
                  <div v-if="studyPlan().reforzar.length > 0" class="mb-4">
                    <p class="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mb-2"><svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg> Reforzar (dominio 40-70%)</p>
                    <div class="space-y-2">
                      <div v-for="item in studyPlan().reforzar" :key="item.id"
                           class="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/40 rounded-xl p-3">
                        <p class="font-medium text-sm" v-text="item.name"></p>
                        <p class="text-xs text-amber-500 dark:text-amber-400 mt-0.5" v-text="'Dominio: '+lastAssessment.results[item.id]+'%'"></p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" v-text="item.recommendation"></p>
                      </div>
                    </div>
                  </div>
                  <div v-if="studyPlan().avanzar.length > 0">
                    <p class="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-1 mb-2"><svg class="w-3 h-3" viewBox="0 0 12 12"><circle cx="6" cy="6" r="5" fill="currentColor"/></svg> Listo para avanzar (dominio &gt; 70%)</p>
                    <div class="space-y-2">
                      <div v-for="item in studyPlan().avanzar" :key="item.id"
                           class="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/40 rounded-xl p-3">
                        <p class="font-medium text-sm" v-text="item.name"></p>
                        <p class="text-xs text-green-500 dark:text-green-400 mt-0.5" v-text="'Dominio: '+lastAssessment.results[item.id]+'%'"></p>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5" v-text="item.recommendation"></p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Quick actions -->
                <div class="flex flex-wrap gap-2 pt-2">
                  <button @click="startAssessment()"
                          class="flex items-center gap-1.5 text-xs min-h-[40px] sm:min-h-[36px] bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
                    <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
                    Nueva evaluaci\u00f3n
                  </button>
                  <button @click="exportStudyPlanText()"
                          class="flex items-center gap-1.5 text-xs min-h-[40px] sm:min-h-[36px] bg-white dark:bg-slate-700 border dark:border-slate-600 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition">
                    <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
                    Exportar plan
                  </button>
                  <button @click="startStudy()"
                          class="flex items-center gap-1.5 text-xs min-h-[40px] sm:min-h-[36px] bg-white dark:bg-slate-700 border dark:border-slate-600 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition">
                    <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
                    Flashcards
                  </button>
                </div>
              </div>
            </div>

            <!-- Progress chart -->
            <div v-if="subjectAssessmentsList.length >= 2"
                 class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-4">
              <div class="flex items-center justify-between mb-3">
                <h3 class="font-bold flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"/></svg> {{ GC.t('results.evolution') }}</h3>
                <span class="text-xs text-slate-400 dark:text-slate-500" v-text="subjectAssessmentsList.length + ' evaluaciones'"></span>
              </div>
              <div class="progress-chart" v-html="progressChartSVG()"></div>
            </div>

            <!-- Stats row: donut + concept bars -->
            <div class="grid sm:grid-cols-2 gap-4 mb-4">
              <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                <h3 class="font-bold text-sm mb-2">{{ GC.t('results.summary') }}</h3>
                <div v-html="distributionDonutSVG()"></div>
              </div>
              <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                <h3 class="font-bold text-sm mb-2">{{ GC.t('tab.concepts') }}</h3>
                <div v-html="conceptBarsSVG()"></div>
              </div>
            </div>

            <!-- Activity chart -->
            <div v-if="subjectAssessmentsList.length >= 2"
                 class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-4">
              <h3 class="font-bold text-sm mb-2 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg> Actividad por semana</h3>
              <div v-html="activityBarsSVG()"></div>
            </div>

            <!-- Prediction chart -->
            <div v-if="subjectAssessmentsList.length >= 2"
                 class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 mb-4">
              <h3 class="font-bold text-sm mb-2 flex items-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg> Predicci\u00f3n de puntuaciones (regresi\u00f3n lineal)</h3>
              <p class="text-xs text-slate-400 mb-3">Cambio estimado en la pr\u00f3xima evaluaci\u00f3n por concepto</p>
              <div v-html="predictionChartSVG()"></div>
            </div>
          </div>
        </div>

        <!-- History tab -->
        <div v-if="tab === 'history'" class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold">Historial de evaluaciones</h3>
          </div>

          <p v-if="subjectAssessmentsList.length === 0" class="text-sm text-slate-400 dark:text-slate-500 py-8 text-center">A\u00fan no hay evaluaciones para esta asignatura</p>
          <div class="space-y-3">
            <div v-for="a in subjectAssessmentsList" :key="a.id"
                  class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-3 sm:p-4 border border-slate-100 dark:border-slate-700 transition"
                 :class="{'ring-2 ring-indigo-400': false}">
              <div class="flex items-start gap-3">
                <div class="flex-1 min-w-0">
                  <div @click="viewAssessment(a)" class="cursor-pointer">
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
                  <button @click.stop="deleteAssessment(a.id)" class="mt-2 text-xs text-red-400 hover:text-red-600 transition">Eliminar evaluaci\u00f3n</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    computed: computed,
    methods: methods
  };
})();
