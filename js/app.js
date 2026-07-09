// ============================================================
// APLICACIÓN PRINCIPAL — Ruta de Estudio
// Esqueleto Vue 3: estado (data), propiedades computadas base,
// métodos núcleo, observadores, ciclo de vida, teclado.
// Los módulos study.js y editor.js se fusionan aquí.
// ============================================================
(function() {
  const { createApp } = Vue;

  const app = createApp({

    // ----------------------------------------------------------
    // ESTADO REACTIVO (data)
    // ----------------------------------------------------------
    data() {
      return {
        view: 'subjects',
        tab: 'concepts',
        currentSubjectId: null,
        modal: '',
        modalTitle: '',

        editName: '',
        editDesc: '',
        editConceptName: '',
        editConceptDesc: '',
        editConceptWeight: 5,
        editConceptId: null,
        editConceptTags: '',

        currentRelationType: 'prerrequisito',
        showRelationForm: false,
        relFormFrom: '',
        relFormTo: '',
        relFormType: 'prerrequisito',

        network: null,
        heatNetwork: null,
        graphLoading: false,
        heatGraphLoading: false,
        graphRelFilter: '',
        graphWeightMin: 1,
        showLegend: false,
        focusMode: false,

        assessIndex: 0,
        assessScores: {},
        assessNotes: {},
        lastAssessment: null,
        planAlgorithm: 'bfs',
        compareA: null,
        compareB: null,

        inspectorConcept: null,
        inspectorTab: 'walkthrough',
        newResourceUrl: '',
        newResourceTitle: '',
        newResourceType: 'link',

        conceptSearch: '',
        tagFilter: '',
        globalSearch: '',
        globalSearchOpen: false,

        dark: false,
        autoBackupInterval: null,

        inlineEditId: null,
        inlineEditName: '',
        inlineEditDesc: '',

        dragId: null,
        bulkTagMode: false,
        bulkTagValue: '',
        bulkChecked: {},

        toast: null,
        toastTimer: null,

        templateTab: 'manual',
        templateSearch: '',

        studyFilter: 'all',
        studySession: [],
        studyIndex: 0,
        studyFlip: false,
        studyDone: 0,
        studyWrong: 0,
        studyTotalCards: 0,

        showOnboarding: false,
        onboardingStep: 0,

        pomodoroSeconds: 1500,
        pomodoroMinutes: 25,
        pomodoroRunning: false,
        pomodoroInterval: null,
        pomodoroOriginal: 1500,

        reminderTime: localStorage.getItem('re-reminder-time') || '',
        reminderEnabled: localStorage.getItem('re-reminder-enabled') === 'true',
        reminderInterval: null,
        reminderPermission: Notification.permission,
        lang: GC.lang,

        customTypeName: '',
        customTypeColor: '#06b6d4',
        customTypeDash: false,
        customTypeWidth: 2,
        customTypeArrow: 'to',
        customTypeEditId: null,
        showAchievements: false,
        showMoreMenu: false
      };
    },

    // ----------------------------------------------------------
    // PROPIEDADES COMPUTADAS (base + módulo study)
    // ----------------------------------------------------------
    computed: Object.assign({

      GC() { return window.GC; },
      store() { return GC.store; },
      subjects() { return this.store.subjects; },
      assessments() { return this.store.assessments; },

      currentSubject() {
        return this.currentSubjectId ? this.store.getSubject(this.currentSubjectId) : null;
      },
      subjectAssessmentsList() {
        if (!this.currentSubject) return [];
        return this.store.subjectAssessments(this.currentSubject.id);
      },

      stats() {
        const r = this.lastAssessment;
        if (!r) return { red: 0, yellow: 0, green: 0 };
        let red = 0, yellow = 0, green = 0;
        Object.values(r.results).forEach(v => {
          if (v < 40) red++; else if (v < 70) yellow++; else green++;
        });
        return { red, yellow, green };
      },
      overallScore() {
        if (!this.lastAssessment) return 0;
        return GC.overallScore(this.lastAssessment.results);
      },

      filteredConcepts() {
        if (!this.currentSubject) return [];
        let list = this.currentSubject.concepts;
        const q = this.conceptSearch.trim().toLowerCase();
        if (q) {
          list = list.filter(c =>
            c.name.toLowerCase().includes(q) || (c.description || '').toLowerCase().includes(q)
          );
        }
        if (this.tagFilter) {
          list = list.filter(c => (c.tags || []).includes(this.tagFilter));
        }
        return list;
      },
      availableTags() {
        if (!this.currentSubject) return [];
        return this.store.allTags(this.currentSubject.id);
      },

      suggestions() {
        return this.store.getSuggestions();
      },
      inspector() {
        if (!this.inspectorConcept || !this.currentSubject) return null;
        return GC.walkthrough(this.currentSubject, this.inspectorConcept, this.lastAssessment?.results);
      },
      roadmap() {
        if (!this.currentSubject) return { ahora: [], siguiente: [], pronto: [] };
        return GC.roadmap(this.currentSubject, this.lastAssessment?.results);
      },
      compareDiff() {
        if (!this.compareA || !this.compareB || !this.currentSubject) return [];
        const rA = this.compareA.results, rB = this.compareB.results;
        return this.currentSubject.concepts.map(c => {
          const a = rA[c.id] || 0, b = rB[c.id] || 0;
          return { id: c.id, name: c.name, before: a, after: b, diff: b - a };
        }).sort((x, y) => Math.abs(y.diff) - Math.abs(x.diff));
      },
      conceptTree() {
        if (!this.currentSubject) return [];
        const rootIds = new Set(this.currentSubject.concepts.map(c => c.id));
        this.currentSubject.relations.filter(r => r.type === 'prerrequisito').forEach(r => rootIds.delete(r.to));
        const score = this.lastAssessment?.results || {};
        const build = (id, depth) => {
          const c = this.currentSubject.concepts.find(x => x.id === id);
          if (!c) return null;
          const children = this.currentSubject.relations
            .filter(r => r.from === id && r.type === 'prerrequisito')
            .map(r => build(r.to, depth + 1))
            .filter(Boolean);
          const blockers = this.currentSubject.relations.filter(r => r.to === id && r.type === 'prerrequisito').map(r => r.from);
          return { id: c.id, name: c.name, depth, children, score: score[id] || null, blockers };
        };
        return [...rootIds].map(id => build(id, 0)).filter(Boolean);
      },

      globalResults() {
        if (!this.globalSearch.trim()) return [];
        const q = this.globalSearch.toLowerCase();
        const results = [];
        this.subjects.forEach(s => {
          s.concepts.forEach(c => {
            const match =
              c.name.toLowerCase().includes(q) ||
              (c.description || '').toLowerCase().includes(q) ||
              (c.tags || []).some(t => t.toLowerCase().includes(q));
            if (match) results.push({ subjectId: s.id, subjectName: s.name, concept: c });
          });
        });
        return results;
      },

      isolatedCount() {
        if (!this.currentSubject) return 0;
        return this.currentSubject.concepts.filter(c =>
          !this.currentSubject.relations.some(r => r.from === c.id || r.to === c.id)
        ).length;
      },
      allRelationTypes() {
        return GC.store.allRelationTypes();
      },
      templateGroups() {
        return GC.templates || {};
      },
      filteredTemplates() {
        const q = this.templateSearch.trim().toLowerCase();
        const groups = this.templateGroups;
        const result = [];
        for (const gk in groups) {
          const group = groups[gk];
          const subs = group.subjects.filter(s =>
            !q || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
          );
          if (subs.length) {
            result.push({ key: gk, label: group.label, emoji: group.emoji, subjects: subs });
          }
        }
        return result;
      }

    }, GC.studyModule?.computed || {}, GC.gamificationModule?.computed || {}),

    // ----------------------------------------------------------
    // MÉTODOS (núcleo + módulos study + editor)
    // ----------------------------------------------------------
    methods: Object.assign({

      // ==================== TEMA OSCURO ====================
      initDark() {
        this.dark = localStorage.getItem('grafo-dark') === 'true'
          || (localStorage.getItem('grafo-dark') === null && window.matchMedia('(prefers-color-scheme: dark)').matches);
        this.applyDark();
      },
      toggleDark() {
        this.dark = !this.dark;
        localStorage.setItem('grafo-dark', this.dark);
        this.applyDark();
      },
      applyDark() {
        document.documentElement.classList.toggle('dark', this.dark);
      },
      setLang(lang) {
        GC.setLang(lang);
        this.lang = lang;
      },

      // ==================== GRAFO VISUAL ====================
      destroyGraph() {
        GC.graph.destroy(this.network);
        this.network = null;
        GC.graph.destroy(this.heatNetwork);
        this.heatNetwork = null;
      },
      renderGraph() {
        GC.graph.destroy(this.network);
        if (!this.currentSubject) return;
        this.graphLoading = true;
        this.$nextTick(() => {
          let concepts = this.currentSubject.concepts;
          let relations = this.currentSubject.relations;
          if (this.graphRelFilter) {
            relations = relations.filter(r => r.type === this.graphRelFilter);
          }
          if (this.graphWeightMin > 1) {
            const validIds = new Set(concepts.filter(c => (c.weight || 1) >= this.graphWeightMin).map(c => c.id));
            concepts = concepts.filter(c => validIds.has(c.id));
            relations = relations.filter(r => validIds.has(r.from) && validIds.has(r.to));
          }
          const positions = this.currentSubject.nodePositions || {};
          this.network = GC.graph.render('graph-container', concepts, relations, {
            positions,
            onDragEnd: (saved) => {
              if (this.currentSubject) {
                this.currentSubject.nodePositions = saved;
                this.store.save();
              }
            }
          });
          if (this.network) {
            this.network.once('stabilizationIterationsDone', () => {
              this.graphLoading = false;
            });
            GC.graph.setupClickHandler(this.network, this.currentSubject.id, (subjId, from, to) => {
              this.store.addRelation(subjId, from, to, this.currentRelationType);
              this.renderGraph();
            });
          } else {
            this.graphLoading = false;
          }
        });
      },
      renderHeatGraph() {
        GC.graph.destroy(this.heatNetwork);
        if (!this.currentSubject || !this.lastAssessment) return;
        this.heatGraphLoading = true;
        this.$nextTick(() => {
          this.heatNetwork = GC.graph.renderHeat(
            'graph-heat-container',
            this.currentSubject.concepts,
            this.currentSubject.relations,
            this.lastAssessment.results,
            (id) => this.openInspector(id)
          );
          if (this.heatNetwork) {
            this.heatNetwork.once('stabilizationIterationsDone', () => {
              this.heatGraphLoading = false;
            });
          } else {
            this.heatGraphLoading = false;
          }
        });
      },

      // ==================== EVALUACIÓN ====================
      startAssessment() {
        this.assessIndex = 0;
        this.assessScores = {};
        this.assessNotes = {};
        this.tab = 'assess';
      },
      startBatchAssessment() {
        this.assessScores = this.lastAssessment ? { ...this.lastAssessment.results } : {};
        this.assessNotes = {};
        this.tab = 'batchAssess';
      },
      nextConcept() {
        if (this.assessIndex < this.currentSubject.concepts.length - 1) this.assessIndex++;
      },
      prevConcept() {
        if (this.assessIndex > 0) this.assessIndex--;
      },
      submitAssessment() {
        const scores = {};
        this.currentSubject.concepts.forEach(c => {
          scores[c.id] = this.assessScores[c.id] || 0;
        });
        const a = this.store.submitAssessment(this.currentSubject.id, scores, this.assessNotes);
        this.lastAssessment = a;
        this.tab = 'results';
        setTimeout(() => this.renderHeatGraph(), 200);
        this.store.userProfile.assessments = (this.store.userProfile.assessments || 0) + 1;
        // Track subjects assessed
        const assessedSubjects = new Set(this.store.assessments.map(x => x.subjectId));
        this.store.userProfile.subjectsAssessed = assessedSubjects.size;
        this.awardXP(50, 'Evaluaci\u00f3n');
        this.trackDailyAction();
        const aid = a.id;
        this.showToast('Evaluaci\u00f3n guardada', 'success', () => {
          this.store.deleteAssessment(aid);
          this.lastAssessment = this.store.lastAssessment(this.currentSubject.id);
          if (this.tab === 'results') this.$nextTick(() => this.renderHeatGraph());
        }, '\u21A9 Deshacer');
      },
      viewAssessment(a) {
        this.lastAssessment = a;
        this.tab = 'results';
        setTimeout(() => this.renderHeatGraph(), 200);
      },
      deleteAssessment(id) {
        const a = this.subjectAssessmentsList.find(x => x.id === id);
        if (!a) return;
        if (confirm('\u00bfBorrar evaluaci\u00f3n del ' + new Date(a.date).toLocaleDateString() + '?')) {
          this.store.deleteAssessment(id);
          if (this.lastAssessment?.id === id) {
            this.lastAssessment = this.store.lastAssessment(this.currentSubject.id);
          }
        }
      },

      // ==================== INSPECTOR ====================
      openInspector(conceptId) {
        this.inspectorConcept = conceptId;
        this.inspectorTab = 'walkthrough';
      },
      closeInspector() {
        this.inspectorConcept = null;
        this.newResourceUrl = '';
        this.newResourceTitle = '';
      },
      addResource() {
        if (!this.inspectorConcept || !this.newResourceUrl.trim()) return;
        this.store.addResource(this.currentSubject.id, this.inspectorConcept, {
          type: this.newResourceType,
          title: this.newResourceTitle.trim() || this.newResourceUrl.trim(),
          url: this.newResourceUrl.trim()
        });
        this.newResourceUrl = '';
        this.newResourceTitle = '';
      },
      removeResource(resourceId) {
        if (!this.inspectorConcept) return;
        this.store.removeResource(this.currentSubject.id, this.inspectorConcept, resourceId);
      },

      // ==================== BÚSQUEDA GLOBAL ====================
      openGlobalSearch() {
        this.globalSearchOpen = true;
        this.globalSearch = '';
        this.$nextTick(() => {
          const el = document.getElementById('global-search-input');
          if (el) el.focus();
        });
      },
      closeGlobalSearch() {
        this.globalSearchOpen = false;
        this.globalSearch = '';
      },
      goToConcept(subjectId, conceptId) {
        this.closeGlobalSearch();
        this.selectSubject(this.subjects.find(s => s.id === subjectId));
        this.$nextTick(() => {
          this.openInspector(conceptId);
        });
      },

      // ==================== AUTO-BACKUP ====================
      startAutoBackup() {
        this.stopAutoBackup();
        this.autoBackupInterval = setInterval(() => {
          if (this.subjects.length > 0) {
            const json = this.store.exportData();
            const blob = new Blob([json], { type: 'application/json' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'backup-grafo-' + new Date().toISOString().slice(0, 10) + '.json';
            a.click();
          }
        }, 300000);
      },
      stopAutoBackup() {
        if (this.autoBackupInterval) { clearInterval(this.autoBackupInterval); this.autoBackupInterval = null; }
      },

      // ==================== RECORDATORIOS ====================
      requestReminderPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
          Notification.requestPermission().then(p => this.reminderPermission = p);
        }
      },
      setReminder() {
        if (!this.reminderTime) return;
        localStorage.setItem('re-reminder-time', this.reminderTime);
        localStorage.setItem('re-reminder-enabled', this.reminderEnabled);
        this.startReminderCheck();
        this.showToast('Recordatorio guardado', 'success');
      },
      startReminderCheck() {
        if (this.reminderInterval) clearInterval(this.reminderInterval);
        if (!this.reminderEnabled || !this.reminderTime) return;
        this.reminderInterval = setInterval(() => {
          if (!this.reminderEnabled) return;
          const now = new Date();
          const [h, m] = this.reminderTime.split(':').map(Number);
          if (now.getHours() === h && now.getMinutes() === m && now.getSeconds() < 15) {
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification('Ruta de Estudio', {
                body: '¡Hora de estudiar! Revisa tu plan de estudio.',
                icon: 'img/icon.svg'
              });
            }
          }
        }, 10000);
      },
      toggleReminder() {
        this.reminderEnabled = !this.reminderEnabled;
        localStorage.setItem('re-reminder-enabled', this.reminderEnabled);
        if (this.reminderEnabled) this.startReminderCheck();
        else if (this.reminderInterval) clearInterval(this.reminderInterval);
      },

      // ==================== TOAST ====================
      showToast(message, type, action, actionLabel) {
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toast = { message, type: type || 'info', action, actionLabel };
        this.toastTimer = setTimeout(() => { this.toast = null; }, 4000);
      },
      dismissToast() {
        if (this.toastTimer) clearTimeout(this.toastTimer);
        this.toast = null;
      },

      // ==================== NAVEGACIÓN ====================
      goToGlobalGraph() {
        this.view = 'globalGraph';
        this.destroyGraph();
      },
      goToSuggestions() {
        this.view = 'suggestions';
      },
      showHelp() {
        this.modal = 'help';
      },
      goToAIGenerator() {
        this.view = 'aiGenerator';
      },
      toggleFocusMode() {
        this.focusMode = !this.focusMode;
        if (this.focusMode && this.view === 'subject' && this.tab === 'graph') {
          this.$nextTick(() => this.renderGraph());
        }
      },

      // ==================== UTILIDADES ====================
      groupBy(arr, key) {
        const map = {};
        arr.forEach(item => {
          const k = item[key];
          if (!map[k]) map[k] = [];
          map[k].push(item);
        });
        return Object.keys(map).map(k => ({ key: k, items: map[k] }));
      }

    }, GC.studyModule?.methods || {}, GC.editorModule?.methods || {}, GC.gamificationModule?.methods || {}),

    // ----------------------------------------------------------
    // OBSERVADORES (watch)
    // ----------------------------------------------------------
    watch: {
      tab(val) {
        if (val === 'graph') {
          setTimeout(() => this.renderGraph(), 100);
        }
        if (val === 'results') {
          setTimeout(() => this.renderHeatGraph(), 200);
        }
        if (val === 'batchAssess') {
          this.startBatchAssessment();
        }
        if (val === 'study') {
          this.$nextTick(() => this.startStudy());
        }
        if (val !== 'study') {
          this.pausePomodoro();
        }
      },
      currentSubject() {
        this.destroyGraph();
      },
      graphRelFilter() {
        if (this.tab === 'graph') this.renderGraph();
      },
      graphWeightMin() {
        if (this.tab === 'graph') this.renderGraph();
      },
      studyFilter() {
        if (this.tab === 'study') this.$nextTick(() => this.startStudy());
      }
    },

    // ----------------------------------------------------------
    // CICLO DE VIDA
    // ----------------------------------------------------------
    mounted() {
      this.initDark();
      this.store.init();
      document.addEventListener('keydown', this._onKeydown);
      this.startAutoBackup();
      this.startReminderCheck();
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(p => this.reminderPermission = p);
      }
      if (!localStorage.getItem('grafo-onboarding-v2')) {
        this.showOnboarding = true;
        this.onboardingStep = 0;
      }
      this.$nextTick(() => this.checkAchievements());
    },
    beforeUnmount() {
      document.removeEventListener('keydown', this._onKeydown);
      this.stopAutoBackup();
      this.pausePomodoro();
      if (this.reminderInterval) clearInterval(this.reminderInterval);
    },

    // ----------------------------------------------------------
    // MANEJADOR GLOBAL DE TECLADO
    // ----------------------------------------------------------
    _onKeydown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.openGlobalSearch();
        return;
      }
      if (e.key === '?' && !this.modal) {
        this.modal = 'shortcuts';
        return;
      }
      if (e.key === 'Escape' && this.globalSearchOpen) {
        this.closeGlobalSearch();
        return;
      }
      if (e.key === 'f' && (e.ctrlKey || e.metaKey) && this.view === 'subject' && this.tab === 'graph') {
        e.preventDefault();
        this.toggleFocusMode();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          this.store.redo();
        } else {
          this.store.undo();
        }
        this.$nextTick(() => {
          if (this.tab === 'graph') this.renderGraph();
          if (this.tab === 'results') this.renderHeatGraph();
        });
        return;
      }
      if (e.key === 'Escape' && this.modal) {
        this.modal = '';
        return;
      }
      if (this.view === 'subject' && this.tab === 'assess' && this.currentSubject?.concepts.length) {
        if (e.key === 'ArrowRight' && this.assessIndex < this.currentSubject.concepts.length - 1) {
          e.preventDefault();
          this.nextConcept();
        }
        if (e.key === 'ArrowLeft' && this.assessIndex > 0) {
          e.preventDefault();
          this.prevConcept();
        }
        for (let n = 1; n <= 5; n++) {
          if (e.key === String(n)) {
            this.assessScores[this.currentSubject.concepts[this.assessIndex].id] = n * 20;
          }
        }
      }
    }
  });

  // ============================================================
  // REGISTRO DE COMPONENTES
  // ============================================================
  if (GC.components) {
    Object.entries(GC.components).forEach(([name, comp]) => {
      app.component(name, comp);
    });
  }

  // ============================================================
  // MONTAJE DE LA APLICACIÓN
  // ============================================================
  app.mount('#app');
})();
