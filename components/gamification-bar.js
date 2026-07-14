(function() {
  if (!GC.components) GC.components = {};
  GC.components['gamification-bar'] = {
    props: {
      levelIcon: String,
      levelTitle: String,
      userLevel: Number,
      nextLevelXP: Number,
      levelProgress: Number,
      unlockedAchievements: Number,
      dailyProgress: Number,
      dailyGoal: Number
    },
    emits: ['toggle-achievements'],
    template: `
      <div class="flex items-center gap-2 sm:gap-3 mb-6 p-2.5 sm:p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div class="flex items-center gap-2 flex-shrink-0">
          <span v-html="levelIcon"></span>
          <span class="font-bold text-sm" v-text="levelTitle"></span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 mb-1">
            <span>Nv. {{ userLevel }}</span>
            <span>{{ (nextLevelXP || 0) + ' XP' }}</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
            <div class="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500 ease-out" :style="{ width: levelProgress + '%' }"></div>
          </div>
        </div>
        <button @click="$emit('toggle-achievements')"
                class="relative flex-shrink-0 flex items-center gap-1 text-xs bg-amber-100 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800/60 rounded-xl px-3 py-2 font-medium hover:bg-amber-200 dark:hover:bg-amber-800/60 transition">
          <svg class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0 0 16.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 0 1-2.77.896m0 0a6.022 6.022 0 0 1-2.77-.896"/></svg>
          <span v-if="unlockedAchievements" class="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center" v-text="unlockedAchievements"></span>
        </button>
        <div class="flex items-center gap-1.5 flex-shrink-0 text-xs bg-green-50 dark:bg-green-900/20 rounded-xl px-3 py-1.5 border border-green-200 dark:border-green-800/40">
          <svg class="w-3.5 h-3.5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"/></svg>
          <div class="flex flex-col">
            <span class="font-semibold text-green-700 dark:text-green-300" v-text="dailyProgress + '/' + dailyGoal"></span>
            <div class="w-16 bg-green-200 dark:bg-green-800 rounded-full h-1.5 mt-0.5">
              <div class="h-full rounded-full bg-green-500 transition-all duration-300" :style="{ width: Math.min(100, dailyProgress/dailyGoal*100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    `
  };
})();
