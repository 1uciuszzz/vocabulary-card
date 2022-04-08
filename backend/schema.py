

from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class CreateWord(BaseModel):
  spell: str
  meaning: Optional[str] = None
  sentence: Optional[str] = None
  add_from: Optional[str] = None


class UpdateWord(BaseModel):
  meaning: Optional[str] = None
  sentence: Optional[str] = None
  add_from: Optional[str] = None


class WordOut(BaseModel):
  id: str
  spell: str
  meaning: Optional[str] = None
  sentence: Optional[str] = None
  add_from: Optional[str] = None
  add_date: datetime
  mastered: bool

  class Config:
    orm_mode = True
