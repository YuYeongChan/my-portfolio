from cup.cup import Cup
from league.league import League
from team.team import Team


class ConsoleScreen:
    def showMainMenu():
        print("1) 리그 전체 조회")
        print("2) 팀 전체 조회")
        print("3) 대회 전체 조회")
        print("4) 리그 조회")
        print("5) 팀 조회")
        print("6) 대회 조회")
        print("7) 리그 검색")
        print("8) 팀 검색")
        print("9) 대회 검색")
        print("10) 리그 등록")
        print("11) 팀 등록")
        print("12) 대회 등록")
        print("13) 리그 정보 수정")
        print("14) 팀 정보 수정")
        print("15) 대회 정보 수정")
        print("16) 리그 삭제")
        print("17) 팀 삭제")
        print("18) 대회 삭제")
        print("19) 종료")
        print("-----")
        userAns = input("번호를 입력하시오 : ")
        return userAns
    
    def printLeague(leagues):
        for l in leagues:
            print(l.name)
            print("지역 : %s" % l.addr)
            print("참가팀 수 : %d" % l.teamnum)
            print("-----")

    def printTeam(teams):
        for t in teams:
            print(t.name)
            print("리그 : %s" % t.l_name)
            print("감독 : %s" % t.hc)
            print("주장 : %s" % t.leader)
            print("국제대회 우승/준우승 : %d/%d" % (t.c_first, t.c_second))
            print("-----")
    
    def printCup(cups):
        for c in cups:
            print(c.name)
            print("%s - %s" % (c.t_name, c.result))
            print("리그 : %s, 승률 : %.2f" % (c.l_name, c.rate))
            print("-----")
    
    def showSelectPageMenu(pageCount):
        return input("페이지(1 ~ %d)" % pageCount)
    
    def showSearchMenu():
        return input("검색어 : ")
    
    def showRegLeagueMenu():
        no = int(input("리그 번호 : "))
        name = input("리그 명 : ")
        addr = input("리그 지역 : ")
        teamnum = int(input("리그 내 팀 수 :"))
        return League(no, name, addr, teamnum)
    
    def showRegTeamMenu():
        name = input("팀 이름 : ")
        hc = input("감독 이름 : ")
        leader = input("주장 이름 : ")
        l_name = input("리그 이름 : ")
        c_first = int(input("국제대회 우승 횟수 : "))
        c_second = int(input("국제대회 준우승 횟수 : "))
        return Team(None, name, hc, leader, l_name, c_first, c_second)
    
    def showRegCupMenu():
        name = input("대회 이름 : ")
        year = int(input("대회 개최 연도 : "))
        l_name = input("팀 소속 리그 : ")
        t_name = input("팀 이름 : ")
        rate = float(input("승률 : "))
        result = input("최종 순위 : ")
        return Cup(None, name, year, l_name, t_name, rate, result)

    def printResult(result):
        print(result)
    
    def showUpdateLeagueMenu():
        print("1) 리그 번호 변경")
        print("2) 리그 이름 변경")
        print("3) 리그 지역 변경")
        print("4) 리그 소속 팀 수 변경")
        return input("번호 : ")
    
    def showUpdateTeamMenu():
        print("1) 팀 이름 변경")
        print("2) 팀 감독 변경")
        print("3) 팀 주장 변경")
        print("4) 팀 소속 리그 변경")
        print("5) 팀 국제대회 우승 횟수 변경")
        print("6) 팀 국제대회 준우승 횟수 변경")
        return input("번호 : ")

    def showUpdateCupMenu():
        print("1) 대회 명 변경")
        print("2) 대회 개최 연도 변경")
        print("3) 소속 리그 변경")
        print("4) 팀 이름 변경")
        print("5) 승률 변경")
        print("6) 최종결과 변경")
        return input("번호 : ")
    
    def showUpdateTo():
        changeName = input("변경 대상 : ")
        new = input("변경 내용 : ")
        return changeName, new