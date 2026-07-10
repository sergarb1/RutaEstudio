# RutaEstudio — AGENTS.md

## Project
Interactive knowledge graph for any subject. Define concepts and their relationships, assess student mastery, get AI-powered study plans (BFS/DFS offline). 100% gratis, RGPD, datos locales. Tu camino hacia el aprobado.

## Language
Multi-language: ES (default), EN, VA. Managed via `js/i18n.js` — use `GC.t('key')` in templates.

## Data Model

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
  relations: [{ from: conceptId, to: conceptId, type: string }],
  nodePositions: { conceptId: { x, y } }
}]

assessments = [{
  id, subjectId, date,
  results: { conceptId: score(0-100) },
  notes: { conceptId: string }
}]

crossRelations = [{ from: conceptId, to: conceptId, type: string }]

customRelationTypes = [{ id, name, color, dash, width, arrow }]
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
- `GC.store.getRelationTypeInfo(typeId)` → `{ name, color, dash, width, arrow }` for any type
- `GC.store.allRelationTypes()` → combined built-in + custom types
- `GC.store.addCustomRelationType(name, color, dash, width, arrow)` → new type id
- `GC.store.updateCustomRelationType(id, data)` → update fields
- `GC.store.removeCustomRelationType(id)` → delete type
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
| *custom* | configurable | Usuario crea tipos con color, dash, width, arrow propios |

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
- 🎨 **Tipos de relación personalizados**: modal para crear tipos con color, dash, width, arrow propios; aparecen en selects, leyenda, badges y botones del grafo
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
RutaEstudio/
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
- Repo: github.com/sergarb1/RutaEstudio
- Pages: https://sergarb1.github.io/RutaEstudio

---

## Session Summary (10 Jul 2026)

### Goal
Fix bugs (graph buttons no filtran, estudio vacío), crear skill UI/UX critic, ajustes varios.

### Completed
- **Graph tab**: botones de tipo de relación ahora también filtran el grafo (además del dropdown). Añadido botón "Todas" para limpiar filtro.
- **ai-generator.js**: default tab cambiado de 'import' a 'prompts' para que al hacer clic en "Prompts" se vean los prompts, no el textarea de import.
- **Skill UI/UX critic**: creada en `.opencode/skills/ui-ux-critic/SKILL.md` — checklist PC, móvil, accesibilidad, PWA con archivo:línea para cada issue.

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
| Custom relation types | ✅ Stable |
| Graph filter buttons | ✅ Fixed |

### PWA / Instalable
- **Manifest**: `manifest.json` → iconos PNG estáticos (`icon-192.png`, `icon-512.png`)
- **Service Worker**: `sw.js` — cache-first para assets locales, network-first para CDN, offline navigation → `index.html`
- **Install prompt**: `beforeinstallprompt` capturado en `window.deferredPrompt`; botón "Instalar" en header cuando `canInstall === true`

## Current Module Structure
| Module | File | Responsibility |
|--------|------|---------------|
| Core | `js/app.js` | Vue data, computed, lifecycle, graph, evaluation, assessment, navigation, keyboard, toast, backup, search |
| Editor | `js/editor.js` | Subject/concept/relation CRUD, templates, import/export, inline edit, drag-drop, bulk tag, custom relation types management |
| Study | `js/study.js` | Flashcards, pomodoro, streak calendar, study plan export, progress chart, onboarding |


<!-- headroom:rtk-instructions -->
# RTK (Rust Token Killer) - Token-Optimized Commands

When running shell commands, **always prefix with `rtk`**. This reduces context
usage by 60-90% with zero behavior change. If rtk has no filter for a command,
it passes through unchanged — so it is always safe to use.

## Key Commands
```bash
# Git (59-80% savings)
rtk git status          rtk git diff            rtk git log

# Files & Search (60-75% savings)
rtk ls <path>           rtk read <file>         rtk grep <pattern>
rtk find <pattern>      rtk diff <file>

# Test (90-99% savings) — shows failures only
rtk pytest tests/       rtk cargo test          rtk test <cmd>

# Build & Lint (80-90% savings) — shows errors only
rtk tsc                 rtk lint                rtk cargo build
rtk prettier --check    rtk mypy                rtk ruff check

# Analysis (70-90% savings)
rtk err <cmd>           rtk log <file>          rtk json <file>
rtk summary <cmd>       rtk deps                rtk env

# GitHub (26-87% savings)
rtk gh pr view <n>      rtk gh run list         rtk gh issue list

# Infrastructure (85% savings)
rtk docker ps           rtk kubectl get         rtk docker logs <c>

# Package managers (70-90% savings)
rtk pip list            rtk pnpm install        rtk npm run <script>
```

## Rules
- In command chains, prefix each segment: `rtk git add . && rtk git commit -m "msg"`
- For debugging, use raw command without rtk prefix
- `rtk proxy <cmd>` runs command without filtering but tracks usage
<!-- /headroom:rtk-instructions -->
