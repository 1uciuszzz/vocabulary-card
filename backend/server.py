import uvicorn
from multiprocessing import freeze_support


def start_server(host="0.0.0.0", port=5000, loop="asyncio", reload=False):
  uvicorn.run("main:app", host=host, port=port,
              loop=loop, reload=reload)


if __name__ == "__main__":
  freeze_support()
  start_server()
