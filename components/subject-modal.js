(function() {
  if (!GC.components) GC.components = {};
  GC.components['subject-modal'] = {
    props: {
      show: Boolean,
      mode: String,
      title: String,
      templateTab: String,
      editName: String,
      editDesc: String,
      editConceptName: String,
      editConceptDesc: String,
      editConceptWeight: Number,
      editConceptTags: String,
      templateSearch: String,
      filteredTemplates: Array
    },
    emits: ['close', 'save-subject', 'save-concept', 'update:editName', 'update:editDesc', 'update:editConceptName', 'update:editConceptDesc', 'update:editConceptWeight', 'update:editConceptTags', 'update:templateTab', 'update:templateSearch', 'select-template'],
    template: `
      <div v-if="show"
           class="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true"
           @click.self="$emit('close')">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 w-full max-w-md shadow-xl">
          <h3 class="font-bold text-lg mb-4" v-text="title"></h3>
          <div v-if="mode === 'subject'" class="space-y-3">
            <div class="flex gap-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-0.5 text-xs font-medium">
              <button @click="$emit('update:templateTab', 'manual')" :class="templateTab==='manual'?'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-slate-100':'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'" class="flex-1 px-3 py-1.5 rounded transition">Desde cero</button>
              <button @click="$emit('update:templateTab', 'template')" :class="templateTab==='template'?'bg-white dark:bg-slate-600 shadow-sm text-slate-800 dark:text-slate-100':'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-600'" class="flex-1 px-3 py-1.5 rounded transition"><svg class="w-3.5 h-3.5 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg> Desde plantilla</button>
            </div>
            <div v-if="templateTab === 'manual'" class="space-y-3">
              <div><label class="text-xs font-medium text-slate-500 dark:text-slate-400">Nombre</label><div class="relative mt-1"><svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg><input :value="editName" @input="$emit('update:editName', $event.target.value)" placeholder="Nueva asignatura" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm" /></div></div>
              <div><label class="text-xs font-medium text-slate-500 dark:text-slate-400">Descripci\u00f3n</label><textarea :value="editDesc" @input="$emit('update:editDesc', $event.target.value)" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm mt-1" rows="2"></textarea></div>
              <button @click="$emit('save-subject')" class="w-full bg-indigo-600 text-white font-bold py-2 rounded-xl text-sm hover:bg-indigo-700 transition">Guardar</button>
            </div>
            <div v-if="templateTab === 'template'" class="space-y-3 max-h-[60vh] overflow-y-auto">
              <input :value="templateSearch" @input="$emit('update:templateSearch', $event.target.value)" placeholder="Buscar plantilla..." class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm" />
              <div v-for="group in filteredTemplates" :key="group.key" class="space-y-2">
                <p class="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <svg v-if="!group.emoji" class="w-3.5 h-3.5 shrink-0 text-slate-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
                  <span v-if="group.emoji" v-text="group.emoji"></span>
                  <span v-text="group.label"></span>
                  <span class="font-normal text-slate-300 dark:text-slate-600" v-text="group.subjects.length + ' m\u00f3dulos'"></span>
                </p>
                <div v-for="subj in group.subjects" :key="subj.key" @click="$emit('select-template', group.key, subj.key)" class="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700 cursor-pointer hover:border-indigo-300 dark:hover:border-indigo-500 transition">
                  <div class="flex-1 min-w-0"><p class="text-sm font-medium" v-text="subj.name"></p><p class="text-xs text-slate-400 dark:text-slate-500 truncate" v-text="subj.description"></p></div>
                  <div class="flex gap-1 flex-shrink-0"><span class="text-xs px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium" v-text="subj.concepts.length + ' conceptos'"></span><span class="text-xs px-2 py-1 rounded-lg bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 font-medium" v-text="subj.relations.length + ' relac.'"></span></div>
                </div>
              </div>
              <p v-if="!filteredTemplates.length" class="text-sm text-slate-400 py-4 text-center">No se encontraron plantillas.</p>
            </div>
          </div>
          <div v-if="mode === 'concept'" class="space-y-3">
            <div><label class="text-xs font-medium text-slate-500 dark:text-slate-400">Nombre</label><input :value="editConceptName" @input="$emit('update:editConceptName', $event.target.value)" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm mt-1" /></div>
            <div><label class="text-xs font-medium text-slate-500 dark:text-slate-400">Descripci\u00f3n</label><textarea :value="editConceptDesc" @input="$emit('update:editConceptDesc', $event.target.value)" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm mt-1" rows="2"></textarea></div>
            <div><label class="text-xs font-medium text-slate-500 dark:text-slate-400">Peso (1-10)</label><input type="number" min="1" max="10" :value="editConceptWeight" @input="$emit('update:editConceptWeight', Number($event.target.value))" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm mt-1" /></div>
            <div><label class="text-xs font-medium text-slate-500 dark:text-slate-400">Etiquetas (separadas por coma)</label><input :value="editConceptTags" @input="$emit('update:editConceptTags', $event.target.value)" placeholder="b\u00e1sico, intermedio, avanzado" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm mt-1" /></div>
            <button @click="$emit('save-concept')" class="w-full bg-indigo-600 text-white font-bold py-2 rounded-xl text-sm hover:bg-indigo-700 transition">Guardar</button>
          </div>
        </div>
      </div>
    `
  };
})();
