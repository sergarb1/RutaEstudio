(function() {
  if (!GC.components) GC.components = {};
  GC.components['concepts-tab'] = {
    props: {
      subject: Object,
      filteredConcepts: Array,
      allRelationTypes: Array,
      root: Object
    },
    template: `
      <div class="tab-fade-in bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
        <div class="flex flex-wrap items-center justify-between gap-2 mb-4">
          <h3 class="font-bold">Conceptos</h3>
          <div class="flex items-center gap-2 flex-wrap">
            <input :value="root.conceptSearch" @input="root.conceptSearch = $event.target.value" :placeholder="GC.t('concept.search')"
                   class="border dark:border-slate-600 rounded-lg px-3 py-2 sm:py-1.5 text-xs bg-transparent w-32 sm:w-36 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
            <select v-if="root.availableTags.length" :value="root.tagFilter" @change="root.tagFilter = $event.target.value"
                    class="border dark:border-slate-600 rounded-lg px-2 py-2 sm:py-1.5 text-xs bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-400">
              <option value="">{{ GC.t('concept.allTags') }}</option>
              <option v-for="t in root.availableTags" :key="t" :value="t" v-text="t"></option>
            </select>
            <button @click="root.addConcept()" class="min-h-[36px] bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition flex-shrink-0">{{ GC.t('concept.add') }}</button>
            <button @click="root.toggleBulkTag()"
                    :class="root.bulkTagMode ? 'bg-amber-500 text-white' : 'bg-white dark:bg-slate-800 border dark:border-slate-600'"
                    class="min-h-[36px] text-xs border rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition"><svg class="w-3 h-3 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/></svg> {{ GC.t('concept.bulk') }}</button>
            <button @click="root.exportConceptsCSV()" class="min-h-[36px] text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition" title="Exportar CSV">CSV</button>
            <button @click="root.importConceptsCSV()" class="min-h-[36px] text-xs bg-white dark:bg-slate-800 border dark:border-slate-600 rounded-lg px-2 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 transition" title="Importar CSV"><svg class="w-3 h-3 inline-block -mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"/></svg> CSV</button>
          </div>
        </div>
        <div v-if="root.bulkTagMode" class="flex items-center gap-2 mb-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800/40">
          <span class="text-xs text-amber-700 dark:text-amber-300 font-medium flex items-center gap-1"><svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6z"/></svg> Marca los conceptos y asigna etiqueta:</span>
          <input v-model="root.bulkTagValue" placeholder="Nombre de etiqueta" class="flex-1 border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-2 py-1.5 text-xs" />
          <button @click="root.applyBulkTag()" class="bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-amber-700 transition">Aplicar</button>
          <button @click="root.toggleBulkTag()" class="text-xs text-slate-400 hover:underline">Cancelar</button>
        </div>
        <p v-if="subject.concepts.length === 0" class="text-sm text-slate-400 dark:text-slate-500 py-12 text-center">
          <svg class="w-8 h-8 mx-auto mb-3 text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/></svg>
          A\u00fan no hay conceptos. \u00a1A\u00f1ade el primero o usa el asistente IA!
        </p>
        <p v-if="subject.concepts.length > 0 && filteredConcepts.length === 0" class="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">Ning\u00fan concepto coincide con "{{ root.conceptSearch }}"</p>
        <div class="space-y-1">
          <div v-for="c in filteredConcepts" :key="c.id"
               draggable="true"
               @dragstart="root.dragStart(c, $event)"
               @dragover.prevent="root.dragOver(c, $event)"
               @drop.prevent="root.dropConcept(c)"
               @dragend="root.dragEnd()"
               class="concept-row flex items-center gap-2 sm:gap-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl p-2 sm:p-3 border border-slate-100 dark:border-slate-700"
               :class="{'opacity-40 border-dashed border-indigo-400': root.dragId === c.id}">
            <input v-if="root.bulkTagMode" type="checkbox" :checked="root.bulkChecked[c.id]" @change="root.bulkChecked[c.id] = $event.target.checked" class="rounded border-slate-300 dark:border-slate-600 text-indigo-600" />
            <span class="text-xs font-bold text-indigo-600 dark:text-indigo-400 w-6 cursor-grab active:cursor-grabbing shrink-0" v-text="subject.concepts.indexOf(c)+1"></span>
            <div class="flex-1 min-w-0">
              <template v-if="root.inlineEditId === c.id">
                <input v-model="root.inlineEditName" @keyup.enter="root.saveInlineEdit()" @keyup.escape="root.cancelInlineEdit()"
                       class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded px-2 py-1 text-sm mb-1 font-medium" />
                <textarea v-model="root.inlineEditDesc" @keyup.escape="root.cancelInlineEdit()"
                          class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded px-2 py-1 text-xs" rows="1"></textarea>
                <div class="flex gap-1 mt-1">
                  <button @click="root.saveInlineEdit()" class="text-xs text-green-600 font-medium">Guardar</button>
                  <button @click="root.cancelInlineEdit()" class="text-xs text-slate-400">Cancelar</button>
                </div>
              </template>
              <template v-if="root.inlineEditId !== c.id">
                <p class="font-medium text-sm" @dblclick="root.startInlineEdit(c.id)" v-text="c.name"></p>
                <p class="text-xs text-slate-400 dark:text-slate-500 truncate" @dblclick="root.startInlineEdit(c.id)" v-html="GC.md(c.description) || '<span class=text-slate-300>\u2014</span>'"></p>
              </template>
              <div v-if="c.tags?.length && root.inlineEditId !== c.id" class="flex flex-wrap gap-1.5 mt-1.5">
                <span v-for="t in c.tags" :key="t"
                      class="tag-badge" :style="{ backgroundColor: root.tagColor(t).bg, color: root.tagColor(t).fg }" v-text="t"></span>
              </div>
            </div>
            <span class="weight-badge" :class="'weight-' + root.weightLevel(c.weight)" v-text="c.weight"></span>
            <button @click="root.openInspector(c.id)" class="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] flex items-center justify-center text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20" title="Inspector">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>
            </button>
            <button @click="root.editConcept(c.id)" class="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] flex items-center justify-center text-indigo-500 hover:text-indigo-700 dark:hover:text-indigo-300 transition rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20">&#9998;&#65039;</button>
            <button @click="root.deleteConcept(c.id)" class="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px] flex items-center justify-center text-red-400 hover:text-red-600 dark:hover:text-red-300 transition rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20">&#10005;</button>
          </div>
        </div>
        <div class="mt-6 pt-4 border-t border-slate-200 dark:border-slate-700">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-bold">Relaciones</h3>
            <div class="flex gap-2">
              <button @click="root.showRelationForm = !root.showRelationForm"
                      class="text-xs bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition"
                      v-text="root.showRelationForm ? 'Cerrar' : '+ Nueva relaci\u00f3n'"></button>
              <button @click="root.openCustomTypes()"
                      class="text-xs bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 font-bold px-3 py-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-600 transition">Gestionar tipos</button>
            </div>
          </div>
          <div v-if="root.showRelationForm"
               class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-3 space-y-2">
            <div class="grid sm:grid-cols-3 gap-2">
              <select v-model="root.relFormFrom" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                <option value="">Concepto origen</option>
                <option v-for="c in subject.concepts" :key="c.id" :value="c.id" v-text="c.name"></option>
              </select>
              <select v-model="root.relFormType" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                <option v-for="t in allRelationTypes" :key="t.id" :value="t.id" v-text="t.name"></option>
              </select>
              <select v-model="root.relFormTo" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                <option value="">Concepto destino</option>
                <option v-for="c in subject.concepts" :key="c.id" :value="c.id" v-text="c.name"></option>
              </select>
            </div>
            <button @click="root.addRelationFromForm()" class="w-full bg-indigo-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-indigo-700 transition" :disabled="!root.relFormFrom || !root.relFormTo">Crear relacione</button>
          </div>
          <div class="space-y-2">
            <div v-for="(r, i) in subject.relations" :key="i"
                 class="flex items-center gap-2 text-sm bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2 border border-slate-100 dark:border-slate-700">
              <span class="font-medium text-indigo-600 dark:text-indigo-400" v-text="root.conceptName(r.from)"></span>
              <span class="text-xs px-1.5 py-0.5 rounded font-medium"
                    :class="root.relBadgeClass(r.type) || 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'"
                    :style="root.relBadgeStyle(r.type)"
                    v-text="GC.store.getRelationTypeInfo(r.type).name"></span>
              <span class="font-medium text-indigo-600 dark:text-indigo-400" v-text="root.conceptName(r.to)"></span>
              <button @click="root.deleteRelation(i)" class="ml-auto text-xs text-red-500 dark:text-red-400 hover:underline">&#10005;</button>
            </div>
          </div>
          <p v-if="subject.relations.length === 0" class="text-xs text-slate-400 dark:text-slate-500">Usa el formulario o la pesta\u00f1a Grafo para conectar conceptos</p>
        </div>
      </div>
    `
  };
})();
