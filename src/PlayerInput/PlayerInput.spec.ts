import assert from 'assert';
import { parseInput } from '../PlayerInput/PlayerInput';

describe('parseInput', function () {
    it('Should return the number array [2,5].', function () {
        assert.equal(parseInput('25').toString(), [2, 5].toString());
    });
    it('Should return the number array [6,2].', function () {
        assert.equal(parseInput('625').toString(), [6, 2].toString());
    });
    it('Should return the number array [9,1].', function () {
        assert.equal(parseInput('91F').toString(), [9, 1].toString());
    });
});
