import boto3
from src.application.ports.ports import StoragePort
from src.config.settings import BUCKET_NAME, REGION
from src.domain.exceptions import StorageError


class S3Storage(StoragePort):
    def __init__(self):
        self._client = boto3.client("s3", region_name=REGION)

    def upload(self, key: str, content: bytes) -> str:
        try:
            self._client.put_object(Bucket=BUCKET_NAME, Key=key, Body=content)
            return key
        except Exception as e:
            raise StorageError(f"Error al subir archivo a S3: {str(e)}")

    def download(self, key: str) -> bytes:
        try:
            response = self._client.get_object(Bucket=BUCKET_NAME, Key=key)
            return response["Body"].read()
        except self._client.exceptions.NoSuchKey:
            raise StorageError(f"Archivo no encontrado en S3: {key}")
        except Exception as e:
            raise StorageError(f"Error al leer archivo de S3: {str(e)}")
