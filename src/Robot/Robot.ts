import { facingInputList } from '../PlayerInput/PlayerInput';
import { Compass, DirectionInput } from '../Utils/interfaces';

export default class Robot {
    // Default properties of the object, will be overwritten upon creating an instance of the class
    x: number = 0;
    y: number = 0;
    facing: Compass = 'N';
    gridX: number = 0;
    gridY: number = 0;
    visitedTiles: number[][] = [];

    constructor(x: number, y: number, facing: Compass, gridX: number, gridY: number) {
        // Assign the inputs to the current object
        Object.assign(this, { x: x, y: y, facing: facing, gridX: gridX, gridY: gridY });
        this.visitedTiles.push([this.x, this.y]);
    }
    /* Method for moving the robot forward */
    moveForward() {
        /**
         * When moving forward, check if there is a border in front of us.
         * We cannot move outside the set grid of the robot, thus there is a check for it before changing the position of the robot.
         * */
        switch (this.facing) {
            case 'N':
                if (this.y !== this.gridY) {
                    this.y += 1;
                    break;
                } else break;
            case 'E':
                if (this.x !== this.gridX) {
                    this.x += 1;
                    break;
                } else break;
            case 'S':
                if (this.y !== 0) {
                    this.y -= 1;
                    break;
                } else break;
            case 'W':
                if (this.x !== 0) {
                    this.x -= 1;
                    break;
                } else break;
        }
        this.visitedTiles.push([this.x, this.y]);
    }
    /* Method for changing the orientation of the robot  */
    changeFacing(turning: 'R' | 'L') {
        /* 
            The facingInputList is an array containing all the possible orientations of the robot
            When turning right, the index of the array increases and eventually wraps around the array. 
            When turning left, the index of the array decreases.
        */
        let currentIndex = facingInputList.findIndex(
            (currentDirection: string) => currentDirection === this.facing
        );
        if (turning === 'R') {
            if (currentIndex + 2 > facingInputList.length) this.facing = facingInputList[0];
            else this.facing = facingInputList[(currentIndex += 1)];
        } else {
            if (currentIndex - 1 < 0) this.facing = facingInputList[facingInputList.length - 1];
            else this.facing = facingInputList[(currentIndex -= 1)];
        }
    }
    /* Method for moving the robot */
    move(input: DirectionInput[]) {
        for (let i = 0; i < input.length; i++) {
            if (input[i] === 'F') {
                this.moveForward();
            } else if (input[i] === 'R' || input[i] === 'L') {
                this.changeFacing(input[i] as 'R' | 'L');
            }
        }
    }
    draw() {
        // Make a grid with the sizeX and sizeY in the console. (draw it)
        let grid = '';
        for (let i = this.gridY; i > 0; i--) {
            for (let j = 0; j < this.gridX; j++) {
                if (i === this.y && j === this.x) grid += '🤖';
                else if (this.visitedTiles.find((tile) => tile[0] === j && tile[1] === i)) grid += '🟩';
                else grid += '⬜️';
            }
            grid += '\n';
        }
        // Place the robot in the grid
        console.log(grid);
    }
}
