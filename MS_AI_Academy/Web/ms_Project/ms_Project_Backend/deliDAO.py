from datetime import datetime

from fastapi.responses import FileResponse
from yu.yuDBManager import YuDBManager


class StoreDAO:
    def __init__(self):
        self.imageFolder = "./image/"

    async def reg(self, cate, storename, averprice, image):
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
        
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "INSERT INTO ms_Deli values (ms_Deli_seq.nextval, '%s', '%s', %s, '%s')" % (cate, storename, averprice, fileName)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return {"result": storename + " 등록 성공"}
            return {"result": storename + " 등록 실패1"}
        except Exception as e:
            print(e)
            return {"result": storename + " 등록 실패2"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def update(self, target, cate, to):
        try:
            if cate == "d_averprice":
                sql = "UPDATE ms_deli SET %s = %s WHERE d_storename = '%s'" % (cate, to, target)
            else:
                sql = "UPDATE ms_deli set %s = '%s' WHERE d_storename = '%s'" % (cate, to, target)
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            cur.execute(sql)
            if cur.rowcount >= 1:
                con.commit()
                return {"result": target + " 수정 성공"}
            return {"result": target + " 수정 실패1"}
        except Exception as e:
            print(e)
            return {"result": target + " 수정 실패2"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def delete(self, storename):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "SELECT * from( "
            sql += "SELECT * FROM MS_DELI"
            cur.execute(sql)
            if cur.rowcount >= 1:
                con.commit()
                return {"result": storename + " 삭제 성공"}
            return {"result": storename + " 삭제 실패1"}
        except Exception as e:
            print(e)
            return {"result": storename + " 삭제 실패"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def get(self, d_cate):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "SELECT * FROM ms_deli where d_cate = '%s' ORDER BY d_storename" % d_cate
            cur.execute(sql)
            stores = []
            for no, cate, storename, averprice, image in cur:
                s = {"no": no, "cate": cate, "storename": storename, "averprice": averprice, "image": f"http://195.168.9.40:9911/store.image.get?image={image}"}
                stores.append(s)
            return stores
        except Exception as e:
            print(e)
            return {"result": "조회실패"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def getImage(self, image):
        return FileResponse(self.imageFolder + image, filename=image)
    
    def recommandGet(self, money):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "SELECT * FROM ( "
            sql += "    select * from ms_deli "
            sql += "    order by DBMS_RANDOM.RANDOM "
            sql += ") where d_averprice < %s and rownum < 10" % money
            cur.execute(sql)
            stores = []
            for no, cate, storename, averprice, image in cur:
                s = {"no": no, "cate": cate, "storename": storename, "averprice": averprice, "image": f"http://195.168.9.40:9911/store.image.get?image={image}"}
                stores.append(s)
            return stores
        except Exception as e:
            print(e)
            return {"result": "조회실패"}
        finally:
            YuDBManager.closeConCur(con, cur)