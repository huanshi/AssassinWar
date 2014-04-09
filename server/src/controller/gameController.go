package controller

import (
    "net/http"
    "fmt"
    "encoding/json"
    "strconv"

    "appengine"

    "game"
)

func Join(resp http.ResponseWriter, req *http.Request) {
    game.CurrentContext = appengine.NewContext(req)
    game.Infof("joinGame url: %v", req.URL)

    userName := req.FormValue("userName")
    gameId := req.FormValue("gameId")
    game.Infof("game username: %s, id: %s", userName, gameId)

    // add to manager
    allPlayers := joinGame(userName, gameId)
    
    // 返回所有游戏里面的成员
    jsonPlayers, _ := json.Marshal(allPlayers)
    fmt.Fprintf(resp, string(jsonPlayers))
    
    //http.Error(resp, "Couldn't create Channel", http.StatusInternalServerError)
}

func joinGame(name string, gameId string) []*game.Player {
    player := game.NewPlayer(name, 0, 0)
    gameManager := game.GetGameManagerInstance()
    iGameId, _ := strconv.Atoi(gameId)
    game.GetPlayerManagerInstance().AddPlayer(player)
    
    gameIn := gameManager.GetGame(iGameId)
    
    if gameIn != nil {
        gameIn.Join(player)
        return gameIn.GetAllPlayer()
    } else {
        game.Infof("joinGame not found game: %d", name, gameManager.GetGameCount())
        // 返回自己
        return []*game.Player{player}
    }
}