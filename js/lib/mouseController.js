function onMouseClicked(e, cxt, player) {
    if (e.button === left) {
        e.cancelBubble = true;
        var x = e.screenX,
            y = e.screenY;
        cxt.drawImage(player, x, y, 10, 10);
    } else if (e.button === right) {
        Player1.isRightClick = true;
    }
};