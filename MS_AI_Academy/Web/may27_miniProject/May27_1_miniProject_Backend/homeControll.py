from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import JSONResponse

from comDAO import ComputerDAO


app = FastAPI()
# uvicorn homeControll:app --host=0.0.0.0 --port=9940 --reload
cDAO = ComputerDAO()

@app.post("/com.reg")
async def comReg(image: UploadFile, cate: str = Form(), name: str = Form(), price: str = Form()):
    result = await cDAO.reg(image, cate, name, price)
    h = {
            "Access-Control-Allow-Origin": "http://react주소:포트번호", 
            "Access-Control-Allow-Credentials": "true",
        }
    return JSONResponse(result, headers=h)

@app.get("/com.get")
def comGet():
    result = cDAO.get()
    h = {
            "Access-Control-Allow-Origin": "http://react주소:포트번호", 
            "Access-Control-Allow-Credentials": "true",
        }
    return JSONResponse(result, headers=h)

@app.get("/com.image.get")
def comImageGet(image: str):
    return cDAO.getImage(image)