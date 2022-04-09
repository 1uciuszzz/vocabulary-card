# Vocabulary Card

## backend

- python 3.8
- fastapi
- postgresql
- sqlalchemy
- psycopg2

## frontend

- react 18
- tailwindcss
- react-toastify
- axios

## about

a local application for learning vocabulary.

## environment you needed

make sure you had installed `python 3.8` and `nodejs`, because we should install dependencies by `pip` and `npm`

```shell
pip install pipenv
git clone https://github.com/1uciuszzz/vocabulary-card.git
cd vocabulary-card/backend
pipenv install
pipenv run server.py
// -----
// db configuration
// open backend/db.py and change USER,PASSWORD,HOST,PORT and DBNAME
// -----
// open another terminal...
cd ../frontend
npm install
npm start
// open browser and link to http://127.0.0.1:1234
```

## usage

double click on vocabulary card exchange to next vocabulary

...
