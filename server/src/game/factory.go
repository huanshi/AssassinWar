package game

var gameIdGenerator = 0

// 新建一个game
func NewGame() *game {
    gameIdGenerator = gameIdGenerator + 1
    newGame := &game{
        id: gameIdGenerator, 
        players: make(map[string]*Player),
        BroadcastChan: make(chan Message),
    }

    return newGame
}

func NewPlayer(name string, posx int, posy int) *Player {
    newPlayer := &Player{
        Name: name,
        PosX: posx,
        PosY: posy,
        toSendMsgChan: make(chan *Message, 128),
    }
    newPlayer.Live()
    
    return newPlayer
}