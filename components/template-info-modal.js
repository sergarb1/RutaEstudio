(function() {
  if (!GC.components) GC.components = {};
  GC.components['template-info-modal'] = {
    props: {
      show: Boolean
    },
    emits: ['close', 'download-template'],
    template: `
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" @click.self="$emit('close')">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto border border-slate-200 dark:border-slate-700 m-4">
          <div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold">Plantilla de asignatura</h2><button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl px-1">&times;</button></div>
          <div class="space-y-4 text-sm">
            <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-4 border border-indigo-200 dark:border-indigo-800/40"><p class="font-medium text-indigo-700 dark:text-indigo-300 mb-1">\u00bfQu\u00e9 es esta plantilla?</p><p class="text-indigo-600/80 dark:text-indigo-400/80">Un archivo <strong>JSON</strong> con la estructura b\u00e1sica de una asignatura: nombre, conceptos y relaciones. Desc\u00e1rgalo, ed\u00edtalo con cualquier editor de texto e imp\u00f3rtalo con el bot\u00f3n "Importar" del men\u00fa superior.</p></div>
            <div class="flex gap-2">
              <button @click="$emit('download-template')" class="flex-1 bg-indigo-600 text-white font-bold py-2.5 rounded-xl hover:bg-indigo-700 transition text-sm flex items-center justify-center gap-2"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg> Descargar plantilla JSON</button>
              <button @click="$emit('close')" class="px-4 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium py-2.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition text-sm">Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `
  };
})();
