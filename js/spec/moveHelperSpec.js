/* global define, describe, it, expect, require */
define(["module/moveHelper", "module/enumDirection"], function (MoveHelper, EnumDirection) {

    describe("测试moveHelper", function () {
        it("从左上到右下", function () {
            var curPos = {
                x: 1,
                y: 1
            },
                targetPos = {
                    x: 2,
                    y: 2
                };

            var result = MoveHelper.getNextOneStepPos(curPos, targetPos);
            expect(result.direction).toBe(EnumDirection.RIGHT);
            expect(result.position.x).toBe(2);
            expect(result.position.y).toBe(1);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.direction).toBe(EnumDirection.DOWN);
            expect(result.position.x).toBe(2);
            expect(result.position.y).toBe(2);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.position.x).toBe(2);
            expect(result.position.y).toBe(2);

        });

        it("从左下到右上", function () {
            var curPos = {
                x: 2,
                y: 2
            },
                targetPos = {
                    x: 3,
                    y: 1
                };

            var result = MoveHelper.getNextOneStepPos(curPos, targetPos);
            expect(result.direction).toBe(EnumDirection.RIGHT);
            expect(result.position.x).toBe(3);
            expect(result.position.y).toBe(2);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.direction).toBe(EnumDirection.UP);
            expect(result.position.x).toBe(3);
            expect(result.position.y).toBe(1);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.position.x).toBe(3);
            expect(result.position.y).toBe(1);

        });

        it("从右上到左下", function () {
            var curPos = {
                x: 3,
                y: 1
            },
                targetPos = {
                    x: 2,
                    y: 2
                };

            var result = MoveHelper.getNextOneStepPos(curPos, targetPos);
            expect(result.direction).toBe(EnumDirection.LEFT);
            expect(result.position.x).toBe(2);
            expect(result.position.y).toBe(1);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.direction).toBe(EnumDirection.DOWN);
            expect(result.position.x).toBe(2);
            expect(result.position.y).toBe(2);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.position.x).toBe(2);
            expect(result.position.y).toBe(2);

        });

        it("从右下到左上", function () {
            var curPos = {
                x: 10,
                y: 10
            },
                targetPos = {
                    x: 8,
                    y: 8
                };

            var result = MoveHelper.getNextOneStepPos(curPos, targetPos);
            expect(result.direction).toBe(EnumDirection.LEFT);
            expect(result.position.x).toBe(9);
            expect(result.position.y).toBe(10);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.direction).toBe(EnumDirection.LEFT);
            expect(result.position.x).toBe(8);
            expect(result.position.y).toBe(10);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.direction).toBe(EnumDirection.UP);
            expect(result.position.x).toBe(8);
            expect(result.position.y).toBe(9);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.direction).toBe(EnumDirection.UP);
            expect(result.position.x).toBe(8);
            expect(result.position.y).toBe(8);

            result = MoveHelper.getNextOneStepPos(result.position, targetPos);
            expect(result.position.x).toBe(8);
            expect(result.position.y).toBe(8);

        });


    });


});