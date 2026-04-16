import json
import base64

from lambda_function import handler


def _make_upload_event(body: dict) -> dict:
    return {
        "httpMethod": "POST",
        "path": "/documents",
        "body": json.dumps(body),
    }


def _make_get_event(user_id: str, document_type: str) -> dict:
    return {
        "httpMethod": "GET",
        "path": f"/documents/{user_id}/{document_type}",
    }


def _valid_payload() -> dict:
    content = base64.b64encode(b"%PDF-1.4 fake content").decode("utf-8")
    return {
        "user_id": "user-123",
        "document_type": "cedula",
        "file_base64": content,
    }


class TestUploadDocument:
    def test_upload_valido(self, aws_setup):
        event = _make_upload_event(_valid_payload())
        response = handler(event, None)

        assert response["statusCode"] == 201
        body = json.loads(response["body"])
        assert body["message"] == "Documento subido exitosamente"
        assert "s3_key" in body
        assert "uploaded_at" in body

    def test_upload_sin_user_id(self, aws_setup):
        payload = _valid_payload()
        del payload["user_id"]
        event = _make_upload_event(payload)
        response = handler(event, None)

        assert response["statusCode"] == 400
        body = json.loads(response["body"])
        assert "user_id" in body["message"]

    def test_upload_sin_document_type(self, aws_setup):
        payload = _valid_payload()
        del payload["document_type"]
        event = _make_upload_event(payload)
        response = handler(event, None)

        assert response["statusCode"] == 400
        body = json.loads(response["body"])
        assert "document_type" in body["message"]

    def test_upload_sin_file_base64(self, aws_setup):
        payload = _valid_payload()
        del payload["file_base64"]
        event = _make_upload_event(payload)
        response = handler(event, None)

        assert response["statusCode"] == 400
        body = json.loads(response["body"])
        assert "file_base64" in body["message"]

    def test_upload_base64_invalido(self, aws_setup):
        payload = _valid_payload()
        payload["file_base64"] = "not-valid-base64!!!"
        event = _make_upload_event(payload)
        response = handler(event, None)

        assert response["statusCode"] == 400
        body = json.loads(response["body"])
        assert "base64" in body["message"]

    def test_upload_document_type_invalido(self, aws_setup):
        payload = _valid_payload()
        payload["document_type"] = "tipo_inexistente"
        event = _make_upload_event(payload)
        response = handler(event, None)

        assert response["statusCode"] == 400

    def test_upload_body_invalido(self, aws_setup):
        event = {
            "httpMethod": "POST",
            "path": "/documents",
            "body": "no es json",
        }
        response = handler(event, None)

        assert response["statusCode"] == 400
        body = json.loads(response["body"])
        assert "invalido" in body["message"].lower()


class TestGetDocument:
    def test_get_documento_existente(self, aws_setup):
        upload_event = _make_upload_event(_valid_payload())
        handler(upload_event, None)

        get_event = _make_get_event("user-123", "cedula")
        response = handler(get_event, None)

        assert response["statusCode"] == 200
        body = json.loads(response["body"])
        assert body["user_id"] == "user-123"
        assert body["document_type"] == "cedula"
        assert "file_base64" in body
        assert "s3_key" in body
        assert "uploaded_at" in body

    def test_get_documento_inexistente(self, aws_setup):
        get_event = _make_get_event("user-999", "cedula")
        response = handler(get_event, None)

        assert response["statusCode"] == 404
        body = json.loads(response["body"])
        assert "no se encontro" in body["message"].lower()

    def test_ruta_no_encontrada(self, aws_setup):
        event = {
            "httpMethod": "DELETE",
            "path": "/documents",
        }
        response = handler(event, None)

        assert response["statusCode"] == 404
