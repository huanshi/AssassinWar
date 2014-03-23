/* global define */
define(function (require, exports, module) {
    var Projection = require("module/projection"),
        MoveHelper = require("module/moveHelper");

    // 走一步需要的帧数
    var ONE_STEP_FRAME_COUNT = 8;

    /**
     * 玩家，
     * @param {Canvas} canvas 画布
     * @param {Array} imgArray 该玩家的一组人物图片
     * @param {x, y} pos 玩家位置
     */
    function Player(canvas, imgArray, pos) {
        this._canvas = canvas;
        this._imgArray = imgArray;
        this._postion = pos;
        this._height = 50;
        this._width = 30;
        this._targetPosition = this._postion;
        this._frameCounter = 0;
    }

    /**
     * 移动到某个位置
     * @param {x, y} pos 位置坐标
     */
    Player.prototype.moveTo = function (pos) {
        this._targetPosition = pos;
    };

    /**
     * 绘制
     */
    Player.prototype.render = function () {
        this._doWalk();
        this._renderMe();
    };

    /**
     * 是否需要移动
     * @return {boolean} true 表示需要移动
     */
    Player.prototype._needMove = function () {
        return (this._postion.x !== this._targetPosition.x) || (this._postion.y !== this._targetPosition.y);
    };

    /**
     * 判定是否应该移动
     * @return true 表示需要移动，false 不需要移动
     */
    Player.prototype._shouldWalk = function () {
        return (this._frameCounter % ONE_STEP_FRAME_COUNT) === 0;
    };

    /**
     * 移动
     */
    Player.prototype._doWalk = function () {
        this._frameCounter++;
        if (this._shouldWalk()) {
            this._walkOneStep();
        }
    };

    /**
     * 绘制自己
     */
    Player.prototype._renderMe = function () {
        var screenPos = Projection.positionToPix(this._postion);
        var context = this._canvas.getContext("2d");

        if (!this._needMove()) {
            context.drawImage(this._imgArray[0], screenPos.x - this._width, screenPos.y - this._height);
        } else if (((this._frameCounter) % ONE_STEP_FRAME_COUNT) < ONE_STEP_FRAME_COUNT / 2) {
            context.drawImage(this._imgArray[0], screenPos.x - this._width, screenPos.y - this._height);
        } else {
            context.drawImage(this._imgArray[1], screenPos.x - this._width, screenPos.y - this._height);
        }
    };

    /**
     * 移动一步
     * @return {x, y} 移动后的位置坐标
     */
    Player.prototype._walkOneStep = function () {
        this._postion = MoveHelper.moveOneStep(this._postion, this._targetPosition).position;
        return this._postion;
    };

    // export
    return Player;

});