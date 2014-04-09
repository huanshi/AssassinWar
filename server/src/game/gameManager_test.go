package game

import (
    "testing"
    "testUtil"
)

func TestAddGame(t *testing.T) {
    game := NewGame();
    manager := GetGameManagerInstance()
    manager.AddGame(game)
    testUtil.AssertEqual(1, manager.GetGameCount(), "TestAddGame", t)
}

func TestGetGame(t *testing.T) {
    game := NewGame();
    manager := GetGameManagerInstance()
    manager.AddGame(game)
    testUtil.AssertEqual(game.GetId(), manager.GetGame(game.GetId()).GetId(), "TestGetGame", t)
}