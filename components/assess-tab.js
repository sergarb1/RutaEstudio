(function() {
  if (!GC.components) GC.components = {};
  GC.components['assess-tab'] = {
    props: {
      subject: Object,
      assessScores: Object,
      root: Object
    },
    template: `
      <div class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-bold">Evaluaci\u00f3n r\u00e1pida</h3>
          <button @click="root.submitAssessment()" class="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-4 py-2.5 sm:py-2 rounded-xl hover:bg-green-700 transition">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
            Guardar todo
          </button>
        </div>
        <p class="text-xs text-slate-400 dark:text-slate-500 mb-4">Ajusta los sliders para puntuar todos los conceptos de una sola vez</p>
        <div class="space-y-3 max-h-[60vh] overflow-y-auto">
          <div v-for="c in subject.concepts" :key="c.id"
               class="flex items-center gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl px-3 sm:px-4 py-3 border border-slate-100 dark:border-slate-700">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate" v-text="c.name"></p>
              <p class="text-xs text-slate-400 truncate" v-text="c.description || '\u2014'"></p>
            </div>
            <div class="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <input type="range" min="0" max="100" step="5"
                     :value="assessScores[c.id] || 0"
                     @input="root.assessScores[c.id] = Number($event.target.value)"
                     class="w-20 sm:w-28 h-1.5 accent-indigo-600" />
              <span class="text-xs font-bold w-8 sm:w-10 text-center" v-text="(assessScores[c.id] || 0) + '%'"></span>
            </div>
          </div>
        </div>
      </div>
    `
  };
})();
