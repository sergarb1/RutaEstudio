(function() {
  'use strict';

  const ACHIEVEMENTS = [
    { id: 'first_assessment', icon: '📝', name: 'Primera evaluación', desc: 'Completa tu primera evaluación', check: p => p.assessments >= 1 },
    { id: 'five_assessments', icon: '📊', name: 'Evaluador', desc: 'Completa 5 evaluaciones', check: p => p.assessments >= 5, progress: p => p.assessments + '/5' },
    { id: 'ten_assessments', icon: '📈', name: 'Analista', desc: 'Completa 10 evaluaciones', check: p => p.assessments >= 10, progress: p => p.assessments + '/10' },
    { id: 'first_flashcard', icon: '🃏', name: 'Primeras flashcards', desc: 'Completa tu primera sesión de flashcards', check: p => p.flashcardSessions >= 1 },
    { id: 'ten_flashcards', icon: '🎴', name: 'Estudiante', desc: 'Completa 10 sesiones de flashcards', check: p => p.flashcardSessions >= 10, progress: p => p.flashcardSessions + '/10' },
    { id: 'fifty_flashcards', icon: '📚', name: 'Empollón', desc: 'Completa 50 sesiones de flashcards', check: p => p.flashcardSessions >= 50, progress: p => p.flashcardSessions + '/50' },
    { id: 'first_pomodoro', icon: '🍅', name: 'Primer Pomodoro', desc: 'Completa tu primer Pomodoro', check: p => p.pomodoros >= 1 },
    { id: 'ten_pomodoro', icon: '⏱️', name: 'En racha', desc: 'Completa 10 Pomodoros', check: p => p.pomodoros >= 10, progress: p => p.pomodoros + '/10' },
    { id: 'fifty_pomodoro', icon: '🔥', name: 'Máquina', desc: 'Completa 50 Pomodoros', check: p => p.pomodoros >= 50, progress: p => p.pomodoros + '/50' },
    { id: 'first_subject', icon: '📂', name: 'Organizado', desc: 'Crea tu primera asignatura', check: p => p.subjects >= 1 },
    { id: 'five_subjects', icon: '🗂️', name: 'Polímata', desc: 'Crea 5 asignaturas', check: p => p.subjects >= 5, progress: p => p.subjects + '/5' },
    { id: 'first_concept', icon: '🧩', name: 'Primer concepto', desc: 'Añade tu primer concepto', check: p => p.concepts >= 1 },
    { id: 'fifty_concepts', icon: '🧠', name: 'Mente brillante', desc: 'Añade 50 conceptos', check: p => p.concepts >= 50, progress: p => p.concepts + '/50' },
    { id: 'first_relation', icon: '🔗', name: 'Conectando', desc: 'Crea tu primera relación', check: p => p.relations >= 1 },
    { id: 'daily_streak_3', icon: '📅', name: 'Constante', desc: '3 días de racha en la meta diaria', check: p => p.bestStreak >= 3 },
    { id: 'daily_streak_7', icon: '💪', name: 'Disciplinado', desc: '7 días de racha en la meta diaria', check: p => p.bestStreak >= 7 },
    { id: 'daily_streak_14', icon: '🏅', name: 'Imparable', desc: '14 días de racha en la meta diaria', check: p => p.bestStreak >= 14 },
    { id: 'first_custom_type', icon: '🎨', name: 'Personalizador', desc: 'Crea tu primer tipo de relación personalizado', check: p => p.customTypes >= 1 },
    { id: 'level_5', icon: '⭐', name: 'Novato superado', desc: 'Alcanza el nivel 5', check: p => p.xp >= xpForLevel(5) },
    { id: 'level_10', icon: '🌟', name: 'Estrella', desc: 'Alcanza el nivel 10', check: p => p.xp >= xpForLevel(10) },
    { id: 'level_20', icon: '💎', name: 'Leyenda', desc: 'Alcanza el nivel 20', check: p => p.xp >= xpForLevel(20) },
    { id: 'all_assessed', icon: '🏁', name: 'Completista', desc: 'Evalúa todas las asignaturas al menos una vez', check: p => p.subjectsAssessed >= p.subjects && p.subjects > 0 },
    { id: 'perfect_flashcard', icon: '💯', name: 'Perfecto', desc: 'Completa una sesión de flashcards con 100% de aciertos', check: p => p.perfectSessions >= 1 }
  ];

  function xpForLevel(level) {
    return 75 * (level - 1) * (level - 1);
  }

  function getLevel(xp) {
    return Math.floor(Math.sqrt(xp / 75)) + 1;
  }

  const LEVEL_TITLES = [
    'Novato', 'Aprendiz', 'Estudiante', 'Conocedor', 'Experto',
    'Maestro', 'Sabio', 'Genio', 'Erudito', 'Leyenda'
  ];
  const LEVEL_ICONS = ['🌱', '🌿', '📘', '📗', '📕', '🌟', '⭐', '🔥', '💎', '👑'];

  function getLevelInfo(xp) {
    const level = getLevel(xp);
    const idx = Math.min(level - 1, LEVEL_TITLES.length - 1);
    return {
      level,
      title: LEVEL_TITLES[idx],
      icon: LEVEL_ICONS[idx],
      currentXP: xp - xpForLevel(level),
      nextXP: xpForLevel(level + 1) - xpForLevel(level),
      progress: ((xp - xpForLevel(level)) / (xpForLevel(level + 1) - xpForLevel(level))) * 100
    };
  }

  // ----------------------------------------------------------
  // COMPUTED
  // ----------------------------------------------------------
  const computed = {
    userProfile() {
      return this.store.userProfile;
    },
    userXP() {
      return this.userProfile?.xp || 0;
    },
    userLevel() {
      return getLevel(this.userXP);
    },
    levelInfo() {
      return getLevelInfo(this.userXP);
    },
    levelIcon() {
      return this.levelInfo.icon;
    },
    levelTitle() {
      return this.levelInfo.title;
    },
    levelProgress() {
      return Math.min(100, Math.max(0, this.levelInfo.progress));
    },
    nextLevelXP() {
      return this.levelInfo.nextXP;
    },
    achievementsList() {
      const profile = this.userProfile || {};
      return ACHIEVEMENTS.map(a => ({
        ...a,
        unlocked: a.check(profile),
        progress: a.progress ? a.progress(profile) : ''
      }));
    },
    unlockedAchievements() {
      return this.achievementsList.filter(a => a.unlocked).length;
    },
    dailyGoal() {
      return 5;
    },
    dailyProgress() {
      const today = new Date().toISOString().slice(0, 10);
      const day = (this.userProfile?.dailyHistory || {})[today];
      return day || 0;
    },
    dailyStreak() {
      return this.userProfile?.dailyStreak || 0;
    }
  };

  // ----------------------------------------------------------
  // METHODS
  // ----------------------------------------------------------
  const methods = {
    awardXP(amount, source) {
      const p = this.store.userProfile;
      if (!p) return;
      p.xp = (p.xp || 0) + amount;
      this.store.save();

      // Check for new achievements
      const newly = this.checkAchievements();
      if (newly.length) {
        const names = newly.map(a => a.icon + ' ' + a.name).join(', ');
        this.showToast('🎉 Logro desbloqueado: ' + names, 'success');
      }
    },

    trackDailyAction() {
      const p = this.store.userProfile;
      if (!p) return;
      const today = new Date().toISOString().slice(0, 10);
      if (!p.dailyHistory) p.dailyHistory = {};
      p.dailyHistory[today] = (p.dailyHistory[today] || 0) + 1;

      // Calculate streak
      let streak = 0;
      const d = new Date();
      while (true) {
        const key = d.toISOString().slice(0, 10);
        if ((p.dailyHistory[key] || 0) >= 1) {
          streak++;
          d.setDate(d.getDate() - 1);
        } else {
          break;
        }
      }
      p.dailyStreak = streak;
      if (streak > (p.bestStreak || 0)) p.bestStreak = streak;
      this.store.save();
    },

    checkAchievements() {
      const p = this.store.userProfile;
      if (!p) return [];
      if (!p.unlocked) p.unlocked = [];
      const newly = [];
      for (const a of ACHIEVEMENTS) {
        if (!p.unlocked.includes(a.id) && a.check(p)) {
          p.unlocked.push(a.id);
          newly.push(a);
        }
      }
      if (newly.length) this.store.save();
      return newly;
    }
  };

  GC.gamificationModule = { computed, methods };
  GC.ACHIEVEMENTS = ACHIEVEMENTS;
  GC.getLevel = getLevel;
  GC.xpForLevel = xpForLevel;
})();
