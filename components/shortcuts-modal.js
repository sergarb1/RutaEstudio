(function() {
  if (!GC.components) GC.components = {};
  GC.components['shortcuts-modal'] = {
    props: {
      show: Boolean
    },
    emits: ['close'],
    template: `
      <Transition name="modal">
        <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm"
             role="dialog" aria-modal="true" @click.self="$emit('close')">
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl border border-slate-200 dark:border-slate-700">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-lg">Atajos de teclado</h3>
              <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xl">&times;</button>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span>Buscar global</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">Ctrl+K</kbd></div>
              <div class="flex justify-between"><span>Deshacer</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">Ctrl+Z</kbd></div>
              <div class="flex justify-between"><span>Rehacer</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">Ctrl+Shift+Z</kbd></div>
              <div class="flex justify-between"><span>Modo foco (grafo)</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">Ctrl+F</kbd></div>
              <div class="flex justify-between"><span>Cerrar modales</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">Esc</kbd></div>
              <div class="flex justify-between"><span>Puntuar evaluaci\u00f3n</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">1-5</kbd></div>
              <div class="flex justify-between"><span>Navegar evaluaci\u00f3n</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">&larr; &rarr;</kbd></div>
              <div class="flex justify-between"><span>Este panel</span> <kbd class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">?</kbd></div>
            </div>
          </div>
        </div>
      </Transition>
    `
  };
})();
