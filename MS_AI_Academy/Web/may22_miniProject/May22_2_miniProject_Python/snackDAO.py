from yu.yuDBManager import YuDBManager


class SnackDAO:
    def reg(self, name, price):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "INSERT INTO may22_snack values (may22_snack_seq.nextval, '%s', %s)" % (name, price)
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
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "SELECT * FROM may22_snack ORDER BY s_no"
            cur.execute(sql)
            snacks = []
            for no, name, price in cur:
                s = {"no": no, "name": name, "price": price}
                snacks.append(s)
            return snacks
        except Exception as e:
            print(e)
            return {"result": "조회실패"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def update(self, target, what, to):
        try:
            if what == "이름":
                sql = "UPDATE may22_snack SET s_name = '%s' WHERE s_name = '%s'" % (to, target)
            elif what == "가격":
                sql = "UPDATE may22_snack SET s_price = %s WHERE s_name = '%s'" % (to, target)
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

    def delete(self, name):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "DELETE FROM may22_snack WHERE s_name = '%s'" % name
            cur.execute(sql)
            if cur.rowcount >= 1:
                con.commit()
                return {"result": name + " 삭제 성공"}
            return {"result": name + " 삭제 실패1"}
        except Exception as e:
            print(e)
            return {"result": name + " 삭제 실패"}
        finally:
            YuDBManager.closeConCur(con, cur)