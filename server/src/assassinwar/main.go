package assassinwar

import (
    "fmt"
    "net/http"
    "encoding/json"
    
    "appengine"
    
    "entity"
    "model"
)

var playerManager = model.NewPlayerManager()

// google app engine 的入口函数
func init() {
	http.HandleFunc("/joinGame", joinGame) //设置访问的路由
    http.HandleFunc("/getPlayers", getPlayers) 
}

func joinGame(resp http.ResponseWriter, req *http.Request) {
    context := appengine.NewContext(req)
    req.ParseForm()
    userName := req.FormValue("userName")
    gameId := req.FormValue("gameId")
    context.Infof("Requested URL: %v", req.URL)
    context.Infof("userName: %s gameId: %s", userName, gameId)
    
    // add to manager
    addPlayer(userName)
    
	fmt.Fprintf(resp, "ok")
}

func getPlayers(resp http.ResponseWriter, req *http.Request) {
    fmt.Fprintf(resp, getJsonContent(playerManager.GetAllPlayer()) )
}

func getJsonContent(players []entity.Player) string {
    content, err := json.Marshal(players)
    if err != nil {
        content = []byte("error")
        fmt.Println("json error!")
    }
    return string(content)
}

func addPlayer(name string) {
    var player entity.Player
    player.SetName(name)
    playerManager.AddPlayer(player)
}