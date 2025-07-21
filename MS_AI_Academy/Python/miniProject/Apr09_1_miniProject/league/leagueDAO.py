from math import ceil
from league.league import League
from yu.yuDBManager import YuDBManager


class LeagueDAO:
    def __init__(self):
        self.setAllLeagueCount()
        self.leaguePerPage = 6

    def viewAll(self):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "select * from apr09_league order by l_no"
            cur.execute(sql)
            leagues = []
            for no, name, addr, teamnum in cur:
                l = League(no, name, addr, teamnum)
                leagues.append(l)
            return leagues
        except:
            None
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def setAllLeagueCount(self):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "select count(*) from apr09_league"
            cur.execute(sql)
            for v in cur:
                self.allLeagueCount = v[0]
        except:
            pass
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def getPageCount(self, searchTxt):
        if searchTxt == "":
            leagueCount = self.allLeagueCount
        else:
            leagueCount = self.getSearchLeagueCount(searchTxt)
        return ceil(leagueCount / self.leaguePerPage)
        
    def getSearchLeagueCount(self, searchTxt):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            searchTxt = "%" + searchTxt + "%"
            sql = "select count(*) from apr09_league where l_name like '%s'" % searchTxt
            cur.execute(sql)
            for v in cur:
                return ceil(v[0] / self.leaguePerPage)
        except:
            return -1
        finally:
            YuDBManager.closeConCur(con, cur)

    def get(self, pageNo, searchTxt):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            pageNo = int(pageNo)
            start = (pageNo - 1) * self.leaguePerPage + 1
            end = pageNo * self.leaguePerPage
            sql = "SELECT * "
            sql += "FROM ( "
            sql += "    SELECT rownum AS rn, l_no, l_name, l_addr, l_teamnum "
            sql += "    FROM ( "
            sql += "        SELECT * "
            sql += "        FROM apr09_league "
            sql += "        WHERE l_name LIKE '%s' " % ("%" + searchTxt + "%")
            sql += "        ORDER BY l_no "
            sql += "    ) "
            sql += ") "
            sql += "WHERE rn >= %d AND rn <= %d" % (start, end)

            cur.execute(sql)
            leagues = []
            for _, no, name, addr, teamnum in cur:
                l = League(no ,name, addr, teamnum)
                leagues.append(l)
            return leagues
        except:
            None
        finally:
            YuDBManager.closeConCur(con, cur)
    def reg(self, l):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "insert into apr09_league values(%d, '%s', '%s', %d)" % (l.no, l.name, l.addr, l.teamnum)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                self.allLeagueCount += 1
                return "등록성공"
            else:
                return "등록실패1"
        except:
            return "등록실패2"
        finally:
            YuDBManager.closeConCur(con, cur)

    def defiUpdateNum(self, userUpdateNum):
        if userUpdateNum == "1":
            updateTarget = "l_no"
        elif userUpdateNum == "2":
            updateTarget = "l_name"
        elif userUpdateNum == "3":
            updateTarget = "l_addr"
        elif userUpdateNum == "4":
            updateTarget = "l_teamnum"
        return updateTarget
    
    def update(self, updateTarget, changeName, new):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            
            sql = "UPDATE apr09_league "
            sql += "SET %s = '%s' " % (updateTarget, new)
            sql += "WHERE l_name like '%%%s%%'" % changeName

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