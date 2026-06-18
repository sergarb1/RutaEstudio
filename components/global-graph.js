(function() {
  if (!GC.components) GC.components = {};

  GC.components['global-graph'] = {
    template: `
      <div>
        <button @click="$emit('back')" class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4 flex items-center gap-1 hover:underline transition">&larr; Volver</button>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 class="text-lg font-bold">\uD83D\uDD17 Grafo global de conocimiento</h2>

            <div class="flex gap-2">
              <select v-model="filterSubject"
                      @change="rerender()"
                      class="border dark:border-slate-600 dark:bg-slate-700 rounded-lg px-3 py-1.5 text-xs">
                <option value="">Todas las asignaturas</option>
                <option v-for="s in subjects" :key="s.id" :value="s.id" v-text="s.name"></option>
              </select>
              <button v-if="subjects.length >= 2 && !showCrossForm"
                      @click="showCrossForm = true"
                      class="text-xs bg-indigo-600 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition">
                + Relaci\u00f3n cruzada
              </button>
              <button v-else-if="showCrossForm"
                      @click="showCrossForm = false"
                      class="text-xs bg-slate-400 text-white font-bold px-3 py-1.5 rounded-lg hover:bg-slate-500 transition">
                Cerrar
              </button>
            </div>
          </div>

          <!-- Cross-relation form -->
          <div v-if="showCrossForm" class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700 mb-4 space-y-2">
            <div class="grid sm:grid-cols-3 gap-2">
              <select v-model="crossFrom" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                <option value="">Concepto origen</option>
                <optgroup v-for="s in subjects" :key="s.id" :label="s.name">
                  <option v-for="c in s.concepts" :key="c.id" :value="c.id" v-text="c.name"></option>
                </optgroup>
              </select>
              <select v-model="crossType" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                <option value="relacionado">Relacionado</option>
                <option value="prerrequisito">Prerrequisito</option>
                <option value="pertenece">Pertenece</option>
                <option value="profundiza">Profundiza</option>
              </select>
              <select v-model="crossTo" class="border dark:border-slate-600 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm">
                <option value="">Concepto destino</option>
                <optgroup v-for="s in subjects" :key="s.id" :label="s.name">
                  <option v-for="c in s.concepts" :key="c.id" :value="c.id" v-text="c.name"></option>
                </optgroup>
              </select>
            </div>
            <button @click="addCrossRelation()" class="w-full bg-indigo-600 text-white text-sm font-bold py-2 rounded-lg hover:bg-indigo-700 transition" :disabled="!crossFrom || !crossTo">
              Crear relaci\u00f3n entre asignaturas
            </button>
          </div>

          <!-- Legend -->
          <div class="flex flex-wrap gap-3 mb-3">
            <div v-for="(s, i) in subjects" :key="s.id" class="flex items-center gap-1.5 text-xs">
              <span class="w-3 h-3 rounded-full inline-block" :style="{ background: subjectColors[s.id] }"></span>
              <span v-text="s.name" class="font-medium"></span>
            </div>
          </div>

          <div id="global-graph-container" style="width:100%;height:550px;border-radius:1rem;background:var(--color-bg);" class="dark:border dark:border-slate-700"></div>

          <!-- Cross relations list -->
          <div v-if="store.crossRelations.length" class="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 class="font-bold text-sm mb-2">Relaciones entre asignaturas</h3>
            <div class="space-y-1">
              <div v-for="(r, i) in store.crossRelations" :key="i" class="flex items-center gap-2 text-xs bg-slate-50 dark:bg-slate-900/50 rounded-lg p-2">
                <span class="font-medium text-indigo-600 dark:text-indigo-400" v-text="conceptName(r.from)"></span>
                <span class="text-xs px-1.5 py-0.5 rounded font-medium"
                  :class="typeClass(r.type)">{{ r.type }}</span>
                <span class="font-medium text-indigo-600 dark:text-indigo-400" v-text="conceptName(r.to)"></span>
                <button @click="removeCross(i)" class="ml-auto text-red-500 hover:underline">\u2715</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    props: {
      subjects: Array,
      store: Object
    },
    emits: ['back'],
    data() {
      return {
        filterSubject: '',
        showCrossForm: false,
        crossFrom: '',
        crossTo: '',
        crossType: 'relacionado',
        network: null,
        subjectColors: {}
      };
    },
    methods: {
      rerender() {
        GC.graph.destroy(this.network);
        this.$nextTick(() => this.renderGraph());
      },
      renderGraph() {
        let subjects = this.subjects;
        if (this.filterSubject) {
          subjects = subjects.filter(s => s.id === this.filterSubject);
        }
        subjects.forEach((s, i) => {
          this.subjectColors[s.id] = GC.subjectColor(i);
        });
        const result = GC.graph.renderGlobal('global-graph-container', subjects, this.store.crossRelations);
        if (result) {
          this.network = result.network;
        }
      },
      conceptName(id) {
        return GC.conceptName(this.subjects, id);
      },
      typeClass(type) {
        return {
          'prerrequisito': 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
          'pertenece': 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
          'relacionado': 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
          'profundiza': 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
        }[type] || '';
      },
      addCrossRelation() {
        if (!this.crossFrom || !this.crossTo) return;
        this.store.addCrossRelation(this.crossFrom, this.crossTo, this.crossType);
        this.crossFrom = '';
        this.crossTo = '';
        this.showCrossForm = false;
        this.rerender();
      },
      removeCross(i) {
        this.store.removeCrossRelation(i);
        this.rerender();
      }
    },
    mounted() {
      this.renderGraph();
    },
    beforeUnmount() {
      GC.graph.destroy(this.network);
    },
    watch: {
      subjects() {
        this.rerender();
      }
    }
  };
})();
