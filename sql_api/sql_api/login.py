from app import app
from pydantic import BaseModel
from fastapi import Depends
from utils.get_db import get_db
from utils.uuid import generate_unique_id
from sqlalchemy.orm import Session
import models
import bcrypt
from utils.jwt import create_jwt

class userBase(BaseModel):
    username:str
    password:str

@app.post("/signup")
def user_signup(user:userBase,db:Session=Depends(get_db)):

    #check if username already exists
    user_exists=db.query(models.User).filter(models.User.username==user.username).first()

    #if user exists return False
    if user_exists:
        return {"message":"Username already exists.","status": False}

    #hash the password before storing
    hashed_password=bcrypt.hashpw(user.password.encode('utf-8'),bcrypt.gensalt())
    
    #store new user in database
    new_user=models.User(id=generate_unique_id(),username=user.username,password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message":"User created successfully.","status":True}



@app.post("/login")
def login(user:userBase,db:Session=Depends(get_db)):

    #check if user exists
    user_exists=db.query(models.User).filter(models.User.username==user.username).first()

    #if user doesn't exist return False
    if not user_exists:
        return {"message":"User does not exist.","status":False}
    
    #if password is incorrect return False
    if not bcrypt.checkpw(user.password.encode('utf-8'),user_exists.password.encode('utf-8')):
        return {"message":"Invalid password.","status":False}
    
    #create jwt for user
    token=create_jwt(user_exists.id)

    return {"message":"Login successful.","status":True,"token":token}