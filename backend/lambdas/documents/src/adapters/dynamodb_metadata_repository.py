import boto3
from boto3.dynamodb.conditions import Key
from src.application.ports.ports import MetadataPort
from src.config.settings import TABLE_NAME, REGION
from src.domain.exceptions import StorageError


class DynamoDBMetadataRepository(MetadataPort):
    def __init__(self):
        dynamodb = boto3.resource("dynamodb", region_name=REGION)
        self._table = dynamodb.Table(TABLE_NAME)

    def save(self, item: dict) -> None:
        try:
            self._table.put_item(Item=item)
        except Exception as e:
            raise StorageError(f"Error al guardar metadata en DynamoDB: {str(e)}")

    def get_latest(self, user_id: str, document_type: str) -> dict | None:
        try:
            pk = f"{user_id}#{document_type}"
            response = self._table.query(
                KeyConditionExpression=Key("pk").eq(pk),
                ScanIndexForward=False,
                Limit=1,
            )
            items = response.get("Items", [])
            return items[0] if items else None
        except Exception as e:
            raise StorageError(f"Error al consultar metadata en DynamoDB: {str(e)}")
