# RutaEstudio 🧠

> Tu camino hacia el aprobado.
> Your path to success.

<p align="center">
  <a href="https://sergarb1.github.io/RutaEstudio/">🌐 sergarb1.github.io/RutaEstudio</a>
</p>

---

## ✨ Características / Features

| ES | EN |
|---|---|
| ✅ Múltiples asignaturas con grafo de conocimiento interactivo | ✅ Multiple subjects with interactive knowledge graph |
| 🖱️ Grafo interactivo vis-network con arrastre de nodos | 🖱️ vis-network interactive graph with node dragging |
| 🎨 Tipos de relación personalizables (color, grosor, flecha) | 🎨 Custom relation types (color, width, arrow) |
| 🔗 4 tipos nativos: prerrequisito, pertenece, relacionado, profundiza | 🔗 4 native types: prerequisite, belongs-to, related, deepens |
| 📝 Autoevaluación con escala 1-5 y plan de estudio BFS/DFS | 📝 Self-assessment (1-5 scale) with BFS/DFS study plans |
| 🔥 Desbloqueador — algoritmo que prioriza conceptos con más potencial | 🔥 Unlocker algorithm — prioritizes highest-unlock-potential concepts |
| 🃏 Flashcards con volteo 3D y repetición espaciada | 🃏 3D flip flashcards with spaced repetition |
| 🍅 Pomodoro integrado (15/25/45 min) con barra de progreso | 🍅 Built-in Pomodoro timer (15/25/45 min) with progress bar |
| 📊 Gráfico SVG de progreso global con tendencia | 📊 SVG global progress chart with trend line |
| 📈 Comparador de evaluaciones lado a lado | 📈 Side-by-side assessment comparison |
| 🌳 Árbol de dependencias jerárquico | 🌳 Hierarchical dependency tree |
| 🔎 Búsqueda global (Ctrl+K) en todas las asignaturas | 🔎 Global search (Ctrl+K) across all subjects |
| ↩️ Undo/Redo con historial de 50 acciones | ↩️ Undo/Redo with 50-action history |
| 🏷️ Tags por concepto con filtro y CSV I/O | 🏷️ Tags per concept with filter and CSV I/O |
| 📚 40 plantillas educativas (ESO, Bachillerato, FP) | 📚 40 educational templates (ESO, High School, Vocational) |
| 🗺️ Roadmap "ahora/siguiente/pronto" en resultados | 🗺️ "Now/Next/Later" roadmap in results view |
| 🕵️ Inspector con walkthrough, recursos y bloqueadores | 🕵️ Inspector panel with walkthrough, resources, blockers |
| 🎮 15 niveles y 27 logros con sistema de XP | 🎮 15 levels and 27 achievements with XP system |
| 🔥 Racha de estudio con calendario visual 28 días | 🔥 Study streak with 28-day visual calendar |
| 🌙 Modo oscuro/claro (persistente, respeta sistema) | 🌙 Dark/light mode (persistent, system-aware) |
| 💾 Auto-backup cada 5 minutos | 💾 Auto-backup every 5 minutes |
| 📱 PWA instalable (offline-ready) | 📱 Installable PWA (offline-ready) |
| 🌍 Multi-idioma: ES, EN, VA | 🌍 Multi-language: ES, EN, VA |
| 🔒 100% local — datos en localStorage | 🔒 100% local — data stays in localStorage |
| 📖 Licencias libres | 📖 Free licenses |

---

## 🚀 Uso rápido / Quick start

1. Abre `index.html` en tu navegador / Open `index.html` in your browser
2. Crea una asignatura o carga el ejemplo / Create a subject or load the example
3. Añade conceptos y conéctalos / Add concepts and connect them
4. Evalúa tu dominio / Assess your mastery
5. Revisa el plan de estudio generado / Review your generated study plan

O directamente en / Or directly at: **[sergarb1.github.io/RutaEstudio](https://sergarb1.github.io/RutaEstudio/)**

---

## 🛠️ Stack técnico / Tech stack

| Frontend | CDN | Fallback local |
|---|---|---|
| Vue 3 (Options API) | `unpkg.com/vue@3` | `fallback/vue.global.prod.js` |
| Tailwind CSS v3 | `cdn.tailwindcss.com` | `fallback/tailwind.min.css` |
| vis-network | `unpkg.com/vis-network@9` | `fallback/vis-network.min.js` |
| Google Fonts (Inter + Outfit) | `fonts.googleapis.com` | — |

| PWA | Persistencia | Despliegue |
|---|---|---|
| Service Worker + Manifest | localStorage | GitHub Pages |
| CacheFirst (22 precached) | JSON export/import | Push → Actions → gh-pages |

---

## 📁 Estructura del proyecto / Project structure

```
RutaEstudio/
├── index.html                # Entry point (single HTML + Vue template)
├── README.md                 # This file
├── FORMAT.md                 # JSON data format specification
├── AGENTS.md                 # AI assistant instructions
├── manual.html               # Full user manual
├── manifest.json             # PWA manifest
├── sw.js                     # Service Worker (CacheFirst)
├── css/
│   └── app.css               # Custom styles + dark mode + animations
├── js/
│   ├── app.js                # Vue app core (mount, lifecycle, keyboard)
│   ├── store.js              # Reactive state + undo/redo (50 snapshots)
│   ├── editor.js             # CRUD subjects, concepts, relations, templates
│   ├── helpers.js            # heatColor, md renderer, unlockScore, roadmap
│   ├── graph-engine.js       # vis-network wrapper (render, renderHeat, renderGlobal)
│   ├── study-plan.js         # BFS/DFS/Desbloqueador algorithms
│   ├── study.js              # Flashcards, pomodoro, streak, charts, onboarding
│   ├── templates.js          # 40 educational templates
│   ├── gamification.js       # XP, levels, 27 achievements, confetti
│   └── i18n.js               # Internationalization (ES/EN/VA)
├── components/
│   ├── subject-list.js       # Subject grid
│   ├── global-graph.js       # Multi-subject graph
│   ├── suggestions-panel.js  # AI suggestions
│   ├── help-modal.js         # Help + shortcuts + AI guide
│   └── ai-generator.js       # AI prompt templates + JSON import
├── fallback/
│   ├── tailwind.min.css      # Offline Tailwind fallback
│   ├── vue.global.prod.js    # Offline Vue 3 fallback
│   └── vis-network.min.js    # Offline vis-network fallback
└── img/
    └── icon.svg              # PWA icon (brain + network + book)
```

---

## 🛠️ Desarrollo local / Local development

```bash
# No build step needed — just serve the folder:
python -m http.server 8000
# or
npx serve .
# or simply open index.html in your browser
```

### Generar fallbacks / Generate fallbacks

```bash
# Tailwind
npx tailwindcss -c tailwind.config.js -i input.css -o fallback/tailwind.min.css --minify

# Vue 3
curl -o fallback/vue.global.prod.js https://unpkg.com/vue@3/dist/vue.global.prod.js

# vis-network
curl -o fallback/vis-network.min.js https://unpkg.com/vis-network@9.1.9/dist/vis-network.min.js
```

---

## 🤖 Usar con IA / Use with AI

Exporta tus datos como JSON y compártelos con un asistente de IA.
Export your data as JSON and share it with an AI assistant.

**Prompt para analizar / Analyze prompt:**
```
Tengo este grafo de conocimiento en formato JSON:
[copia el JSON exportado]

1. ¿Qué conceptos debería repasar primero?
2. ¿Qué relaciones podría añadir?
3. Sugiere un orden de estudio optimizado
4. ¿Qué áreas tengo débiles?
```

**Prompt para GENERAR / Generate prompt:**
```
Genera un archivo JSON para Ruta de Estudio con una asignatura sobre [tema].
Usa el formato de FORMAT.md. Crea ≥10 conceptos y ≥12 relaciones variadas.
Devuelve solo JSON válido, sin explicaciones.
```

Después, importa el JSON en **Ajustes → Importar datos**.
Then import the JSON in **Settings → Import data**.

---

## 🔄 Flujo de datos / Data flow

```
localStorage (persistencia)
    ↕
store.js (estado reactivo Vue)
    ↕
Componentes Vue (UI)
    ↕
vis-network (grafo interactivo)
```

---

## 📦 Formato de datos / Data format

Ver [`FORMAT.md`](./FORMAT.md) para la especificación completa del formato JSON.
See [`FORMAT.md`](./FORMAT.md) for the full JSON format specification.

---

## 📖 Licencias / Licenses

| Código / Code | Contenido / Content |
|---|---|
| Código abierto | Documentación educativa |
| Sin licencia formal | CC BY-SA 4.0 |

**Creado por / Created by:** [Sergi García Barea](https://github.com/sergarb1)

---

## 🔗 Enlaces / Links

- [GitHub](https://github.com/sergarb1/RutaEstudio)
- [GitHub Pages](https://sergarb1.github.io/RutaEstudio)
- [Reportar issue](https://github.com/sergarb1/RutaEstudio/issues)

---

## ⚡ Nota para asistentes IA

Consulta [AGENTS.md](AGENTS.md) para la configuración completa del proyecto: stack, estructura, convenciones y datos del modelo.
