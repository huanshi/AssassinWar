package assassinwar

import (
    //"fmt"
    "net/http"

    //"code.google.com/p/go.net/websocket"

    "controller"
    "game"
)

// google app engine 的入口函数
func init() {
    newGame := game.NewGame()
    go game.CheckLivePlayers()
    game.GetGameManagerInstance().AddGame(newGame)
	http.HandleFunc("/joinGame", controller.Join) //设置访问的路由
    http.HandleFunc("/getPlayer", controller.GetPlayer)
    http.HandleFunc("/talk2Others", controller.Talk2Others)
    http.HandleFunc("/getNewMsg", controller.GetNewMsg)
}