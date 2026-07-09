(function() {
  if (!GC.components) GC.components = {};

  GC.components['ai-generator'] = {
    template: `
      <div>
        <button @click="$emit('back')" class="text-sm text-indigo-600 dark:text-indigo-400 font-medium mb-4 flex items-center gap-1 hover:underline transition">&larr; Volver</button>

        <div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">\uD83E\uDD16</span>
            <div>
              <h2 class="text-lg font-bold">Asistente IA</h2>
              <p class="text-xs text-slate-400 dark:text-slate-500">Copia prompts para ChatGPT, Claude o Gemini y luego importa el JSON generado</p>
            </div>
          </div>

          <div class="flex gap-1 mb-4 bg-slate-100 dark:bg-slate-700 rounded-lg p-1 text-sm font-medium overflow-x-auto tabs-scroll">
            <button v-for="t in tabs" :key="t.id"
                    @click="activeTab = t.id"
                    :class="activeTab === t.id ? 'bg-white dark:bg-slate-600 shadow-sm' : 'hover:bg-slate-50 dark:hover:bg-slate-600'"
                    class="px-3 py-1.5 rounded transition flex-shrink-0" v-text="t.label"></button>
          </div>

          <!-- Tab: Prompts -->
          <div v-if="activeTab === 'prompts'" class="space-y-4">
            <p class="text-sm text-slate-500 dark:text-slate-400">Copia estos prompts y p\u00e9gaselos a un asistente de IA (ChatGPT, Claude, Gemini...). Luego importa la respuesta JSON desde la pesta\u00f1a <strong>"Importar JSON"</strong>.</p>

            <div v-for="(prompt, i) in prompts" :key="i"
                 class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div class="flex items-start justify-between gap-2 mb-2">
                <h3 class="font-bold text-sm" v-text="prompt.title"></h3>
                <button @click="copyPrompt(i)" class="text-xs bg-indigo-600 text-white font-bold px-3 py-1 rounded-lg hover:bg-indigo-700 transition flex-shrink-0">
                  {{ copiedIndex === i ? '\u2705 Copiado' : '\uD83D\uDCCB Copiar' }}
                </button>
              </div>
              <p class="text-xs text-slate-400 dark:text-slate-500 mb-2" v-text="prompt.desc"></p>
              <pre class="text-xs bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto whitespace-pre-wrap select-all" v-text="prompt.text"></pre>
            </div>
          </div>

          <!-- Tab: Import JSON -->
          <div v-if="activeTab === 'import'" class="space-y-4">
            <p class="text-sm text-slate-500 dark:text-slate-400">Pega el JSON generado por el asistente de IA. Debe seguir el formato de <strong>FORMAT.md</strong>.</p>

            <textarea v-model="jsonInput"
                      placeholder="Pega aqu\u00ed el JSON generado por la IA..."
                      class="w-full border dark:border-slate-600 dark:bg-slate-900 rounded-xl px-4 py-3 text-sm font-mono min-h-[200px] focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"></textarea>

            <div class="flex gap-2">
              <button @click="parseJSON()" class="bg-indigo-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-indigo-700 transition" :disabled="!jsonInput.trim()">
                \uD83D\uDD0D Previsualizar
              </button>
              <button v-if="parsed"
                      @click="importJSON()"
                      class="bg-green-600 text-white text-sm font-bold px-5 py-2 rounded-xl hover:bg-green-700 transition">
                \u2B07 Importar {{ importCount }} elementos
              </button>
              <button @click="clearJSON()" class="text-xs text-slate-400 dark:text-slate-500 px-3 py-2 hover:underline transition">Limpiar</button>
            </div>

            <!-- Parse errors -->
            <div v-if="parseError" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 rounded-xl p-3">
              <p class="text-sm font-medium text-red-600 dark:text-red-400">Error al procesar</p>
              <p class="text-xs text-red-500 dark:text-red-400 mt-1" v-text="parseError"></p>
            </div>

            <!-- Preview -->
            <div v-if="parsed" class="space-y-3">
              <div v-for="(subj, si) in parsed.subjects" :key="si"
                   class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full" :style="{ background: subjectColor(si) }"></span>
                  <h3 class="font-bold text-sm" v-text="subj.name"></h3>
                  <span class="text-xs text-slate-400 dark:text-slate-500 ml-auto" v-text="subj.concepts.length + ' conceptos, ' + subj.relations.length + ' relaciones'"></span>
                </div>
                <p v-if="subj.description" class="text-xs text-slate-500 dark:text-slate-400 mt-1" v-text="subj.description"></p>
                <div class="flex flex-wrap gap-1 mt-2">
                  <span v-for="c in subj.concepts" :key="c.id"
                        class="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-medium" v-text="c.name"></span>
                </div>
                <div v-if="subj.relations.length" class="mt-2 text-xs text-slate-400 dark:text-slate-500">
                  <span v-text="subj.relations.length + ' relaciones internas'"></span>
                </div>
              </div>

              <div v-if="parsed.crossRelations?.length" class="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 border border-blue-200 dark:border-blue-800/40">
                <p class="text-xs font-medium text-blue-600 dark:text-blue-400">
                  \uD83D\uDD17 {{ parsed.crossRelations.length }} relaci\u00f3n(es) entre asignaturas
                </p>
              </div>

              <div v-if="parsed.assessments?.length" class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 border border-amber-200 dark:border-amber-800/40">
                <p class="text-xs font-medium text-amber-600 dark:text-amber-400">
                  \uD83D\uDCCA {{ parsed.assessments.length }} evaluaci\u00f3n(es) incluidas
                </p>
              </div>
            </div>
          </div>

          <!-- Tab: Guide -->
          <div v-if="activeTab === 'guide'" class="space-y-4 text-sm text-slate-600 dark:text-slate-300">
            <section>
              <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 mb-2">\uD83E\uDD16 \u00bfC\u00f3mo funciona?</h3>
              <ol class="list-decimal ml-5 space-y-2">
                <li><strong>Elige un prompt</strong> de la pesta\u00f1a "Prompts" y c\u00f3pialo.</li>
                <li><strong>P\u00e9gaselo a un asistente de IA</strong> (ChatGPT, Claude, Gemini, etc.) y completa los detalles (tema, nivel, n\u00famero de conceptos...).</li>
                <li><strong>El asistente generar\u00e1 un JSON</strong> con la estructura correcta. C\u00f3pialo.</li>
                <li><strong>Pega el JSON</strong> en la pesta\u00f1a "Importar JSON" de esta herramienta.</li>
                <li><strong>Previsualiza y confirma</strong> la importaci\u00f3n.</li>
              </ol>
            </section>

            <section>
              <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 mb-2">\uD83D\uDCCB Formato soportado</h3>
              <p>El JSON debe tener esta estructura (puede ser parcial):</p>
              <pre class="text-xs bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto whitespace-pre-wrap mt-2">{
  "subjects": [{
    "name": "Asignatura",
    "description": "...",
    "concepts": [
      { "name": "Concepto", "description": "...", "weight": 5 }
    ],
    "relations": [
      { "from": "Concepto A", "to": "Concepto B", "type": "prerrequisito" }
    ]
  }],
  "crossRelations": [],
  "assessments": []
}</pre>
              <p class="mt-2 text-xs text-slate-400 dark:text-slate-500">Los IDs se generan autom\u00e1ticamente. Los nombres en <code>from</code>/<code>to</code> se resuelven buscando por nombre.</p>
            </section>

            <section>
              <h3 class="font-bold text-base text-slate-800 dark:text-slate-100 mb-2">\uD83C\uDF1F Consejos</h3>
              <ul class="list-disc ml-5 space-y-1">
                <li>S\u00e9 espec\u00edfico en el prompt: indica nivel, n\u00famero de conceptos, tipo de relaciones.</li>
                <li>Revisa siempre el JSON antes de importar usando la previsualizaci\u00f3n.</li>
                <li>Los pesos (weight 1-10) y tipos de relaci\u00f3n deben ser v\u00e1lidos.</li>
                <li>Puedes importar varias veces para combinar m\u00faltiples fuentes.</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    `,
    props: {
      store: Object
    },
    emits: ['back'],
    data() {
      return {
        activeTab: 'import',
        tabs: [
          { id: 'prompts', label: '\uD83D\uDCDD Prompts' },
          { id: 'import', label: '\u2B07 Importar JSON' },
          { id: 'guide', label: '\u2139\uFE0F Gu\u00eda' }
        ],
        jsonInput: '',
        parsed: null,
        parseError: '',
        copiedIndex: -1,
        prompts: [
          {
            title: 'Generar asignatura completa',
            desc: 'Pide a la IA que genere una asignatura con conceptos, pesos y relaciones.',
            text: 'Genera un m\u00f3dulo de estudio en formato JSON para un grafo de conocimiento sobre [TEMA]. Incluye:\n\n1. Nombre y descripci\u00f3n de la asignatura\n2. 8-12 conceptos con nombre, descripci\u00f3n corta y peso (1-10) seg\u00fan dificultad\n3. Relaciones entre conceptos usando estos tipos:\n   - "prerrequisito": A debe saberse antes que B\n   - "pertenece": A es subconcepto de B\n   - "relacionado": conexi\u00f3n d\u00e9bil bidireccional\n   - "profundiza": A profundiza B\n\nDevuelve \u00fanicamente el JSON v\u00e1lido con esta estructura (sin explicaciones):\n{\n  "subjects": [{\n    "name": "...",\n    "description": "...",\n    "concepts": [{ "name": "...", "description": "...", "weight": 5 }],\n    "relations": [{ "from": "NombreOrigen", "to": "NombreDestino", "type": "prerrequisito" }]\n  }]\n}'
          },
          {
            title: 'A\u00f1adir relaciones a conceptos existentes',
            desc: 'Pasa tus conceptos actuales a la IA y pide que los conecte.',
            text: 'Tengo estos conceptos de la asignatura "[NOMBRE ASIGNATURA]":\n[LISTA DE CONCEPTOS]\n\nGenera relaciones entre ellos usando estos tipos:\n- "prerrequisito": A debe saberse antes que B\n- "pertenece": A es subconcepto de B\n- "relacionado": conexi\u00f3n d\u00e9bil\n- "profundiza": A profundiza B\n\nDevuelve solo el JSON v\u00e1lido:\n{\n  "subjects": [{\n    "name": "[NOMBRE ASIGNATURA]",\n    "concepts": [{ "name": "...", "description": "...", "weight": 5 }],\n    "relations": [{ "from": "Origen", "to": "Destino", "type": "prerrequisito" }]\n  }]\n}'
          },
          {
            title: 'Generar evaluaci\u00f3n de ejemplo',
            desc: 'Crea una evaluaci\u00f3n simulada basada en conceptos existentes.',
            text: 'Genera una evaluaci\u00f3n de ejemplo en formato JSON para la asignatura "[NOMBRE ASIGNATURA]" con estos conceptos:\n[LISTA DE CONCEPTOS]\n\nAsigna puntuaciones realistas (0-100) simulando un estudiante que domina algunos conceptos y tiene dificultades en otros.\n\nDevuelve solo el JSON v\u00e1lido:\n{\n  "assessments": [{\n    "subjectName": "[NOMBRE ASIGNATURA]",\n    "results": { "Concepto1": 80, "Concepto2": 30 },\n    "notes": { "Concepto2": "Dificultad con..." }\n  }]\n}'
          },
          {
            title: 'Relaciones entre asignaturas',
            desc: 'Crea conexiones entre conceptos de diferentes materias.',
            text: 'Tengo estas dos asignaturas en mi grafo de conocimiento:\n\nASIGNATURA 1: [NOMBRE]\nConceptos: [LISTA]\n\nASIGNATURA 2: [NOMBRE]\nConceptos: [LISTA]\n\nGenera relaciones cruzadas entre conceptos de ambas asignaturas que est\u00e9n relacionados tem\u00e1ticamente. Usa tipos: prerrequisito, pertenece, relacionado, profundiza.\n\nDevuelve solo el JSON v\u00e1lido:\n{\n  "crossRelations": [\n    { "from": "ConceptoAsig1", "to": "ConceptoAsig2", "type": "relacionado" }\n  ]\n}'
          }
        ]
      };
    },
    computed: {
      importCount() {
        if (!this.parsed) return 0;
        let n = this.parsed.subjects?.length || 0;
        if (this.parsed.crossRelations?.length) n += this.parsed.crossRelations.length;
        if (this.parsed.assessments?.length) n += this.parsed.assessments.length;
        return n;
      }
    },
    methods: {
      subjectColor(i) {
        return GC.subjectColor(i);
      },
      copyPrompt(i) {
        const p = this.prompts[i];
        navigator.clipboard.writeText(p.text).then(() => {
          this.copiedIndex = i;
          setTimeout(() => { this.copiedIndex = -1; }, 2000);
        }).catch(() => {
          // Fallback for older browsers
          const ta = document.createElement('textarea');
          ta.value = p.text;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          this.copiedIndex = i;
          setTimeout(() => { this.copiedIndex = -1; }, 2000);
        });
      },
      parseJSON() {
        this.parseError = '';
        this.parsed = null;
        const raw = this.jsonInput.trim();
        if (!raw) return;

        let data;
        try {
          data = JSON.parse(raw);
        } catch (e) {
          this.parseError = 'JSON inv\u00e1lido: ' + e.message;
          return;
        }

        if (!data.subjects && !data.assessments && !data.crossRelations) {
          // Try as single subject object
          if (data.name || data.concepts) {
            data = { subjects: [data] };
          } else {
            this.parseError = 'El JSON no contiene subjects, assessments ni crossRelations. Revisa el formato.';
            return;
          }
        }

        const parsed = {
          subjects: [],
          crossRelations: [],
          assessments: []
        };

        // Validate subjects
        if (data.subjects) {
          if (!Array.isArray(data.subjects)) {
            this.parseError = '"subjects" debe ser un array.';
            return;
          }
          for (const s of data.subjects) {
            if (!s.name) {
              this.parseError = 'Cada asignatura debe tener un "name".';
              return;
            }
            const subj = {
              name: s.name,
              description: s.description || '',
              concepts: [],
              relations: []
            };
            // Concepts
            if (s.concepts && Array.isArray(s.concepts)) {
              for (const c of s.concepts) {
                if (!c.name) {
                  this.parseError = 'Cada concepto debe tener un "name".';
                  return;
                }
                subj.concepts.push({
                  name: c.name,
                  description: c.description || '',
                  weight: Math.max(1, Math.min(10, parseInt(c.weight) || 5))
                });
              }
            }
            // Relations
            if (s.relations && Array.isArray(s.relations)) {
              for (const r of s.relations) {
                if (!r.from || !r.to) {
                  this.parseError = 'Cada relaci\u00f3n debe tener "from" y "to".';
                  return;
                }
                const validTypes = ['prerrequisito', 'pertenece', 'relacionado', 'profundiza'];
                const type = validTypes.includes(r.type) ? r.type : 'relacionado';
                subj.relations.push({ from: r.from, to: r.to, type });
              }
            }
            parsed.subjects.push(subj);
          }
        }

        // Validate crossRelations
        if (data.crossRelations && Array.isArray(data.crossRelations)) {
          for (const r of data.crossRelations) {
            if (r.from && r.to) {
              parsed.crossRelations.push({
                from: r.from,
                to: r.to,
                type: ['prerrequisito', 'pertenece', 'relacionado', 'profundiza'].includes(r.type) ? r.type : 'relacionado'
              });
            }
          }
        }

        // Validate assessments
        if (data.assessments && Array.isArray(data.assessments)) {
          for (const a of data.assessments) {
            if (a.results && typeof a.results === 'object') {
              const results = {};
              Object.entries(a.results).forEach(([k, v]) => {
                results[k] = Math.max(0, Math.min(100, parseInt(v) || 0));
              });
              parsed.assessments.push({
                subjectName: a.subjectName || a.subjectId || '',
                results,
                notes: a.notes || {}
              });
            }
          }
        }

        if (!parsed.subjects.length && !parsed.crossRelations.length && !parsed.assessments.length) {
          this.parseError = 'No se encontraron datos v\u00e1lidos para importar.';
          return;
        }

        this.parsed = parsed;
      },
      importJSON() {
        if (!this.parsed) return;

        const store = this.store;
        const nameToId = {};

        for (const s of this.parsed.subjects) {
          const newSubject = store.addSubject(s.name, s.description);
          // Map concept names to IDs
          const conceptMap = {};
          for (const c of s.concepts) {
            const newConcept = store.addConcept(newSubject.id, c.name, c.description, c.weight);
            conceptMap[c.name] = newConcept.id;
            nameToId[c.name] = newConcept.id;
          }
          // Add relations using resolved IDs
          for (const r of s.relations) {
            const fromId = conceptMap[r.from];
            const toId = conceptMap[r.to];
            if (fromId && toId) {
              store.addRelation(newSubject.id, fromId, toId, r.type);
            }
          }
        }

        // Cross relations (resolve names to IDs across all subjects)
        for (const r of this.parsed.crossRelations) {
          const fromId = nameToId[r.from] || this._findConceptIdByName(r.from);
          const toId = nameToId[r.to] || this._findConceptIdByName(r.to);
          if (fromId && toId) {
            store.addCrossRelation(fromId, toId, r.type);
          }
        }

        // Assessments (resolve subject name)
        for (const a of this.parsed.assessments) {
          const subject = store.subjects.find(s => s.name === a.subjectName || s.id === a.subjectId);
          if (!subject) continue;
          const results = {};
          const notes = {};
          Object.entries(a.results).forEach(([name, score]) => {
            const concept = subject.concepts.find(c => c.name === name);
            if (concept) {
              results[concept.id] = score;
              if (a.notes && a.notes[name]) {
                notes[concept.id] = a.notes[name];
              }
            }
          });
          if (Object.keys(results).length) {
            store.submitAssessment(subject.id, results, notes);
          }
        }

        this.parsed = null;
        this.jsonInput = '';
        this.$emit('back');
      },
      clearJSON() {
        this.jsonInput = '';
        this.parsed = null;
        this.parseError = '';
      },
      _findConceptIdByName(name) {
        for (const s of this.store.subjects) {
          const c = s.concepts.find(x => x.name === name);
          if (c) return c.id;
        }
        return null;
      }
    }
  };
})();
