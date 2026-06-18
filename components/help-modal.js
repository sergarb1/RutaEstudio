(function() {
  if (!GC.components) GC.components = {};

  GC.components['help-modal'] = {
    template: `
      <div class="fixed inset-0 bg-black/40 dark:bg-black/60 flex items-start justify-center z-50 p-4 overflow-y-auto"
           @click.self="$emit('close')">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-2xl shadow-xl my-8">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-bold">\uD83D\uDCD6 Ayuda y gu\u00eda r\u00e1pida</h2>
            <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xl">&times;</button>
          </div>

          <!-- Tabs within help -->
          <div class="flex gap-1 mb-4 bg-slate-100 dark:bg-slate-700 rounded-lg p-1 text-sm font-medium overflow-x-auto tabs-scroll">
            <button v-for="tab in tabs" :key="tab.id"
                    @click="activeTab = tab.id"
                    :class="activeTab === tab.id ? 'bg-white dark:bg-slate-600 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-600'"
                    class="px-3 py-1.5 rounded transition flex-shrink-0" v-text="tab.label"></button>
          </div>

          <!-- Usage guide -->
          <div v-if="activeTab === 'usage'" class="space-y-4 text-sm">
            <section>
              <h3 class="font-bold text-base mb-2">\uD83C\uDF1F Primeros pasos</h3>
              <ol class="list-decimal ml-5 space-y-1.5 text-slate-600 dark:text-slate-300">
                <li><strong>Crea una asignatura</strong> desde la pantalla principal con el bot\u00f3n "+ Nueva".</li>
                <li><strong>A\u00f1ade conceptos</strong> a la asignatura (temas, unidades, habilidades).</li>
                <li><strong>Con\u00e9ctalos con relaciones</strong> usando el grafo o el formulario en Conceptos.</li>
                <li><strong>Eval\u00faa tu dominio</strong> en la pesta\u00f1a "Evaluar" para cada concepto.</li>
                <li><strong>Revisa el plan de estudio</strong> generado autom\u00e1ticamente en Resultados.</li>
              </ol>
            </section>

            <section>
              <h3 class="font-bold text-base mb-2">\uD83D\uDD17 Tipos de relaci\u00f3n</h3>
              <div class="grid gap-2">
                <div class="flex items-center gap-2"><span class="w-3 h-0.5 bg-blue-500"></span><strong>Prerrequisito</strong> &mdash; A debe saberse antes que B</div>
                <div class="flex items-center gap-2"><span class="w-3 h-0.5 bg-green-500 dashes"></span><strong>Pertenece</strong> &mdash; A es subconcepto de B</div>
                <div class="flex items-center gap-2"><span class="w-3 border-t border-dotted border-amber-500 h-0"></span><strong>Relacionado</strong> &mdash; Bidireccional, d\u00e9bil</div>
                <div class="flex items-center gap-2"><span class="w-3 h-0.5 bg-purple-500" style="height:3px"></span><strong>Profundiza</strong> &mdash; A profundiza B</div>
              </div>
            </section>

            <section>
              <h3 class="font-bold text-base mb-2">\uD83C\uDFAF Atajos y consejos</h3>
              <ul class="list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li><strong>Atajos de teclado:</strong> <kbd class="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">Esc</kbd> cierra modales, <kbd class="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">1-5</kbd> punt\u00faa, <kbd class="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">\u2190 \u2192</kbd> navega, <kbd class="bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded text-xs">Ctrl+Z</kbd> deshacer</li>
                <li>Usa el buscador de conceptos para filtrar r\u00e1pidamente.</li>
                <li>En el grafo, haz clic en un concepto (origen) y luego en otro (destino) para crear una relaci\u00f3n.</li>
                <li>Alterna entre BFS, DFS y Desbloqueador en el plan de estudio para diferentes \u00f3rdenes.</li>
                <li>Los datos se guardan autom\u00e1ticamente en el navegador.</li>
                <li>Exporta tus datos peri\u00f3dicamente como respaldo.</li>
                <li>Haz clic en nodos del mapa de calor para abrir el inspector de concepto.</li>
              </ul>
            </section>
          </div>

          <!-- AI guide -->
          <div v-if="activeTab === 'ai'" class="space-y-4 text-sm">
            <section>
              <h3 class="font-bold text-base mb-2">\uD83E\uDD16 Usar con asistentes de IA</h3>
              <p class="text-slate-600 dark:text-slate-300 mb-3">Puedes copiar tus datos a un asistente de IA para obtener ayuda personalizada. Exporta tus datos como JSON y copia el contenido.</p>

              <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 mb-3">
                <p class="font-medium mb-2">Prompt recomendado:</p>
                <pre class="text-xs bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto whitespace-pre-wrap">Tengo este grafo de conocimiento en formato JSON:
[copia tu JSON exportado]

Bas\u00e1ndote en estos datos:
1. \u00bfQu\u00e9 conceptos deber\u00eda repasar primero?
2. \u00bfQu\u00e9 relaci\u00f3n hay entre conceptos que podr\u00eda a\u00f1adir?
3. Sugiere un orden de estudio optimizado
4. \u00bfQu\u00e9 \u00e1reas de conocimiento tengo d\u00e9biles?</pre>
              </div>

              <p class="text-slate-600 dark:text-slate-300">El asistente analizar\u00e1 tu grafo y te dar\u00e1 recomendaciones personalizadas basadas en tus evaluaciones reales.</p>
            </section>

            <section class="pt-3 border-t border-slate-200 dark:border-slate-700">
              <h3 class="font-bold text-base mb-2">\uD83D\uDCCB Formato de datos</h3>
              <p class="text-slate-600 dark:text-slate-300 mb-2">El formato completo est\u00e1 documentado en <code>FORMAT.md</code>. Estructura resumida:</p>
              <pre class="text-xs bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto whitespace-pre-wrap">{
  "subjects": [{
    "id": "uuid",
    "name": "Asignatura",
    "description": "...",
    "concepts": [{ "id": "uuid", "name": "...", "description": "...", "weight": 5 }],
    "relations": [{ "from": "uuid", "to": "uuid", "type": "prerrequisito" }]
  }],
  "assessments": [{
    "id": "uuid",
    "subjectId": "uuid",
    "date": "ISO date",
    "results": { "conceptId": 75 },
    "notes": { "conceptId": "nota opcional" }
  }],
  "crossRelations": [{ "from": "uuid", "to": "uuid", "type": "relacionado" }]
}</pre>
            </section>
          </div>

          <!-- About -->
          <div v-if="activeTab === 'about'" class="space-y-4 text-sm">
            <section>
              <h3 class="font-bold text-base mb-2">\uD83E\uDDE0 Acerca de Ruta de Estudio</h3>
              <p class="text-slate-500 dark:text-slate-400 text-xs italic mb-2">Conecta conceptos, domina tu ruta. Estudia con prop\u00f3sito.</p>
              <p class="text-slate-600 dark:text-slate-300">Aplicaci\u00f3n web 100% offline para crear grafos de conocimiento, evaluar dominio de conceptos y generar planes de estudio personalizados usando BFS/DFS. Incluye temporizador Pomodoro para sesiones de estudio enfocadas.</p>
            </section>

            <section class="pt-3 border-t border-slate-200 dark:border-slate-700">
              <h3 class="font-bold text-base mb-2">\uD83D\uDEE0\uFE0F Stack t\u00e9cnico</h3>
              <ul class="list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li>Vue 3 (CDN + fallback local)</li>
                <li>Tailwind CSS (CDN + fallback local)</li>
                <li>vis-network (CDN + fallback local)</li>
                <li>localStorage para persistencia</li>
                <li>Sin build step, 100% offline</li>
              </ul>
            </section>

            <section class="pt-3 border-t border-slate-200 dark:border-slate-700">
              <h3 class="font-bold text-base mb-2">\uD83D\uDCE5 Respaldo de datos</h3>
              <p class="text-slate-600 dark:text-slate-300">Los datos se guardan en el navegador. Usa los botones Exportar/Importar para hacer copias de seguridad. Recomendamos exportar regularmente.</p>
            </section>

            <section class="pt-3 border-t border-slate-200 dark:border-slate-700">
              <h3 class="font-bold text-base mb-2">\uD83D\uDD17 Enlaces</h3>
              <ul class="list-disc ml-5 space-y-1 text-slate-600 dark:text-slate-300">
                <li><a href="https://github.com/sergarb1/grafo-conocimiento" class="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank">GitHub</a></li>
                <li><a href="https://sergarb1.github.io/grafo-conocimiento" class="text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank">GitHub Pages</a></li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    `,
    emits: ['close'],
    data() {
      return {
        activeTab: 'usage',
        tabs: [
          { id: 'usage', label: '\uD83D\uDCD6 Uso' },
          { id: 'ai', label: '\uD83E\uDD16 IA' },
          { id: 'about', label: '\u2139\uFE0F Acerca de' }
        ]
      };
    }
  };
})();
