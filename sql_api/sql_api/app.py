from fastapi import FastAPI, Header

app=FastAPI()

def extract_token(authorization: str = Header(None)):
    if authorization and authorization.startswith('Bearer '):
        token = authorization[len('Bearer '):]
        return token
    return None
