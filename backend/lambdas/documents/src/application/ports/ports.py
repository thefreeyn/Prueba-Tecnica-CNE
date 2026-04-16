from abc import ABC, abstractmethod


class StoragePort(ABC):
    @abstractmethod
    def upload(self, key: str, content: bytes) -> str:
        pass

    @abstractmethod
    def download(self, key: str) -> bytes:
        pass


class MetadataPort(ABC):
    @abstractmethod
    def save(self, item: dict) -> None:
        pass

    @abstractmethod
    def get_latest(self, user_id: str, document_type: str) -> dict | None:
        pass
