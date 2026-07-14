(function() {
  if (!GC.components) GC.components = {};
  GC.components['confirm-delete-modal'] = {
    props: {
      show: Boolean,
      target: Object
    },
    emits: ['close', 'confirm', 'export-data'],
    template: `
      <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" @click.self="$emit('close')">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl w-full max-w-sm border border-slate-200 dark:border-slate-700 m-4">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0"><svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg></div>
            <div><h3 class="font-bold text-lg">Borrar asignatura</h3><p class="text-sm text-slate-500 dark:text-slate-400" v-text="'Se eliminar\u00e1 &laquo;' + (target?.name || '') + '&raquo;'"></p></div>
          </div>
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800/40 mb-4 space-y-2">
            <div class="flex items-start gap-2"><svg class="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg><p class="text-sm text-amber-800 dark:text-amber-300"><strong>No podr\u00e1s recuperarla.</strong> Se borrar\u00e1n todos sus conceptos, relaciones y evaluaciones.</p></div>
            <div class="flex items-start gap-2"><svg class="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg><p class="text-sm text-amber-800 dark:text-amber-300">Antes de borrar, <strong>exporta</strong> tus datos por si quieres recuperarlos despu\u00e9s.</p></div>
          </div>
          <div class="flex gap-2">
            <button @click="$emit('export-data')" class="flex-1 flex items-center justify-center gap-1.5 bg-white dark:bg-slate-700 border dark:border-slate-600 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg> Exportar</button>
            <button @click="$emit('confirm')" class="flex-1 bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-red-700 transition flex items-center justify-center gap-1.5"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/></svg> Borrar</button>
          </div>
          <button @click="$emit('close')" class="w-full text-xs text-slate-400 dark:text-slate-500 mt-3 text-center hover:underline">Cancelar</button>
        </div>
      </div>
    `
  };
})();
