package controller

import (
    "testing"
    
    "testUtil"
    
    "game"
)

func TestGetAllPlayer(t *testing.T) {
    playerManager := game.GetPlayerManagerInstance()
    playerManager.RemoveAllPlayer()
    
    player := game.NewPlayer("na1", 0, 0)
    playerManager.AddPlayer(player)
    
    jsonContent := getAllPlayer()
    testUtil.AssertEqual("[{\"Name\":\"na1\",\"PosX\":0,\"PosY\":0}]", jsonContent, "TestGetJson", t)
    
    player2 := game.NewPlayer("na2", 2, 2)
    playerManager.AddPlayer(player2)
    
    jsonContent = getAllPlayer()
    testUtil.AssertEqual("[{\"Name\":\"na1\",\"PosX\":0,\"PosY\":0},{\"Name\":\"na2\",\"PosX\":2,\"PosY\":2}]", jsonContent, "TestGetJson", t)

}