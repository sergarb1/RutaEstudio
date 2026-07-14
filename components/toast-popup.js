(function() {
  if (!GC.components) GC.components = {};
  GC.components['toast-popup'] = {
    props: {
      toast: Object
    },
    emits: ['dismiss'],
    template: `
      <Transition name="modal">
        <div v-if="toast" @click="$emit('dismiss')"
             class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl shadow-2xl border cursor-pointer transition text-sm font-medium flex items-center gap-2"
             :class="toast.type === 'success' ? 'bg-green-600 text-white border-green-700' : toast.type === 'error' ? 'bg-red-600 text-white border-red-700' : toast.type === 'warning' ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-800 text-white border-slate-700'">
          <span v-text="toast.message"></span>
          <button v-if="toast.action" @click.stop="toast.action(); $emit('dismiss')" class="underline font-bold ml-2 whitespace-nowrap" v-text="toast.actionLabel || 'Deshacer'"></button>
        </div>
      </Transition>
    `
  };
})();
