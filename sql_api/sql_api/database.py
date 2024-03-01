import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

load_dotenv()
URL_DATABASE=os.getenv('URL_DATABASE')

URL_DATABASE= URL_DATABASE
# remove my username and password and rename database 
engine=create_engine(URL_DATABASE)

SessionLocal=sessionmaker(autocommit=False,autoflush=False,bind=engine)

Base=declarative_base()
