# 🧠 Ruta de Estudio

> Conecta conceptos, domina tu ruta. Estudia con propósito.

Aplicación web interactiva 100% offline para crear grafos de conocimiento, evaluar el dominio de conceptos y generar planes de estudio personalizados con algoritmos BFS/DFS y temporizador Pomodoro.

## ✨ Características

- **Múltiples asignaturas** — gestiona varias materias con sus propios conceptos y relaciones
- **Grafo interactivo** — visualiza y edita relaciones entre conceptos con vis-network
- **4 tipos de relación** — prerrequisito, pertenece, relacionado, profundiza
- **Autoevaluación** — valora tu dominio de cada concepto en una escala 1-5
- **Plan de estudio** — ordenación topológica BFS, DFS o Desbloqueador con recomendaciones contextuales
- **Pomodoro integrado** — temporizador 15/25/45 min en el modo estudio para sesiones enfocadas
- **Mapa de calor** — grafo coloreado por nivel de dominio (verde/amarillo/rojo)
- **Evolución del progreso** — gráfico SVG que muestra la tendencia de tus puntuaciones
- **Grafo global** — visualiza relaciones entre conceptos de diferentes asignaturas
- **Sugerencias inteligentes** — análisis automático de puntos débiles y tendencias
- **Dark mode** — con detección automática del sistema y persistencia
- **100% offline** — datos en localStorage, sin servidor, sin build step

## 🚀 Uso rápido

1. Abre `index.html` en tu navegador
2. Crea una asignatura o carga el ejemplo
3. Añade conceptos y conéctalos con relaciones
4. Evalúa tu dominio en la pestaña "Evaluar"
5. Revisa el plan de estudio generado automáticamente
6. Usa el temporizador Pomodoro en la pestaña "Estudiar" para mantener el foco

## 📁 Estructura del proyecto

```
grafo-conocimiento/
├── index.html                # Punto de entrada
├── README.md                 # Esta documentación
├── FORMAT.md                 # Especificación del formato JSON
├── AGENTS.md                 # Instrucciones para asistentes IA
├── css/
│   └── app.css               # Estilos personalizados + dark mode
├── js/
│   ├── app.js                # Aplicación Vue + lógica principal
│   ├── store.js              # Estado reactivo + persistencia
│   ├── graph-engine.js       # Motor de vis-network
│   ├── study-plan.js         # Algoritmos BFS/DFS
│   └── helpers.js            # Utilidades (heatColor, etc.)
├── components/
│   ├── subject-list.js       # Grid de asignaturas
│   ├── global-graph.js       # Grafo multi-asignatura
│   ├── suggestions-panel.js  # Panel de sugerencias
│   └── help-modal.js         # Modal de ayuda
└── fallback/
    ├── tailwind.min.css       # Fallback Tailwind CSS (generado)
    ├── vue.global.prod.js     # Fallback Vue 3
    └── vis-network.min.js     # Fallback vis-network
```

## 🛠️ Stack técnico

| Tecnología | CDN | Fallback local |
|------------|-----|----------------|
| Vue 3 | `unpkg.com/vue@3` | `fallback/vue.global.prod.js` |
| Tailwind CSS | `cdn.tailwindcss.com` | `fallback/tailwind.min.css` |
| vis-network | `unpkg.com/vis-network@9` | `fallback/vis-network.min.js` |
| Google Fonts | `fonts.googleapis.com` | — |

### Generar fallback de Tailwind

```bash
npx tailwindcss -c tailwind.config.js -i input.css -o fallback/tailwind.min.css --minify
```

### Generar fallback de librerías

```bash
# Descargar Vue 3
curl -o fallback/vue.global.prod.js https://unpkg.com/vue@3/dist/vue.global.prod.js

# Descargar vis-network
curl -o fallback/vis-network.min.js https://unpkg.com/vis-network@9.1.9/dist/vis-network.min.js
```

## 🤖 Usar con IA

Exporta tus datos como JSON y compártelos con un asistente de IA:

**Prompt recomendado:**

```
Tengo este grafo de conocimiento en formato JSON:
[copia el JSON exportado]

Basándote en estos datos:
1. ¿Qué conceptos debería repasar primero?
2. ¿Qué relaciones entre conceptos podría añadir?
3. Sugiere un orden de estudio optimizado
4. ¿Qué áreas de conocimiento tengo débiles?
```

El asistente analizará tu grafo y te dará recomendaciones personalizadas.

## 🔄 Flujo de datos

```
localStorage (persistencia)
    ↕
store.js (estado reactivo Vue)
    ↕
Componentes Vue (UI)
    ↕
vis-network (grafo interactivo)
```

## 📦 Formato de datos

Ver [`FORMAT.md`](./FORMAT.md) para la especificación completa del formato JSON.

## 🔗 Enlaces

- [GitHub](https://github.com/sergarb1/grafo-conocimiento)
- [GitHub Pages](https://sergarb1.github.io/grafo-conocimiento)
