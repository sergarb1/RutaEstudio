(function() {
  if (!GC.components) GC.components = {};
  GC.components['achievements-modal'] = {
    props: {
      show: Boolean,
      levelIcon: String,
      userLevel: Number,
      levelTitle: String,
      userXP: Number,
      achievementsList: Array
    },
    emits: ['close'],
    template: `
      <div v-if="show" class="fixed inset-0 z-[55] flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm" @click.self="$emit('close')">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700 mx-4 max-h-[80vh] flex flex-col">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-bold text-lg flex items-center gap-2">
              <svg class="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 0 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m0 0a6.022 6.022 0 0 1-2.77-.896"/></svg>
              Logros
            </h3>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl leading-none">&times;</button>
          </div>
          <div class="flex items-center gap-3 mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-200 dark:border-indigo-800/40">
            <span class="text-2xl" v-html="levelIcon"></span>
            <div>
              <p class="font-bold text-sm" v-text="'Nivel ' + userLevel + ': ' + levelTitle"></p>
              <p class="text-xs text-slate-500 dark:text-slate-400" v-text="userXP + ' XP total'"></p>
            </div>
          </div>
          <div class="flex-1 overflow-y-auto space-y-2">
            <div v-for="ach in achievementsList" :key="ach.id"
                 class="flex items-center gap-3 p-3 rounded-xl border transition"
                 :class="ach.unlocked ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/40' : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 opacity-60'">
              <span class="text-2xl" v-text="ach.icon"></span>
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-sm" v-text="ach.name"></p>
                <p class="text-xs text-slate-400 dark:text-slate-500" v-text="ach.desc"></p>
              </div>
              <svg v-if="ach.unlocked" class="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
              <span v-else class="text-xs text-slate-400" v-text="ach.progress || ''"></span>
            </div>
          </div>
        </div>
      </div>
    `
  };
})();
