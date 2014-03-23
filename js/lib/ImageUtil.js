
/* global define, requirejs, Image */
define( function (require, exports, module) {

    /**
     * 加载图片
     * @param {string} url 图片链接
     * @param {function} 回调函数
     */
    function loadImage(url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载  
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数  
            callback.call(this, img);
            return; // 直接返回，不用再处理onload事件  
        }

        img.onload = function () { //图片下载完毕时异步调用callback函数。  
            callback.call(this, img); //将回调函数的this替换为Image对象  
        };
    }
    
    // export function
    exports.loadImage = loadImage;
    
} );