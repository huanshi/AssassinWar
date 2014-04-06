package model

import (
    "testing"
    "entity"
    "testUtil"
)

func TestAddPlayer (t *testing.T) {
    manager :=NewPlayerManager()
    testUtil.AssertEqual(0, manager.GetPlayerCount(), "TestAddPlayer", t)
    
    var player entity.Player
    player.SetName("name1")
    manager.AddPlayer(player)
    testUtil.AssertEqual(1, manager.GetPlayerCount(), "TestAddPlayer", t)
    
    player.SetName("name2")
    manager.AddPlayer(player)
    testUtil.AssertEqual(2, manager.GetPlayerCount(), "TestAddPlayer", t)
}

func TestGetPlayer (t *testing.T) {
    manager :=NewPlayerManager()
    var player entity.Player
    player.SetName("n1");
    manager.AddPlayer(player)
    findPlayer := manager.GetPlayer("n1")
    testUtil.AssertEqual("n1", findPlayer.GetName(), "TestAddPlayer", t)
    
    player.SetName("n2")
    manager.AddPlayer(player)
    findPlayer = manager.GetPlayer("n2")
    testUtil.AssertEqual("n2", findPlayer.GetName(), "TestAddPlayer", t)
}

func TestGetAllPlayer (t *testing.T) {
    manager :=NewPlayerManager()
    allPlayers := manager.GetAllPlayer()
    testUtil.AssertEqual(0, len(allPlayers), "TestGetAllPlayer", t)
    
    var player entity.Player
    player.SetName("n1");
    manager.AddPlayer(player)
    allPlayers = manager.GetAllPlayer()
    testUtil.AssertEqual(1, len(allPlayers), "TestGetAllPlayer", t)
    testUtil.AssertEqual("n1", allPlayers[0].GetName(), "TestGetAllPlayer", t)
    
    player.SetName("n2")
    manager.AddPlayer(player)
    allPlayers = manager.GetAllPlayer()
    testUtil.AssertEqual(2, len(allPlayers), "TestGetAllPlayer", t)
    testUtil.AssertEqual("n2", allPlayers[1].GetName(), "TestGetAllPlayer", t)
}