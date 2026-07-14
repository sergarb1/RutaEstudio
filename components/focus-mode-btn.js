(function() {
  if (!GC.components) GC.components = {};
  GC.components['focus-mode-btn'] = {
    props: {
      show: Boolean,
      active: Boolean
    },
    emits: ['toggle'],
    template: `
      <button v-if="show"
              @click="$emit('toggle')"
              class="fixed bottom-4 right-4 z-30 bg-indigo-600 text-white w-10 h-10 rounded-full shadow-lg hover:bg-indigo-700 transition flex items-center justify-center"
              :title="active ? 'Salir de modo foco' : 'Modo foco'">
        <svg v-if="!active" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"/></svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 18 18 6M6 6l12 12"/></svg>
      </button>
    `
  };
})();
