package assassinwar

import (
    "testing"
    
    "testUtil"
    
    "entity"
    "model"
)

func TestGetJson(t *testing.T) {
    playerManager := model.NewPlayerManager()
    
    var player entity.Player
    player.SetName("na1")
    playerManager.AddPlayer(player)
    
    jsonContent := getJsonContent(playerManager.GetAllPlayer())
    testUtil.AssertEqual("[{\"Name\":\"na1\",\"PosX\":0,\"PosY\":0}]", jsonContent, "TestGetJson", t)
    
    player2 := entity.Player{"na2", 2, 2}
    playerManager.AddPlayer(player2)
    jsonContent = getJsonContent(playerManager.GetAllPlayer())
    testUtil.AssertEqual("[{\"Name\":\"na1\",\"PosX\":0,\"PosY\":0},{\"Name\":\"na2\",\"PosX\":2,\"PosY\":2}]", jsonContent, "TestGetJson", t)

}