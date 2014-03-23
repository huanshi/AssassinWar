function pixToPosition(pos)
{
    return {
        x:parseInt(pos.x / 30),
        y:parseInt(pos.y / 30)
    };
}

function positionToPix(pos)
{
    return{
        x:(pos.x+1)*30 -1,
        y:(pos.y+1)*30 -1
    };
}