package game

import (
    "time"
)

// 检查存活玩家的，如果不存活，就把玩家删除
func CheckLivePlayers() {
    // run always for clear not live player
    for {
        now := time.Now()
        players := GetPlayerManagerInstance().GetAllPlayer()
        for _, player := range players {
            if now.Sub(player.GetLastLiveTime()) > 10 * time.Second {
                // 超过10秒没有心跳，则认为不存活了
                player.RemoveFromGame()
                player.RemoveFromManager()
                player.Release()
                player = nil
            }
        }
        time.Sleep(5 * time.Second)
    }
}