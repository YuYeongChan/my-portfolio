from math import ceil
from cup.cup import Cup
from yu.yuDBManager import YuDBManager


class CupDAO:
    def __init__(self):
        self.setAllCupCount()
        self.cupPerPage = 5

    def viewAll(self):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "select * from apr09_cup order by c_name, c_rate DESC"
            cur.execute(sql)
            cups = []
            for no, name, year, l_name, t_name, rate, result in cur:
                c = Cup(no, name, year, l_name, t_name, rate, result)
                cups.append(c)
            return cups
        except:
            None
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def getSeacrhCupCount(self, searchTxt):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            searchTxt = "%" + searchTxt + "%"
            sql = "select count(*) from apr09_cup order where c_name like '%s'" % (searchTxt)
            cur.execute(sql)
            for v in cur:
                return ceil(v[0] / self.cupPerPage)
        except:
            return -1
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def setAllCupCount(self):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "select count(*) from apr09_cup"
            cur.execute(sql)
            for v in cur:
                self.allCupCount = v[0]
        except:
            pass
        finally:
            YuDBManager.closeConCur(con, cur)

    def getPageCount(self, searchTxt):
        if searchTxt =="":
            cupCount = self.allCupCount
        else:
            cupCount = self.getSeacrhCupCount(searchTxt)
        return ceil(cupCount / self.cupPerPage)
    
    def get(self, pageNo, searchTxt):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            pageNo = int(pageNo)
            start = (pageNo - 1) * self.cupPerPage + 1
            end = pageNo * self.cupPerPage
            
            sql = "SELECT * "
            sql += "FROM ( "
            sql += "    SELECT rownum AS rn, c_no, c_name, c_year, c_l_name, c_t_name, c_rate, c_result "
            sql += "    FROM ( "
            sql += "        SELECT * "
            sql += "        FROM APR09_CUP "
            sql += "        WHERE c_name LIKE '%s'" % ("%" + searchTxt + "%")
            sql += "        ORDER BY c_name, c_rate DESC "
            sql += "    ) "
            sql += ")"
            sql += "WHERE rn >= %d AND rn <= %d" % (start, end)
            
            cur.execute(sql)
            cups = []
            for _, no, name, year, l_name, t_name, rate, result in cur:
                c = Cup(no, name, year, l_name, t_name, rate, result)
                cups.append(c)
            return cups
        except:
            return None
        finally:
            YuDBManager.closeConCur(con, cur)

    def reg(self, c):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "INSERT INTO apr09_cup values (apr09_seq_cup.nextval, '%s', %d, '%s', '%s', %.2f, '%s')" % (c.name, c.year, c.l_name, c.t_name, c.rate, c.result)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                self.allCupCount += 1
                return "등록성공"
            else:
                return "등록실패1"
        except:
            return "등록실패2"
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def defiUpdateCupNum(self, userUpdateNum):
        if userUpdateNum == "1":
            updateTarget = "c_name"
        elif userUpdateNum == "2":
            updateTarget = "c_year"
        elif userUpdateNum == "3":
            updateTarget = "c_l_name"
        elif userUpdateNum == "4":
            updateTarget = "c_t_name"
        elif userUpdateNum == "5":
            updateTarget = "c_rate"
        elif userUpdateNum == "6":
            updateTarget = "c_result"
        return updateTarget
    
    def update(self, updateTarget, changeName, new):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "Update apr09_cup "
            sql += "SET %s = '%s' " % (updateTarget, new)
            sql += "WHERE c_name like '%%%s%%'" %changeName

            cur.execute(sql)
            if cur.rowcount >= 1:
                con.commit()
                return "수정성공"
            else:
                return "수정실패1"
        except:
            return "수정실패2"
        finally:
            YuDBManager.closeConCur(con, cur)
        