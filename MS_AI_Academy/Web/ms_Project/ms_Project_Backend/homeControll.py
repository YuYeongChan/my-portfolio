from fastapi import FastAPI, Form, Header, UploadFile
from fastapi.responses import JSONResponse

from idDAO import IdDAO
from deliDAO import StoreDAO


app = FastAPI()
# uvicorn homeControll:app --host=0.0.0.0 --port=9911 --reload

idDAO = IdDAO()
sDAO = StoreDAO()

@app.post("/id.reg")
def idReg(id: str = Form(), password: str = Form(), gender: str = Form(), regnum: str = Form()):
    result = idDAO.reg(id, password, gender, regnum)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.post("/user.login")
def login(id: str = Form(), password: str = Form()):
    result = idDAO.login(id, password)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.post("/pass.upd")
def passUpd(id: str = Form(), oldPass: str = Form(), newPass: str = Form(), newPassConform: str = Form()):
    result = idDAO.passUpd(id, oldPass, newPass, newPassConform)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.post("/store.reg")
async def storeReg(image: UploadFile, cate: str = Form(), storename: str = Form(), averprice: str = Form()):
    result = await sDAO.reg(cate, storename, averprice, image)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.get("/store.del")
def storeDel(storename):
    result = sDAO.delete(storename)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.get("/store.upd")
def storeUpd(target, cate, to):
    result = sDAO.update(target, cate, to)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.get("/store.get")
def storeGet(d_cate):
    result = sDAO.get(d_cate)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.get("/store.image.get")
def storeImageGet(image: str):
    return sDAO.getImage(image)

@app.get("/store.recommand.get")
def recommandGet(money):
    result = sDAO.recommandGet(money)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.get("/auth/verify")
def verify_token(Authorization: str = Header(...)):
    token = Authorization.replace("Bearer ", "")
    result = idDAO.verifyToken(token)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)

@app.post("/id.del")
def idDel(id: str = Form()):
    result = idDAO.idDel(id)
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)


@app.get("/te.st")
def test():
    result = {"A" : "B"}
    h = { "Access-Control-Allow-Origin": "*" }
    return JSONResponse(result, headers=h)