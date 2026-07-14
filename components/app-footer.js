(function() {
  if (!GC.components) GC.components = {};
  GC.components['app-footer'] = {
    props: {},
    emits: [],
    template: `
      <footer class="text-center text-xs mt-12 pt-6 border-t border-slate-200 dark:border-slate-700">
        <div class="flex flex-wrap items-center justify-center gap-3 text-emerald-600 dark:text-emerald-400 font-medium mb-2">
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            100% gratuita
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"/></svg>
            Datos locales
          </span>
          <span class="flex items-center gap-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>
            Licencias libres
          </span>
        </div>
        <p class="text-slate-400 dark:text-slate-500">&copy; {{ new Date().getFullYear() }} <a href="https://github.com/sergarb1" class="text-indigo-600 dark:text-indigo-400 hover:underline">sergarb1</a> &middot; RutaEstudio</p>
      </footer>
    `
  };
})();
