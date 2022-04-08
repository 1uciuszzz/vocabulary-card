

from datetime import datetime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Boolean, DateTime

Base = declarative_base()


class Word(Base):
  __tablename__ = "word"
  id = Column(String(), primary_key=True, nullable=False)
  spell = Column(String(), unique=True, nullable=False)
  meaning = Column(String(), nullable=True)
  sentence = Column(String(), nullable=True)
  add_from = Column(String(), nullable=True)
  add_date = Column(DateTime(), default=datetime.now)
  mastered = Column(Boolean, default=False)
