import readline from 'readline'; // Standard console input library from nodejs
import { AskForDirections, AskForGridSize, AskForStartingPos } from './PlayerInput/PlayerInput';
import Robot from './Robot/Robot';

/* Create an interface for player input */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/** Run async function to use await keyword */
const main = async () => {
    try {
        /* Ask for input variables from user */
        const gridSize = await AskForGridSize(rl);
        console.log(`You have chosen the grid size of ${gridSize.gridX}x${gridSize.gridY}`);
        const { x, y, facing } = await AskForStartingPos(rl, gridSize.gridX, gridSize.gridY);

        /* Create the robot object */
        const robot = new Robot(x, gridSize.gridY - y, facing, gridSize.gridX, gridSize.gridY);
        /* NOTE: regarding the robots Y-position: 
            The coordinate system described in the assignments test is not based on y=0 being at the bottom.
            Therefor, we recalculate the y-pos by doing gridSize.gridY - y in order to fix this. 
        */
        const directions = await AskForDirections(rl);

        robot.move(directions);
        robot.draw();
        console.log(
            `Your robot ended up at the position ${robot.x}, ${
                robot.gridY - robot.y
            } and was facing the direction ${robot.facing}`
        );
        process.exit(0);
    } catch (e) {
        /** Restart the application when an error is thrown. */
        console.log('Error: ' + String(e));
        console.log('Restarting application');
        main();
    }
};
main();
