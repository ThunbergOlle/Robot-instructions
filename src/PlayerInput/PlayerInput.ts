import { Direction, ReadLine } from 'readline';
import { Compass, DirectionInput } from '../Utils/interfaces';
import prompt from 'prompts';

/* Function which parses an input and converts it to numbers */
export const parseInput = (userInput: string) =>
userInput
        .slice(0, 2)
        .split('')
        .map((char) => Number(char))
        .filter((num) => !isNaN(num) && num >= 0);

/* Function for asking the user for the grid size */
export async function AskForGridSize(rl: ReadLine): Promise<{ gridX: number; gridY: number }> {
    const userInput = await prompt({
        type: 'text',
        name: "grid",
        message: 'How big field do you wish to set? Please enter two numbers, the first being the width and the second being the height: \n',
    });

    const input: number[] = parseInput(userInput.grid);

    if (input.length !== 2) {
        console.log('Please enter correct data');
        throw 'Please enter correct data';
    }
    return { gridX: input[0], gridY: input[1] };
}

/* Function for asking the user for the starting position and orientation */
export const facingInputList: Compass[] = ['N', 'E', 'S', 'W'];
export async function AskForStartingPos(
    rl: ReadLine,
    gridSizeX: number,
    gridSizeY: number
): Promise<{ x: number; y: number; facing: Compass }> {
        const question = await prompt({
            type: 'text',
            name: "grid",
            message: "Where do you want to start? Please enter two coordinate values and one character describing the orientation. Valid orientations are: N,E,S,W\n"})
                const _input = question.grid.replaceAll(' ', ''); // Remove spaces, if there are any. ES2021 feature
                const coordinates = _input.substring(0, 2); // The first to characters are coordinates
                const facing = _input[2]; // The third character is the orientation which the bot is facing.
                const input: number[] = parseInput(coordinates);
                if (input.length !== 2 || !facingInputList.includes(facing as Compass)) {
                    console.log('Please enter correct data');
                    throw 'Please enter correct data';
                }
                if (input[0] > gridSizeX){
                    console.log('Input X is bigger than the grid size on X');
                    throw 'Input X is bigger than the grid size on X';
                }
                if (input[1] > gridSizeY) {
                    console.log('Input Y is bigger than the grid size on Y');
                    throw('Input Y is bigger than the grid size on Y');
                }
                return ({ x: input[0], y: input[1], facing: facing as Compass });
            }
        
 

/* Function for asking the user for directions */
const directionInputList: DirectionInput[] = ['L', 'R', 'F'];
export async function AskForDirections(rl: ReadLine): Promise<DirectionInput[]> {
        const question2 = await prompt({
            type: 'text',
            name: "grid",
            message: 'Where do you want the robot to go? You can give directions by a sequence of characters. Valid characters are: \nF: Walk forward\nR: Turn right\nL: Turn left\n'});
                const input = question2.grid
                    .replace(' ', '')
                    .split('')
                    .filter((char: string) =>
                        directionInputList.includes(char as DirectionInput)
                    ) as DirectionInput[];
                return input;
            }
