
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


USER = f"unknown_words"
PASSWORD = f"#n3~OH8&|dGNo:t"
HOST = f"localhost"
PORT = f"5432"
DBNAME = f"unknown_words"


engine = create_engine(
  url=f"postgresql+psycopg2://{USER}:{PASSWORD}@{HOST}:{PORT}/{DBNAME}"
)

Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)

localSession = Session()


def get_db():
  db = localSession
  try:
    yield db
  finally:
    db.close()
