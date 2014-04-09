/* global define, jQuery, alert, requirejs, document, requestAnimFrame, window, goog, console, setInterval */

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
        wsconn = null,
        socket = null,
        userName = null,
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
    canvas.addEventListener('click', function (event) {
        CommonUtil.stopPropagation(event);
        player.moveTo(Projection.pixToPosition({
            x: window.event.clientX,
            y: window.event.clientY
        }));
    });

    jQuery('#joinBtn').on('click', function (event) {
        CommonUtil.stopPropagation(event);
        userName = jQuery("body").find("input[name='userName']").val();
        jQuery.ajax({
            type: 'POST',
            url: 'joinGame?userName=' + userName + '&gameId=1',
            success: function(data){
                if (CommonUtil.isDefined(data)) {
                    var players = JSON.parse(data);
                    var content = "玩家：<br>";
                    for (var index = 0; index < players.length; index++ ) {
                        content += players[index].Name + "<br>";
                    }
                    jQuery(".controlPanel .players span").html(content);
                }
            },
            error : function(){
                alert("error!");
            }
        });
    });
    
    jQuery('#sendMsg').on('click', function(event){
        CommonUtil.stopPropagation(event);
        var msg = jQuery("body").find("input[name='message']").val();
        userName = jQuery("body").find("input[name='userName']").val();
        console.log("======talk : " + msg);
        jQuery.ajax({
            type: 'POST',
            url: 'talk2Others?userName=' + userName + '&gameId=1&message=' + msg,
            success: function(data){
            },
            error : function(){
                alert("talk2Others msg error!");
            }
        });
    });
    
    jQuery('#getPlayersBtn').on('click', function(event) {
        CommonUtil.stopPropagation(event);
        jQuery.ajax({
            type: 'GET',
            url: 'getPlayer',
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
    
    // 采用轮训的方式更新最新的消息
    setInterval(function(){
        if (!CommonUtil.isDefined(userName)) {
            return;
        }
        
        jQuery.ajax({
            type: 'POST',
            url: 'getNewMsg?userName=' + userName + '&gameId=1',
            success: function(data){
                if (CommonUtil.isDefined(data) && data !== "noMsg") {
                    console.log("==newMsg = " + data);
                    var msgs = JSON.parse(data);
                    for (var index = 0; index < msgs.length; index++) {
                        if (msgs[index].Type === 'talk') {
                            var sayContent = msgs[index].From + ' say: ' + msgs[index].Content;
                            jQuery(".controlPanel .players span").append('<label>' + sayContent + '</label><br>');
                        } else if (msgs[index].Type === 'joinGame') {
                            jQuery(".controlPanel .players span").append('<label>' + msgs[index].From + '</label><br>');
                        } else if (msgs[index].Type === 'quitGame') {
                            jQuery(".controlPanel .players span").append('<label>' + msgs[index].From + ' 退出游戏！</label><br>');
                        }
                    }
                }
            },
            error : function(){
                alert("error!");
            }
        });
    }, 2000);
    
});