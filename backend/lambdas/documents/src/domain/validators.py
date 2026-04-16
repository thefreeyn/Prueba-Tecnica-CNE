import base64
from src.domain.exceptions import ValidationError

ALLOWED_DOCUMENT_TYPES = ["cedula", "rut", "pasaporte", "licencia", "otro"]


def validate_upload_payload(body: dict) -> None:
    if not body.get("user_id") or not isinstance(body["user_id"], str):
        raise ValidationError("user_id es requerido y debe ser string")

    if not body.get("document_type") or not isinstance(body["document_type"], str):
        raise ValidationError("document_type es requerido y debe ser string")

    if body["document_type"] not in ALLOWED_DOCUMENT_TYPES:
        raise ValidationError(f"document_type debe ser uno de: {', '.join(ALLOWED_DOCUMENT_TYPES)}")

    if not body.get("file_base64") or not isinstance(body["file_base64"], str):
        raise ValidationError("file_base64 es requerido y debe ser string")

    try:
        base64.b64decode(body["file_base64"], validate=True)
    except Exception:
        raise ValidationError("file_base64 no es base64 valido")


def validate_get_params(user_id: str, document_type: str) -> None:
    if not user_id or not isinstance(user_id, str):
        raise ValidationError("user_id es requerido")

    if not document_type or not isinstance(document_type, str):
        raise ValidationError("document_type es requerido")
