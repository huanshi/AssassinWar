package entity

import (
    "testing"
    "testUtil"
)

func TestGetSetPos (t *testing.T) {
    player := Player{Name: "name", PosX: 1, PosY: 1}
    testUtil.AssertEqual(1, player.GetPosX(), "TestGetSetPos", t)
    testUtil.AssertEqual(1, player.GetPosY(), "TestGetSetPos", t)
    
    player.SetPos(3, 2)
    testUtil.AssertEqual(3, player.GetPosX(), "TestGetSetPos", t)
    testUtil.AssertEqual(2, player.GetPosY(), "TestGetSetPos", t)
}

func TestGetSetName (t *testing.T) {
    player := Player{Name: "name", PosX: 1, PosY: 1}
    testUtil.AssertEqual("name", player.GetName(), "TestGetSetName", t)
    
    player.SetName("linwei")
    testUtil.AssertEqual("linwei", player.GetName(), "TestGetSetName", t)
}