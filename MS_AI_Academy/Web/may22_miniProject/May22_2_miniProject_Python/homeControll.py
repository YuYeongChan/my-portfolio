from fastapi import FastAPI
from fastapi.responses import JSONResponse
from snackDAO import SnackDAO


app = FastAPI()
# uvicorn homeControll:app --host=0.0.0.0 --port=9911 --reload
sDAO = SnackDAO()


@app.get("/snack.reg")
def snackreg(name, price):
    result = sDAO.reg(name, price)
    h = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(result, headers=h)


@app.get("/snack.get")
def snackget():
    result = sDAO.get()
    h = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(result, headers=h)


@app.get("/snack.update")
def snackupdate(target, what, to):
    result = sDAO.update(target, what, to)
    h = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(result, headers=h)


@app.get("/snack.del")
def snackdelete(name):
    result = sDAO.delete(name)
    h = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(result, headers=h)
