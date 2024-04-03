from sqlalchemy import Boolean,Column,Integer,Constraint,CheckConstraint,ForeignKey,String,VARCHAR
from database import Base

class Book(Base):
    __tablename__='books'
    book_id=Column(VARCHAR(15),primary_key=True,index=True)
    Name=Column(VARCHAR(100),unique=True,nullable=False)
    Author=Column(VARCHAR(100),nullable=False)
    Genre=Column(VARCHAR(100),nullable=False)
    Stock=Column(Integer,nullable=False)
    Rating=Column(Integer,CheckConstraint("Rating>0&&Rating<6"),default=0)

class WishList(Base):
    __tablename__='wishlist'
    book_id=Column(VARCHAR(15),primary_key=True,index=True)
    Name=Column(VARCHAR(100),unique=True,nullable=False)
    Author=Column(VARCHAR(100),nullable=False)
    Genre=Column(VARCHAR(100),nullable=False)
    Rating=Column(Integer,CheckConstraint("Rating>0&&Rating<6"),default=0)

class Borrowed(Base):
    __tablename__='Borrowed'
    borrow_id=Column(VARCHAR(15),primary_key=True,index=True)
    User_id=Column(VARCHAR(15),ForeignKey('user.id'))
    book_id=Column(VARCHAR(15),ForeignKey('books.book_id'))


class User(Base):
    __tablename__='user'
    id=Column(VARCHAR(15),primary_key=True,index=True)
    username=Column(VARCHAR(30),unique=True,nullable=False)
    password=Column(VARCHAR(100),nullable=False)

