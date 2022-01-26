import assert from 'assert';
import Robot from './Robot';
describe('Robot', function () {
    describe('changeFacing()', function () {
        it('Should change the orientation to west.', function () {
            const robot = new Robot(1, 1, 'N', 1, 1);
            robot.changeFacing('R');
            assert.equal(robot.facing, 'E');
        });
        it('Should change the orientation to north.', function () {
            const robot = new Robot(1, 1, 'W', 1, 1);
            robot.changeFacing('R');
            assert.equal(robot.facing, 'N');
        });
        it('Should change the orientation to west.', function () {
            const robot = new Robot(1, 1, 'N', 1, 1);
            robot.changeFacing('L');
            assert.equal(robot.facing, 'W');
        });
        it('Should change the orientation to east.', function () {
            const robot = new Robot(1, 1, 'S', 1, 1);
            robot.changeFacing('L');
            assert.equal(robot.facing, 'E');
        });
    });
    describe('moveForward()', function () {
        it('Should move forward in the north direction, getting the position of 1,2.', function () {
            const robot = new Robot(1, 1, 'N', 2, 2);
            robot.moveForward();
            assert.equal(robot.y, 2);
        });
    });
    describe('move()', function () {
        it('Should rotate to the right, then go forward, getting the position of 2,1', function () {
            const robot = new Robot(1, 1, 'N', 2, 2);
            robot.move(['R', 'F']);
            assert.equal(robot.x, 2);
        });
    });
});
