package controller

import (
    "net/http"
    "fmt"
    "strconv"
    "encoding/json"
    
    "appengine"
    
    "game"
)

func GetPlayer(resp http.ResponseWriter, req *http.Request) {
    fmt.Fprintf(resp, getAllPlayer())
}

func Talk2Others(resp http.ResponseWriter, req *http.Request) {
    game.CurrentContext = appengine.NewContext(req)
    userName := req.FormValue("userName")
    msg := req.FormValue("message")
    
    player := game.GetPlayerManagerInstance().GetPlayer(userName)
    if player != nil {
        player.Talk2OthersInGame(msg)
    }
}

func GetNewMsg(resp http.ResponseWriter, req *http.Request) {
    game.CurrentContext = appengine.NewContext(req)
    userName := req.FormValue("userName")
    gameId := req.FormValue("gameId")
    
    iGameId, _ := strconv.Atoi(gameId)
    gameIn := game.GetGameManagerInstance().GetGame(iGameId)
    player := gameIn.GetPlayer(userName)
    player.Live()
    if player != nil {
        player.SendNewMsg2Client(resp, appengine.NewContext(req))
    } else {
        game.Infof("%s not found", userName)
        fmt.Fprintf(resp, "noMsg") 
    }
}

func getAllPlayer() string {
    return getJsonContent(game.GetPlayerManagerInstance().GetAllPlayer())
}

func getJsonContent(players []*game.Player) string {
    content, err := json.Marshal(players)
    if err != nil {
        content = []byte("error")
        fmt.Println("json error!")
    }
    return string(content)
}