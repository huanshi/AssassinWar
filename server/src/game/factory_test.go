package game

import (
    "testing"
    
    "testUtil"
)

func TestNewGame(t *testing.T) {
    game := NewGame()
    testUtil.AssertEqual(0, game.GetPlayerCount(), "TestNewGame", t)
    testUtil.AssertEqual(1, game.GetId(), "TestNewGame", t)
    
    game = NewGame()
    testUtil.AssertEqual(0, game.GetPlayerCount(), "TestNewGame", t)
    testUtil.AssertEqual(2, game.GetId(), "TestNewGame", t)
}