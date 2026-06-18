# Formato de datos — Ruta de Estudio

Este documento especifica el formato JSON utilizado por la aplicación. Es válido tanto para exportar/importar datos completos como para que LLMs generen contenido importable.

## Estructura raíz

```json
{
  "subjects": [ ... ],
  "assessments": [ ... ],
  "crossRelations": [ ... ],
  "customRelationTypes": [ ... ]
}
```

## Subject (asignatura)

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` | Sí | Identificador único |
| `name` | `string` | Sí | Nombre de la asignatura |
| `description` | `string` | No | Descripción opcional |
| `concepts` | `Concept[]` | Sí | Lista de conceptos |
| `relations` | `Relation[]` | Sí | Lista de relaciones internas |
| `nodePositions` | `object` | No | Mapa `conceptId: { x, y }` para posiciones guardadas |

```json
{
  "id": "ex-py-1",
  "name": "Programación en Python",
  "description": "Curso introductorio de Python 3",
  "concepts": [],
  "relations": [],
  "nodePositions": {}
}
```

## Concept

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` | Sí | Identificador único |
| `name` | `string` | Sí | Nombre del concepto |
| `description` | `string` | No | Descripción opcional (soporta Markdown: **bold**, *italic*, `code`, [links](), listas) |
| `weight` | `number` (1-10) | Sí | Peso o dificultad del concepto |
| `tags` | `string[]` | No | Etiquetas para filtrar y agrupar |
| `resources` | `Resource[]` | No | Recursos asociados (enlaces, vídeos, PDFs) |

```json
{
  "id": "c1",
  "name": "Variables y tipos",
  "description": "**int**, **float**, cadenas, booleanos",
  "weight": 3,
  "tags": ["básico"],
  "resources": [
    { "id": "r1", "type": "link", "title": "W3Schools Python", "url": "https://..." }
  ]
}
```

### Resource

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` | Sí | Identificador único |
| `type` | `string` | Sí | `link`, `video`, `pdf`, `article` |
| `title` | `string` | Sí | Título del recurso |
| `url` | `string` | Sí | URL del recurso |

## Relation

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `from` | `string` | Sí | ID del concepto origen |
| `to` | `string` | Sí | ID del concepto destino |
| `type` | `string` | Sí | Tipo de relación (ver abajo) |

### Tipos de relación nativos

| Tipo | Significado | Visual en grafo |
|------|-------------|-----------------|
| `prerrequisito` | A debe saberse antes que B | Flecha sólida azul |
| `pertenece` | A es subconcepto de B | Flecha discontinua verde |
| `relacionado` | Bidireccional, débil | Línea punteada ámbar |
| `profundiza` | A profundiza B | Flecha gruesa púrpura |

### Tipos personalizados

Se pueden crear tipos adicionales con nombre, color, grosor, línea discontinua y dirección de flecha. Ver `customRelationTypes` más abajo. Cuando se usa un tipo personalizado, el campo `type` de la relación debe coincidir con el `id` del tipo definido en `customRelationTypes`.

```json
{
  "from": "c1",
  "to": "c2",
  "type": "prerrequisito"
}
```

## CrossRelation

Relación entre conceptos de **diferentes** asignaturas. Misma estructura que Relation.

```json
{
  "from": "c1",
  "to": "m3",
  "type": "relacionado"
}
```

## CustomRelationType

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` | Sí | Identificador único (ej: `custom_1712345678_abcd`) |
| `name` | `string` | Sí | Nombre visible del tipo |
| `color` | `string` | Sí | Color hexadecimal (ej: `#06b6d4`) |
| `dash` | `boolean` o `number[]` | Sí | `false` para línea sólida, `true` o `[10, 5]` para discontinua |
| `width` | `number` | Sí | Grosor de línea (1-4) |
| `arrow` | `string` | Sí | Dirección: `to`, `none`, `from`, `both` |

```json
{
  "id": "custom_1712345678_abcd",
  "name": "Complementa",
  "color": "#06b6d4",
  "dash": false,
  "width": 2,
  "arrow": "to"
}
```

## Assessment (evaluación)

| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `id` | `string` | Sí | Identificador único |
| `subjectId` | `string` | Sí | ID de la asignatura evaluada |
| `date` | `string` (ISO 8601) | Sí | Fecha y hora de la evaluación |
| `results` | `object` | Sí | Mapa de `conceptId: score (0-100)` |
| `notes` | `object` | No | Mapa de `conceptId: string` con notas opcionales |

```json
{
  "id": "e1f2g3h4-...",
  "subjectId": "a1b2c3d4-...",
  "date": "2026-06-18T10:30:00.000Z",
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

## Ejemplo completo mínimo

```json
{
  "subjects": [
    {
      "id": "ex-001",
      "name": "Programación en Python",
      "description": "Curso introductorio",
      "concepts": [
        { "id": "c1", "name": "Variables", "description": "int, str", "weight": 3 },
        { "id": "c2", "name": "Condicionales", "description": "if/else", "weight": 4 }
      ],
      "relations": [
        { "from": "c1", "to": "c2", "type": "prerrequisito" }
      ],
      "nodePositions": {}
    }
  ],
  "assessments": [],
  "crossRelations": [],
  "customRelationTypes": []
}
```

## Validación

- Todos los `id` deben ser únicos (conceptos, asignaturas, evaluaciones)
- Los `relations.from` y `relations.to` deben referenciar `concepts.id` existentes
- Los `crossRelations.from` y `crossRelations.to` pueden referenciar conceptos de cualquier asignatura
- No se permiten relaciones duplicadas (mismo `from` + `to` + `type`)
- `weight` debe estar entre 1 y 10
- `score` debe estar entre 0 y 100
- Los tipos personalizados en `customRelationTypes` deben tener `id`, `name`, `color`, `dash`, `width`, `arrow`
- Cuando se use un tipo personalizado en una relación, su `type` debe existir en `customRelationTypes`
