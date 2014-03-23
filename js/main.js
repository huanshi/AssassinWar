/* global define, requirejs, document, requestAnimFrame, window */

// 先配置require的环境
requirejs.config({
        //默认从 js/ 中加载模块
        baseUrl: 'js/',

        paths: {
            text: "ThirdPartyLib/text"
        }
    } );

define( function (require, exports, module) {

    var ImageUtil = require( "lib/ImageUtil" ), 
        Person = require( "lib/person" ),
        Background = require( "lib/background" ),
        Projection = require( "lib/projection" ),
        person = null,
        background = null,
        canvas = document.getElementById("myCanvas"),
        imgs = [];
    
    /**
     * 绘制整个游戏
     */
    function render() {
        background.render();
        person.render();
        requestAnimFrame( render );
    }

    // 加载图像
    ImageUtil.loadImage("img/defaultPerson.png", function(img) {
        imgs[0] = img;
    });

    ImageUtil.loadImage("img/defaultPerson2.png", function(img) {
        imgs[1] = img;
        person = new Person(canvas, imgs, {x:1,y:1});
    });

    ImageUtil.loadImage("img/background.png", function(img) {
        background = new Background(canvas, img);

        // 画图像
        render();
    });
    
    // 添加画布点击事件
    canvas.addEventListener( 'click', function() {
        person.moveTo(Projection.pixToPosition({
            x: window.event.clientX,
            y: window.event.clientY
        }));
    });
    
} );