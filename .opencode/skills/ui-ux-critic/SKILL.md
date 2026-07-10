---
name: ui-ux-critic
description: UI/UX critic for web apps (PC + mobile). Reviews layout, responsiveness, accessibility, visual hierarchy, touch targets, color contrast, and interaction design. Use when the user says "revisa la ui", "critica el diseño", "mira la interfaz", or wants a full UI/UX audit.
---

# UI/UX Critic — RutaEstudio

Evalúa la aplicación en PC y móvil. Revisa cada aspecto y reporta problemas con archivo:línea.

## Checklist PC

- [ ] **Header visible y funcional**: botones de acción (Importar, Exportar, Plantilla, Recordatorio, Instalar, idioma, modo oscuro) accesibles, sin desbordar
- [ ] **Landing page (subject-list)**: vacía muestra mensaje + acciones claras, con datos muestra tarjetas de asignatura
- [ ] **Cards de asignatura**: nombre visible, descripción, nº conceptos/relaciones, cursor pointer, hover effect
- [ ] **Navigación por tabs**: Concepts, Graph, Deps, Results, Study, Batch, History — se ven todos, no se solapan
- [ ] **Conceptos tab**: lista con inline edit (doble click), tags, drag, bulk tag, filtro por nombre/tag
- [ ] **Relaciones en conceptos**: lista clara, badges de tipo coloreados, botón eliminar
- [ ] **Graph tab**: vis-network renderiza, dropdown filtro funciona, botones de tipo filtran, leyenda toggle, peso mínimo, modo foco (Ctrl+F)
- [ ] **Results tab**: heat graph, stats, donut, barras, comparación, roadmap (ahora/siguiente/pronto)
- [ ] **Study tab**: flashcards con volteo, pomodoro, filtro por nivel, barra de progreso, sesión completa con stats
- [ ] **Modales**: creación/edición de asignatura, concepto, relación — formularios completos, botones de acción, cierre con Esc
- [ ] **Inspector panel**: slide-over con walkthrough, recursos, bloqueadores
- [ ] **Global search (Ctrl+K)**: busca en todas las asignaturas, resultados agrupados
- [ ] **Onboarding**: 6 pasos visibles la primera vez, se cierra y no reaparece
- [ ] **Toast notifications**: aparecen y desaparecen, no bloquean interacción

## Checklist Mobile (< 768px)

- [ ] **Viewport**: escala correctamente, no hace scroll horizontal
- [ ] **Header**: botones no se salen del ancho (usar menú hamburguesa si es necesario)
- [ ] **Subject cards**: grid 1 columna, tarjetas ocupan todo el ancho
- [ ] **Tabs navegación**: scroll horizontal si no caben, no se superponen
- [ ] **Formularios**: inputs y selects usables en pantalla táctil
- [ ] **Botones**: target mínimo 44×44px (Apple HIG), padding suficiente
- [ ] **Graph**: vis-network tiene navigationButtons activados (zoom, pan táctil)
- [ ] **Modales**: ocupan casi todo el ancho, scroll interno, cierre fácil
- [ ] **Flashcards**: ocupan todo el ancho, toque para voltear funciona
- [ ] **Pomodoro**: controles táctiles, tamaño de botones adecuado

## Checklist Accesibilidad

- [ ] **Skip-link** visible al cargar antes de Tailwind
- [ ] **Contraste** suficiente en modo claro y oscuro (WCAG AA 4.5:1 textos, 3:1 grandes)
- [ ] **aria-label** en todos los iconos/acciones sin texto
- [ ] **Focus visible** en todos los elementos interactivos
- [ ] **Navegación por teclado**: Tab ordenado, Enter/Espacio activan

## Checklist PWA

- [ ] **Manifest** válido: name, short_name, icons (PNG, no blob URL), start_url, display standalone
- [ ] **Service Worker** registrado, cachea assets, offline navigation → index.html
- [ ] **beforeinstallprompt** capturado, botón "Instalar" visible cuando `canInstall === true`
- [ ] **No errores** de manifest en consola (blob URLs, start_url inválido)

## Reporte

Para cada problema encontrado, reporta:
1. **Archivo:línea** donde está el código
2. **Qué ocurre** (comportamiento actual)
3. **Qué debería ocurrir** (comportamiento esperado)
4. **Sugerencia de fix** (código o enfoque)
