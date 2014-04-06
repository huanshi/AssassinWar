package entity

type Player struct {
    Name string
    PosX int
    PosY int
} 

func (player *Player) SetPos(posX, posY int) {
    player.PosX = posX
    player.PosY = posY
}

func (player *Player) GetPosX() int {
    return player.PosX
}

func (player *Player) GetPosY() int {
    return player.PosY
}

func (player *Player) GetName() string {
    return player.Name
}

func (player *Player) SetName(name string) {
    player.Name = name
}