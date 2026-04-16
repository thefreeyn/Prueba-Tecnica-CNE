import base64

from src.application.ports.ports import StoragePort, MetadataPort
from src.domain.exceptions import DocumentNotFoundError
from src.domain.validators import validate_get_params


class GetDocumentUseCase:
    def __init__(self, storage: StoragePort, metadata: MetadataPort):
        self._storage = storage
        self._metadata = metadata

    def execute(self, user_id: str, document_type: str) -> dict:
        validate_get_params(user_id, document_type)

        record = self._metadata.get_latest(user_id, document_type)
        if not record:
            raise DocumentNotFoundError(
                f"No se encontro documento para user_id={user_id}, document_type={document_type}"
            )

        file_bytes = self._storage.download(record["s3_key"])
        file_base64 = base64.b64encode(file_bytes).decode("utf-8")

        return {
            "user_id": record["user_id"],
            "document_type": record["document_type"],
            "s3_key": record["s3_key"],
            "uploaded_at": record["uploaded_at"],
            "file_base64": file_base64,
        }
