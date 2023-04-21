import { player } from "./player";

describe('Player factory tests', () => {
    let testPlayer;
    let extraLargeData;
    let largeData;
    let mediumData;
    let smallData;

    beforeEach(() => {
        testPlayer = player('Test Player');
        extraLargeData = testPlayer.generateExtraLargeShipData()
    });

    test('randomAttack generates integer coordinate between 0 and 99', () => {
        expect(testPlayer.randomAttack()).toBeGreaterThanOrEqual(0);
        expect(testPlayer.randomAttack()).toBeLessThanOrEqual(99)
    });

    test('randomAttack should return coordinate not contained in previousShots array', () => {
        let randomInt = Math.floor(Math.random() * 100);
        for(let i = 0; i < randomInt; i++) {
            testPlayer.previousShots.push(i);
        }

        for(let i = randomInt + 1; i < 100; i++) {
            testPlayer.previousShots.push(i);
        }

        expect(testPlayer.randomAttack()).toBe(randomInt);
    });


}); 