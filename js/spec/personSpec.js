/* global define, describe, it, expect, require */
define(["module/person"], function (Person) {

    describe("person.js 测试", function () {

        it("walk forward", function () {
            var person = new Person(null, null, {
                x: 0,
                y: 0
            });

            person.moveTo({
                x: 1,
                y: 1
            });
            var pos = person.walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(0);

            pos = person.walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(1);

            pos = person.walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(1);
        });

        it("walk back", function () {

            var person = new Person(null, null, {
                x: 1,
                y: 1
            });

            person.moveTo({
                x: 0,
                y: 0
            });
            var pos = person.walkOneStep();
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(1);

            pos = person.walkOneStep();
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(0);

            pos = person.walkOneStep();
            expect(pos.x).toBe(0);
            expect(pos.y).toBe(0);
        });

        it("横着直走", function () {

            var person = new Person(null, null, {
                x: 1,
                y: 1
            });

            person.moveTo({
                x: 10,
                y: 1
            });
            var pos = person.walkOneStep();
            expect(pos.x).toBe(2);
            expect(pos.y).toBe(1);

            for (var index = 1; index < 9; index++) {
                pos = person.walkOneStep();
                expect(pos.x).toBe(index + 2);
                expect(pos.y).toBe(1);
            }

            pos = person.walkOneStep();
            expect(pos.x).toBe(10);
            expect(pos.y).toBe(1);

            pos = person.walkOneStep();
            expect(pos.x).toBe(10);
            expect(pos.y).toBe(1);
        });

        it("竖着直走", function () {

            var person = new Person(null, null, {
                x: 1,
                y: 1
            });

            person.moveTo({
                x: 1,
                y: 11
            });
            var pos = person.walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(2);

            for (var index = 1; index < 10; index++) {
                pos = person.walkOneStep();
                expect(pos.x).toBe(1);
                expect(pos.y).toBe(index + 2);
            }

            pos = person.walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(11);

            pos = person.walkOneStep();
            expect(pos.x).toBe(1);
            expect(pos.y).toBe(11);
        });

    });
});