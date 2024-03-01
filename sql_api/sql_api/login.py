from app import app
from pydantic import BaseModel
from fastapi import Depends
from utils.get_db import get_db
from utils.uuid import generate_unique_id
from sqlalchemy.orm import Session
import models

class userBase(BaseModel):
    username:str
    password:str

@app.post("/signup")
def user_signup(user:userBase,db:Session=Depends(get_db)):

    #check if username already exists
    user_exists=db.query(models.User).filter(models.User.username==user.username).first()
    if user_exists:
        return {"message":"Username already exists","status": False}
    
    #create new user
    new_user=models.User(id=generate_unique_id(),username=user.username,password=user.password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message":"User created successfully","status":True}
