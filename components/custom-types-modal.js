(function() {
  if (!GC.components) GC.components = {};
  GC.components['custom-types-modal'] = {
    props: {
      show: Boolean,
      types: Array,
      editName: String,
      editColor: String,
      editDash: Boolean,
      editWidth: Number,
      editArrow: String,
      editId: String
    },
    emits: ['close', 'add-type', 'edit-type', 'delete-type', 'save-edit', 'cancel-edit', 'update:editName', 'update:editColor', 'update:editDash', 'update:editWidth', 'update:editArrow'],
    template: `
      <Transition name="modal">
        <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm" role="dialog" aria-modal="true" @click.self="$emit('close')">
          <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto border border-slate-200 dark:border-slate-700 m-4">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold">Tipos de relaci\u00f3n personalizados</h2>
              <button @click="$emit('close')" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xl min-w-[44px] min-h-[44px] flex items-center justify-center">&times;</button>
            </div>
            <div class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-4 space-y-3">
              <div><label class="block text-xs text-slate-400 mb-1">Nombre</label><input type="text" :value="editName" @input="$emit('update:editName', $event.target.value)" placeholder="Ej: Complementa" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" /></div>
              <div class="grid grid-cols-2 gap-3">
                <div><label class="block text-xs text-slate-400 mb-1">Color</label><input type="color" :value="editColor" @input="$emit('update:editColor', $event.target.value)" class="w-full h-9 border dark:border-slate-600 rounded-lg cursor-pointer" /></div>
                <div><label class="block text-xs text-slate-400 mb-1">Grosor</label>
                  <select :value="editWidth" @change="$emit('update:editWidth', Number($event.target.value))" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm">
                    <option :value="1">Fino (1px)</option><option :value="2">Normal (2px)</option><option :value="3">Grueso (3px)</option><option :value="4">Muy grueso (4px)</option>
                  </select>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-3">
                <div><label class="block text-xs text-slate-400 mb-1">L\u00ednea discontinua</label>
                  <label class="flex items-center gap-2 text-sm cursor-pointer pt-1"><input type="checkbox" :checked="editDash" @change="$emit('update:editDash', $event.target.checked)" class="accent-indigo-600" /><span v-text="editDash ? 'S\u00ed' : 'No'"></span></label>
                </div>
                <div><label class="block text-xs text-slate-400 mb-1">Direcci\u00f3n de flecha</label>
                  <select :value="editArrow" @change="$emit('update:editArrow', $event.target.value)" class="w-full border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-2 text-sm">
                    <option value="to">Direccional (&rarr;)</option><option value="none">Sin flecha (&mdash;)</option><option value="from">Inversa (&larr;)</option><option value="both">Bidireccional (&harr;)</option>
                  </select>
                </div>
              </div>
              <div class="bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-3">
                <span class="text-slate-400">Vista previa:</span>
                <span class="w-8 h-0.5 inline-block" :style="{ borderTop: editDash ? '2px dashed ' + editColor : editWidth >= 3 ? editWidth + 'px solid ' + editColor : '2px solid ' + editColor, borderColor: editColor }"></span>
                <span v-if="editArrow === 'to'" class="text-xs" :style="{ color: editColor }">&rarr;</span>
                <span v-if="editArrow === 'none'" class="text-xs" :style="{ color: editColor }">&mdash;</span>
                <span v-if="editArrow === 'from'" class="text-xs" :style="{ color: editColor }">&larr;</span>
                <span v-if="editArrow === 'both'" class="text-xs" :style="{ color: editColor }">&harr;</span>
                <span class="font-medium" :style="{ color: editColor }" v-text="editName || 'Nombre'"></span>
              </div>
              <div class="flex gap-2">
                <button v-if="editId" @click="$emit('save-edit')" class="flex-1 bg-indigo-600 text-white font-bold py-2 min-h-[44px] rounded-lg hover:bg-indigo-700 transition text-sm" :disabled="!editName.trim()">Guardar cambios</button>
                <button v-if="editId" @click="$emit('cancel-edit')" class="flex-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold py-2 min-h-[44px] rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition text-sm">Cancelar</button>
                <button v-else @click="$emit('add-type')" class="flex-1 bg-indigo-600 text-white font-bold py-2 min-h-[44px] rounded-lg hover:bg-indigo-700 transition text-sm" :disabled="!editName.trim()">A\u00f1adir tipo</button>
              </div>
            </div>
            <div v-if="types.length === 0" class="text-center py-6 text-sm text-slate-400">No hay tipos personalizados todav\u00eda. Crea uno nuevo arriba.</div>
            <div v-for="t in types" :key="t.id" class="flex items-center gap-3 py-2 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
              <span class="w-4 h-0.5 inline-block flex-shrink-0" :style="{ borderTop: t.dash ? '2px dashed ' + t.color : t.width >= 3 ? t.width + 'px solid ' + t.color : '2px solid ' + t.color, borderColor: t.color }"></span>
              <span v-if="t.arrow === 'to'" class="text-xs flex-shrink-0" :style="{ color: t.color }">&rarr;</span>
              <span v-if="t.arrow === 'none'" class="text-xs flex-shrink-0" :style="{ color: t.color }">&mdash;</span>
              <span v-if="t.arrow === 'from'" class="text-xs flex-shrink-0" :style="{ color: t.color }">&larr;</span>
              <span v-if="t.arrow === 'both'" class="text-xs flex-shrink-0" :style="{ color: t.color }">&harr;</span>
              <span class="font-medium text-sm flex-1" v-text="t.name"></span>
              <span class="text-xs text-slate-400" :style="{ color: t.color }" v-text="t.color"></span>
              <div class="flex gap-1"><button @click="$emit('edit-type', t)" class="text-xs text-indigo-600 hover:underline min-h-[36px]">Editar</button><button @click="$emit('delete-type', t.id)" class="text-xs text-red-500 hover:underline min-h-[36px]">Borrar</button></div>
            </div>
          </div>
        </div>
      </Transition>
    `
  };
})();
