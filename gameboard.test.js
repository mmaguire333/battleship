import exp from 'constants';
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
        expect(gb.placeShip(horizontalShip)).toBe(true);
    });

    test('Placing horizontal ship changes correct grid cells material to ship', () => {
        gb.placeShip(horizontalShip);
        expect(gb.grid[23].material).toBe('ship');
        expect(gb.grid[24].material).toBe('ship');
        expect(gb.grid[25].material).toBe('ship');
        expect(gb.grid[26].material).toBe('ship');
    });

    test('Placing horizontal ship out of bounds returns false', () => {
        expect(gb.placeShip(invalidHorizontalShip)).toBe(false);
    });

    test('Placing horizontal ship out of bounds should leave all grid cells unchanged', () => {
        gb.placeShip(invalidHorizontalShip);
        for(let i = 0; i < 100; i++) {
            expect(gb.grid[i].material).toBe('water');
        }
    });

    test('Placing vertical ship returns true', () => {
        expect(gb.placeShip(verticalShip)).toBe(true);
    })

    test('Placing vertical ship changes correct grid cells material to ship', () => {
        gb.placeShip(verticalShip);
        expect(gb.grid[15].material).toBe('ship');
        expect(gb.grid[25].material).toBe('ship');
        expect(gb.grid[35].material).toBe('ship');
    });

    test('Placing vertical ship out of bounds returns false', () => {
        expect(gb.placeShip(invalidVertiaclShip)).toBe(false);
    });

    test('Placing vertical ship out of bounds should leave all grid cells unchanged', () => {
        gb.placeShip(invalidVertiaclShip);
        for(let i = 0; i < 100; i++) {
            expect(gb.grid[i].material).toBe('water');
        }
    });

    test('Placing ship that collides with other ship return false', () => {
        gb.placeShip(horizontalShip);
        expect(gb.placeShip(verticalShip)).toBe(false);
    });

    test('Placing ship that collides with other ship leaves grid cells material unchanged', () => {
        gb.placeShip(horizontalShip);
        gb.placeShip(verticalShip);
        expect(gb.grid[15].material).toBe('water');
        expect(gb.grid[25].material).toBe('ship');
        expect(gb.grid[35].material).toBe('water');
    });

    test('Placing ships that do not collide returns true', () => {
        gb.placeShip(verticalShip);
        expect(gb.placeShip(nonCollisionShip)).toBe(true);
    });

    test('Placing ships that do not collide changes correct grid cells material to ship', () => {
        gb.placeShip(verticalShip);
        gb.placeShip(nonCollisionShip);
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
    
    test('Recieve attack returns true on attacking cell that has not been hit', () => {
        expect(gb.recieveAttack(25)).toBe(true);
    });

    test('Recieve attack returns false if coordinate has already been hit', () => {
        gb.recieveAttack(25);
        expect(gb.recieveAttack(25)).toBe(false);
    })
});