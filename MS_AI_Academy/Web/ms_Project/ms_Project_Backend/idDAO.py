from datetime import datetime, timedelta, timezone
import jwt
from yu.yuDBManager import YuDBManager

SECRET_KEY = "your_secret_key"

class IdDAO:
    def reg(self, id, password, gender, regnum):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "INSERT INTO ms_user values (ms_user_seq.nextval, '%s', '%s', '%s', %s)" % (id, password, gender, regnum)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                return {"result": id + " 등록 성공"}
            return {"result": id + " 등록 실패1"}
        except Exception as e:
            print(e)
            return {"result": id + " 등록 실패2"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def login(self, id, password):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "SELECT count(*) FROM ms_user where u_id = '%s' and u_pass = '%s'" % (id, password)
            cur.execute(sql)
            for u in cur:
                if u[0] == 1:
                    payload = {
                        "user_id": id,
                        "exp": datetime.now(timezone.utc) + timedelta(minutes=30)
                    }
                    token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
                    return {"result": "success", "token": token}
            return {"result": "fail"}
        except Exception as e:
            print(e)
            return {"result": "error"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def passUpd(self, id, oldPass, newPass, newPassConform):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "SELECT u_pass FROM ms_user where u_id = '%s'" % (id)
            cur.execute(sql)
            row = cur.fetchone()

            if not row:
                return {"result": "아이디 없음"}
            
            current_pass = row[0]

            if current_pass != oldPass:
                return {"result": "현재 비밀번호가 일치하지 않음"}
            if newPass != newPassConform:
                return {"result": "새 비밀번호가 일치하지 않음"}
            
            update_sql = "UPDATE ms_user set u_pass = '%s' where u_id = '%s'" % (newPass, id)
            cur.execute(update_sql)
            if cur.rowcount >= 1:
                con.commit()
                return {"result": "비밀번호 변경 성공"}
        except Exception as e:
            print(e)
            return {"result": "비밀번호 변경 실패"}
        finally:
            YuDBManager.closeConCur(con, cur)

    def verifyToken(self, token):
        try:
            decoded = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            user_id = decoded.get("user_id")
            if user_id:
                # 새 토큰 발급
                new_payload = {
                    "user_id": user_id,
                    "exp": datetime.now(timezone.utc) + timedelta(minutes=30)
                }
                new_token = jwt.encode(new_payload, SECRET_KEY, algorithm="HS256")
                return {"valid": True, "userId": user_id, "newToken": new_token}
            else:
                return {"valid": False, "error": "user_id 없음"}
        except jwt.ExpiredSignatureError:
            return {"valid": False, "error": "만료된 토큰"}
        except jwt.InvalidTokenError:
            return {"valid": False, "error": "유효하지 않은 토큰"}
        
    def idDel(self, id):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@서버IP주소:포트번호/xe")
            sql = "DELETE FROM ms_user WHERE u_id = '%s'" % id
            cur.execute(sql)
            if cur.rowcount >= 1:
                con.commit()
                return {"result": "회원탈퇴 완료"}
            return {"result": "회원탈퇴 실패1"}
        except Exception as e:
            print(e)
            return {"result": "회원탈퇴 실패2"}
        finally:
            YuDBManager.closeConCur(con, cur)
