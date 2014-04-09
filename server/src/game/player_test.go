package game

import (
    "time"
    "testing"
    "testUtil"
)

func TestGetSetPos (t *testing.T) {
    player := NewPlayer("name", 1, 1)
    testUtil.AssertEqual(1, player.GetPosX(), "TestGetSetPos", t)
    testUtil.AssertEqual(1, player.GetPosY(), "TestGetSetPos", t)
    
    player.PosX = 3;
    player.PosY = 2;
    testUtil.AssertEqual(3, player.GetPosX(), "TestGetSetPos", t)
    testUtil.AssertEqual(2, player.GetPosY(), "TestGetSetPos", t)
}

func TestGetToSendMsgChan(t *testing.T) {
    player := NewPlayer("name", 1, 1)
    go sendMsgToPlayer(player)
    select {
        case msg := <- player.toSendMsgChan:
            testUtil.AssertEqual("type", msg.Type, "TestGetToSendMsgChan", t)
            testUtil.AssertEqual("worge", msg.From, "TestGetToSendMsgChan", t)
            testUtil.AssertEqual("content", msg.Content, "TestGetToSendMsgChan", t)
        case <- time.After(5 * time.Second): 
             t.Fail()
    }
}

func sendMsgToPlayer(player *Player) {
    msg := &Message{
        Type: "type",
        From: "worge",
        Content: "content",
    }
    player.ReceiveMsg(msg)
}