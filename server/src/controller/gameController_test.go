package controller

import (
    "testing"
    
    "testUtil"
    "game"
)

func TestJoinGame(t *testing.T) {
    manager := game.GetPlayerManagerInstance()
    manager.RemoveAllPlayer()
    
    players := joinGame("linwei", "gameId")
    testUtil.AssertEqual(1, manager.GetPlayerCount(), "TestJoinGame", t)
    testUtil.AssertEqual(1, len(players), "TestJoinGame", t)
    testUtil.AssertEqual("linwei", players[0].GetName(), "TestJoinGame", t)
}
