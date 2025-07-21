from math import ceil
from team.team import Team
from yu.yuDBManager import YuDBManager


class TeamDAO:
    def __init__(self):
        self.setAllTeamCount()
        self.teamPerPage = 5

    def viewAll(self):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "select * from apr09_team order by t_c_first DESC, t_c_second DESC"
            cur.execute(sql)
            teams = []
            for no, name, hc, leader, l_name, c_first, c_second in cur:
                t = Team(no, name, hc, leader, l_name, c_first, c_second)
                teams.append(t)
            return teams
        except:
            None
        finally:
            YuDBManager.closeConCur(con, cur)

    def getPageCount(self, searchTxt):
        if searchTxt == "":
            TeamCount = self.allTeamCount
        else:
            TeamCount = self.getSearchTeamCount(searchTxt)
        return ceil(TeamCount / self.teamPerPage)
    
    def setAllTeamCount(self):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "select count(*) from apr09_team"
            cur.execute(sql)
            for v in cur:
                self.allTeamCount = v[0]
        except:
            pass
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def getSearchTeamCount(self, searchTxt):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            searchTxt = "%" + searchTxt + "%"
            sql = "select count(*) from apr09_team where t_name like '%s'" % searchTxt
            cur.execute(sql)
            for v in cur:
                return ceil(v[0] / self.teamPerPage)
        except:
            pass
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def get(self, pageNo, searchTxt):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            pageNo = int(pageNo)
            start = (pageNo -1) * self.teamPerPage + 1
            end = pageNo * self.teamPerPage

            sql = "SELECT * "
            sql += "FROM ( "
            sql += "    SELECT rownum AS rn, t_no, t_name, t_hc, t_leader, t_l_name, t_c_first, t_c_second "
            sql += "    FROM ( "
            sql += "        SELECT * "
            sql += "        FROM apr09_team "
            sql += "        WHERE t_name LIKE '%s' " % ("%" + searchTxt + "%")
            sql += "        ORDER BY t_c_first DESC, t_c_second DESC "
            sql += "    ) "
            sql += ") "
            sql += "WHERE rn >= %d AND rn <= %d" % (start, end)

            cur.execute(sql)
            teams = []
            for _, no, name, hc, leader, l_name, c_first, c_second in cur:
                t = Team(no, name, hc, leader, l_name, c_first, c_second)
                teams.append(t)
            return teams
        except:
            None
        finally:
            YuDBManager.closeConCur(con, cur)

    def reg(self, t):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            sql = "insert into apr09_team values (apr09_seq_team.nextval, '%s', '%s', '%s', '%s', %d, %d)" % (t.name, t.hc, t.leader, t.l_name, t.c_first, t.c_second)
            cur.execute(sql)
            if cur.rowcount == 1:
                con.commit()
                self.allTeamCount += 1
                return "등록성공"
            else:
                return "등록실패1"
        except:
            return "등록실패2"
        finally:
            YuDBManager.closeConCur(con, cur)
    
    def defiUpdateTeamNum(self, userUpdateNum):
        if userUpdateNum == "1":
            updateTarget = "t_name"
        elif userUpdateNum == "2":
            updateTarget = "t_hc"
        elif userUpdateNum == "3":
            updateTarget = "t_leader"
        elif userUpdateNum == "4":
            updateTarget = "t_l_name"
        elif userUpdateNum == "5":
            updateTarget = "t_c_first"
        elif userUpdateNum == "6":
            updateTarget = "t_c_second"
        return updateTarget
    
    def update(self, updateTarget, changeName, new):
        try:
            con, cur = YuDBManager.makeConCur("db아이디/db비번@IP주소:포트번호/xe")
            
            sql = "UPDATE apr09_team "
            sql += "SET %s = '%s' " % (updateTarget, new)
            sql += "WHERE t_name like '%%%s%%'" % changeName

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