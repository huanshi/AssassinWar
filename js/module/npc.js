/* global define, Class */
define(function (require, exports, module) {
    
    var Player = require("module/player");
    require("prototype");
    
    var Npc = Class.create();
    Npc.prototype = Object.extend(new Player(), {
        
        /**
         * 开始自动移动
         */
        startAutoMove: function() {
            var self = this;
            setTimeout(function(){
                if (!self._needMove()) {
                    self.moveTo({
                        x: getRandom(29),
                        y: getRandom(19)
                    });
                }
                self.startAutoMove.call(self);
            }, 1000)

        }

    });
    
    function getRandom( maxRange ) {
        return Math.floor(Math.random() * ( maxRange + 1));
    }
    
    // export
    return Npc;
    
} );