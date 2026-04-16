import os

BUCKET_NAME = os.environ.get("BUCKET_NAME", "documents-bucket")
TABLE_NAME = os.environ.get("TABLE_NAME", "documents-table")
REGION = os.environ.get("AWS_REGION", "us-east-1")
