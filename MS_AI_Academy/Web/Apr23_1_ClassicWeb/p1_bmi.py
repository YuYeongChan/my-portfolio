from uuid import uuid4
from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import HTMLResponse

app = FastAPI()
# uvicorn p1_bmi:app --host=0.0.0.0 --port=5678 --reload

@app.post("/bmiresult.te.st")
async def bmiResult(psa:UploadFile, name:str=Form(), hei:str=Form(),
              wei:str=Form()):
    hei = int(hei)
    wei = int(wei)
    bmi = wei / (hei / 100) ** 2
    if bmi >= 39:
        result = "고도비만"
    elif bmi >= 32:
        result = "중도비만"
    elif bmi >= 30:
        result = "경도비만"
    elif bmi >= 24:
        result = "과체중"
    elif bmi >= 10:
        result = "정상"
    else:
        result = "저체중"
    
    folder = "./image/"
    content = await psa.read()
    fileName = psa.filename
    type = fileName[-4:]
    fileName = fileName.replace(type, "")
    fileName = fileName + str(uuid4()) + type
    
    f = open(folder + fileName, "wb")
    f.write(content)
    f.close()

    html = "<html><head><meta charset=\"utf-8\"></head><body>"
    html += "<h1>검사결과</h1>"
    html += "<h1>이름 : %s</h1>" % name
    html += "<h1>키 : %dcm</h1>" % hei
    html += "<h1>이름 : %dkg</h1>" % wei
    html += "<h1>bmi : %.2f</h1>" % bmi
    html += "<h1>결과 : %s</h1>" % result
    html += "<img src=\"file.get?fname=%s\"><br>" % fileName
    html += "</body></html>"
    return HTMLResponse(html)
