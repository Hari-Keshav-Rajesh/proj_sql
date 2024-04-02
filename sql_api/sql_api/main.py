from app import app
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI,Depends,BackgroundTasks
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine,SessionLocal
from sqlalchemy.orm import session
from datetime import datetime,timedelta

from utils.get_db import get_db

from login import *

origins = ["http://localhost:8000","http://localhost:3000"]  

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
db_dependency=Annotated[session,Depends(get_db)]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],  
)


@app.get("/")
def read_root():
    return {"message": "Welcome to the API!"}


models.Base.metadata.create_all(bind=engine)

class userBase(BaseModel):
    id:str
    username:str
    password:str


class BookBase(BaseModel):
    book_id:str
    Name:str
    Author:str
    Genre:str
    stock:int
    rating:int

class wishlistBase(BaseModel):
    Name:str
    Author:str
    Genre:str
    rating:int

class borrowedBase(BaseModel):
    UserId:str
    BookId:str


@app.post("/books/")##change the /books/ for endpoint
async def create_book(book: BookBase,db:db_dependency):
    db_book=models.Book(**book.dict())
    db.add(db_book)
    db.commit()
    return{"Message":"Book Added To Library."}

@app.post("/wishlist/")
async def create_wishlist(wBook: wishlistBase,db:db_dependency):
    db_wBook=models.WishList(**wBook.dict())
    db.add(db_wBook)
    db.commit()
    return{"Message":"Book Added To Wishlist Successfully."}

@app.post("/BorrowedBooks/")
async def create_borrowedBooks(borBook: borrowedBase, db: db_dependency):
    # Check the number of borrowed books for the given user ID
    user_id = borBook.UserId
    num_borrowed_books = db.query(models.Borrowed).filter(models.Borrowed.UserId == user_id).count()

    # Check if the user can borrow more books (limit is 3)
    if num_borrowed_books >= 3:
        return{"message": "User Has Reached the Maximum Limit Of Borrowed Books (3)."}

    # If the user can borrow more books, add the new borrowed book
    db_borBook = models.Borrowed(**borBook.dict())
    db.add(db_borBook)
    db.commit()

    return {"message": "Borrowed Book Added Successfully"}

# @app.post("/login/",status_code=status.HTTP_201_CREATED)
# async def create_user(userNP: userBase,db:db_dependency):
#     db_userNp=models.user(**userNP.dict())
#     if not is_username_unique(db_dependency,userNP.username):
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Username already exists")
#     if not validate_password(userNP.password):
#         raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Password doesn't meet criteria")
#     db.add(db_userNp)
#     return{"message":"User created sucessfully"}

@app.post("/returnBook/")
async def return_book(returned_book: borrowedBase, db: db_dependency):
    # Check if the book is borrowed by the specified user
    borrowed_book = db.query(models.Borrowed).filter(
        models.Borrowed.UserId == returned_book.UserId,
        models.Borrowed.BookId == returned_book.BookId
    ).first()

    if borrowed_book is None:
       return{"Message":"Book Not Found In The Borrowed List For The User"}

    # Remove the book from the borrowed books
    db.delete(borrowed_book)
    db.commit()

    # Add the book back to the books table
    returned_book_info = db.query(models.Book).filter(models.Book.book_id == returned_book.BookId).first()
    if returned_book_info:
        returned_book_info.stock += 1
        db.commit()

    return {"message": "Book returned successfully"}

async def get_books(user_id: int,db:db_dependency):
    show_book=db.query(models.Borrowed).filter(models.Borrowed.User_id==user_id).all()
    return show_book

async def users_books(user_id: int ,db:db_dependency):
    books=get_books(user_id,db)
    return books
async def num_books(user_id: int,db:db_dependency):
    books=get_books(user_id,db)

    count=len(books)
    return {"The number of books borrowed: ":count}

async def check_overdue(db:db_dependency):
    fourteen_days_ago=datetime.utcnow() - timedelta(days=14)
    overdue_books=db.query(models.Borrowed).filters(models.Borrowed.checkout_date<fourteen_days_ago).all()
    minimum_overduefees=10
    for book in overdue_books:
        days=book.checkout_date-fourteen_days_ago
        book.status="Overdue"
        book.overdueFees=days*minimum_overduefees
        
    db.commit()
    
# @asynccontextmanager
# async def lifespan(app: FastAPI):
#     background_task=BackgroundTasks()
#     background_task.add_task(check_overdue)
#     return background_task

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)