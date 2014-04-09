package game

import (
    "sync"
)

type game struct {
    id              int
    players         map[string]*Player
    BroadcastChan   chan Message
    rwLocker        sync.RWMutex
}

func (game *game) GetId() int {
    return game.id
}

func (game *game) Join(player *Player) {
    game.rwLocker.Lock()
    defer game.rwLocker.Unlock()
    
    game.players[player.GetName()] = player
    player.SetGameIn(game)
    Infof("%s joined game %d", player.GetName(), game.id)
    
    // 通知其他玩家有新的玩家进入
    msg := &Message{
        Type: "joinGame",
        From: player.GetName(),
        Content: player.GetName(),
    }
    
    game.broadcastMsg(msg, player.GetName())
    Infof("broadcast join msg to others")
}

func (game *game) Quit(name string) {
    game.rwLocker.Lock()
    defer game.rwLocker.Unlock()
    
    delete(game.players, name)
    msg := &Message{
        Type: "quitGame",
        From: name,
        Content: "quitGame",
    }
    game.broadcastMsg(msg, name)
}

func (game *game) broadcastMsg(msg *Message, from string) {
    for _, player := range game.players {
        if player.GetName() != from {
            player.ReceiveMsg(msg)
        }
    }
}

func (game *game) GetPlayerCount() int {
    game.rwLocker.RLock()
    defer game.rwLocker.RUnlock()
    
    return len(game.players)
}

func (game *game) GetPlayer(name string) *Player {
    game.rwLocker.RLock()
    defer game.rwLocker.RUnlock()
    
    return game.players[name]
}

func (game *game) GetAllPlayer() []*Player {
    game.rwLocker.RLock()
    defer game.rwLocker.RUnlock()
    
    allPlayers := make([]*Player, 0)
    for _, player := range game.players {
        allPlayers = append(allPlayers, player)
    }
    return allPlayers
}
