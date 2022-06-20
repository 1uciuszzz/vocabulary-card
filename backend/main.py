
from typing import List
from uuid import uuid4
from fastapi import Depends, FastAPI, Response, status, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from db import get_db, engine
from model import Word
import model
from schema import CreateWord, UpdateWord, WordOut
from fastapi.openapi.docs import (
    get_redoc_html,
    get_swagger_ui_html,
    get_swagger_ui_oauth2_redirect_html,
)
from fastapi.staticfiles import StaticFiles

app = FastAPI(docs_url=None, redoc_url=None)
app.mount("/static", StaticFiles(directory="static"), name="static")

model.Base.metadata.create_all(bind=engine)

origins = [
  "*"
]

app.add_middleware(CORSMiddleware, allow_origins=origins,
                   allow_credentials=True, allow_methods=["*"], allow_headers=["*"])


def error():
  raise HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                      detail="something wrong")


@app.get('/')
async def index():
  return 'Vocabulary App'

@app.get('/ping')
async def index():
  return 'pong!'

@app.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html():
    return get_swagger_ui_html(
        openapi_url=app.openapi_url,
        title=app.title + " - Swagger UI",
        oauth2_redirect_url=app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="/static/swagger-ui-bundle.js",
        swagger_css_url="/static/swagger-ui.css",
    )


@app.get(app.swagger_ui_oauth2_redirect_url, include_in_schema=False)
async def swagger_ui_redirect():
    return get_swagger_ui_oauth2_redirect_html()


@app.get("/redoc", include_in_schema=False)
async def redoc_html():
    return get_redoc_html(
        openapi_url=app.openapi_url,
        title=app.title + " - ReDoc",
        redoc_js_url="/static/redoc.standalone.js",
    )

@app.post('/word', response_model=WordOut)
async def add_word(word: CreateWord, db: Session = Depends(get_db)):
  new_word = Word(**word.dict())
  word_query = db.query(Word).filter(Word.spell == new_word.spell)
  if word_query.first() or not len(new_word.spell):
    error()
  new_word.id = uuid4()
  db.add(new_word)
  db.commit()
  db.refresh(word_query.first())
  return word_query.first()


@app.delete('/word/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def del_word(id: str, db: Session = Depends(get_db)):
  print(id)
  word_model = db.query(Word).filter(Word.id == id).first()
  if not word_model:
    error()
  db.delete(word_model)
  db.commit()
  return Response(status_code=status.HTTP_204_NO_CONTENT)


@app.put('/word/{id}', response_model=WordOut)
async def mod_word(id: str, word: UpdateWord, db: Session = Depends(get_db)):
  query = db.query(Word).filter(Word.id == id)
  word_in_db = query.first()
  if not word_in_db:
    error()
  changed = False
  if word.meaning:
    word_in_db.meaning = word.meaning
    changed = True
  if word.sentence:
    word_in_db.sentence = word.sentence
    changed = True
  if word.add_from:
    word_in_db.add_from = word.add_from
    changed = True
  if changed:
    db.commit()
  return query.first()


@app.put('/word/master/{id}', response_model=WordOut)
async def master_wod(id: str, db: Session = Depends(get_db)):
  query = db.query(Word).filter(Word.id == id)
  word_in_db = query.first()
  if not word_in_db:
    error()
  word_in_db.mastered = True
  db.commit()
  return query.first()


@app.get('/word', response_model=WordOut)
async def get_word(id: str, db: Session = Depends(get_db)):
  return db.query(Word).filter(Word.id == id).first()


@app.get('/words', response_model=List[WordOut])
async def get_words(db: Session = Depends(get_db)):
  return db.query(Word).all()
