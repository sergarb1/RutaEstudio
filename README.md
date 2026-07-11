<div align="center">
  <img src="logo.png" alt="RutaEstudio" width="200"/>
  <h1>RutaEstudio</h1>
  <p><strong>Tu camino hacia el aprobado</strong></p>
  <p>
    <a href="https://sergarb1.github.io/RutaEstudio/">
      <img src="https://img.shields.io/badge/demo-%236366f1?style=for-the-badge&logo=githubpages&logoColor=white" alt="Demo"/>
    </a>
    <a href="https://github.com/sergarb1/RutaEstudio/blob/main/README.md">
      <img src="https://img.shields.io/badge/español-%23000?style=for-the-badge&logo=readme&logoColor=white" alt="ES"/>
    </a>
    <img src="https://img.shields.io/badge/PWA-ready-%235a0fc8?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA"/>
    <img src="https://img.shields.io/badge/offline-100%25-%2322c55e?style=for-the-badge" alt="Offline"/>
    <img src="https://img.shields.io/badge/license-AGPLv3-%23e11d48?style=for-the-badge" alt="License"/>
  </p>
  <p>
    <strong>Grafo de conocimiento interactivo &middot; Plan de estudio personalizado &middot; 100% offline y gratuito</strong>
  </p>
  <p><em>Conecta conceptos, domina tu ruta. Estudia con prop&oacute;sito.</em></p>
</div>

---

## 🚀 En un clic

Sin registro, sin instalaci&oacute;n, sin internet.

| | |
|---|---|
| **🌐 Web** | [sergarb1.github.io/RutaEstudio](https://sergarb1.github.io/RutaEstudio/) |
| **📱 PWA** | Abre la web &rarr; "Instalar" en el men&uacute; del navegador |
| **💻 Local** | `git clone` + abre `index.html` o `python -m http.server` |

---

## ✨ Funcionalidades

<details open>
<summary><strong>&#x1F9E0; Esencial</strong></summary>

| | |
|---|---|
| 🧠 | **Asignaturas ilimitadas** con su propio grafo de conceptos |
| 🔗 | **4 tipos de relaci&oacute;n** (prerrequisito, pertenece, relacionado, profundiza) + tipos personalizados |
| 📝 | **Autoevaluaci&oacute;n** r&aacute;pida o masiva con escala 0-100% |
| 📊 | **Plan de estudio** con 3 algoritmos: BFS, DFS y 🔥 Desbloqueador |
| 🗺️ | **Roadmap** visual (ahora / siguiente / pronto) basado en tu dominio |

</details>

<details>
<summary><strong>&#x1F3AE; Estudio y gamificaci&oacute;n</strong></summary>

| | |
|---|---|
| 🃏 | **Flashcards** con volteo 3D y repetici&oacute;n espaciada |
| 🍅 | **Pomodoro** integrado (15/25/45 min) con barra de progreso |
| 🎮 | **15 niveles** y **27 logros** con sistema de XP y confeti |
| 🔥 | **Racha de estudio** con calendario visual de 28 d&iacute;as |
| 📈 | **Gr&aacute;fico de progreso** con tendencia y predicci&oacute;n por regresi&oacute;n lineal |

</details>

<details>
<summary><strong>&#x1F6E0️; Productividad</strong></summary>

| | |
|---|---|
| 🔎 | **B&uacute;squeda global** (Ctrl+K) en todas las asignaturas |
| ↩️ | **Undo/Redo** con historial de 50 acciones |
| 📚 | **40 plantillas educativas** (ESO, Bachillerato, FP, Idiomas...) |
| 🏷️ | **Tags** por concepto con filtro y export/import CSV |
| 📄 | **Exportar plan de estudio** a .txt imprimible |
| 🖱️ | **Edici&oacute;n inline** con doble clic en nombre y descripci&oacute;n |
| 🕵️ | **Inspector** con walkthrough, recursos y bloqueadores |
| 🌳 | **Árbol de dependencias** jer&aacute;rquico |
| 📈 | **Comparador de evaluaciones** lado a lado |

</details>

<details>
<summary><strong>&#x1F3A8; Personalizaci&oacute;n</strong></summary>

| | |
|---|---|
| 🎨 | **Tipos de relaci&oacute;n personalizados** (color, grosor, flecha, discontinuo) |
| 🌙 | **Modo oscuro/claro** (persistente, respeta preferencia del sistema) |
| 🌍 | **Multi-idioma**: Espa&ntilde;ol, English, Valenci&agrave; |
| 🖥️ | **Modo foco** en el grafo (Ctrl+F) sin distracciones |
| 📖 | **Leyenda del grafo** con todos los tipos de relaci&oacute;n |

</details>

<details>
<summary><strong>&#x1F512; Privacidad y t&eacute;cnica</strong></summary>

| | |
|---|---|
| 🔒 | **100% local** &mdash; datos en localStorage, nunca salen del navegador |
| 📱 | **PWA instalable** &mdash; funciona sin internet |
| 💾 | **Auto-backup** cada 5 minutos (descarga autom&aacute;tica) |
| 📦 | **Export/Import** JSON completo de todos los datos |
| 🌐 | **CDN + fallback local** &mdash; funciona incluso sin conexi&oacute;n |

</details>

---

## 🛠️ Stack t&eacute;cnico

| Frontend | Persistencia | Despliegue |
|---|---|---|
| **Vue 3** (CDN + fallback local) | **localStorage** | **GitHub Pages** |
| **Tailwind CSS v3** (CDN + fallback) | JSON export/import | Push &rarr; Actions &rarr; gh-pages |
| **vis-network** (CDN + fallback) | Service Worker | PWA offline-ready |
| **Inter + Outfit** (Google Fonts) | | |

**Sin build step** &mdash; abre `index.html` y funciona.

---

## 📁 Estructura

```
RutaEstudio/
├── index.html              ← App completa (HTML + Vue template)
├── css/app.css             ← Estilos personalizados + dark mode
├── js/
│   ├── app.js              ← Núcleo Vue (datos, ciclo de vida, teclado)
│   ├── store.js            ← Estado reactivo + undo/redo
│   ├── editor.js           ← CRUD asignaturas, conceptos, relaciones
│   ├── helpers.js          ← heatColor, md renderer, roadmap
│   ├── graph-engine.js     ← vis-network wrapper (render, heat, global)
│   ├── study-plan.js       ← BFS, DFS, Desbloqueador
│   ├── study.js            ← Flashcards, pomodoro, racha, charts
│   ├── templates.js        ← 40 plantillas educativas
│   ├── gamification.js     ← XP, niveles, logros, confeti
│   └── i18n.js             ← ES/EN/VA
├── components/             ← Componentes Vue reutilizables
├── fallback/               ← Librerías offline (Vue, Tailwind, vis-network)
└── .opencode/skills/       ← Skills para asistentes IA
```

---

## 🤖 Uso con IA

Exporta tus datos como JSON y comparte con cualquier asistente de IA.

**📊 Analizar tu progreso:**
```text
Tengo este grafo de conocimiento en formato JSON:
[copia el JSON exportado desde RutaEstudio]

1. ¿Qué conceptos debería repasar primero?
2. ¿Qué relaciones podría añadir?
3. Sugiere un orden de estudio optimizado
4. ¿Qué áreas tengo débiles?
```

**📝 Generar una asignatura:**
```text
Genera un archivo JSON para RutaEstudio con una asignatura sobre [tema].
Mínimo 10 conceptos, 12 relaciones variadas (prerrequisito, pertenece,
relacionado, profundiza). Usa pesos del 1 al 10.
Devuelve solo JSON válido, sin explicaciones.
```

---

## 📄 Licencia

**C&oacute;digo:** AGPL v3  
**Documentaci&oacute;n:** CC BY-SA 4.0  
**Creado por:** [Sergi Garc&iacute;a Barea](https://github.com/sergarb1)

---

## 🔗 Enlaces

- [🌐 Web](https://sergarb1.github.io/RutaEstudio) &mdash; pru&eacute;balo ahora
- [🐙 GitHub](https://github.com/sergarb1/RutaEstudio) &mdash; c&oacute;digo fuente
- [📖 Manual](https://sergarb1.github.io/RutaEstudio/manual.html) &mdash; gu&iacute;a completa de usuario
- [🐛 Issues](https://github.com/sergarb1/RutaEstudio/issues) &mdash; reporta bugs o sugiere mejoras

---

<div align="center">
  <sub>Hecho con ❤️ para estudiantes que quieren organizar su conocimiento.</sub>
  <br>
  <sub>100% gratuito &middot; RGPD compliant &middot; datos siempre locales</sub>
</div>
