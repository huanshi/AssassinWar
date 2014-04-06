/* global define, jQuery, alert, requirejs, document, requestAnimFrame, window */

// 先配置require的环境
requirejs.config({
    //默认从 js/ 中加载模块
    baseUrl: 'js/',

    paths: {
        text: "thirdpartylib/text",
        prototype: 'thirdpartylib/prototype'
    }
});

define(function (require, exports, module) {

    var ImageUtil = require("lib/ImageUtil"),
        CommonUtil = require("lib/commonUtil"),
        Player = require("module/player"),
        Npc = require("module/npc"),
        Background = require("module/background"),
        Projection = require("module/projection"),
        canvas = document.getElementById("gameCanvas"),
        player = null,
        npc = null,
        background = null;

    /**
     * 绘制整个游戏
     */
    function render() {
        if (CommonUtil.isDefined(background)) {
            background.render();
        }
        if (CommonUtil.isDefined(player)){
            player.render();
        }
        if (CommonUtil.isDefined(npc)){
            npc.render();
        }
        requestAnimFrame(render);
    }

    // 加载图像
    ImageUtil.loadImages([
            "img/defaultPlayer-down0.png",
            "img/defaultPlayer-down1.png",
            "img/defaultPlayer-down2.png",
            "img/defaultPlayer-down3.png",
            "img/defaultPlayer-left0.png",
            "img/defaultPlayer-left1.png",
            "img/defaultPlayer-left2.png",
            "img/defaultPlayer-left3.png",
            "img/defaultPlayer-right0.png",
            "img/defaultPlayer-right1.png",
            "img/defaultPlayer-right2.png",
            "img/defaultPlayer-right3.png",
            "img/defaultPlayer-up0.png",
            "img/defaultPlayer-up1.png",
            "img/defaultPlayer-up2.png",
            "img/defaultPlayer-up3.png"
        ],
        function (imgs) {
            var imageArray = {
                down: imgs.slice(0, 4),
                left: imgs.slice(4, 8),
                right: imgs.slice(8, 12),
                up: imgs.slice(12, 16)
            };
            player = new Player(canvas, imageArray, {
                x: 1,
                y: 1
            });
            npc = new Npc(canvas, imageArray, {
                x: 2,
                y: 6
            });
            
            npc.startAutoMove();
        });

    ImageUtil.loadImages(["img/background.png"], function (imgs) {
        background = new Background(canvas, imgs[0]);

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

    jQuery('#joinBtn').on('click', function () {
        var userName = jQuery("body").find("input[name='userName']").val();
        jQuery.ajax({
            type: 'POST',
            url: 'joinGame?userName=' + userName + '&gameId=g1',
            success: function(data){
                alert("join ok!");
            },
            error : function(){
                alert("error!");
            }
        });
    });
    
    jQuery('#getPlayersBtn').on('click', function() {
        jQuery.ajax({
            type: 'GET',
            url: 'getPlayers',
            success: function(data){
                if (CommonUtil.isDefined(data)) {
                    var players = JSON.parse(data);
                    if (CommonUtil.isDefined(players)) {
                       var content = "玩家：<br>";
                        for (var index = 0; index < players.length; index++ ) {
                            content += players[index].Name + "<br>";
                        }
                        jQuery(".controlPanel .players span").html(content); 
                    }
                }
                alert("获取玩家完成");
            },
            error : function(){
                alert("error!");
            }
        });
    } );
    
});