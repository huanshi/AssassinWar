/* global define, describe, it, expect, require */

define(["lib/projection"], function (Projection) {

    describe("projection.js 测试", function () {

        it("测试pixToPosition", function () {

            var pos = Projection.pixToPosition({
                x: 0,
                y: 0
            });
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(0);

            pos = Projection.pixToPosition({
                x: 30,
                y: 30
            });
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(1);

            pos = Projection.pixToPosition({
                x: 30,
                y: 60
            });
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(2);

            pos = Projection.pixToPosition({
                x: 40,
                y: 59
            });
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(1);

            pos = Projection.pixToPosition({
                x: 55,
                y: 66
            });
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(2);

            pos = Projection.pixToPosition({
                x: 899,
                y: 599
            });
            expect(pos.x).toBe(29);
            expect(pos.y).toBe(19);
        });

        it("测试positionToPix", function () {

            var pos = Projection.positionToPix({
                x: 0,
                y: 0
            });
            expect(pos.x).toBe(29);
            expect(pos.y).toBe(29);

            pos = Projection.positionToPix({
                x: 29,
                y: 19
            });
            expect(pos.x).toBe(899);
            expect(pos.y).toBe(599);

            pos = Projection.positionToPix({
                x: 15,
                y: 10
            });
            expect(pos.x).toBe(479);
            expect(pos.y).toBe(329);
        });

    });
});