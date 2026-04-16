import base64
from datetime import datetime, timezone

from src.application.ports.ports import StoragePort, MetadataPort
from src.domain.entities.document import Document
from src.domain.validators import validate_upload_payload


class UploadDocumentUseCase:
    def __init__(self, storage: StoragePort, metadata: MetadataPort):
        self._storage = storage
        self._metadata = metadata

    def execute(self, body: dict) -> Document:
        validate_upload_payload(body)

        user_id = body["user_id"]
        document_type = body["document_type"]
        file_bytes = base64.b64decode(body["file_base64"])
        uploaded_at = datetime.now(timezone.utc).isoformat()
        s3_key = f"{user_id}/{document_type}/{uploaded_at}.pdf"

        self._storage.upload(s3_key, file_bytes)

        pk = f"{user_id}#{document_type}"
        self._metadata.save({
            "pk": pk,
            "sk": uploaded_at,
            "user_id": user_id,
            "document_type": document_type,
            "s3_key": s3_key,
            "uploaded_at": uploaded_at,
        })

        return Document(
            user_id=user_id,
            document_type=document_type,
            s3_key=s3_key,
            uploaded_at=uploaded_at,
        )
