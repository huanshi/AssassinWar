package game

import (
    "time"
    "fmt"
    "sync"
    "net/http"
    "encoding/json"
    
    "appengine"
)

type Player struct {
    Name string
    PosX int
    PosY int
    
    chanLock        sync.Mutex
    gameIn          *game
    toSendMsgChan   chan *Message
    lastLiveTime    time.Time
}

func (player *Player) GetPosX() int {
    return player.PosX
}

func (player *Player) GetPosY() int {
    return player.PosY
}

func (player *Player) GetName() string {
    return player.Name
}

func (player *Player) SetGameIn(game *game) {
    player.gameIn = game
}

func (player *Player) RemoveFromManager() {
    GetPlayerManagerInstance().RemovePlayer(player.GetName())
}

func (player *Player) RemoveFromGame() {
    if player.gameIn != nil {
        player.gameIn.Quit(player.GetName())
        player.gameIn = nil
    }
}

func (player *Player) Talk2OthersInGame(msg string) {
    // 广播消息
    sendMsg := &Message{
        Type: "talk",
        From: player.GetName(),
        Content: msg,
    }
    
    if player.gameIn != nil {
        player.gameIn.broadcastMsg(sendMsg, player.GetName())
    }
    player.ReceiveMsg(sendMsg)
}

func (player *Player) Release() {
    close(player.toSendMsgChan)
    player.gameIn = nil
}

func (player *Player) Live() {
    player.lastLiveTime = time.Now()
}

func (player *Player) GetLastLiveTime() time.Time{
    return player.lastLiveTime
}

func (player *Player) ReceiveMsg(msg *Message) {
    player.chanLock.Lock()
    player.toSendMsgChan <- msg
    player.chanLock.Unlock()
}

func (player *Player) getNewMsgs() []*Message {
    player.chanLock.Lock()
    newMsgs := make([]*Message, 0)
getMsg:    for {
        select {
          case newMsg := <- player.toSendMsgChan:
            newMsgs = append(newMsgs, newMsg)
          case <- time.After(1 * time.Second): 
             break getMsg
        }
    }
    player.chanLock.Unlock()
    return newMsgs
}

func (player *Player) SendNewMsg2Client(resp http.ResponseWriter, context appengine.Context) {
    newMsgs := player.getNewMsgs()
    //context.Infof("===%s SendNewMsg2Client len = %d",  player.Name, len(newMsgs))
    jsonMsgs, _ := json.Marshal(newMsgs)
    fmt.Fprintf(resp, string(jsonMsgs)) 
}