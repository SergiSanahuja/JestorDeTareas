# Task Manager API

Pequeña API REST para gestionar tareas, construida con Node.js y Express. Proyecto de práctica orientado a fundamentos de JavaScript (arrays, `sort`/`filter`/`reduce`) y diseño de endpoints REST.

## 🚀 Tecnologías

- Node.js
- Express

## 📦 Instalación

```bash
git clone <url-del-repo>
cd task-manager-api
npm install
```

## ▶️ Uso

```bash
node server.js
```

El servidor arranca en `http://localhost:3000`.

## 📋 Modelo de datos

Cada tarea tiene esta forma:

```json
{
  "id": 1,
  "titulo": "Revisar informe",
  "prioridad": "alta",
  "fecha_limite": "2026-07-30",
  "completada": false
}
```

`prioridad` acepta los valores: `alta`, `media`, `baja`.

## 🔗 Endpoints

### `GET /tareas`

Devuelve la lista de tareas. Acepta filtros opcionales por query params, combinables entre sí.

| Query param | Valores | Ejemplo |
|---|---|---|
| `prioridad` | `alta`, `media`, `baja` | `/tareas?prioridad=alta` |
| `completada` | `true`, `false` | `/tareas?completada=false` |

Ejemplo combinado:
```
GET /tareas?prioridad=alta&completada=false
```

### `POST /tareas`

Crea una nueva tarea. Requiere `titulo`, `prioridad` y `fecha_limite` en el body.

**Request:**
```json
{
  "titulo": "Nueva tarea",
  "prioridad": "media",
  "fecha_limite": "2026-08-01"
}
```

**Response** `201 Created`:
```json
{
  "id": 6,
  "titulo": "Nueva tarea",
  "prioridad": "media",
  "fecha_limite": "2026-08-01",
  "completada": false
}
```

**Response** `400 Bad Request` si falta algún campo obligatorio.

### `PUT /tareas/:id/completar`

Marca una tarea como completada.

```
PUT /tareas/2/completar
```

**Response** `200 OK` con la tarea actualizada, o `404 Not Found` si el `id` no existe.

## 🧪 Probar la API

### Con PowerShell

```powershell
# GET
irm -Uri "http://localhost:3000/tareas" -Method GET

# GET con filtro
irm -Uri "http://localhost:3000/tareas?prioridad=alta" -Method GET

# POST
irm -Uri "http://localhost:3000/tareas" -Method POST -ContentType "application/json" -Body '{"titulo":"Nueva tarea","prioridad":"media","fecha_limite":"2026-08-01"}'

# PUT
irm -Uri "http://localhost:3000/tareas/2/completar" -Method PUT
```

### Con Postman

Importa las rutas anteriores como peticiones `GET`, `POST` y `PUT` a `http://localhost:3000`.

## 🧠 Lógica interna (`logica.js`)

Funciones auxiliares usadas para procesar tareas:

- `orderByPriority(tareas)` — ordena por prioridad (alta > media > baja).
- `filterByComplited(tareas)` — filtra tareas no completadas y vencidas.
- `countByPriority(tareas)` — cuenta tareas por nivel de prioridad.
- `getSummary(tareas)` — devuelve un resumen: `{ total, vencidas, por_prioridad }`.

## 📁 Estructura del proyecto

```
task-manager-api/
├── tareas.js       # datos de ejemplo
├── logica.js       # funciones de lógica (sort/filter/reduce)
├── server.js        # servidor Express con los endpoints
├── package.json
└── README.md
```

## 📌 Posibles mejoras futuras

- Persistencia en base de datos (SQLite/PostgreSQL) en vez de array en memoria.
- Validación de tipos con una librería como `zod` o `joi`.
- Tests automatizados con `jest` o `vitest`.
- Autenticación de usuarios.
