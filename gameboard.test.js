import { gameboard } from './gameboard';
import { ship } from './ship';

describe('Gameboard factory tests', () => {
    let gb;
    let horizontalShip;
    let verticalShip;
    let invalidHorizontalShip;
    let invalidVertiaclShip;
    let nonCollisionShip;
    beforeEach(() => {
        gb = gameboard();
        horizontalShip = ship(23, 'h', 4);
        verticalShip = ship(15, 'v', 3);
        nonCollisionShip = ship(17, 'v', 5);
        invalidHorizontalShip = ship(38, 'h', 5);
        invalidVertiaclShip = ship(93, 'v', 4);
    });

    test('Initalize board grid', () => {
        expect(gb.grid.length).toBe(100);
    });

    test('Placing horizontal ship returns true', () => {
        expect(gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length)).toBe(true);
    });

    test('Placing horizontal ship changes correct grid cells material to ship', () => {
        gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length);
        expect(gb.grid[23].material).toBe('ship');
        expect(gb.grid[24].material).toBe('ship');
        expect(gb.grid[25].material).toBe('ship');
        expect(gb.grid[26].material).toBe('ship');
    });

    test('Placing horizontal ship out of bounds returns false', () => {
        expect(gb.placeShip(invalidHorizontalShip.position, invalidHorizontalShip.orientation, invalidHorizontalShip.length)).toBe(false);
    });

    test('Placing horizontal ship out of bounds should leave all grid cells unchanged', () => {
        gb.placeShip(invalidHorizontalShip.position, invalidHorizontalShip.orientation, invalidHorizontalShip.length);
        for(let i = 0; i < 100; i++) {
            expect(gb.grid[i].material).toBe('water');
        }
    });

    test('Placing vertical ship returns true', () => {
        expect(gb.placeShip(verticalShip.position, verticalShip.orientation, verticalShip.length)).toBe(true);
    })

    test('Placing vertical ship changes correct grid cells material to ship', () => {
        gb.placeShip(verticalShip.position, verticalShip.orientation, verticalShip.length);
        expect(gb.grid[15].material).toBe('ship');
        expect(gb.grid[25].material).toBe('ship');
        expect(gb.grid[35].material).toBe('ship');
    });

    test('Placing vertical ship out of bounds returns false', () => {
        expect(gb.placeShip(invalidVertiaclShip.position, invalidVertiaclShip.orientation, invalidVertiaclShip.length)).toBe(false);
    });

    test('Placing vertical ship out of bounds should leave all grid cells unchanged', () => {
        gb.placeShip(invalidVertiaclShip.position, invalidVertiaclShip.orientation, invalidVertiaclShip.length);
        for(let i = 0; i < 100; i++) {
            expect(gb.grid[i].material).toBe('water');
        }
    });

    test('Placing ship that collides with other ship return false', () => {
        gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length);
        expect(gb.placeShip(verticalShip.position, verticalShip.orientation, verticalShip.length)).toBe(false);
    });

    test('Placing ship that collides with other ship leaves grid cells material unchanged', () => {
        gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length);
        gb.placeShip(verticalShip.position, verticalShip.orientation, verticalShip.length);
        expect(gb.grid[15].material).toBe('water');
        expect(gb.grid[25].material).toBe('ship');
        expect(gb.grid[35].material).toBe('water');
    });

    test('Placing ships that do not collide returns true', () => {
        gb.placeShip(verticalShip.position, verticalShip.orientation, verticalShip.length);
        expect(gb.placeShip(nonCollisionShip.position, nonCollisionShip.orientation, nonCollisionShip.length)).toBe(true);
    });

    test('Placing ships that do not collide changes correct grid cells material to ship', () => {
        gb.placeShip(verticalShip.position, verticalShip.orientation, verticalShip.length);
        gb.placeShip(nonCollisionShip.position, nonCollisionShip.orientation, nonCollisionShip.length);
        expect(gb.grid[15].material).toBe('ship');
        expect(gb.grid[25].material).toBe('ship');
        expect(gb.grid[35].material).toBe('ship');
        expect(gb.grid[17].material).toBe('ship');
        expect(gb.grid[27].material).toBe('ship');
        expect(gb.grid[37].material).toBe('ship');
        expect(gb.grid[47].material).toBe('ship');
        expect(gb.grid[57].material).toBe('ship');
    });

    test('Recieve attack changes beenHit to true for correct coordinates', () => {
        gb.recieveAttack(33);
        expect(gb.grid[33].beenHit).toBe(true)
    });
 
    test('Call hit function on ship that gets hit', () => {
        gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length);
        gb.recieveAttack(24);
        gb.recieveAttack(25)
        expect(gb.ships[0].numHits).toBe(2);
    });

    test('Prevent ship from being hit twice on the same coordinate', () => {
        gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length);
        gb.recieveAttack(24);
        gb.recieveAttack(24);
        expect(gb.ships[0].numHits).toBe(1);
    });

    test('Recieve attack should return "hit" if ship is hit', () => {
        gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length);
        expect(gb.recieveAttack(24)).toBe('hit');
    });

    test('Recieve attack should return "miss" if a ship is not hit', () => {
        gb.placeShip(horizontalShip.position, horizontalShip.orientation, horizontalShip.length);
        expect(gb.recieveAttack(60)).toBe('miss');
    });
});