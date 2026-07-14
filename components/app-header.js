(function() {
  if (!GC.components) GC.components = {};
  GC.components['app-header'] = {
    props: {
      dark: Boolean,
      lang: String,
      canInstall: Boolean
    },
    emits: ['toggle-dark', 'set-lang', 'install', 'import-data', 'export-data', 'open-template-info', 'open-global-search'],
    template: `
      <header class="flex items-center justify-between gap-2 flex-wrap mb-8">
        <div>
          <a href="https://sergarb1.github.io/RutaEstudio" class="flex items-center gap-3">
            <img src="logo.png" alt="RutaEstudio" class="h-9 md:h-12 w-auto" />
            <span class="text-[11px] md:text-xs text-slate-400 dark:text-slate-500 font-medium leading-tight max-w-28 hidden sm:block">{{ GC.t('app.subtitle') }}</span>
          </a>
        </div>
        <div class="flex items-center gap-1.5 flex-wrap justify-end">
          <button @click="$emit('toggle-dark')"
                   class="min-w-[44px] min-h-[44px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  :title="dark ? GC.t('btn.light') : GC.t('btn.dark')"
                  :aria-label="dark ? GC.t('btn.light') : GC.t('btn.dark')">
            <svg v-if="dark" class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
            <svg v-else class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
          </button>
          <select @change="$emit('set-lang', $event.target.value)" :value="lang"
                   class="min-h-[44px] sm:min-h-[36px] text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-2 font-medium transition cursor-pointer focus:outline-none">
            <option value="es">ES</option>
            <option value="en">EN</option>
            <option value="va">VA</option>
          </select>
          <button v-if="canInstall" @click="$emit('install')"
                   class="flex items-center gap-1.5 text-xs font-medium bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/60 rounded-xl px-3 py-2.5 sm:py-2 min-h-[44px] hover:bg-indigo-200 dark:hover:bg-indigo-800/60 transition"
                  :title="GC.t('btn.install') || 'Instalar app'">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
            {{ GC.t('btn.install') || 'Instalar' }}
          </button>
          <button @click="$emit('import-data')"
                   class="flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-xl px-3 py-2.5 sm:py-2 min-h-[44px] hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  :title="GC.t('btn.import')">
            <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/></svg>
            {{ GC.t('btn.import') }}
          </button>
          <button @click="$emit('export-data')"
                   class="flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-xl px-3 py-2.5 sm:py-2 min-h-[44px] hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  :title="GC.t('btn.export')">
            <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg>
            {{ GC.t('btn.export') }}
          </button>
          <button @click="$emit('open-template-info')"
                   class="flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-xl px-3 py-2.5 sm:py-2 min-h-[44px] hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  :title="GC.t('btn.template')">
            <svg class="w-4 h-4 sm:w-3.5 sm:h-3.5 text-slate-500 dark:text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>
            {{ GC.t('btn.template') }}
          </button>
        </div>
      </header>
    `
  };
})();
