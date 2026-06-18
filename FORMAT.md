# Formato de datos — Ruta de Estudio

Este documento especifica el formato JSON utilizado por la aplicación.

## Estructura raíz

```json
{
  "subjects": [ ... ],
  "assessments": [ ... ],
  "crossRelations": [ ... ]
}
```

## Subject (asignatura)

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` (UUID) | Sí | Identificador único |
| `name` | `string` | Sí | Nombre de la asignatura |
| `description` | `string` | No | Descripción opcional |
| `concepts` | `Concept[]` | Sí | Lista de conceptos |
| `relations` | `Relation[]` | Sí | Lista de relaciones internas |

```json
{
  "id": "a1b2c3d4-...",
  "name": "Programación en Python",
  "description": "Curso introductorio de Python 3",
  "concepts": [],
  "relations": []
}
```

## Concept

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` (UUID) | Sí | Identificador único |
| `name` | `string` | Sí | Nombre del concepto |
| `description` | `string` | No | Descripción opcional |
| `weight` | `number` (1-10) | Sí | Peso o dificultad del concepto |

```json
{
  "id": "c1",
  "name": "Variables y tipos",
  "description": "int, float, str, bool, asignación",
  "weight": 3
}
```

## Relation

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `from` | `string` | Sí | ID del concepto origen |
| `to` | `string` | Sí | ID del concepto destino |
| `type` | `string` | Sí | Tipo de relación (ver abajo) |

### Tipos de relación

| Tipo | Significado | Visual en grafo |
|------|-------------|-----------------|
| `prerrequisito` | A debe saberse antes que B | Flecha sólida azul |
| `pertenece` | A es subconcepto de B | Flecha discontinua verde |
| `relacionado` | Bidireccional, débil | Línea punteada ámbar |
| `profundiza` | A profundiza B | Flecha gruesa púrpura |

```json
{
  "from": "c1",
  "to": "c2",
  "type": "prerrequisito"
}
```

## CrossRelation

Relación entre conceptos de **diferentes** asignaturas.

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `from` | `string` | Sí | ID del concepto origen |
| `to` | `string` | Sí | ID del concepto destino |
| `type` | `string` | Sí | Mismos tipos que Relation |

```json
{
  "from": "c1",
  "to": "m3",
  "type": "relacionado"
}
```

## Assessment (evaluación)

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` (UUID) | Sí | Identificador único |
| `subjectId` | `string` | Sí | ID de la asignatura evaluada |
| `date` | `string` (ISO 8601) | Sí | Fecha y hora de la evaluación |
| `results` | `object` | Sí | Mapa de `conceptId: score (0-100)` |
| `notes` | `object` | No | Mapa de `conceptId: string` con notas opcionales |

```json
{
  "id": "e1f2g3h4-...",
  "subjectId": "a1b2c3d4-...",
  "date": "2026-06-16T10:30:00.000Z",
  "results": {
    "c1": 80,
    "c2": 45
  },
  "notes": {
    "c2": "Me cuestan los operadores lógicos"
  }
}
```

### Scores

| Rango | Color | Significado |
|-------|-------|-------------|
| 70–100 | Verde (#22c55e) | Dominado |
| 40–69 | Amarillo (#eab308) | En proceso |
| 0–39 | Rojo (#ef4444) | No dominado |

## Ejemplo completo

```json
{
  "subjects": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "Programación en Python",
      "description": "Curso introductorio",
      "concepts": [
        { "id": "c1", "name": "Variables", "description": "int, str", "weight": 3 }
      ],
      "relations": [
        { "from": "c1", "to": "c2", "type": "prerrequisito" }
      ]
    }
  ],
  "assessments": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "subjectId": "550e8400-e29b-41d4-a716-446655440000",
      "date": "2026-06-16T10:00:00.000Z",
      "results": { "c1": 80 },
      "notes": {}
    }
  ],
  "crossRelations": [
    { "from": "c1", "to": "m3", "type": "relacionado" }
  ]
}
```

## Validación

- Todos los `id` deben ser únicos (conceptos, asignaturas, evaluaciones)
- Los `relations.from` y `relations.to` deben referenciar `concepts.id` existentes
- Los `crossRelations.from` y `crossRelations.to` pueden referenciar conceptos de cualquier asignatura
- No se permiten relaciones duplicadas (mismo `from` + `to` + `type`)
- `weight` debe estar entre 1 y 10
- `score` debe estar entre 0 y 100
