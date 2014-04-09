package game

import (
    "testing"
    "testUtil"
)

func TestAddPlayer (t *testing.T) {
    manager := GetPlayerManagerInstance()
    manager.RemoveAllPlayer()
    
    testUtil.AssertEqual(0, manager.GetPlayerCount(), "TestAddPlayer", t)
    
    player1 := NewPlayer("name1", 0, 0)
    manager.AddPlayer(player1)
    testUtil.AssertEqual(1, manager.GetPlayerCount(), "TestAddPlayer", t)
    
    player2 := NewPlayer("name2", 0, 0)
    manager.AddPlayer(player2)
    testUtil.AssertEqual(2, manager.GetPlayerCount(), "TestAddPlayer", t)
}

func TestRemovePlayer(t *testing.T) {
    manager := GetPlayerManagerInstance()
    manager.RemoveAllPlayer()
    
    testUtil.AssertEqual(0, manager.GetPlayerCount(), "TestAddPlayer", t)
    
    player1 := NewPlayer("name1", 0, 0)
    manager.AddPlayer(player1)
    testUtil.AssertEqual(1, manager.GetPlayerCount(), "TestAddPlayer", t)
    
    manager.RemovePlayer("name1")
    testUtil.AssertEqual(0, manager.GetPlayerCount(), "TestAddPlayer", t)
}

func TestGetPlayer (t *testing.T) {
    manager :=GetPlayerManagerInstance()
    manager.RemoveAllPlayer()
    
    player1 := NewPlayer("n1", 0, 0)
    manager.AddPlayer(player1)
    findPlayer := manager.GetPlayer("n1")
    testUtil.AssertEqual("n1", findPlayer.GetName(), "TestAddPlayer", t)
    
    player2 := NewPlayer("n2", 0, 0)
    manager.AddPlayer(player2)
    findPlayer = manager.GetPlayer("n2")
    testUtil.AssertEqual("n2", findPlayer.GetName(), "TestAddPlayer", t)
}

func TestGetAllPlayer (t *testing.T) {
    manager :=GetPlayerManagerInstance()
    manager.RemoveAllPlayer()
    
    allPlayers := manager.GetAllPlayer()
    testUtil.AssertEqual(0, len(allPlayers), "TestGetAllPlayer", t)
    
    player1 := NewPlayer("n1", 0, 0)
    manager.AddPlayer(player1)
    allPlayers = manager.GetAllPlayer()
    testUtil.AssertEqual(1, len(allPlayers), "TestGetAllPlayer", t)
    testUtil.AssertEqual("n1", allPlayers[0].GetName(), "TestGetAllPlayer", t)
    
    player2 := NewPlayer("n2", 0, 0)
    manager.AddPlayer(player2)
    allPlayers = manager.GetAllPlayer()
    testUtil.AssertEqual(2, len(allPlayers), "TestGetAllPlayer", t)
    testUtil.AssertEqual("n2", allPlayers[1].GetName(), "TestGetAllPlayer", t)
}

func TestGetPlayerCount (t *testing.T) {
    manager :=GetPlayerManagerInstance()
    manager.RemoveAllPlayer()

    testUtil.AssertEqual(0, manager.GetPlayerCount(), "TestGetPlayerCount", t)
    
    player1 := NewPlayer("n1", 0, 0)
    manager.AddPlayer(player1)
    testUtil.AssertEqual(1, manager.GetPlayerCount(), "TestGetPlayerCount", t)
    
    player2 := NewPlayer("n2", 0, 0)
    manager.AddPlayer(player2)
    testUtil.AssertEqual(2, manager.GetPlayerCount(), "TestGetPlayerCount", t)
}