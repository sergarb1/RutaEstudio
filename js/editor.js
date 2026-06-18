// ============================================================
// MÓDULO DE EDICIÓN — Ruta de Estudio
// CRUD de asignaturas, conceptos, relaciones; plantillas,
// importación/exportación, inline edit, drag & drop, bulk tag
// ============================================================
(function() {

  // ----------------------------------------------------------
  // MÉTODOS
  // ----------------------------------------------------------
  const methods = {

    // ==================== ASIGNATURAS ====================
    selectSubject(s) {
      this.currentSubjectId = s.id;
      this.view = 'subject';
      this.tab = 'concepts';
      this.conceptSearch = '';
      this.showRelationForm = false;
      this.lastAssessment = this.store.lastAssessment(s.id);
    },

    addSubject() {
      this.modal = 'subject';
      this.modalTitle = 'Nueva asignatura';
      this.editName = '';
      this.editDesc = '';
      this.templateTab = 'manual';
      this.templateSearch = '';
    },
    editSubject() {
      this.modal = 'subject';
      this.modalTitle = 'Editar asignatura';
      this.editName = this.currentSubject.name;
      this.editDesc = this.currentSubject.description || '';
    },
    saveSubject() {
      if (!this.editName.trim()) return;
      if (this.modalTitle.includes('Editar') && this.currentSubject) {
        this.store.updateSubject(this.currentSubject.id, this.editName.trim(), this.editDesc.trim());
      } else {
        this.store.addSubject(this.editName.trim(), this.editDesc.trim());
      }
      this.modal = '';
    },
    deleteSubject() {
      if (!this.currentSubject) return;
      if (confirm('\u00bfBorrar "' + this.currentSubject.name + '"?')) {
        this.store.deleteSubject(this.currentSubject.id);
        this.currentSubjectId = null;
        this.view = 'subjects';
        this.destroyGraph();
      }
    },

    // ==================== CONCEPTOS ====================
    addConcept() {
      this.modal = 'concept';
      this.modalTitle = 'Nuevo concepto';
      this.editConceptName = '';
      this.editConceptDesc = '';
      this.editConceptWeight = 5;
      this.editConceptId = null;
      this.editConceptTags = '';
    },
    editConcept(id) {
      const c = this.currentSubject.concepts.find(x => x.id === id);
      if (!c) return;
      this.modal = 'concept';
      this.modalTitle = 'Editar concepto';
      this.editConceptName = c.name;
      this.editConceptDesc = c.description || '';
      this.editConceptWeight = c.weight;
      this.editConceptId = id;
      this.editConceptTags = (c.tags || []).join(', ');
    },
    saveConcept() {
      if (!this.editConceptName.trim()) return;
      const name = this.editConceptName.trim();
      const tags = this.editConceptTags.split(',').map(t => t.trim()).filter(Boolean);
      const data = {
        name,
        description: this.editConceptDesc.trim(),
        weight: Math.max(1, Math.min(10, parseInt(this.editConceptWeight) || 5)),
        tags
      };
      const dup = this.currentSubject?.concepts.find(c =>
        c.name.toLowerCase() === name.toLowerCase() && c.id !== this.editConceptId
      );
      if (dup) {
        if (!confirm('Ya existe un concepto llamado "' + dup.name + '". \u00bfCrear duplicado de todas formas?')) return;
      }
      if (this.editConceptId) {
        this.store.updateConcept(this.currentSubject.id, this.editConceptId, data);
        this.showToast('Concepto actualizado', 'success');
      } else {
        this.store.addConcept(this.currentSubject.id, data.name, data.description, data.weight, tags);
        this.showToast('Concepto a\u00f1adido', 'success');
      }
      this.modal = '';
    },
    deleteConcept(id) {
      const c = this.currentSubject?.concepts.find(x => x.id === id);
      if (!c) return;
      if (confirm('\u00bfBorrar "' + c.name + '"?')) {
        this.store.deleteConcept(this.currentSubject.id, id);
      }
    },
    conceptName(id) {
      return GC.conceptName(this.subjects, id);
    },

    // ==================== EDICIÓN INLINE ====================
    startInlineEdit(id) {
      const c = this.currentSubject?.concepts.find(x => x.id === id);
      if (!c) return;
      this.inlineEditId = id;
      this.inlineEditName = c.name;
      this.inlineEditDesc = c.description || '';
    },
    saveInlineEdit() {
      if (!this.inlineEditId || !this.currentSubject) return;
      this.store.updateConcept(this.currentSubject.id, this.inlineEditId, {
        name: this.inlineEditName.trim(),
        description: this.inlineEditDesc.trim()
      });
      this.inlineEditId = null;
    },
    cancelInlineEdit() {
      this.inlineEditId = null;
    },

    // ==================== DRAG & DROP ====================
    dragStart(c, e) {
      this.dragId = c.id;
      e.dataTransfer.effectAllowed = 'move';
    },
    dragOver(c, e) {
      e.dataTransfer.dropEffect = 'move';
    },
    dropConcept(c) {
      if (this.dragId === null || this.dragId === c.id || !this.currentSubject) return;
      const arr = this.currentSubject.concepts;
      const from = arr.findIndex(x => x.id === this.dragId);
      const to = arr.findIndex(x => x.id === c.id);
      if (from === -1 || to === -1) return;
      const [moved] = arr.splice(from, 1);
      arr.splice(to, 0, moved);
      this.store.save();
      this.dragId = null;
    },
    dragEnd() {
      this.dragId = null;
    },

    // ==================== RELACIONES ====================
    addRelationFromForm() {
      if (!this.relFormFrom || !this.relFormTo) return;
      this.store.addRelation(this.currentSubject.id, this.relFormFrom, this.relFormTo, this.relFormType);
      this.relFormFrom = '';
      this.relFormTo = '';
      this.showRelationForm = false;
    },
    deleteRelation(i) {
      this.store.removeRelation(this.currentSubject.id, i);
      if (this.network) this.renderGraph();
    },

    // ==================== PLANTILLAS ====================
    createFromTemplate(groupKey, subjectKey) {
      const group = GC.templates[groupKey];
      if (!group) return;
      const tpl = group.subjects.find(s => s.key === subjectKey);
      if (!tpl) return;
      const conceptMap = {};
      const concepts = tpl.concepts.map(c => {
        const newId = crypto.randomUUID();
        conceptMap[c.id] = newId;
        return { id: newId, name: c.name, description: c.description, weight: c.weight, tags: [...(c.tags || [])], resources: [] };
      });
      const relations = tpl.relations.map(r => ({
        from: conceptMap[r.from], to: conceptMap[r.to], type: r.type
      }));
      this.store.subjects.push({
        id: crypto.randomUUID(),
        name: tpl.name,
        description: tpl.description,
        concepts,
        relations,
        nodePositions: {}
      });
      this.store.save();
      this.modal = '';
      this.showToast('Asignatura "' + tpl.name + '" creada desde plantilla', 'success');
    },

    loadExample() {
      this.store.loadExample();
    },

    // ==================== BULK TAG ====================
    toggleBulkTag() {
      this.bulkTagMode = !this.bulkTagMode;
      if (!this.bulkTagMode) { this.bulkChecked = {}; this.bulkTagValue = ''; }
    },
    applyBulkTag() {
      if (!this.bulkTagValue.trim() || !this.currentSubject) return;
      const tag = this.bulkTagValue.trim();
      Object.keys(this.bulkChecked).forEach(id => {
        if (this.bulkChecked[id]) this.store.addConceptTag(this.currentSubject.id, id, tag);
      });
      this.bulkChecked = {};
      this.bulkTagMode = false;
      this.bulkTagValue = '';
    },

    // ==================== EXPORTAR ====================
    exportData() {
      const json = this.store.exportData();
      const blob = new Blob([json], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'grafo-conocimiento.json';
      a.click();
    },
    exportSubjectJSON() {
      if (!this.currentSubject) return;
      const assessments = this.store.subjectAssessments(this.currentSubject.id);
      const data = { subjects: [JSON.parse(JSON.stringify(this.currentSubject))], assessments, crossRelations: [] };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = this.currentSubject.name.replace(/\s+/g, '_') + '.json';
      a.click();
    },
    exportTemplate() {
      const json = this.store.exportTemplate();
      const blob = new Blob([json], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'plantilla-grafo-conocimiento.json';
      a.click();
    },
    exportConceptsCSV() {
      if (!this.currentSubject) return;
      const csv = this.store.exportConceptsCSV(this.currentSubject.id);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = this.currentSubject.name.replace(/\s+/g, '_') + '_conceptos.csv';
      a.click();
    },

    // ==================== IMPORTAR ====================
    importData() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            this.store.importData(ev.target.result);
            this.showToast('Datos importados correctamente', 'success');
          } catch (err) {
            this.showToast('Error al importar: ' + err.message, 'error');
          }
        };
        reader.readAsText(e.target.files[0]);
      };
      input.click();
    },
    importSubjectJSON() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const d = JSON.parse(ev.target.result);
            if (!d.subjects?.length) throw new Error('No hay asignaturas en el archivo');
            for (const s of d.subjects) {
              s.id = crypto.randomUUID();
              s.concepts.forEach(c => { c.id = crypto.randomUUID(); c.tags = c.tags || []; });
              const ns = this.store.addSubject(s.name, s.description);
              ns.nodePositions = s.nodePositions || {};
              for (const c of s.concepts) {
                this.store.addConcept(ns.id, c.name, c.description, c.weight, c.tags);
              }
              for (const r of s.relations) {
                const fromC = ns.concepts.find(c => c.name === (d.subjects[0].concepts.find(x => x.id === r.from)?.name || ''));
                const toC = ns.concepts.find(c => c.name === (d.subjects[0].concepts.find(x => x.id === r.to)?.name || ''));
                if (fromC && toC) this.store.addRelation(ns.id, fromC.id, toC.id, r.type);
              }
              const subAss = (d.assessments || []).filter(a => a.subjectId === s.id);
              for (const a of subAss) {
                const mapped = {};
                Object.keys(a.results).forEach(k => {
                  const c = ns.concepts.find(x => x.name === (d.subjects[0].concepts.find(y => y.id === k)?.name || ''));
                  if (c) mapped[c.id] = a.results[k];
                });
                if (Object.keys(mapped).length) this.store.submitAssessment(ns.id, mapped, a.notes || {});
              }
            }
            this.showToast('Asignatura importada: ' + d.subjects[0].name, 'success');
          } catch (err) {
            this.showToast('Error: ' + err.message, 'error');
          }
        };
        reader.readAsText(input.files[0]);
      };
      input.click();
    },
    importConceptsCSV() {
      if (!this.currentSubject) return;
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.csv';
      input.onchange = (e) => {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const count = this.store.importConceptsCSV(this.currentSubject.id, ev.target.result);
          if (count > 0) this.showToast('Importados ' + count + ' conceptos desde CSV', 'success');
          else this.showToast('No se encontraron conceptos v\u00e1lidos en el CSV', 'warning');
        };
        reader.readAsText(input.files[0]);
      };
      input.click();
    }
  };

  GC.editorModule = { methods };
})();
