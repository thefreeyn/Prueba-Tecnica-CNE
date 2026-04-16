# Backend - Lambda de Documentos

## Objetivo

Lambda en Python 3.11 que permite subir y consultar documentos PDF usando S3 para almacenamiento y DynamoDB para metadata.

## Requisitos previos

- Python 3.11+
- pip

## Instalacion

```bash
cd backend/lambdas/documents
pip install -r requirements.txt
```

Para desarrollo y pruebas:

```bash
pip install -r requirements-dev.txt
```

## Variables de entorno

| Variable      | Descripcion              | Default            |
|---------------|--------------------------|--------------------|
| BUCKET_NAME   | Nombre del bucket S3     | documents-bucket   |
| TABLE_NAME    | Nombre de la tabla DynamoDB | documents-table |
| AWS_REGION    | Region de AWS            | us-east-1          |

## Endpoints

### POST /documents

Sube un documento PDF.

**Body (JSON):**
```json
{
  "user_id": "user-123",
  "document_type": "cedula",
  "file_base64": "<contenido en base64>"
}

```

**Tipos de documento permitidos:** cedula, rut, pasaporte, licencia, otro

**Respuestas:**
- `201`: documento subido exitosamente
- `400`: payload invalido
- `500`: error de infraestructura

### GET /documents/{user_id}/{document_type}

Retorna el ultimo documento subido para un usuario y tipo.

**Respuestas:**
- `200`: documento encontrado (incluye file_base64)
- `404`: documento no encontrado
- `500`: error de infraestructura

## Pruebas

```bash
cd backend/lambdas/documents
python -m pytest tests/ -v
```

## Arquitectura

Hexagonal ligera:

- `src/domain/` - Entidades, validaciones y excepciones (sin dependencia de boto3)
- `src/application/ports/` - Interfaces de almacenamiento y metadata
- `src/application/use_cases/` - Logica de negocio (upload y get)
- `src/adapters/` - Implementaciones con S3, DynamoDB y builder de respuestas
- `lambda_function.py` - Entry point que enruta y coordina

## Modelado DynamoDB

| Atributo      | Descripcion                          |
|---------------|--------------------------------------|
| pk            | `{user_id}#{document_type}` (HASH)   |
| sk            | `uploaded_at` (RANGE)                |
| user_id       | ID del usuario                       |
| document_type | Tipo del documento                   |
| s3_key        | Ruta del archivo en S3               |
| uploaded_at   | Fecha de subida (ISO 8601)           |

La consulta del ultimo documento usa `ScanIndexForward=False` con `Limit=1`.

## Limitaciones

- No hay autenticacion en los endpoints de la lambda
- Los archivos se almacenan sin validar que sean PDF reales
- No hay paginacion en la consulta
