import json
import os
import sys

os.environ["BUCKET_NAME"] = "documents-bucket"
os.environ["TABLE_NAME"] = "documents-table"
os.environ["AWS_DEFAULT_REGION"] = "us-east-1"

from moto import mock_aws
import boto3

@mock_aws
def run():
    s3 = boto3.client("s3", region_name="us-east-1")
    s3.create_bucket(Bucket="documents-bucket")

    dynamodb = boto3.resource("dynamodb", region_name="us-east-1")
    dynamodb.create_table(
        TableName="documents-table",
        KeySchema=[
            {"AttributeName": "pk", "KeyType": "HASH"},
            {"AttributeName": "sk", "KeyType": "RANGE"},
        ],
        AttributeDefinitions=[
            {"AttributeName": "pk", "AttributeType": "S"},
            {"AttributeName": "sk", "AttributeType": "S"},
        ],
        BillingMode="PAY_PER_REQUEST",
    )

    from lambda_function import handler

    print("=== POST /documents (subir) ===")
    upload_event = {
        "httpMethod": "POST",
        "path": "/documents",
        "body": json.dumps({
            "user_id": "user-001",
            "document_type": "cedula",
            "file_base64": "JVBERi0xLjQgZmFrZSBwZGY=",
        }),
    }
    response = handler(upload_event, None)
    print(f"Status: {response['statusCode']}")
    print(f"Body: {json.dumps(json.loads(response['body']), indent=2)}")

    print()
    print("=== GET /documents/user-001/cedula (consultar) ===")
    get_event = {
        "httpMethod": "GET",
        "path": "/documents/user-001/cedula",
    }
    response = handler(get_event, None)
    print(f"Status: {response['statusCode']}")
    body = json.loads(response["body"])
    if "data" in body and "file_base64" in body["data"]:
        body["data"]["file_base64"] = body["data"]["file_base64"][:30] + "..."
    print(f"Body: {json.dumps(body, indent=2)}")

    print()
    print("=== GET /documents/user-999/cedula (no existe) ===")
    get_event_404 = {
        "httpMethod": "GET",
        "path": "/documents/user-999/cedula",
    }
    response = handler(get_event_404, None)
    print(f"Status: {response['statusCode']}")
    print(f"Body: {json.dumps(json.loads(response['body']), indent=2)}")


if __name__ == "__main__":
    run()
