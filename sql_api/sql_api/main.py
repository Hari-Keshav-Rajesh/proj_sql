from app import app
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends

from pydantic import BaseModel
from typing import Annotated
import models
from database import engine,SessionLocal
from sqlalchemy.orm import Session
origins = ["http://localhost:8000"]  


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



def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()

models.Base.metadata.create_all(bind=engine)

class userBase(BaseModel):
    id:int
    username:str
    password:str


class BookBase(BaseModel):
    book_id:int
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
    UserId:int
    BookId:int


@app.post("/books/")##change the /books/ for endpoint
async def create_book(book: BookBase,db:Session=Depends(get_db)):
    db_book=models.Book(**book.dict())
    db.add(db_book)
    db.commit()
    return{"Message":"Book Added To Library."}

@app.post("/wishlist/")
async def create_wishlist(wBook: wishlistBase,db:Session=Depends(get_db)):
    db_wBook=models.WishList(**wBook.dict())
    db.add(db_wBook)
    db.commit()
    return{"Message":"Book Added To Wishlist Successfully."}

@app.post("/BorrowedBooks/")
async def create_borrowedBooks(borBook: borrowedBase, db: Session=Depends(get_db)):
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

@app.post("/returnBook/")
async def return_book(returned_book: borrowedBase, db: Session=Depends(get_db)):
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

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)