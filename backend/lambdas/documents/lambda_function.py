import json
import re

from src.adapters.s3_storage import S3Storage
from src.adapters.dynamodb_metadata_repository import DynamoDBMetadataRepository
from src.adapters.response_builder import success_response, error_response
from src.application.use_cases.upload_document import UploadDocumentUseCase
from src.application.use_cases.get_document import GetDocumentUseCase
from src.domain.exceptions import ValidationError, DocumentNotFoundError, StorageError

GET_PATTERN = re.compile(r"^/documents/([^/]+)/([^/]+)$")


def handler(event, context):
    http_method = event.get("httpMethod", "")
    path = event.get("path", "")

    storage = S3Storage()
    metadata = DynamoDBMetadataRepository()

    if http_method == "POST" and path == "/documents":
        return _handle_upload(event, storage, metadata)

    match = GET_PATTERN.match(path)
    if http_method == "GET" and match:
        user_id = match.group(1)
        document_type = match.group(2)
        return _handle_get(user_id, document_type, storage, metadata)

    return error_response("Ruta no encontrada", 404)


def _handle_upload(event, storage, metadata):
    try:
        body = json.loads(event.get("body", "{}"))
    except (json.JSONDecodeError, TypeError):
        return error_response("Body invalido", 400)

    try:
        use_case = UploadDocumentUseCase(storage, metadata)
        document = use_case.execute(body)
        return success_response({
            "message": "Documento subido exitosamente",
            "s3_key": document.s3_key,
            "uploaded_at": document.uploaded_at,
        }, 201)
    except ValidationError as e:
        return error_response(str(e), 400)
    except StorageError as e:
        return error_response(str(e), 500)
    except Exception:
        return error_response("Error interno del servidor", 500)


def _handle_get(user_id, document_type, storage, metadata):
    try:
        use_case = GetDocumentUseCase(storage, metadata)
        result = use_case.execute(user_id, document_type)
        return success_response(result)
    except ValidationError as e:
        return error_response(str(e), 400)
    except DocumentNotFoundError as e:
        return error_response(str(e), 404)
    except StorageError as e:
        return error_response(str(e), 500)
    except Exception:
        return error_response("Error interno del servidor", 500)
