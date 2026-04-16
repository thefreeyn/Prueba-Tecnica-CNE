# Prueba Tecnica CNE

Repositorio con la solucion a la prueba tecnica, dividida en dos partes independientes.

## Estructura

```
frontend/    -> Next.js 13+ con App Router, autenticacion mock, rutas protegidas y perfil
backend/     -> Lambda Python 3.11 para subida y consulta de documentos (S3 + DynamoDB)
```

## Frontend

- `/login` con formulario validado
- `/dashboard` protegido por middleware
- `/me` con consulta y edicion de perfil
- Mock API local con handlers de Next.js
- Refresh automatico de sesion

Mas detalles en `frontend/README.md`.

## Backend

- `POST /documents` para subir documentos PDF
- `GET /documents/{user_id}/{document_type}` para consultar el ultimo documento
- Arquitectura hexagonal ligera
- Pruebas con pytest y moto

Mas detalles en `backend/lambdas/documents/README.md`.

## Tecnologias

| Parte    | Stack principal                          |
|----------|------------------------------------------|
| Frontend | Next.js, TypeScript, Zod, react-hook-form |
| Backend  | Python 3.11, boto3, pytest, moto          |