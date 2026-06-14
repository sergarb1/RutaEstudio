# Grafo de Conocimiento — AGENTS.md

## Project
Interactive knowledge graph for any subject. Define concepts and their relationships, assess student mastery, get AI-powered study plans (BFS/DFS offline).

## Stack
- Single HTML + Alpine.js + Tailwind (CDN)
- vis-network (CDN) for interactive graph
- localStorage for persistence
- JSON export/import for backup
- No build step, no server, 100% offline

## Data Model
```javascript
subjects = [{
  id: string, name: string, description: string,
  concepts: [{ id, name, description, weight: 1-10 }],
  relations: [{ from: conceptId, to: conceptId, type: 'prerrequisito'|'pertenece'|'relacionado'|'profundiza' }]
}]

assessments = [{
  id, subjectId, date,
  results: { conceptId: score(0-100) },
  notes: { conceptId: string }
}]
```

## Key Functions
- `buildGraph(subject)` → nodes + edges for vis-network
- `calculatePlan(subject, assessment)` → BFS/DFS study plan with categories (repasar/reforzar/avanzar)
- `heatColor(score)` → green(>70) / yellow(40-70) / red(<40)

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

## Files
```
grafo-conocimiento/
├── index.html    # App completa
├── AGENTS.md     # Este archivo
```

## GitHub
- Repo: github.com/sergarb1/grafo-conocimiento
- Pages: https://sergarb1.github.io/grafo-conocimiento
