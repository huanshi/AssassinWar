package game

import (
    "testing"
    "testUtil"
)

func TestJoinGame(t *testing.T) {
    game := NewGame()
    player := NewPlayer("worge", 0, 0)
    game.Join(player)
    testUtil.AssertEqual(1, game.GetPlayerCount(), "TestJoinGame", t)
    testUtil.AssertEqual("worge", game.GetPlayer("worge").GetName(), "TestJoinGame", t)
    
    player2 := NewPlayer("linwei", 0, 0)
    game.Join(player2)
    testUtil.AssertEqual(2, game.GetPlayerCount(), "TestJoinGame", t)
    testUtil.AssertEqual("worge", game.GetPlayer("worge").GetName(), "TestJoinGame", t)
    
    player3 := NewPlayer("worge", 0, 0)
    game.Join(player3)
    testUtil.AssertEqual(2, game.GetPlayerCount(), "TestJoinGame", t)
    testUtil.AssertEqual("worge", game.GetPlayer("worge").GetName(), "TestJoinGame", t)
}

func TestQuitGame(t *testing.T) {
    game := NewGame()
    player := NewPlayer("worge", 0, 0)
    game.Join(player)
    testUtil.AssertEqual(1, game.GetPlayerCount(), "TestJoinGame", t)
    
    game.Quit("worge")
    testUtil.AssertEqual(0, game.GetPlayerCount(), "TestJoinGame", t)
}

func TestGetAllPlayerForGame(t *testing.T) {
    game := NewGame()
    testUtil.AssertEqual(0, len(game.GetAllPlayer()), "TestGetAllPlayerForGame", t)
    
    player := NewPlayer("worge", 0, 0)
    game.Join(player)
    testUtil.AssertEqual(1, len(game.GetAllPlayer()), "TestGetAllPlayerForGame", t)
    
    player2 := NewPlayer("worge", 0, 0)
    game.Join(player2)
    testUtil.AssertEqual(1, len(game.GetAllPlayer()), "TestGetAllPlayerForGame", t)
    
    player3 := NewPlayer("linwei", 0, 0)
    game.Join(player3)
    testUtil.AssertEqual(2, len(game.GetAllPlayer()), "TestGetAllPlayerForGame", t)
}

func TestBroadcastMsg(t *testing.T) {
    game := NewGame()
    player := NewPlayer("worge", 0, 0)
    game.Join(player)
    testUtil.AssertEqual(1, game.GetPlayerCount(), "TestBroadcastMsg", t)
    
    player2 := NewPlayer("linwei", 0, 0)
    game.Join(player2)
    testUtil.AssertEqual(2, game.GetPlayerCount(), "TestBroadcastMsg", t)

    newMsgs := player.getNewMsgs()
    testUtil.AssertEqual(1, len(newMsgs), "TestBroadcastMsg", t)
    testUtil.AssertEqual("linwei", newMsgs[0].From, "TestBroadcastMsg", t)
    testUtil.AssertEqual("joinGame", newMsgs[0].Type, "TestBroadcastMsg", t)
}


