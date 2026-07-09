// ============================================================
// TRADUCCIONES — Ruta de Estudio
// ES = español, EN = english, VA = valencià
// ============================================================
(function() {

  const LANG_KEY = 're-lang';

  const translations = {
    // App
    'app.name':             { es: 'RutaEstudio', en: 'RutaEstudio', va: 'RutaEstudio' },
    'app.subtitle':         { es: 'Tu camino hacia el aprobado', en: 'Your path to success', va: 'El teu camí cap a l\'aprovat' },
    'app.tagline':          { es: 'Conecta conceptos, domina tu ruta. Estudia con prop\u00f3sito.', en: 'Connect concepts, master your path. Study with purpose.', va: 'Connecta conceptes, domina la teua ruta. Est\u00fadia amb prop\u00f2sit.' },
    'app.empty.title':      { es: 'Tu ruta de estudio est\u00e1 vac\u00eda', en: 'Your study path is empty', va: 'La teua ruta d\'estudi est\u00e0 buida' },
    'app.empty.desc':       { es: 'A\u00f1ade asignaturas, conceptos y relaciones para empezar.', en: 'Add subjects, concepts and relations to start.', va: 'Afig assignatures, conceptes i relacions per a comen\u00e7ar.' },
    'app.guide':            { es: 'Abre la gu\u00eda de inicio r\u00e1pido', en: 'Open the quick start guide', va: 'Obri la guia d\'inici r\u00e0pid' },

    // Nav / Header
    'btn.dark':             { es: 'Modo oscuro', en: 'Dark mode', va: 'Mode fosc' },
    'btn.light':            { es: 'Modo claro', en: 'Light mode', va: 'Mode clar' },
    'btn.export':           { es: 'Exportar', en: 'Export', va: 'Exportar' },
    'btn.template':         { es: 'Plantilla', en: 'Template', va: 'Plantilla' },
    'btn.import':           { es: 'Importar', en: 'Import', va: 'Importar' },
    'btn.undo':             { es: 'Deshacer', en: 'Undo', va: 'Desfer' },
    'btn.redo':             { es: 'Rehacer', en: 'Redo', va: 'Refer' },
    'btn.help':             { es: 'Ayuda', en: 'Help', va: 'Ajuda' },
    'btn.shortcuts':        { es: 'Atajos', en: 'Shortcuts', va: 'Dreceres' },
    'btn.reminder':         { es: 'Recordatorio', en: 'Reminder', va: 'Recordatori' },
    'btn.add':              { es: 'A\u00f1adir', en: 'Add', va: 'Afegir' },
    'btn.save':             { es: 'Guardar', en: 'Save', va: 'Guardar' },
    'btn.cancel':           { es: 'Cancelar', en: 'Cancel', va: 'Cancel\u00b7lar' },
    'btn.close':            { es: 'Cerrar', en: 'Close', va: 'Tancar' },
    'btn.delete':           { es: 'Eliminar', en: 'Delete', va: 'Eliminar' },
    'btn.install':          { es: 'Instalar', en: 'Install', va: 'Instal·lar' },
    'btn.edit':             { es: 'Editar', en: 'Edit', va: 'Editar' },
    'btn.back':             { es: 'Volver', en: 'Back', va: 'Tornar' },

    // Subjects
    'subject.my':           { es: 'Mis asignaturas', en: 'My subjects', va: 'Les meues assignatures' },
    'subject.new':          { es: 'Nueva asignatura', en: 'New subject', va: 'Nova assignatura' },
    'subject.add':          { es: '+ Nueva', en: '+ New', va: '+ Nova' },
    'subject.import':       { es: 'Importar asignatura', en: 'Import subject', va: 'Importar assignatura' },
    'subject.export':       { es: 'Exportar asignatura', en: 'Export subject', va: 'Exportar assignatura' },
    'subject.name':         { es: 'Nombre de la asignatura', en: 'Subject name', va: 'Nom de l\'assignatura' },
    'subject.desc':         { es: 'Descripci\u00f3n', en: 'Description', va: 'Descripci\u00f3' },

    // Concepts
    'tab.concepts':         { es: 'Conceptos', en: 'Concepts', va: 'Conceptes' },
    'tab.graph':            { es: 'Grafo', en: 'Graph', va: 'Graf' },
    'tab.deps':             { es: '\u00c1rbol', en: 'Tree', va: 'Arbre' },
    'tab.assess':           { es: 'Evaluar', en: 'Assess', va: 'Avaluar' },
    'tab.batch':            { es: 'Masivo', en: 'Batch', va: 'Massiu' },
    'tab.results':          { es: 'Resultados', en: 'Results', va: 'Resultats' },
    'tab.history':          { es: 'Historial', en: 'History', va: 'Historial' },
    'tab.study':            { es: 'Estudiar', en: 'Study', va: 'Estudiar' },
    'concept.add':          { es: '+ A\u00f1adir', en: '+ Add', va: '+ Afegir' },
    'concept.search':       { es: 'Buscar concepto...', en: 'Search concept...', va: 'Buscar concepte...' },
    'concept.allTags':      { es: 'Todas', en: 'All', va: 'Totes' },
    'concept.bulk':         { es: 'Etiquetar', en: 'Tag', va: 'Etiquetar' },
    'concept.name':         { es: 'Nombre', en: 'Name', va: 'Nom' },
    'concept.weight':       { es: 'Peso', en: 'Weight', va: 'Pes' },
    'concept.noConcepts':   { es: 'A\u00fan no hay conceptos. \u00a1A\u00f1ade el primero o usa el asistente IA!', en: 'No concepts yet. Add the first one or use the AI assistant!', va: 'Encara no hi ha conceptes. Afig el primer o usa l\'assistent IA!' },

    // Relations
    'relation.new':         { es: '+ Nueva relaci\u00f3n', en: '+ New relation', va: '+ Nova relaci\u00f3' },
    'relation.from':        { es: 'Concepto origen', en: 'Source concept', va: 'Concepte origen' },
    'relation.to':          { es: 'Concepto destino', en: 'Target concept', va: 'Concepte dest\u00ed' },
    'relation.create':      { es: 'Crear relaci\u00f3n', en: 'Create relation', va: 'Crear relaci\u00f3' },
    'relation.prerreq':     { es: 'Prerrequisito', en: 'Prerequisite', va: 'Prerequisit' },
    'relation.belongs':     { es: 'Pertenece', en: 'Belongs to', va: 'Pertany' },
    'relation.related':     { es: 'Relacionado', en: 'Related', va: 'Relacionat' },
    'relation.deepens':     { es: 'Profundiza', en: 'Deepens', va: 'Aprofundeix' },

    // Assessment
    'assess.title':         { es: 'Autoevaluaci\u00f3n', en: 'Self-assessment', va: 'Autoavaluaci\u00f3' },
    'assess.batch':         { es: 'Evaluaci\u00f3n r\u00e1pida', en: 'Quick assessment', va: 'Avaluaci\u00f3 r\u00e0pida' },
    'assess.save':          { es: 'Guardar todo', en: 'Save all', va: 'Guardar tot' },
    'assess.none':          { es: 'A\u00fan no hay evaluaciones', en: 'No assessments yet', va: 'Encara no hi ha avaluacions' },
    'assess.hint':          { es: 'Ajusta los sliders para puntuar todos los conceptos', en: 'Adjust sliders to score all concepts', va: 'Ajusta els sliders per a puntuar tots els conceptes' },
    'assess.done':          { es: 'Evaluaci\u00f3n guardada', en: 'Assessment saved', va: 'Avaluaci\u00f3 guardada' },
    'assess.notes':         { es: 'Notas (opcional)', en: 'Notes (optional)', va: 'Notes (opcional)' },
    'assess.noneHint':      { es: 'Haz una evaluaci\u00f3n en la pesta\u00f1a "Evaluar"', en: 'Take an assessment in the "Assess" tab', va: 'Fes una avaluaci\u00f3 en la pestanya "Avaluar"' },

    // Results
    'results.summary':      { es: 'Resumen', en: 'Summary', va: 'Resum' },
    'results.global':       { es: 'global', en: 'overall', va: 'global' },
    'results.review':       { es: 'Repasar', en: 'Review', va: 'Repassar' },
    'results.strengthen':   { es: 'Reforzar', en: 'Strengthen', va: 'Refor\u00e7ar' },
    'results.mastered':     { es: 'Dominado', en: 'Mastered', va: 'Dominat' },
    'results.plan':         { es: 'Plan de estudio', en: 'Study plan', va: 'Pla d\'estudi' },
    'results.roadmap':      { es: 'Roadmap de estudio', en: 'Study roadmap', va: 'Roadmap d\'estudi' },
    'results.heatmap':      { es: 'Mapa de calor', en: 'Heat map', va: 'Mapa de calor' },
    'results.compare':      { es: 'Comparar evaluaciones', en: 'Compare assessments', va: 'Comparar avaluacions' },
    'results.evolution':    { es: 'Evoluci\u00f3n del progreso', en: 'Progress evolution', va: 'Evoluci\u00f3 del progr\u00e9s' },
    'results.noAssess':     { es: 'A\u00fan no hay evaluaciones', en: 'No assessments yet', va: 'Encara no hi ha avaluacions' },

    // Study
    'study.flashcards':     { es: 'Modo estudio', en: 'Study mode', va: 'Mode d\'estudi' },
    'study.filter.all':     { es: 'Todos los conceptos', en: 'All concepts', va: 'Tots els conceptes' },
    'study.filter.weak':    { es: 'D\u00e9biles (<40%)', en: 'Weak (<40%)', va: 'Febles (<40%)' },
    'study.filter.mid':     { es: 'En proceso (40-70%)', en: 'In progress (40-70%)', va: 'En proc\u00e9s (40-70%)' },
    'study.filter.strong':  { es: 'Dominados (>70%)', en: 'Mastered (>70%)', va: 'Dominats (>70%)' },
    'study.cards':          { es: 'tarjetas', en: 'cards', va: 'targetes' },
    'study.know':           { es: 'Lo s\u00e9', en: 'I know it', va: 'Ho s\u00e9' },
    'study.dontKnow':       { es: 'No lo s\u00e9', en: 'I don\'t know', va: 'No ho s\u00e9' },
    'study.sessionDone':    { es: '\u00a1Sesi\u00f3n completada!', en: 'Session complete!', va: 'Sessi\u00f3 completada!' },
    'study.correct':        { es: 'Aciertos', en: 'Correct', va: 'Encerts' },
    'study.wrong':          { es: 'Fallos', en: 'Wrong', va: 'Falls' },
    'study.accuracy':       { es: 'Precisi\u00f3n', en: 'Accuracy', va: 'Precisi\u00f3' },
    'study.retry':          { es: 'Repetir sesi\u00f3n', en: 'Retry session', va: 'Repetir sessi\u00f3' },
    'study.streak':         { es: 'Racha de estudio', en: 'Study streak', va: 'Ratxa d\'estudi' },
    'study.streakDays':     { es: 'd\u00edas', en: 'days', va: 'dies' },
    'study.record':         { es: 'R\u00e9cord', en: 'Record', va: 'R\u00e8cord' },

    // Pomodoro
    'pomodoro.start':       { es: 'Iniciar', en: 'Start', va: 'Iniciar' },
    'pomodoro.pause':       { es: 'Pausar', en: 'Pause', va: 'Pausar' },
    'pomodoro.reset':       { es: 'Reiniciar', en: 'Reset', va: 'Reiniciar' },
    'pomodoro.done':        { es: '\u00a1Tiempo completado! T\u00f3mate un descanso', en: 'Time completed! Take a break', va: 'Temps completat! Fes un descans' },

    // Plan
    'plan.bfs':             { es: 'BFS', en: 'BFS', va: 'BFS' },
    'plan.dfs':             { es: 'DFS', en: 'DFS', va: 'DFS' },
    'plan.unlock':          { es: 'Desbloqueador', en: 'Unlocker', va: 'Desbloquejador' },
    'plan.export':          { es: 'Exportar plan', en: 'Export plan', va: 'Exportar pla' },
    'plan.allMastered':     { es: '\u00a1Todo dominado! Sigue as\u00ed', en: 'All mastered! Keep it up', va: 'Tot dominat! Segueix aix\u00ed' },
    'plan.review':          { es: 'Repasar (dominio < 40%)', en: 'Review (mastery < 40%)', va: 'Repassar (domini < 40%)' },
    'plan.strengthen':      { es: 'Reforzar (dominio 40-70%)', en: 'Strengthen (mastery 40-70%)', va: 'Refor\u00e7ar (domini 40-70%)' },
    'plan.advance':         { es: 'Listo para avanzar (dominio > 70%)', en: 'Ready to advance (mastery > 70%)', va: 'A punt per a avan\u00e7ar (domini > 70%)' },

    // Roadmap
    'roadmap.now':          { es: 'Ahora (prioritarios)', en: 'Now (priority)', va: 'Ara (prioritaris)' },
    'roadmap.next':         { es: 'Siguiente (preparados)', en: 'Next (ready)', va: 'Seg\u00fcent (preparats)' },
    'roadmap.soon':         { es: 'Pronto (avanzados / bloqueados)', en: 'Soon (advanced / blocked)', va: 'Prompt (avan\u00e7ats / bloquejats)' },

    // Misc
    'misc.search':          { es: 'Buscar...', en: 'Search...', va: 'Buscar...' },
    'misc.loading':         { es: 'Cargando...', en: 'Loading...', va: 'Carregant...' },
    'misc.noResults':       { es: 'Sin resultados', en: 'No results', va: 'Sense resultats' },
    'misc.offline':         { es: '100% offline', en: '100% offline', va: '100% offline' },
    'misc.gdpr':            { es: 'Cumple RGPD — datos siempre locales', en: 'GDPR compliant — data always local', va: 'Compleix RGPD — dades sempre locals' },
    'misc.confirmDelete':   { es: '\u00bfSeguro que quieres eliminar?', en: 'Are you sure you want to delete?', va: 'Segur que vols eliminar?' },

    // Reminder
    'reminder.title':       { es: 'Recordatorio de estudio', en: 'Study reminder', va: 'Recordatori d\'estudi' },
    'reminder.desc':        { es: 'Recibe una notificaci\u00f3n cada d\u00eda a la hora que elijas.', en: 'Get a daily notification at your chosen time.', va: 'Rep una notificaci\u00f3 cada dia a l\'hora que trieu.' },
    'reminder.enabled':     { es: 'Activado', en: 'Enabled', va: 'Activat' },
    'reminder.time':        { es: 'Hora del recordatorio', en: 'Reminder time', va: 'Hora del recordatori' },
    'reminder.save':        { es: 'Guardar recordatorio', en: 'Save reminder', va: 'Guardar recordatori' },
    'reminder.saved':       { es: 'Recordatorio guardado', en: 'Reminder saved', va: 'Recordatori guardat' },
    'reminder.allow':       { es: 'Necesitas permitir notificaciones', en: 'You need to allow notifications', va: 'Necessites permetre notificacions' },
    'reminder.blocked':     { es: 'Notificaciones bloqueadas', en: 'Notifications blocked', va: 'Notificacions bloquejades' },
    'reminder.notif':       { es: '\u00a1Hora de estudiar! Revisa tu plan de estudio.', en: 'Time to study! Check your study plan.', va: 'Hora d\'estudiar! Revisa el teu pla d\'estudi.' },

    // Onboarding
    'onboard.welcome':      { es: 'Bienvenido a Ruta de Estudio', en: 'Welcome to Study Path', va: 'Benvingut a Ruta d\'Estudi' },
    'onboard.step1':        { es: 'Crear asignatura', en: 'Create subject', va: 'Crear assignatura' },
    'onboard.step2':        { es: 'Conceptos', en: 'Concepts', va: 'Conceptes' },
    'onboard.step3':        { es: 'Relaciones', en: 'Relations', va: 'Relacions' },
    'onboard.step4':        { es: 'Evaluar', en: 'Assess', va: 'Avaluar' },
    'onboard.step5':        { es: 'Plan de estudio', en: 'Study plan', va: 'Pla d\'estudi' },
    'onboard.next':         { es: 'Siguiente', en: 'Next', va: 'Seg\u00fcent' },
    'onboard.done':         { es: '\u00a1Empezar!', en: 'Start!', va: 'Comen\u00e7ar!' },

    // Graph
    'graph.legend':         { es: 'Leyenda', en: 'Legend', va: 'Llegenda' },
    'graph.filter':         { es: 'Filtrar:', en: 'Filter:', va: 'Filtrar:' },
    'graph.allRelations':   { es: 'Todas las relaciones', en: 'All relations', va: 'Totes les relacions' },
    'graph.minWeight':      { es: 'Peso m\u00edn:', en: 'Min weight:', va: 'Pes m\u00edn:' },
    'graph.focus':          { es: 'Modo foco', en: 'Focus mode', va: 'Mode focus' },
    'graph.exitFocus':      { es: 'Salir de modo foco', en: 'Exit focus mode', va: 'Eixir del mode focus' },
    'graph.rendering':      { es: 'Renderizando...', en: 'Rendering...', va: 'Renderitzant...' },
    'graph.noConcepts':     { es: 'A\u00f1ade conceptos primero', en: 'Add concepts first', va: 'Afig conceptes primer' },

    // Deps tree
    'deps.title':           { es: '\u00c1rbol de dependencias', en: 'Dependency tree', va: 'Arbre de depend\u00e8ncies' },

    // Help
    'help.title':           { es: 'Ayuda y gu\u00eda r\u00e1pida', en: 'Help and quick guide', va: 'Ajuda i guia r\u00e0pida' },
    'help.usage':           { es: 'Uso', en: 'Usage', va: '\u00das' },
    'help.ai':              { es: 'IA', en: 'AI', va: 'IA' },
    'help.about':           { es: 'Acerca de', en: 'About', va: 'Quant a' },
    'help.shortcuts':       { es: 'Atajos de teclado', en: 'Keyboard shortcuts', va: 'Dreceres de teclat' },

    // Templates
    'template.title':       { es: 'Plantillas educativas', en: 'Educational templates', va: 'Plantilles educatives' },
    'template.search':      { es: 'Buscar plantilla...', en: 'Search template...', va: 'Buscar plantilla...' },
    'template.load':        { es: 'Cargar', en: 'Load', va: 'Carregar' },

    // AI Generator
    'ai.title':             { es: 'Generar con IA', en: 'Generate with AI', va: 'Generar amb IA' },
    'ai.prompt':            { es: 'Describe tu asignatura...', en: 'Describe your subject...', va: 'Descrivix la teua assignatura...' },
    'ai.generate':          { es: 'Generar', en: 'Generate', va: 'Generar' },

    // Global search
    'search.placeholder':   { es: 'Buscar en todas las asignaturas...', en: 'Search all subjects...', va: 'Buscar en totes les assignatures...' },
    'search.noResults':     { es: 'No se encontraron resultados', en: 'No results found', va: 'No es van trobar resultats' }
  };

  const langNames = {
    es: 'Espa\u00f1ol',
    en: 'English',
    va: 'Valenci\u00e0'
  };

  const flags = {
    es: '\ud83c\uddea\ud83c\uddf8',
    en: '\ud83c\uddec\ud83c\udde7',
    va: '\ud83c\uddea\ud83c\uddf8'
  };

  function getLang() {
    return localStorage.getItem(LANG_KEY) || 'es';
  }

  function setLang(lang) {
    if (translations['app.name'][lang]) {
      localStorage.setItem(LANG_KEY, lang);
      GC._lang = lang;
    }
  }

  // t(key) — returns translated string for current language
  GC.t = function(key) {
    const lang = GC._lang || getLang();
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry.es || key;
  };

  GC.lang = getLang();
  GC._lang = GC.lang;
  GC.langNames = langNames;
  GC.flags = flags;
  GC.setLang = setLang;
  GC.translations = translations;

  // Return all keys for debugging
  GC.getTranslationKeys = function() { return Object.keys(translations); };

})();
