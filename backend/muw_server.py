import uvicorn
from multiprocessing import freeze_support


def start_server(host="127.0.0.1", port=5000, loop="asyncio", reload=False):
  uvicorn.run("main:app", host=host, port=port,
              loop=loop, reload=reload)


if __name__ == "__main__":
  freeze_support()
  start_server()
