import { ship } from '../ship';

describe('Ship factory tests', () => {
    let testShip;
    beforeEach(() => {
        testShip = ship(0, 'h', 4);
    });

    test('Test that ship can be hit', () => {
        testShip.hit();
        expect(testShip.numHits).toBe(1);
    });

    test('Test that ship can be hit multiple times', () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.numHits).toBe(2);
    });

    test('Test that ship is not sunk', () => {
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(false)
    });

    test('Test that ship can be sunk', () => {
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    });

    test('That that ship cannot be hit more times than its length', () => {
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.numHits).toBeLessThanOrEqual(testShip.length);
    });
})
