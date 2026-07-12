# RutaEstudio — AGENTS.md

## Project
Interactive knowledge graph for any subject. Define concepts and their relationships, assess student mastery, get AI-powered study plans (BFS/DFS offline). 100% gratis, RGPD, datos locales. Tu camino hacia el aprobado.

## Rules
- After every code change (fix, refactor, feature), run `rtk git add -A && rtk git commit -m "mensaje" && rtk git push`. No exception. No asking.
- Only amend if accidentally included generated/ide files (.opencode/, .serena/).

## Language
Multi-language: ES (default), EN, VA. Managed via `js/i18n.js` — use `GC.t('key')` in templates.

## Dev Server
```bash
python3 -m http.server 8080
```
Navigate to `http://localhost:8080` for Chrome MCP debugging.

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
├── fallback/
│   ├── tailwind.min.css       # Offline fallback
│   ├── vue.global.prod.js     # Offline fallback
│   └── vis-network.min.js     # Offline fallback
└── .opencode/
    └── skills/
        └── ui-ux-critic/
            └── SKILL.md       # UI/UX audit checklist (PC + mobile + a11y)
```

## GitHub
- Repo: github.com/sergarb1/RutaEstudio
- Pages: https://sergarb1.github.io/RutaEstudio

---

## Session Summary (12 Jul 2026)

### Goal
🐛 Fix onboarding overlay not rendering (Vue 3 in-DOM compiler bug), improve subject-list header mobile layout, merge recommendation card into personalized study plan card.

### Root Cause — Vue 3 in-DOM compiler drops last children of `#app-content`
The Vue 3.5.39 in-DOM compiler was **silently dropping the last 3+ children** of the `#app-content` div during template-to-render-function compilation. The footer, overlays (onboarding + achievements), and any content after the main tab content area were never included in the compiled VNode tree — despite being present in the raw template string (`app._component.template`). The compiler produced a correct-looking render function string with all children, but execution yielded fewer children (6 instead of 8+). This affected `v-if`, `v-show`, and even plain `<div>` elements.

**Fix**: Moved footer, onboarding overlay, and achievements overlay **outside** `#app-content` as Fragment-level siblings — same level as the existing `<help-modal>` and subject modals. Fragment-level siblings compile correctly because they're not at risk of being tail-dropped from a long children array.

### Completed
- **🐛 Overlay render fix**: moved onboarding + achievements overlays + footer from inside `#app-content` to Fragment-level siblings; confirmed working with DOM query and a11y snapshot
- **🧹 Service worker unregistration**: discovered SW was serving cached HTML; unregistered during debug
- **📱 Subject-list header responsive**: `flex-wrap`, `gap-1.5`, `min-w-[36px]/min-h-[36px]` touch targets, text labels hidden on `<xs>` — compact mobile layout
- **📊 Study plan merged into recommendation card**: algorithm selector (BFS/DFS/Desbloqueador) + repasar/reforzar/avanzar detail lists now live inside the recommendation card; quick actions (Nueva evaluación, Exportar plan, Flashcards) at bottom; old separate study plan card removed
- **Achievements overlay**: changed back from `v-show` to `v-if="showAchievementsComputed"` (Fragment sibling, correct)

### Current State
| Feature | Status |
|---------|--------|
| Onboarding overlay renders | ✅ Fixed |
| Footer renders | ✅ Fixed |
| Achievements modal | ✅ Working |
| Subject-list header mobile | ✅ Responsive |
| Study plan merged into recommendation | ✅ Done |
| Service worker cleanup | ✅ Verified |

## 🧩 UI/UX Patterns extraídos (reutilizables en otras apps)

| Pattern | Cómo se implementa en RutaEstudio | Clave |
|---------|-----------------------------------|-------|
| **Bottom-right card actions** | Botones de acción en `absolute bottom-3 right-3` con `pb-12` en la card | No ocultan contenido, siempre visibles, no interfieren con el click principal |
| **Mobile-first touch targets** | `min-w-[36px] min-h-[36px]` con `sm:` override a 28px | Dedo cabe en mobile, no ocupa de más en desktop |
| **Header responsive** | `flex-wrap` en header y botonera + iconos que escalan (`w-4 h-4 sm:w-3.5`) | Nunca se desborda, los iconos se agrandan en touch |
| **Tabs con scroll** | `overflow-x-auto` + `tabs-scroll` (scrollbar none) + wrapper div | No rompen layout en mobile, el scroll es natural |
| **Accordion features en README** | `<details><summary>` agrupando por categorías | Escaneable, colapsable, no abruma |
| **Badges en README** | `shields.io` con colores de estado (demo, PWA, offline, license) | Comunicación visual instantánea |
| **Gradient header en cards** | `bg-gradient-to-r from-indigo-600 to-purple-600` en cards de recomendación | Jerarquía visual clara, atrae la mirada |
| **Roadmap como tags clickeables** | Grupos "ahora/siguiente/pronto" como `<span>` con colores semánticos + click → inspector | Acción directa sin fricción |
| **Node shapes por peso** | `_nodeShape()`: estrella (≥8), hexágono (5-7), diamante (3-4), elipse (<3) | Comunicación visual sin texto |
| **Gradiente en barra de progreso** | `from-red-500 via-amber-500 to-green-500` según rango de score | Lectura inmediata del estado |
| **Toast con deshacer** | `showToast()` con `action` callback para undo de última acción | Seguridad psicológica, el usuario se atreve a hacer |
| **Auto-save + undo/redo** | 50 snapshots en store.js + Ctrl+Z/Ctrl+Shift+Z | El usuario nunca pierde trabajo |
| **Focus mode en grafo** | `focusMode` toggle oculta header, tabs, agranda contenedor | Modo "no distracciones" bajo demanda |
| **Inspector slide-over** | Panel lateral con tabs (walkthrough, recursos) que se superpone | No pierde contexto, información sin navegar |
| **Bulk actions con checkbox** | Checkbox en cada fila + barra de acción común | Acciones en lote sin modal complejo |
| **Edición inline** | `@dblclick` en nombre/desc cambia a `<input>` in-place | Edición rápida sin modales |
| **Evaluación masiva con sliders** | Slider + porcentaje por cada concepto, todos visibles a la vez | Feedback inmediato, puntuación rápida |
| **Quick actions contextuales** | Botones "Nueva eval", "Exportar plan", "Flashcards" dentro de la card de recomendación | Acción relevante en el momento justo |
| **Onboarding paso a paso** | 6 pasos con indicador de progreso, skip al final | Primera experiencia guiada sin obligar |
| **Gamification bar siempre visible** | XP, nivel, racha diaria en barra superior | Motivación constante, progresso visible |
| **Auto-backup silencioso** | Cada 5 minutos descarga JSON sin preguntar | Seguridad sin fricción |
| **CDN + fallback local** | Cada script tiene `src` CDN y `fallback` local | Resiliencia total offline |
| **PWA installable** | `manifest.json` + `sw.js` + `beforeinstallprompt` + botón install | App nativa sin app store |

## Current Module Structure
| Module | File | Responsibility |
|--------|------|---------------|
| Core | `js/app.js` | Vue data, computed, lifecycle, graph, evaluation, assessment, navigation, keyboard, toast, backup, search |
| Editor | `js/editor.js` | Subject/concept/relation CRUD, templates, import/export, inline edit, drag-drop, bulk tag, custom relation types management |
| Study | `js/study.js` | Flashcards, pomodoro, streak calendar, study plan export, progress chart, onboarding |

---

## 🔧 Debugging Tips (Vue 3 CDN + Tailwind CDN)

### Compiled Render Function
```javascript
// Dump the compiled render function
app._component.render.toString()
// Dump the raw template (innerHTML at mount time)
app._component.template
// Compare lengths to detect compilation drops
```

### Detect Dropped Children (Vue 3 in-DOM compiler bug)
If content at the **end of a container** doesn't render even with `v-if="true"`:
```javascript
// Count rendered children vs template children
var ac = document.querySelector('#app-content');
console.log('Rendered children:', ac.children.length);
console.log('Template children count:', 
  app._component.template.split('<div ').length - 1);
```
**Fix**: Move the content **outside** the long container as a Fragment sibling.

### Force Re-render
```javascript
app._container._vnode.component.update()
```

### Check Reactive State
```javascript
var p = app.__vue_app__._container._vnode.component.proxy;
console.log(p.showOnboarding, p.showOnboardingComputed);
```

### Service Worker Debugging
```javascript
// Unregister all SWs (dev only)
navigator.serviceWorker.getRegistrations().then(r => r.map(r => r.unregister()))
// Check if SW is serving stale cache
navigator.serviceWorker.controller?.scriptURL
```

### Cache-Busting Reload
```
http://localhost:8080/index.html?cb=<random>
```
Use `ignoreCache: true` in `navigate_page` AND unregister SW.

### Common Issues
| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Content at end of `#app-content` doesn't render | Compiler drops tail children | Move to Fragment sibling |
| `v-if` renders `<!---->` despite value `true` | Same as above | Same as above |
| Changes in HTML not reflected | SW cache or browser cache | Unregister SW + query param |
| `v-show` element not in DOM | Same compiler drop bug | Move outside long container |
| Global CSS not loading | CDN blocked offline | Check `fallback/` dir |

---

## 🎨 Visual Style Guide (reusable in any app)

### Color System
```
Primary:   indigo-600 (#4f46e5) → hover indigo-700
           dark: indigo-400 (#818cf8)
Success:   green-500 (#22c55e) / green-600 (#16a34a)
Warning:   amber-500 (#eab308) / amber-600 (#d97706)
Danger:    red-500 (#ef4444) / red-600 (#dc2626)
Neutral:   slate-50 → slate-900 scale
Accent:    purple-600 (#9333ea) — gradient partner with indigo
```

### Component Patterns
```html
<!-- Card base — white + border + rounded-2xl + p-5 -->
<div class="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">

<!-- Gradient header inside card -->
<div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-4 rounded-t-2xl -mx-5 -mt-5 mb-4">

<!-- Button primary -->
<button class="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl hover:bg-indigo-700 transition">

<!-- Button secondary -->
<button class="bg-white dark:bg-slate-700 border dark:border-slate-600 font-medium px-4 py-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 transition">

<!-- Touch target (mobile-first) -->
<button class="min-w-[36px] min-h-[36px] sm:min-w-[28px] sm:min-h-[28px]">

<!-- Inline edit trigger -->
<div @dblclick="editMode=true" class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 rounded px-1 -mx-1">

<!-- Progress bar gradient -->
<div class="h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
  <div class="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500" style="width: 65%">

<!-- Tag/chip clickeable -->
<span class="text-xs px-2.5 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800/40 cursor-pointer hover:bg-indigo-100 transition font-medium">

<!-- Slide-over panel (inspector) -->
<div class="fixed inset-y-0 right-0 w-80 z-50 bg-white dark:bg-slate-800 shadow-2xl border-l border-slate-200 dark:border-slate-700 transform transition" :class="inspectorOpen ? 'translate-x-0' : 'translate-x-full'">

<!-- Toast notification -->
<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70]" v-show="showToast">
  <div class="bg-slate-800 dark:bg-slate-700 text-white px-5 py-3 rounded-xl shadow-2xl text-sm flex items-center gap-3">
```

### Typography
```css
/* Font stack */
font-family: 'Outfit', system-ui, -apple-system, sans-serif;

/* Sizes */
text-xs (0.75rem)  — labels, metadata
text-sm (0.875rem) — body, buttons
text-base (1rem)   — default
text-lg (1.125rem) — card titles
text-xl (1.25rem)  — section headers
font-bold          — emphasis
font-medium        — buttons, active states
```

### Spacing Scale
```css
p-2 (8px)    — compact cards
p-3 (12px)   — standard padding
p-4 (16px)   — cards, modals
p-5 (20px)   — spacious cards
p-6 (24px)   — modals
gap-1.5 (6px) — button groups
gap-2 (8px)   — standard gap
gap-3 (12px)  — section spacing
```

### Dark Mode
```html
<!-- Apply to all containers: -->
class="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100"
class="border-slate-200 dark:border-slate-700"
class="text-slate-500 dark:text-slate-400"
class="bg-indigo-50 dark:bg-indigo-900/20"
class="hover:bg-slate-50 dark:hover:bg-slate-700"
```

### Responsive Breakpoints
```
<xs> (320px)  — hide text, show icons only
sm  (640px)   — tablet, reduce touch targets to 28px
md  (768px)   — two-column grids
lg  (1024px)  — three-column grids
```

---

## 🧠 App-Making Tips (RutaEstudio lessons)

### No-Build-Steak Stack
```html
<!-- CDN + local fallback pattern — every script -->
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
<script>if (!window.Vue) document.write('<script src="fallback/vue.global.prod.js"><\/script>')</script>
```

### localStorage as Database
```javascript
// Store
localStorage.setItem('key', JSON.stringify(data));
// Read with migration
var raw = localStorage.getItem('key');
var data = raw ? JSON.parse(raw) : defaultValue;
// Auto-backup every 5 min
setInterval(() => {
  var blob = new Blob([JSON.stringify(allData)], {type: 'application/json'});
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'RutaEstudio-backup-' + new Date().toISOString().slice(0,10) + '.json';
  a.click();
}, 300000);
```

### Vue 3 CDN Gotchas
- **In-DOM template compilation** uses `innerHTML` of mount target, not SFC
- **Multiple root elements** are wrapped in Fragment (works in Vue 3)
- **Long children arrays** can have tail elements dropped (Vue ≤3.5.39 bug)
- **Hyphenated directives** (`v-on:click`, `:aria-label`) work but use kebab-case in HTML
- **Computed properties** must return a value synchronously (no async)

### PWA in 3 Steps
```javascript
// 1. manifest.json (minimal)
{ "name": "App", "short_name": "App", "start_url": ".", "display": "standalone" }

// 2. sw.js (cache-first for assets)
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(clients.claim()));
self.addEventListener('fetch', e => e.respondWith(
  caches.match(e.request).then(r => r || fetch(e.request))
));

// 3. Register + install button
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
// Install prompt
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installPrompt = e; });
```

### Vis-Network Graph in CDN
```javascript
// Create a network with dynamic node shapes
function _nodeShape(weight) {
  if (weight >= 8) return 'star';
  if (weight >= 5) return 'hexagon';
  if (weight >= 3) return 'diamond';
  return 'ellipse';
}
var nodes = new vis.DataSet(concepts.map(c => ({
  id: c.id, label: c.name, shape: _nodeShape(c.weight),
  size: 15 + c.weight * 2, font: { size: 11 }
})));
var edges = new vis.DataSet(relations.map(r => ({
  from: r.from, to: r.to, arrows: 'to', smooth: { type: 'continuous' }
})));
var network = new vis.Network(container, { nodes, edges }, {
  physics: { solver: 'forceAtlas2Based', damping: 0.6 },
  edges: { smooth: { type: 'continuous' } }
});
```


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
