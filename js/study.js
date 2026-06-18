// ============================================================
// MÓDULO DE ESTUDIO — Ruta de Estudio
// Flashcards, Pomodoro, racha, plan de estudio, progreso,
// onboarding
// ============================================================
(function() {

  // ----------------------------------------------------------
  // PROPIEDADES COMPUTADAS
  // ----------------------------------------------------------
  const computed = {

    // Filtra conceptos según el nivel seleccionado
    studyCards() {
      if (!this.currentSubject) return [];
      let list = [...this.currentSubject.concepts];
      if (this.studyFilter === 'weak' && this.lastAssessment) {
        list = list.filter(c => (this.lastAssessment.results[c.id] || 0) < 40);
      } else if (this.studyFilter === 'mid' && this.lastAssessment) {
        list = list.filter(c => {
          const s = this.lastAssessment.results[c.id] || 0;
          return s >= 40 && s < 70;
        });
      } else if (this.studyFilter === 'strong' && this.lastAssessment) {
        list = list.filter(c => (this.lastAssessment.results[c.id] || 0) >= 70);
      }
      return list;
    },

    // Calendario de 28 días con racha actual y récord
    streak() {
      const days = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const activeDates = new Set();
      (this.subjectAssessmentsList || []).forEach(a => {
        const d = new Date(a.date);
        activeDates.add(d.getFullYear() + '-' + d.getDate() + '-' + d.getMonth());
      });
      let currentRun = 0, bestRun = 0, run = 0;
      for (let i = 27; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.getFullYear() + '-' + d.getDate() + '-' + d.getMonth();
        const active = activeDates.has(key);
        days.push({
          num: d.getDate(),
          label: d.toLocaleDateString(),
          active,
          future: d > today
        });
        if (active) { run++; if (run > bestRun) bestRun = run; }
        else run = 0;
        if (i === 0) currentRun = run;
      }
      return { days, current: currentRun, best: bestRun };
    },

    // Formato mm:ss para el pomodoro
    pomodoroDisplay() {
      const m = Math.floor(this.pomodoroSeconds / 60);
      const s = this.pomodoroSeconds % 60;
      return String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
    },

    // Barra de progreso del pomodoro (0..1)
    pomodoroProgress() {
      return this.pomodoroOriginal > 0 ? 1 - this.pomodoroSeconds / this.pomodoroOriginal : 0;
    },

    // Pasos del tutorial de onboarding
    onboardingSteps() {
      return [
        { title: 'Bienvenido' },
        { title: 'Crear asignatura' },
        { title: 'Conceptos' },
        { title: 'Relaciones' },
        { title: 'Evaluar' },
        { title: 'Plan de estudio' }
      ];
    }
  };

  // ----------------------------------------------------------
  // MÉTODOS
  // ----------------------------------------------------------
  const methods = {

    // ==================== FLASHCARDS ====================
    startStudy() {
      this.studySession = this.shuffleArray([...this.studyCards]);
      this.studyIndex = 0;
      this.studyFlip = false;
      this.studyDone = 0;
      this.studyWrong = 0;
      this.studyTotalCards = this.studyCards.length;
    },
    shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    },
    studyAnswer(knowsIt) {
      if (this.studyIndex >= this.studySession.length) return;
      const card = this.studySession[this.studyIndex];
      if (knowsIt) {
        this.studyDone++;
        this.studyIndex++;
        this.studyFlip = false;
      } else {
        this.studyWrong++;
        const reinsertPos = Math.min(this.studyIndex + 1 + Math.floor(Math.random() * 3), this.studySession.length);
        this.studySession.splice(reinsertPos, 0, card);
        this.studyIndex++;
        if (this.studyIndex < this.studySession.length - 1) {
          const swapIdx = this.studyIndex + Math.floor(Math.random() * 2) + 1;
          if (swapIdx < this.studySession.length) {
            [this.studySession[this.studyIndex], this.studySession[swapIdx]] = [this.studySession[swapIdx], this.studySession[this.studyIndex]];
          }
        }
        this.studyFlip = false;
      }
    },
    resetStudy() {
      this.startStudy();
    },

    // ==================== POMODORO ====================
    startPomodoro() {
      this.pomodoroOriginal = this.pomodoroMinutes * 60;
      this.pomodoroSeconds = this.pomodoroOriginal;
      this.pomodoroRunning = true;
      this.pomodoroInterval = setInterval(() => {
        if (this.pomodoroSeconds > 0) {
          this.pomodoroSeconds--;
        } else {
          this.pausePomodoro();
          this.showToast('\u26A0\uFE0F \u00A1Tiempo completado! T\u00F3mate un descanso', 'info');
        }
      }, 1000);
    },
    pausePomodoro() {
      this.pomodoroRunning = false;
      if (this.pomodoroInterval) { clearInterval(this.pomodoroInterval); this.pomodoroInterval = null; }
    },
    resetPomodoro() {
      this.pausePomodoro();
      this.pomodoroSeconds = this.pomodoroMinutes * 60;
      this.pomodoroOriginal = this.pomodoroSeconds;
    },

    // ==================== ONBOARDING ====================
    closeOnboarding() {
      this.showOnboarding = false;
      localStorage.setItem('grafo-onboarding-v2', '1');
    },

    // ==================== PLAN DE ESTUDIO ====================
    studyPlan() {
      return GC.studyPlan.calculate(this.currentSubject, this.lastAssessment, this.planAlgorithm);
    },
    progressChartSVG() {
      const ass = this.subjectAssessmentsList;
      if (ass.length < 2) return '';

      const scores = ass.map(a => GC.overallScore(a.results)).reverse();
      const w = 600, h = 180, pad = 30;
      const xStep = (w - pad * 2) / Math.max(scores.length - 1, 1);
      const yScale = (h - pad * 2) / 100;

      const points = scores.map((s, i) =>
        `${pad + i * xStep},${h - pad - s * yScale}`
      ).join(' ');

      const labels = ass.map(a => {
        const d = new Date(a.date);
        return d.getDate() + '/' + (d.getMonth() + 1);
      }).reverse();

      const trend = scores.length >= 2 ? scores[scores.length - 1] - scores[0] : 0;
      const trendColor = trend > 5 ? '#22c55e' : trend < -5 ? '#ef4444' : '#94a3b8';

      const gridLines = [0, 25, 50, 75, 100];

      return `<svg viewBox="0 0 ${w} ${h + 20}" class="w-full" style="max-height:200px">
        <rect width="100%" height="100%" fill="transparent" />
        ${gridLines.map(g => `<line x1="${pad}" y1="${h - pad - g * yScale}" x2="${w - pad}" y2="${h - pad - g * yScale}" stroke="#e2e8f0" stroke-dasharray="4,4" />`).join('')}
        ${gridLines.map(g => `<text x="${pad - 5}" y="${h - pad - g * yScale + 4}" text-anchor="end" fill="#94a3b8" font-size="10">${g}</text>`).join('')}
        <polyline fill="none" stroke="#6366f1" stroke-width="2.5" points="${points}" />
        ${scores.map((s, i) => {
          const cx = pad + i * xStep, cy = h - pad - s * yScale;
          return `<circle cx="${cx}" cy="${cy}" r="4" fill="#6366f1" stroke="white" stroke-width="2" />`;
        }).join('')}
        ${labels.map((l, i) => {
          const x = pad + i * xStep;
          return `<text x="${x}" y="${h + 12}" text-anchor="${i === 0 ? 'start' : i === labels.length - 1 ? 'end' : 'middle'}" fill="#94a3b8" font-size="9">${l}</text>`;
        }).join('')}
        <text x="${w - pad}" y="16" text-anchor="end" fill="${trendColor}" font-size="11" font-weight="600">${trend >= 0 ? '+' : ''}${trend}%</text>
      </svg>`;
    },
    exportStudyPlanText() {
      if (!this.currentSubject || !this.lastAssessment) return;
      const plan = GC.studyPlan.calculate(this.currentSubject, this.lastAssessment, this.planAlgorithm);
      const date = new Date(this.lastAssessment.date).toLocaleDateString();
      let text = '# Plan de estudio — ' + this.currentSubject.name + '\n';
      text += 'Fecha: ' + date + '\n';
      const algoNames = { bfs: 'BFS', dfs: 'DFS', desbloqueador: 'Desbloqueador' };
      text += 'Algoritmo: ' + (algoNames[this.planAlgorithm] || this.planAlgorithm) + '\n';
      text += 'Puntuación global: ' + this.overallScore + '%\n';
      text += ''.padEnd(40, '-') + '\n\n';

      if (plan.repasar.length) {
        text += '🔴 REPASAR (dominio < 40%)\n';
        plan.repasar.forEach(item => {
          text += '  • ' + item.name + ' (' + (this.lastAssessment.results[item.id] || 0) + '%)\n';
          if (item.recommendation) text += '    → ' + item.recommendation + '\n';
        });
        text += '\n';
      }
      if (plan.reforzar.length) {
        text += '🟡 REFORZAR (dominio 40-70%)\n';
        plan.reforzar.forEach(item => {
          text += '  • ' + item.name + ' (' + (this.lastAssessment.results[item.id] || 0) + '%)\n';
          if (item.recommendation) text += '    → ' + item.recommendation + '\n';
        });
        text += '\n';
      }
      if (plan.avanzar.length) {
        text += '🟢 LISTO PARA AVANZAR (dominio > 70%)\n';
        plan.avanzar.forEach(item => {
          text += '  • ' + item.name + ' (' + (this.lastAssessment.results[item.id] || 0) + '%)\n';
        });
        text += '\n';
      }

      const rm = GC.roadmap(this.currentSubject, this.lastAssessment.results);
      text += '🗺️ ROADMAP\n';
      if (rm.ahora.length) {
        text += '  AHORA: ' + rm.ahora.map(r => r.name).join(', ') + '\n';
      }
      if (rm.siguiente.length) {
        text += '  SIGUIENTE: ' + rm.siguiente.map(r => r.name).join(', ') + '\n';
      }
      if (rm.pronto.length) {
        text += '  PRONTO: ' + rm.pronto.map(r => r.name).join(', ') + '\n';
      }

      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'plan-estudio-' + this.currentSubject.name.replace(/\s+/g, '_') + '.txt';
      a.click();
      this.showToast('Plan de estudio exportado', 'success');
    }
  };

  GC.studyModule = { computed, methods };
})();
