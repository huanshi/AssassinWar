package model

import "entity"

type PlayerManager struct {
	players map[string]entity.Player
}

func NewPlayerManager() *PlayerManager {
    return &PlayerManager{ players: make(map[string]entity.Player) }
}

func (manager *PlayerManager) GetPlayerCount() int {
    return len(manager.players)
}

func (manager *PlayerManager) AddPlayer(player entity.Player) {
    manager.players[player.GetName()] = player
}

func (manager *PlayerManager) GetPlayer(name string) entity.Player {
    return manager.players[name]
}

func (manager *PlayerManager) GetAllPlayer() []entity.Player {
    var players []entity.Player
    for _, player := range manager.players {
        players = append(players, player)
    }
    return players
}