/* global define, requirejs, Image */
define(function (require, exports, module) {
    
    /**
     * 判断是否定义了
     * @param {Object} obj 待判定的对象
     * @return {Boolean} true 表示定义了
     */
    function isDefined(obj) {
        return obj !== null && obj !== undefined && obj !== 'undefined';
    }
    
    // export
    exports.isDefined = isDefined;
    
} );