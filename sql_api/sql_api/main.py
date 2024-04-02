from app import app
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends
from pydantic import BaseModel
from typing import Annotated
import models
from database import engine,SessionLocal
from sqlalchemy.orm import session

from utils.get_db import get_db

from utils.jwt import extract_token,get_token_payload

from login import *

origins = ["http://localhost:8000","http://localhost:3000"]  

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
    BookId:str

# Get all books
@app.get("/allBooks")
async def show_books(db:Session=Depends(get_db),):
    books=db.query(models.Book).all()
    return books

# Create a new book
@app.post("/books")
async def create_book(book: BookBase,db:Session=Depends(get_db)):
    db_book=models.Book(**book.dict())
    db.add(db_book)
    db.commit()
    return{"Message":"Book Added To Library."}

@app.post("/wishlist")
async def create_wishlist(wBook: wishlistBase,db:Session=Depends(get_db)):
    db_wBook=models.WishList(**wBook.dict())
    db.add(db_wBook)
    db.commit()
    return{"Message":"Book Added To Wishlist Successfully."}

# Borrow a book
@app.post("/borrowBook")
async def create_borrowedBooks(borBook: borrowedBase, db: Session = Depends(get_db), token: str = Depends(extract_token)):
    # Check the number of borrowed books for the given user ID
    payload = get_token_payload(token)
    print(payload)
    user_id = payload["user_id"]
    num_borrowed_books = db.query(models.Borrowed).filter(models.Borrowed.User_id == user_id).count()

    # Check if the user can borrow more books (limit is 3)
    if num_borrowed_books >= 3:
        return {"message": "User Has Reached the Maximum Limit Of Borrowed Books (3)."}

    # If the user can borrow more books, add the new borrowed book
    db_borBook = models.Borrowed(User_id=user_id, book_id=borBook.BookId)
    db.add(db_borBook)

    # Reduce the stock of the borrowed book
    borrowed_book_info = db.query(models.Book).filter(models.Book.book_id == borBook.BookId).first()
    if borrowed_book_info:
        #reduce stock in books table by 1
        borrowed_book_info.Stock -= 1

    db.commit()

    return {"message": "Borrowed Book Added Successfully"}

# Return a borrowed book
@app.post("/returnBook")
async def return_book(returned_book: borrowedBase, db:Session=Depends(get_db), token: str=Depends(extract_token)):
    # Check if the book is borrowed by the specified user
    payload = get_token_payload(token)
    user_id = payload["user_id"]
    borrowed_book = db.query(models.Borrowed).filter(models.Borrowed.User_id == user_id, models.Borrowed.book_id == returned_book.BookId).first()

    if borrowed_book is None:
       return{"Message":"Book Not Found In The Borrowed List For The User"}

    # Increase stock of book in books table
    borrowed_book_info = db.query(models.Book).filter(models.Book.book_id == returned_book.BookId).first()

    db.commit()

    # Add the book back to the books table
    returned_book_info = db.query(models.Book).filter(models.Book.book_id == returned_book.BookId).first()
    if returned_book_info:
        returned_book_info.Stock += 1

    # Remove the book from the borrowed books
    db.delete(borrowed_book)
        
    db.commit()

    return {"message": "Book returned successfully"}

# Get all borrowed books of user
@app.get("/borrowBook")
async def show_borrowed_books(db:Session=Depends(get_db),token:str=Depends(extract_token)):
    payload=get_token_payload(token)
    user_id=payload["user_id"]

    #return book_id of borrowed books
    borrowed_books_id = db.query(models.Borrowed.book_id).filter(models.Borrowed.User_id == user_id).all()
    
    borrowed_books = []

    #return books from book table
    for book_id in borrowed_books_id:
        borrowed_books.append(db.query(models.Book).filter(models.Book.book_id == book_id[0]).first())
    
    return borrowed_books

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)