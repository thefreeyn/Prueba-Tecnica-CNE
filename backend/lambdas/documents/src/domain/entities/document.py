from dataclasses import dataclass


@dataclass
class Document:
    user_id: str
    document_type: str
    s3_key: str
    uploaded_at: str
