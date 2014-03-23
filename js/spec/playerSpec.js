/* global define, describe, it, expect, require */
define(["module/player"], function (Player) {

    describe("测试 player.js ", function () {

        it("左上向右下走", function () {
            var player = new Player(null, null, {
                x: 0,
                y: 0
            });

            player.moveTo({
                x: 1,
                y: 1
            });
            var pos = player._walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(0);

            pos = player._walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(1);

            pos = player._walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(1);
        });

        it("右下向左上走", function () {

            var player = new Player(null, null, {
                x: 1,
                y: 1
            });

            player.moveTo({
                x: 0,
                y: 0
            });

            var pos = player._walkOneStep();
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(1);

            pos = player._walkOneStep();
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(0);

            pos = player._walkOneStep();
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(0);
        });

        it("横着直走", function () {

            var player = new Player(null, null, {
                x: 1,
                y: 1
            });

            player.moveTo({
                x: 10,
                y: 1
            });

            var pos = player._walkOneStep();
            expect(pos.x).toBe(2);
            expect(pos.y).toBe(1);

            for (var index = 1; index < 9; index++) {
                pos = player._walkOneStep();
                expect(pos.x).toBe(index + 2);
                expect(pos.y).toBe(1);
            }

            pos = player._walkOneStep();
            expect(pos.x).toBe(10);
            expect(pos.y).toBe(1);

            pos = player._walkOneStep();
            expect(pos.x).toBe(10);
            expect(pos.y).toBe(1);
        });

        it("竖着直走", function () {

            var player = new Player(null, null, {
                x: 1,
                y: 1
            });

            player.moveTo({
                x: 1,
                y: 11
            });

            var pos = player._walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(2);

            for (var index = 1; index < 10; index++) {
                pos = player._walkOneStep();
                expect(pos.x).toBe(1);
                expect(pos.y).toBe(index + 2);
            }

            pos = player._walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(11);

            pos = player._walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(11);
        });

        it("测试左上向右下走，每一帧的图像是否正确", function () {
            var imageArray = {
                left: [1, 2, 3, 4],
                right: [5, 6, 7, 8],
                up: [9, 10, 11, 12],
                down: [13, 14, 15, 16]
            },
                renderImage = 0,
                frameIndex = 0;

            var player = new Player(null, imageArray, {
                x: 0,
                y: 0
            });

            player.moveTo({
                x: 1 * 4,
                y: 1 * 4
            });

            for (frameIndex = 0; frameIndex < 7; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(5);

            // 第8帧是下一个动作
            player._doWalk();
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(6);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(7);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(8);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(5);

            // 向下走
            for (frameIndex = 0; frameIndex < 7; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(13);

            player._doWalk();
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(14);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(15);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(16);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(13);

            // 还是向下
            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(13);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(13);

        });

        it("测试右下向左上走，每一帧的图像是否正确", function () {
            var imageArray = {
                left: [1, 2, 3, 4],
                right: [5, 6, 7, 8],
                up: [9, 10, 11, 12],
                down: [13, 14, 15, 16]
            },
                renderImage = 0,
                frameIndex = 0;

            var player = new Player(null, imageArray, {
                x: 1 * 4,
                y: 1 * 4
            });

            player.moveTo({
                x: 0,
                y: 0
            });

            // 转向左边走
            for (frameIndex = 0; frameIndex < 7; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(1);

            player._doWalk();
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(2);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(3);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(4);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(1);

            // 向上走
            for (frameIndex = 0; frameIndex < 7; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(9);

            player._doWalk();
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(10);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(11);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(12);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(9);

            //一直停留
            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(9);

            for (frameIndex = 0; frameIndex < 8; frameIndex++) {
                player._doWalk();
            }
            renderImage = player._getRenderImage();
            expect(renderImage).toBe(9);
        });

    });
});