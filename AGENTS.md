# Ruta de Estudio — AGENTS.md

## Project
Interactive knowledge graph for any subject. Define concepts and their relationships, assess student mastery, get AI-powered study plans (BFS/DFS offline).

## Stack
- Vue 3 (CDN + local fallback)
- Tailwind CSS (CDN + local fallback)
- vis-network (CDN + local fallback)
- localStorage for persistence
- JSON export/import for backup
- No build step, 100% offline

## Data Model
```javascript
subjects = [{
  id: string, name: string, description: string,
  concepts: [{ id, name, description, weight: 1-10, tags: string[], resources: [{ id, type, title, url }] }],
  relations: [{ from: conceptId, to: conceptId, type: 'prerrequisito'|'pertenece'|'relacionado'|'profundiza' }],
  nodePositions: { conceptId: { x, y } }
}]

assessments = [{
  id, subjectId, date,
  results: { conceptId: score(0-100) },
  notes: { conceptId: string }
}]

crossRelations = [{ from: conceptId, to: conceptId, type }]
```

## Key Functions
- `GC.heatColor(score)` → green(>70) / yellow(40-70) / red(<40)
- `GC.md(text)` → Markdown→HTML renderer (bold, italic, code, links, lists)
- `GC.graph.render(containerId, concepts, relations, opts)` → vis-network (supports `positions`, `onDragEnd`)
- `GC.graph.renderHeat(containerId, concepts, relations, results, onNodeClick)` → heat graph
- `GC.studyPlan.calculate(subject, assessment, algorithm)` → BFS/DFS/Desbloqueador plan
- `GC.store.getSuggestions()` → AI suggestions array
- `GC.store.undo()` / `GC.store.redo()` → state history (50 snapshots)
- `GC.store.exportConceptsCSV(subjectId)` / `importConceptsCSV(subjectId, csv)` → CSV I/O
- `GC.store.allTags(subjectId)` → unique tags for subject
- `GC.walkthrough(subject, conceptId, results)` → blockers, dependents, recommendation
- `GC.roadmap(subject, results)` → { ahora, siguiente, pronto } groups
- `GC.unlockScore(subject, conceptId, results)` → desbloqueador score

## Graph Colors
| Score | Color | Meaning |
|-------|-------|---------|
| > 70% | #22c55e | Dominado |
| 40-70% | #eab308 | En proceso |
| < 40% | #ef4444 | No dominado |

## Relation Types
| Type | Visual | Meaning |
|------|--------|---------|
| prerrequisito | → solid | A debe saberse antes que B |
| pertenece | → dashed | A es subconcepto de B |
| relacionado | — dotted | Bidireccional, débil |
| profundiza | → bold | A profundiza B |

## Pro Features
- 🔍 **Global search**: Ctrl+K, busca por nombre/desc/tags en todas las asignaturas
- 🔄 **Undo/Redo**: Ctrl+Z / Ctrl+Shift+Z, historial de 50 snapshots
- 📚 **Plantillas educativas**: 40 módulos prediseñados (ESO, Bachillerato, FP Informática, FP Admin, Transversales, Idiomas, Ciencias)
- 🎴 **Modo estudio flashcards**: repaso interactivo con volteo de tarjetas, repetición espaciada
- 🏷️ **Tags**: etiquetas por concepto, filtro por tag, CSV preserva tags
- 📝 **Markdown**: descripciones con **bold**, *italic*, `code`, [links](), listas
- 📊 **CSV I/O**: export/import masivo de conceptos en formato hoja de cálculo
- 🎯 **Node positions**: arrastra nodos en el grafo, la posición persiste
- 🔥 **Desbloqueador**: algoritmo que prioriza conceptos con más potencial de desbloqueo
- 🗺️ **Roadmap**: vista "ahora/siguiente/pronto" en Resultados
- 🕵️ **Inspector**: panel slide-over con walkthrough, recursos, bloqueadores
- 📈 **Comparar evaluaciones**: selecciona 2 evaluaciones, tabla diff con mejoras/empeoras
- 🌳 **Árbol de dependencias**: vista jerárquica de prerrequisitos
- 📋 **Evaluación masiva**: puntúa todos los conceptos con sliders en una tabla
- 📄 **Exportar plan de estudio**: genera un .txt imprimible con el plan completo
- 🔥 **Racha de estudio**: calendario visual de los últimos 28 días con racha actual y récord
- 🖱️ **Edición inline**: doble click en nombre/desc para editar sin modal
- 📖 **Leyenda del grafo**: overlay con tipos de relación y colores
- 🔎 **Filtros de grafo**: por tipo de relación y peso mínimo
- 🖥️ **Modo foco**: Ctrl+F en el grafo → pantalla completa sin distracciones
- ⌨️ **Cheat sheet**: tecla `?` muestra todos los atajos de teclado
- 💾 **Auto-backup**: descarga automática cada 5 minutos
- 🌙 **Dark mode**: persistente, respeta preferencia del sistema
- 🚀 **Onboarding interactivo**: tutorial paso a paso para nuevos usuarios (6 pasos)
- 🍅 **Pomodoro timer**: 15/25/45 min en modo estudio, barra de progreso, auto-pausa al cambiar de pestaña
- 📊 **Resumen de sesión**: al completar flashcards muestra aciertos/fallos/precisión
- 📈 **Gráfico de progreso global**: SVG de líneas con tendencia en pestaña Resultados
- ⏰ **Exportar plan de estudio**: .txt imprimible con repasar/reforzar/avanzar + roadmap

## Key Shortcuts
| Key | Action |
|-----|--------|
| `Ctrl+K` | Global search |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+F` | Focus mode (in graph tab) |
| `Esc` | Close modals / search |
| `1-5` | Score in assessment |
| `← →` | Navigate assessment |
| `?` | Keyboard cheat sheet |

## Files
```
grafo-conocimiento/
├── index.html                # Entry point
├── README.md                 # Docs + AI guide
├── manual.html               # Manual completo de usuario
├── FORMAT.md                 # JSON format (legacy)
├── AGENTS.md                 # Este archivo
├── css/
│   └── app.css               # Custom styles + dark mode
├── js/
│   ├── app.js                # Vue app core (data, computed, lifecycle, keyboard)
│   ├── store.js              # State + persistence + undo/redo
│   ├── graph-engine.js       # vis-network wrapper
│   ├── study-plan.js         # BFS/DFS/Desbloqueador algorithms
│   ├── helpers.js            # heatColor, md, walkthrough, roadmap
│   ├── templates.js          # 32 plantillas educativas (ESO, Bachillerato, FP)
│   ├── editor.js             # CRUD asignaturas, conceptos, relaciones, templates, import/export
│   └── study.js              # Flashcards, pomodoro, racha, plan de estudio, progreso
├── components/
│   ├── subject-list.js       # Subject grid
│   ├── global-graph.js       # Multi-subject graph
│   ├── suggestions-panel.js  # AI suggestions
│   ├── help-modal.js         # Help + AI guide
│   └── ai-generator.js       # AI prompt templates + JSON import
└── fallback/
    ├── tailwind.min.css       # Offline fallback
    ├── vue.global.prod.js     # Offline fallback
    └── vis-network.min.js     # Offline fallback
```

## GitHub
- Repo: github.com/sergarb1/grafo-conocimiento
- Pages: https://sergarb1.github.io/grafo-conocimiento

---

## Session Summary (17 Jun 2026)

### Goal
Extend the app with teacher-friendly templates, student-friendly study tools, and fix the monolithic `app.js` syntax error.

### Completed
- **Pomodoro timer** in study tab: 15/25/45-min selector, start/pause/reset, progress bar, auto-pauses on tab switch
- **Study session stats**: after finishing flashcards shows correct/wrong/total + accuracy %
- **Global progress chart**: SVG line chart in Results tab (requires ≥2 assessments), trend indicator
- **Export study plan as .txt**: button generates printable text with repasar/reforzar/avanzar + roadmap
- **Bug fix — syntax error in app.js**: missing `},` to close `computed: {` block (line 255) caused `computed` to swallow `methods`, `watch`, `mounted`, `beforeUnmount`, and `_onKeydown`, leaving an extra unclosed brace → `SyntaxError: Unexpected token ')'` at line 1075
- **Refactor app.js into modules**: split into `app.js` (core), `js/editor.js` (CRUD + import/export + templates), `js/study.js` (flashcards + pomodoro + plan) using `Object.assign` merge pattern; all modules commented in Spanish
- **Bug fix — template semicolon in expression**: line 746 `(compareA = a; compareB = null)` → `(compareA = a, compareB = null)` — semicolon inside parentheses in ternary caused `SyntaxError: Unexpected token ';'`
- **Bug fix — GC.md undefined in Vue templates**: added `GC() { return window.GC; }` computed property in `app.js:107` — Vue 3's compiled templates need `GC` exposed via component proxy
- **Bug fix — Unicode escapes in HTML**: replaced all `\uXXXX` escape sequences in `index.html` with actual Unicode characters (acentos, eñes, emojis) — `\uXXXX` is JavaScript-only syntax, not rendered by HTML
- **Debug file cleanup**: removed `js/app_check.js`, `js/app_inner.js`, `find_paren.js`, `find_error.js`, `check_syntax.js`, `count_braces.js`
- **Expanded loadExample**: 5 subjects (Python, Matemáticas discretas, Desarrollo Web, Inglés B2, Historia España) with tags, resources, and 8 sample assessments with progress data
- **Templates 32 → 40**: added Tecnología (ESO), Dibujo Técnico (Bach), IA y Ciberseguridad (FP), Educación Financiera y Primeros Auxilios (Transversales), Francés (Idiomas), Biología 2º Bach (Ciencias)

### Current State
| Feature | Status |
|---------|--------|
| Templates (40 modules) | ✅ Stable |
| Flashcards / spaced rep | ✅ Stable |
| Onboarding (6 steps) | ✅ Stable |
| Study streak calendar | ✅ Stable |
| Export plan .txt | ✅ Stable |
| Pomodoro timer | ✅ Stable |
| Session stats | ✅ Stable |
| Progress chart | ✅ Stable |
| app.js syntax | ✅ Fixed |
| Unicode accents in HTML | ✅ Fixed |
| Debug JS cleanup | ✅ Done |

### Remaining
- Refactor `app.js` into smaller per-feature modules when needed
- All features working; no known bugs

### Current Module Structure
| Module | File | Responsibility |
|--------|------|---------------|
| Core | `js/app.js` | Vue data, computed, lifecycle, graph, evaluation, assessment, navigation, keyboard, toast, backup, search |
| Editor | `js/editor.js` | Subject/concept/relation CRUD, templates, import/export, inline edit, drag-drop, bulk tag |
| Study | `js/study.js` | Flashcards, pomodoro, streak calendar, study plan export, progress chart, onboarding |

### Debug Files Cleaned
Removed leftover debug/backup files:
- `js/app_check.js`, `js/app_inner.js`, `find_paren.js`, `find_error.js`, `check_syntax.js`, `count_braces.js`
