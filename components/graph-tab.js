(function() {
  if (!GC.components) GC.components = {};
  GC.components['graph-tab'] = {
    props: {
      subject: Object,
      allRelationTypes: Array,
      graphLoading: Boolean,
      graphRelFilter: String,
      graphWeightMin: Number,
      showLegend: Boolean,
      root: Object
    },
    template: `
      <div class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 relative">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h3 class="font-bold">Grafo de conceptos</h3>
          <div class="flex items-center gap-2">
            <div v-if="graphLoading" class="text-xs text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-1">
              <span class="inline-block w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
              Renderizando...
            </div>
            <button @click="root.showLegend = !root.showLegend" class="flex items-center gap-1.5 text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-2 py-1 min-h-[44px] sm:min-h-[36px] hover:bg-slate-50 dark:hover:bg-slate-700 transition font-medium">
              <svg v-if="showLegend" class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6l12 12"/></svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>
              {{ GC.t('graph.legend') }}
            </button>
          </div>
        </div>
        <div class="flex flex-wrap items-center gap-2 mb-3 text-xs">
          <span class="text-slate-400 dark:text-slate-500 font-medium">Filtrar:</span>
          <select :value="graphRelFilter" @change="root.graphRelFilter = $event.target.value" class="border dark:border-slate-600 rounded-lg px-2 py-1 min-h-[44px] bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400">
            <option value="">{{ GC.t('graph.allRelations') }}</option>
            <option v-for="t in allRelationTypes" :key="t.id" :value="t.id" v-text="t.name"></option>
          </select>
          <div class="flex items-center gap-1">
            <span class="text-slate-400">Peso min:</span>
            <input type="range" min="1" max="10" :value="graphWeightMin" @input="root.graphWeightMin = Number($event.target.value)" class="w-20 h-1 accent-indigo-600" />
            <span class="text-slate-400 w-4" v-text="graphWeightMin"></span>
          </div>
        </div>
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
          <button @click="root.graphRelFilter=''"
                   :class="!graphRelFilter ? 'text-white bg-slate-500' : 'bg-slate-100 dark:bg-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'"
                   class="px-2 py-1 min-h-[44px] rounded font-medium transition">Todas</button>
          <button v-for="t in allRelationTypes" :key="t.id"
                   @click="root.currentRelationType=t.id; root.graphRelFilter=t.id"
                   :class="graphRelFilter===t.id?'text-white':'bg-slate-100 dark:bg-slate-700 dark:text-slate-300'"
                   :style="graphRelFilter===t.id ? { backgroundColor: t.color } : {}"
                   class="px-2 py-1 min-h-[44px] rounded font-medium transition" v-text="t.name"></button>
        </div>
        <p class="text-xs text-slate-400 dark:text-slate-500 mb-2 mt-2">Haz clic en un concepto origen, luego en un concepto destino para crear una relaci\u00f3n</p>
        <div id="graph-container" class="dark:border dark:border-slate-700"></div>
      </div>
    `
  };
})();
