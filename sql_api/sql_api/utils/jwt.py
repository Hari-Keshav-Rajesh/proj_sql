import os
import dotenv
import jwt
from fastapi import Header, HTTPException, Depends

dotenv.load_dotenv()
secret_key = os.getenv("secret_key")

def create_jwt(user_id: str):
    encoded_jwt = jwt.encode({"user_id": user_id},secret_key, algorithm="HS256")
    return encoded_jwt

def decode_jwt(token):
    decoded_jwt = jwt.decode(token, secret_key, algorithms=["HS256"])
    return decoded_jwt

def extract_token(authorization: str = Header(None)):
    if authorization and authorization.startswith('Bearer '):
        token = authorization[len('Bearer '):]
        return token
    return None

def get_token_payload(token: str = Depends(extract_token)):
    try:
        payload = jwt.decode(token, secret_key, algorithms=["HS256"])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Invalid token")




