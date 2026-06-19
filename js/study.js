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
      // Award XP when session completes
      if (this.studyIndex >= this.studySession.length && this.studyTotalCards > 0) {
        const xp = Math.min(50, 5 * this.studyTotalCards);
        this.store.userProfile.totalFlashcards = (this.store.userProfile.totalFlashcards || 0) + this.studyTotalCards;
        this.store.save();
        this.store.userProfile.flashcardSessions = (this.store.userProfile.flashcardSessions || 0) + 1;
        if (this.studyWrong === 0) {
          this.store.userProfile.perfectSessions = (this.store.userProfile.perfectSessions || 0) + 1;
        }
        this.awardXP(xp, 'Flashcards');
        this.trackDailyAction();
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
          this.store.userProfile.pomodoros = (this.store.userProfile.pomodoros || 0) + 1;
          this.store.save();
          this.awardXP(30, 'Pomodoro');
          this.trackDailyAction();
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

    // Donut chart: % concepts in each level
    distributionDonutSVG() {
      if (!this.lastAssessment) return '';
      const results = this.lastAssessment.results;
      const vals = Object.values(results);
      if (!vals.length) return '';
      let red = 0, yellow = 0, green = 0;
      vals.forEach(v => {
        if (v < 40) red++;
        else if (v < 70) yellow++;
        else green++;
      });
      const total = red + yellow + green || 1;
      const rP = red / total * 100;
      const yP = yellow / total * 100;
      const gP = green / total * 100;
      const cx = 120, cy = 120, r = 90, pad = 8;
      const polar = (pct, off = 0) => {
        const a = (pct / 100 * 360 - 90) * Math.PI / 180;
        return { x: cx + (r - off) * Math.cos(a), y: cy + (r - off) * Math.sin(a) };
      };
      const arc = (pct, color, label, val) => {
        if (pct < 0.5) return '';
        const p1 = polar(0), p2 = polar(pct);
        const large = pct > 50 ? 1 : 0;
        const midPct = pct / 2;
        const mid = polar(midPct, 28);
        const p1r = polar(0, 5), p2r = polar(pct, 5);
        return `<path d="M${p1r.x},${p1r.y} A${r - 5},${r - 5} 0 ${large} 1 ${p2r.x},${p2r.y}" fill="none" stroke="${color}" stroke-width="10" />
          <text x="${mid.x}" y="${mid.y + 4}" text-anchor="middle" fill="${color}" font-size="14" font-weight="700">${Math.round(pct)}%</text>
          <text x="${mid.x}" y="${mid.y + 18}" text-anchor="middle" fill="#94a3b8" font-size="8">${val}</text>`;
      };
      const w = 240, h = 240;
      return `<svg viewBox="0 0 ${w} ${h + 20}" class="w-full" style="max-height:260px">
        <rect width="100%" height="100%" fill="transparent" />
        <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="10" />
        ${arc(rP, '#ef4444', 'débiles', red)}
        ${arc(yP, '#eab308', 'en proceso', yellow)}
        ${arc(gP, '#22c55e', 'dominados', green)}
        <text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="#94a3b8" font-size="11">${total} conceptos</text>
        <text x="${w / 2}" y="${h + 14}" text-anchor="middle" fill="#94a3b8" font-size="9">${GC.t ? GC.t('results.summary') : 'Distribución'}</text>
      </svg>`;
    },

    // Horizontal bar: each concept's score
    conceptBarsSVG() {
      if (!this.lastAssessment || !this.currentSubject) return '';
      const concepts = this.currentSubject.concepts;
      const results = this.lastAssessment.results;
      const items = concepts.map(c => ({ name: c.name, score: results[c.id] || 0 }));
      items.sort((a, b) => a.score - b.score);
      const barH = 20, gap = 4, pad = 10, labelW = 140, h = items.length * (barH + gap) + pad * 2;
      const w = 500, barMax = w - labelW - pad * 3;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full" style="max-height:${Math.min(h, 400)}px">
        <rect width="100%" height="100%" fill="transparent" />
        ${items.map((c, i) => {
          const y = pad + i * (barH + gap);
          const bw = c.score / 100 * barMax;
          const color = c.score >= 70 ? '#22c55e' : c.score >= 40 ? '#eab308' : '#ef4444';
          return `<text x="${labelW - 6}" y="${y + barH / 2 + 4}" text-anchor="end" fill="#94a3b8" font-size="9" class="truncate">${c.name}</text>
            <rect x="${labelW + 2}" y="${y}" width="${bw}" height="${barH}" rx="4" fill="${color}" opacity="0.8" />
            <text x="${labelW + 6 + bw}" y="${y + barH / 2 + 4}" fill="${color}" font-size="9" font-weight="600">${c.score}%</text>`;
        }).join('')}
      </svg>`;
    },

    // Activity: assessments per week
    activityBarsSVG() {
      const ass = this.subjectAssessmentsList;
      if (!ass.length) return '';
      const byWeek = {};
      ass.forEach(a => {
        const d = new Date(a.date);
        const week = d.getFullYear() + '-W' + Math.ceil((d.getDate() + (new Date(d.getFullYear(), d.getMonth(), 1).getDay() - 1)) / 7);
        byWeek[week] = (byWeek[week] || 0) + 1;
      });
      const weeks = Object.keys(byWeek).sort();
      const vals = weeks.map(w => byWeek[w]);
      const max = Math.max(...vals, 1);
      const barW = 40, gap = 8, pad = 10, h = 150;
      const w = weeks.length * (barW + gap) + pad * 2;
      const yScale = (h - pad * 2) / max;
      return `<svg viewBox="0 0 ${Math.max(w, 300)} ${h + 20}" class="w-full" style="max-height:200px">
        <rect width="100%" height="100%" fill="transparent" />
        ${weeks.map((wk, i) => {
          const x = pad + i * (barW + gap);
          const bh = vals[i] * yScale;
          const y = h - pad - bh;
          return `<rect x="${x}" y="${y}" width="${barW}" height="${bh}" rx="3" fill="#6366f1" opacity="0.7" />
            <text x="${x + barW / 2}" y="${h + 12}" text-anchor="middle" fill="#94a3b8" font-size="7">${wk.slice(-4)}</text>
            <text x="${x + barW / 2}" y="${y - 4}" text-anchor="middle" fill="#6366f1" font-size="8" font-weight="600">${vals[i]}</text>`;
        }).join('')}
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
    },

    // Linear regression prediction for each concept
    predictionChartSVG() {
      const ass = this.subjectAssessmentsList;
      if (ass.length < 2 || !this.currentSubject) return '';
      const concepts = this.currentSubject.concepts;
      const sortedAss = [...ass].reverse(); // oldest first
      const n = sortedAss.length;

      const predictions = concepts.map(c => {
        const scores = sortedAss.map(a => a.results[c.id]).filter(v => v != null);
        if (scores.length < 2) return null;
        const m = scores.length;
        const sumX = scores.reduce((s, _, i) => s + i, 0);
        const sumY = scores.reduce((s, v) => s + v, 0);
        const sumXY = scores.reduce((s, v, i) => s + i * v, 0);
        const sumX2 = scores.reduce((s, _, i) => s + i * i, 0);
        const slope = (m * sumXY - sumX * sumY) / (m * sumX2 - sumX * sumX || 1);
        const intercept = (sumY - slope * sumX) / m;
        const nextScore = Math.round(Math.max(0, Math.min(100, slope * m + intercept)));
        const lastScore = scores[scores.length - 1];
        const change = nextScore - lastScore;
        return { id: c.id, name: c.name, lastScore, nextScore, change, slope, scores };
      }).filter(Boolean);

      predictions.sort((a, b) => b.change - a.change);
      const top = predictions.slice(0, 5);
      const bottom = predictions.filter(p => p.change < 0).slice(-5).reverse();
      const show = [...top, ...bottom];
      if (!show.length) return '';

      const h = show.length * 24 + 20, w = 500;
      const barMax = 80, pad = 10, labelW = 130;
      return `<svg viewBox="0 0 ${w} ${h}" class="w-full" style="max-height:${Math.min(h, 300)}px">
        <rect width="100%" height="100%" fill="transparent" />
        ${show.map((c, i) => {
          const y = pad + i * 24;
          const dir = c.change >= 0 ? 1 : -1;
          const bw = Math.min(Math.abs(c.change), 50) / 50 * barMax;
          const color = c.change >= 0 ? '#22c55e' : '#ef4444';
          const xBar = c.change >= 0 ? labelW + 2 : labelW + 2 + barMax - bw;
          return `<text x="${labelW - 4}" y="${y + 14}" text-anchor="end" fill="#94a3b8" font-size="9">${c.name}</text>
            <rect x="${xBar}" y="${y + 2}" width="${bw}" height="16" rx="3" fill="${color}" opacity="0.7" />
            <text x="${labelW + 4 + (c.change >= 0 ? bw : 0)}" y="${y + 14}" fill="${color}" font-size="9" font-weight="600">${c.change >= 0 ? '+' : ''}${c.change}%</text>
            <text x="${labelW + barMax + 40}" y="${y + 14}" fill="#94a3b8" font-size="8">${c.lastScore}% → ${c.nextScore}%</text>`;
        }).join('')}
      </svg>`;
    }
  };

  GC.studyModule = { computed, methods };
})();
