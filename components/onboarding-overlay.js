(function() {
  if (!GC.components) GC.components = {};
  GC.components['onboarding-overlay'] = {
    props: {
      show: Boolean,
      step: Number,
      steps: Array
    },
    emits: ['close', 'next', 'prev', 'go-to-step'],
    template: `
      <div v-if="show" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 dark:bg-black/70 backdrop-blur-sm" data-overlay="onboarding">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-2xl border border-slate-200 dark:border-slate-700 mx-4">
          <div class="flex gap-1 mb-6">
            <div v-for="s in steps.length" :key="s"
                 class="h-1 flex-1 rounded-full transition"
                 :class="s - 1 === step ? 'bg-indigo-600' : s - 1 < step ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'"></div>
          </div>
          <div v-if="step === 0" class="text-center space-y-3">
            <svg class="w-14 h-14 text-indigo-600 dark:text-indigo-400 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            <h3 class="text-xl font-bold">Bienvenido a RutaEstudio</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Conecta conceptos, domina tu ruta. Estudia con propósito.</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Organiza tus asignaturas como un grafo interactivo. Define conceptos, conéctalos con relaciones, evalúa tu dominio y obtén un plan de estudio personalizado.</p>
            <p class="text-xs text-slate-400 dark:text-slate-500">Todo funciona 100% offline. Tus datos se guardan en el navegador.</p>
          </div>
          <div v-if="step === 1" class="text-center space-y-3">
            <svg class="w-14 h-14 text-indigo-600 dark:text-indigo-400 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"/></svg>
            <h3 class="text-xl font-bold">Crea tu primera asignatura</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Haz clic en <strong>"+ Nueva"</strong> o elige una <strong>plantilla educativa</strong> prediseñada.</p>
            <p class="text-xs text-slate-400">Los profesores pueden preparar la asignatura en 2 clics.</p>
          </div>
          <div v-if="step === 2" class="text-center space-y-3">
            <svg class="w-14 h-14 text-indigo-600 dark:text-indigo-400 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
            <h3 class="text-xl font-bold">Añade conceptos</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Cada concepto tiene nombre, descripción, peso y etiquetas. Importa desde CSV o genera con IA.</p>
            <p class="text-xs text-slate-400">Edita con doble clic.</p>
          </div>
          <div v-if="step === 3" class="text-center space-y-3">
            <svg class="w-14 h-14 text-indigo-600 dark:text-indigo-400 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m9.86-2.04 1.757-1.757a4.5 4.5 0 0 1 6.364 6.364l-4.5 4.5a4.5 4.5 0 0 1-1.242-7.244"/></svg>
            <h3 class="text-xl font-bold">Conecta conceptos</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Crea relaciones: prerrequisito, pertenece, relacionado o profundiza.</p>
          </div>
          <div v-if="step === 4" class="text-center space-y-3">
            <svg class="w-14 h-14 text-indigo-600 dark:text-indigo-400 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>
            <h3 class="text-xl font-bold">Evalúa tu dominio</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Puntúa cada concepto del 0 al 100%. Evaluación uno a uno o masiva con sliders.</p>
            <p class="text-xs text-slate-400">Teclas 1 a 5 para puntuar rápido.</p>
          </div>
          <div v-if="step === 5" class="text-center space-y-3">
            <svg class="w-14 h-14 text-indigo-600 dark:text-indigo-400 mx-auto" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>
            <h3 class="text-xl font-bold">Sigue tu plan de estudio</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">En Resultados verás qué repasar, reforzar o dominas. Usa BFS, DFS o el 🔥 Desbloqueador.</p>
          </div>
          <div class="flex items-center justify-between mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
             <button @click="step > 0 ? $emit('prev') : null"
                     :class="step === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-100 dark:hover:bg-slate-700'"
                     class="text-sm font-medium text-slate-500 dark:text-slate-400 px-4 py-2 min-h-[44px] sm:min-h-[36px] rounded-lg transition">&larr; Anterior</button>
            <div class="flex gap-1">
              <span v-for="s in steps.length" :key="s"
                    class="w-2 h-2 rounded-full transition cursor-pointer"
                    :class="s - 1 === step ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'"
                    @click="$emit('go-to-step', s - 1)"></span>
            </div>
            <button v-if="step < steps.length - 1"
                     @click="$emit('next')"
                     class="bg-indigo-600 text-white text-sm font-bold px-5 py-2 min-h-[44px] rounded-xl hover:bg-indigo-700 transition">Siguiente &rarr;</button>
            <button v-if="step === steps.length - 1"
                     @click="$emit('close')"
                     class="flex items-center gap-1.5 bg-green-600 text-white text-sm font-bold px-5 py-2 min-h-[44px] rounded-xl hover:bg-green-700 transition"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg> &iexcl;Empezar!</button>
          </div>
          <button @click="$emit('close')" class="text-xs text-slate-400 dark:text-slate-500 mt-3 w-full text-center hover:underline">Saltar tutorial</button>
        </div>
      </div>
    `
  };
})();
