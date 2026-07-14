(function() {
  if (!GC.components) GC.components = {};
  GC.components['inspector-panel'] = {
    props: {
      concept: Object,
      subject: Object,
      activeTab: String,
      inspectorData: Object,
      newResourceUrl: String,
      newResourceTitle: String,
      newResourceType: String
    },
    emits: ['close', 'update:activeTab', 'open-concept', 'add-resource', 'remove-resource', 'update:newResourceUrl', 'update:newResourceTitle', 'update:newResourceType'],
    template: `
      <Transition name="inspector">
        <div v-if="concept"
             class="fixed inset-0 z-50 flex justify-end"
             @click.self="$emit('close')">
          <div class="w-full max-w-lg bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-700 shadow-2xl overflow-y-auto flex flex-col"
               @click.stop>
            <div class="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <div>
                <p class="text-xs text-slate-400 dark:text-slate-500 font-medium">Inspector de concepto</p>
                <p class="font-bold text-base" v-text="concept.name"></p>
                <p v-if="concept.description" class="text-xs text-slate-400 dark:text-slate-500 mt-1 leading-relaxed" v-html="GC.md(concept.description)"></p>
              </div>
              <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg p-1">&times;</button>
            </div>
            <div class="flex gap-0.5 px-4 pt-3 border-b border-slate-200 dark:border-slate-700 text-xs font-medium">
              <button @click="$emit('update:activeTab', 'walkthrough')"
                      :class="activeTab==='walkthrough'?'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600':'text-slate-400'"
                      class="pb-2 px-2 transition">Walkthrough</button>
              <button @click="$emit('update:activeTab', 'resources')"
                      :class="activeTab==='resources'?'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600':'text-slate-400'"
                      class="pb-2 px-2 transition">Recursos</button>
            </div>
            <div v-show="activeTab==='walkthrough'" class="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
              <div v-if="inspectorData?.isIsolated" class="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-xl p-3 text-amber-700 dark:text-amber-300 text-xs">
                <svg class="w-3.5 h-3.5 inline-block mr-1 -mt-0.5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/></svg> Este concepto est\u00e1 aislado: no tiene relaciones con otros conceptos.
              </div>
              <div v-if="inspectorData?.recommendation" class="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <p class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-1">Recomendaci\u00f3n</p>
                <p v-text="inspectorData.recommendation" class="leading-relaxed"></p>
              </div>
              <div v-if="inspectorData?.blockers?.length">
                <p class="text-xs font-bold text-red-600 dark:text-red-400 mb-1">Bloqueado por</p>
                <div class="space-y-1">
                  <div v-for="b in inspectorData.blockers" :key="b.id"
                       @click="$emit('open-concept', b.id)"
                       class="bg-red-50 dark:bg-red-900/20 rounded-lg px-3 py-2 border border-red-100 dark:border-red-800/40 cursor-pointer hover:border-red-300 transition text-sm">
                    <span class="font-medium" v-text="b.name"></span>
                    <span v-if="b.score != null" class="ml-2" :style="'color:'+GC.heatColor(b.score)" v-text="Math.round(b.score)+'%'"></span>
                  </div>
                </div>
              </div>
              <div v-if="inspectorData?.weakBlockers?.length">
                <p class="text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">Necesitan refuerzo</p>
                <div class="space-y-1">
                  <div v-for="b in inspectorData.weakBlockers" :key="b.id"
                       @click="$emit('open-concept', b.id)"
                       class="bg-amber-50 dark:bg-amber-900/20 rounded-lg px-3 py-2 border border-amber-100 dark:border-amber-800/40 cursor-pointer hover:border-amber-300 transition text-sm">
                    <span class="font-medium" v-text="b.name"></span>
                    <span class="ml-2" :style="'color:'+GC.heatColor(b.score)" v-text="Math.round(b.score)+'%'"></span>
                  </div>
                </div>
              </div>
              <div v-if="inspectorData?.dependents?.length">
                <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">Conceptos que dependen de este</p>
                <div class="space-y-1">
                  <div v-for="d in inspectorData.dependents" :key="d.id"
                       @click="$emit('open-concept', d.id)"
                       class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg px-3 py-2 border border-indigo-100 dark:border-indigo-800/40 cursor-pointer hover:border-indigo-300 transition text-sm">
                    <span class="font-medium" v-text="d.name"></span>
                    <span v-if="d.score != null" class="ml-2" :style="'color:'+GC.heatColor(d.score)" v-text="Math.round(d.score)+'%'"></span>
                  </div>
                </div>
              </div>
              <div v-if="!inspectorData?.blockers?.length && !inspectorData?.dependents?.length && !inspectorData?.weakBlockers?.length" class="text-sm text-slate-400 py-4 text-center">
                No hay relaciones para este concepto.
              </div>
            </div>
            <div v-show="activeTab==='resources'" class="flex-1 p-4 space-y-3 overflow-y-auto text-sm">
              <div>
                <div v-for="r in (concept?.resources || [])" :key="r.id"
                     class="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-700 mb-2">
                  <span class="w-4 h-4 shrink-0 text-slate-400"><svg v-if="r.type==='link'" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/></svg><svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/></svg></span>
                  <div class="flex-1 min-w-0">
                    <a :href="r.url" target="_blank" class="font-medium text-indigo-600 dark:text-indigo-400 hover:underline truncate block" v-text="r.title"></a>
                  </div>
                  <button @click="$emit('remove-resource', r.id)" class="text-red-400 hover:text-red-600 text-xs p-1">&times;</button>
                </div>
                <div v-if="!(concept?.resources?.length)" class="text-sm text-slate-400 py-2 text-center">
                  Sin recursos a\u00f1adidos.
                </div>
                <div class="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700">
                  <p class="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">A\u00f1adir recurso</p>
                  <div class="flex gap-1 mb-2">
                    <button @click="$emit('update:newResourceType', 'link')"
                            :class="newResourceType==='link'?'bg-indigo-600 text-white':'bg-slate-100 dark:bg-slate-700'"
                            class="px-3 py-1 rounded text-xs font-medium">Enlace</button>
                    <button @click="$emit('update:newResourceType', 'note')"
                            :class="newResourceType==='note'?'bg-indigo-600 text-white':'bg-slate-100 dark:bg-slate-700'"
                            class="px-3 py-1 rounded text-xs font-medium">Nota</button>
                  </div>
                  <input :value="newResourceUrl" @input="$emit('update:newResourceUrl', $event.target.value)" :placeholder="newResourceType==='link'?'URL del recurso':'Texto de la nota'" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm mb-2" />
                  <input :value="newResourceTitle" @input="$emit('update:newResourceTitle', $event.target.value)" placeholder="T\u00edtulo (opcional)" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm mb-2" />
                  <button @click="$emit('add-resource')" class="w-full bg-indigo-600 text-white font-bold py-2 rounded-xl text-sm hover:bg-indigo-700 transition">A\u00f1adir</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    `
  };
})();
