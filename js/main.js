/* global define, requirejs, document, requestAnimFrame, window */

// 先配置require的环境
requirejs.config({
    //默认从 js/ 中加载模块
    baseUrl: 'js/',

    paths: {
        text: "ThirdPartyLib/text"
    }
});

define(function (require, exports, module) {

    var ImageUtil = require("lib/ImageUtil"),
        Player = require("module/player"),
        Background = require("module/background"),
        Projection = require("module/projection"),
        player = null,
        background = null,
        canvas = document.getElementById("myCanvas"),
        imgs = [];

    /**
     * 绘制整个游戏
     */
    function render() {
        background.render();
        player.render();
        requestAnimFrame(render);
    }

    // 加载图像
    ImageUtil.loadImage("img/defaultPerson.png", function (img) {
        imgs[0] = img;
    });

    ImageUtil.loadImage("img/defaultPerson2.png", function (img) {
        imgs[1] = img;
        player = new Player(canvas, imgs, {
            x: 1,
            y: 1
        });
    });

    ImageUtil.loadImage("img/background.png", function (img) {
        background = new Background(canvas, img);

        // 画图像
        render();
    });

    // 添加画布点击事件
    canvas.addEventListener('click', function () {
        player.moveTo(Projection.pixToPosition({
            x: window.event.clientX,
            y: window.event.clientY
        }));
    });

});