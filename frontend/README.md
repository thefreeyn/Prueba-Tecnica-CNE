# Frontend - Prueba Tecnica CNE

## Objetivo

Aplicacion web con Next.js 13+ (App Router) que implementa autenticacion mock con JWT, rutas protegidas y perfil editable.

## Requisitos previos

- Node.js 18+
- npm

## Instalacion

```bash
cd frontend
npm install
```

## Ejecucion

```bash
npm run dev
```

La aplicacion estara disponible en `http://localhost:3000`.

## Credenciales mock

| Campo    | Valor            |
|----------|------------------|
| Email    | demo@prueba.com  |
| Password | 123456           |

## Rutas

| Ruta        | Descripcion                      | Protegida |
|-------------|----------------------------------|-----------|
| `/login`    | Formulario de inicio de sesion   | No        |
| `/dashboard`| Panel principal                  | Si        |
| `/me`       | Perfil del usuario (ver/editar)  | Si        |

## API handlers (mock local)

| Metodo | Ruta                | Descripcion              |
|--------|---------------------|--------------------------|
| POST   | `/api/users/login`  | Iniciar sesion           |
| POST   | `/api/users/refresh`| Renovar sesion           |
| GET    | `/api/users/me`     | Obtener perfil           |
| PUT    | `/api/users/me`     | Actualizar nombre        |
| POST   | `/api/users/logout` | Cerrar sesion            |

## Decisiones tecnicas

- Organizacion por features (`auth`, `profile`)
- Validaciones con `zod` + `react-hook-form`
- Sesion basada en cookies httpOnly
- Token mock con expiracion de 60 segundos
- Refresh automatico en el cliente HTTP
- Middleware protege rutas privadas y redirige a `/login`
- Sin estado global; cada pagina consulta lo que necesita

## Limitaciones

- La sesion es mock: no hay persistencia real entre reinicios del servidor
- El token es un base64 simple, no un JWT firmado
- Solo se puede editar el nombre del perfil
