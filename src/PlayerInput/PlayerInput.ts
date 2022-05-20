import { Direction, ReadLine } from 'readline';
import { Compass, DirectionInput } from '../Utils/interfaces';

/* Function which parses an input and converts it to numbers */
export const parseInput = (input: string) =>
    input
        .slice(0, 2)
        .split('')
        .map((char) => Number(char))
        .filter((num) => !isNaN(num) && num >= 0);

/* Function for asking the user for the grid size */
export async function AskForGridSize(rl: ReadLine): Promise<{ gridX: number; gridY: number }> {
    return new Promise((resolve, reject) => {
        rl.question(
            'How big field do you wish to set? Please enter two numbers, the first being the width and the second being the height\n',
            (_input) => {
                const input: number[] = parseInput(_input);

                if (input.length !== 2) {
                    rl.write('Please enter correct data\n');
                    reject();
                }
                return resolve({ gridX: input[0], gridY: input[1] });
            }
        );
    });
}

/* Function for asking the user for the starting position and orientation */
export const facingInputList: Compass[] = ['N', 'E', 'S', 'W'];
export async function AskForStartingPos(
    rl: ReadLine,
    gridSizeX: number,
    gridSizeY: number
): Promise<{ x: number; y: number; facing: Compass }> {
    return new Promise((resolve, reject) => {
        rl.question(
            'Where do you want to start? Please enter two coordinate values and one character describing the orientation. Valid orientations are: N,E,S,W\n',
            (response) => {
                const _input = response.replaceAll(' ', ''); // Remove spaces, if there are any. ES2021 feature
                const coordinates = _input.substring(0, 2); // The first to characters are coordinates
                const facing = _input[2]; // The third character is the orientation which the bot is facing.
                const input: number[] = parseInput(coordinates);
                if (input.length !== 2 || !facingInputList.includes(facing as Compass)) {
                    reject(
                        'Please enter correct data: Allowed inputs are 0-9 & NESW, please enter three characters\n'
                    );
                }
                if (input[0] > gridSizeX - 1) return reject('Input X is bigger than the grid size - 1 on X');
                if (input[1] > gridSizeY - 1) return reject('Input Y is bigger than the grid size - 1 on Y');

                return resolve({ x: input[0], y: input[1], facing: facing as Compass });
            }
        );
    });
}
/* Function for asking the user for directions */
const directionInputList: DirectionInput[] = ['L', 'R', 'F'];
export async function AskForDirections(rl: ReadLine): Promise<DirectionInput[]> {
    return new Promise((resolve) => {
        rl.question(
            'Where do you want the robot to go? You can give directions by a sequence of characters. Valid characters are: \nF: Walk forward\nR: Turn right\nL: Turn left\n',
            (_input) => {
                const input = _input
                    .replace(' ', '')
                    .split('')
                    .filter((char) =>
                        directionInputList.includes(char as DirectionInput)
                    ) as DirectionInput[];
                resolve(input);
            }
        );
    });
}
