/* global define */
define(function (require, exports, module) {
    var Projection = require("module/projection");
    var

        function Person(canvas, imgArray, pos) {
            this._canvas = canvas;
            this._imgArray = imgArray;
            this._postion = pos;
            this._height = 50;
            this._width = 30;
            this._targetPosition = this._postion;
            this._frameCounter = 0;
        }

    Person.prototype.isArrive = function () {
        return (this._postion.x === this._targetPosition.x) && (this._postion.y === this._targetPosition.y);
    };

    Person.prototype.render = function () {
        if (((this._frameCounter++) % 8) === 0) {
            this.walkOneStep();
        }

        var screenPos = Projection.positionToPix(this._postion);
        var context = this._canvas.getContext("2d");

        if (this.isArrive()) {
            context.drawImage(this._imgArray[0], screenPos.x - this._width, screenPos.y - this._height);
        } else if (((this._frameCounter) % 8) < 4) {
            context.drawImage(this._imgArray[0], screenPos.x - this._width, screenPos.y - this._height);
        } else {
            context.drawImage(this._imgArray[1], screenPos.x - this._width, screenPos.y - this._height);
        }
    };

    Person.prototype.moveTo = function (pos) {
        this._targetPosition = pos;
    };

    Person.prototype.walkOneStep = function () {
        if (this._postion.x < this._targetPosition.x) {
            this._postion.x = this._postion.x + 1;
        } else if (this._postion.x > 　this._targetPosition.x) {
            this._postion.x = this._postion.x - 1;
        } else if (this._postion.y < this._targetPosition.y) {
            this._postion.y = this._postion.y + 1;
        } else if (this._postion.y > 　this._targetPosition.y) {
            this._postion.y = this._postion.y - 1;
        }
        return this._postion;
    };

    return Person;

});