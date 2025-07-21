from datetime import datetime

from fastapi.responses import FileResponse

from yu.yuDBManager import YuDBManager


class ComputerDAO:
    def __init__(self):
        self.imageFolder = "./image/"
    
    async def reg(self, image, cate, name, price):
        try:
            now = datetime.today()
            now = datetime.strftime(now, "%Y%m%d%H%M%S")
            content = await image.read()
            fileName = image.filename
            type = fileName[-4:]
            fileName = fileName.replace(type, "")
            fileName += "_" + now + type

            f = open(self.imageFolder + fileName, "wb")
            f.write(content)
            f.close()
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버주소:포트번호/xe")
            sql = "INSERT INTO may27_comp values (may27_comp_seq.nextval, '%s', '%s', %s, '%s')" % (cate, name, price, fileName)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return {"result": name + " 등록 성공"}
            return {"result": name + " 등록 실패1"}
        except Exception as e:
            print(e)
            return {"result": name + " 등록 실패2"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def get(self):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버주소:포트번호/xe")
            sql = "SELECT * FROM may27_comp ORDER BY c_cate, c_name"
            cur.execute(sql)
            coms = []
            for no, cate, name, price, image in cur:
                # image = self.imageFolder + image
                s = {"no": no, "cate": cate, "name": name, "price": price, "image": f"http://195.168.9.40:9940/com.image.get?image={image}"}
                coms.append(s)
            return coms
        except Exception as e:
            print(e)
            return {"result": "조회실패"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def getImage(self, image):
        return FileResponse(self.imageFolder + image, filename=image)