(function() {
  if (!GC.components) GC.components = {};
  GC.components['global-search-popup'] = {
    props: {
      show: Boolean,
      query: String,
      results: Array
    },
    emits: ['close', 'update:query', 'go-to-concept'],
    template: `
      <Transition name="modal">
        <div v-if="show" class="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
             @click.self="$emit('close')">
          <div class="bg-white dark:bg-slate-800 rounded-2xl w-full max-w-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div class="p-4 border-b border-slate-200 dark:border-slate-700">
              <input id="global-search-input" :value="query" @input="$emit('update:query', $event.target.value)" placeholder="Buscar en todas las asignaturas..."
                     class="w-full bg-transparent text-base outline-none placeholder-slate-400" />
            </div>
            <div class="max-h-80 overflow-y-auto p-2">
              <div v-if="!query.trim()" class="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
                Escribe para buscar conceptos por nombre, descripci\u00f3n o etiqueta
              </div>
              <div v-if="query.trim() && results.length === 0" class="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
                Sin resultados para "{{ query }}"
              </div>
              <template v-for="(group, si) in _groupBy(results, 'subjectName')" :key="si">
                <p class="text-xs font-bold text-slate-400 dark:text-slate-500 px-2 pt-2 pb-1 uppercase tracking-wide" v-text="group.key"></p>
                <div v-for="item in group.items" :key="item.concept.id"
                     @click="$emit('go-to-concept', item.subjectId, item.concept.id)"
                     class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition text-sm">
                  <svg class="w-5 h-5 shrink-0 text-indigo-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium truncate" v-text="item.concept.name"></p>
                    <p class="text-xs text-slate-400 truncate" v-text="item.concept.description || '\u2014'"></p>
                  </div>
                  <span class="text-xs text-slate-400" v-text="'Peso: ' + item.concept.weight"></span>
                </div>
              </template>
            </div>
            <div class="p-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 text-center">
              <kbd class="bg-slate-100 dark:bg-slate-700 px-1 rounded">&uarr;&darr;</kbd> navegar <kbd class="bg-slate-100 dark:bg-slate-700 px-1 rounded">Esc</kbd> cerrar
            </div>
          </div>
        </div>
      </Transition>
    `,
    methods: {
      _groupBy(arr, key) {
        const map = {};
        arr.forEach(function(item) {
          const k = item[key];
          if (!map[k]) map[k] = [];
          map[k].push(item);
        });
        return Object.keys(map).map(function(k) { return { key: k, items: map[k] }; });
      }
    }
  };
})();
