from cup.cupDAO import CupDAO
from team.teamDAO import TeamDAO
from league.leagueDAO import LeagueDAO
from consoleScreen import ConsoleScreen


if __name__ == "__main__":
    lDAO = LeagueDAO()
    tDAO = TeamDAO()
    cDAO = CupDAO()
    while True:
        userAns = ConsoleScreen.showMainMenu()
        if userAns == "19":
            break
        elif userAns == "1":
            leagues = lDAO.viewAll()
            ConsoleScreen.printLeague(leagues)
        elif userAns == "2":
            teams = tDAO.viewAll()
            ConsoleScreen.printTeam(teams)
        elif userAns == "3":
            cups = cDAO.viewAll()
            ConsoleScreen.printCup(cups)
        elif userAns == "4":
            pageCount = lDAO.getPageCount("")
            pageNo = ConsoleScreen.showSelectPageMenu(pageCount)
            leagues = lDAO.get(pageNo, "")
            ConsoleScreen.printLeague(leagues)
        elif userAns == "5":
            pageCount = tDAO.getPageCount("")
            pageNo = ConsoleScreen.showSelectPageMenu(pageCount)
            teams = tDAO.get(pageNo, "")
            ConsoleScreen.printTeam(teams)
        elif userAns == "6":
            pageCount = cDAO.getPageCount("")
            pageNo = ConsoleScreen.showSelectPageMenu(pageCount)
            cups = cDAO.get(pageNo, "")
            ConsoleScreen.printCup(cups)
        elif userAns == "7":
            searchTxt = ConsoleScreen.showSearchMenu()
            pageCount = lDAO.getSearchLeagueCount(searchTxt)
            if pageCount == 0:
                continue
            pageNo = ConsoleScreen.showSelectPageMenu(pageCount)
            leagues = lDAO.get(pageNo, searchTxt)
            ConsoleScreen.printLeague(leagues)
        elif userAns == "8":
            searchTxt = ConsoleScreen.showSearchMenu()
            pageCount = tDAO.getSearchTeamCount(searchTxt)
            if pageCount == 0:
                continue
            pageNo = ConsoleScreen.showSelectPageMenu(pageCount)
            teams = tDAO.get(pageNo, searchTxt)
            ConsoleScreen.printTeam(teams)
        elif userAns == "9":
            searchTxt = ConsoleScreen.showSearchMenu()
            pageCount = cDAO.getSeacrhCupCount(searchTxt)
            if pageCount == 0:
                continue
            pageNo = ConsoleScreen.showSelectPageMenu(pageCount)
            cups = cDAO.get(pageNo, searchTxt)
            ConsoleScreen.printCup(cups)
        elif userAns == "10":
            l = ConsoleScreen.showRegLeagueMenu()
            result = lDAO.reg(l)
            ConsoleScreen.printResult(result)
        elif userAns == "11":
            t = ConsoleScreen.showRegTeamMenu()
            result = tDAO.reg(t)
            ConsoleScreen.printResult(result)
        elif userAns == "12":
            c = ConsoleScreen.showRegCupMenu()
            result = cDAO.reg(c)
            ConsoleScreen.printResult(result)
        elif userAns == "13":
            userUpdateNum = ConsoleScreen.showUpdateLeagueMenu()
            updateTarget = lDAO.defiUpdateNum(userUpdateNum)
            changeName, new = ConsoleScreen.showUpdateTo()
            result = lDAO.update(updateTarget, changeName, new)
            ConsoleScreen.printResult(result)
        elif userAns == "14":
            userUpdateNum = ConsoleScreen.showUpdateTeamMenu()
            updateTarget = tDAO.defiUpdateTeamNum(userUpdateNum)
            changeName, new = ConsoleScreen.showUpdateTo()
            result = tDAO.update(updateTarget, changeName, new)
            ConsoleScreen.printResult(result)
        elif userAns == "15":
            userUpdateNum = ConsoleScreen.showUpdateCupMenu()
            updateTarget = cDAO.defiUpdateCupNum(userUpdateNum)
            changeName, new = ConsoleScreen.showUpdateTo()
            result = cDAO.update(updateTarget, changeName, new)
            ConsoleScreen.printResult(result)
        elif userAns == "16":
            pass    
        elif userAns == "17":
            pass # 팀 삭제
        elif userAns == "18":
            pass # 대회 삭제