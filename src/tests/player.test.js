import { player } from "../player";

describe('Player factory tests', () => {
    let testPlayer;

    beforeEach(() => {
        testPlayer = player('Test Player');
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

    test('Generate fleet data should be an array of length 10', () => {
        expect(testPlayer.generateFleetData().length).toBe(10);
    });

    test('Elements of fleet data should have length attributes of 4, 3, 3, 2, 2, 2, 1, 1, 1, 1', () => {
        let data = testPlayer.generateFleetData();
        expect(data[0].length).toBe(4);
        expect(data[1].length).toBe(3);
        expect(data[2].length).toBe(3);
        expect(data[3].length).toBe(2);
        expect(data[4].length).toBe(2);
        expect(data[5].length).toBe(2);
        expect(data[6].length).toBe(1);
        expect(data[7].length).toBe(1);
        expect(data[8].length).toBe(1);
        expect(data[9].length).toBe(1);
    });

    test('Ships in fleet should not overlap with any others', () => {
        let data = testPlayer.generateFleetData();
        let occupiedSquares = [];
        for(let i = 0; i < data.length; i++) {
            if(data[i].orientation === 'h') {
                for(let j = data[i].position; j < data[i].position + data[i].length; j++) {
                    occupiedSquares.push(j);
                }
            }

            if(data[i].orientation === 'v') {
                for(let j = data[i].position; j < data[i].position + (10 * data[i].length); j = j + 10) {
                    occupiedSquares.push(j);
                }
            }
        }

        let duplicates = occupiedSquares.filter((item, index) => occupiedSquares.indexOf(item) !== index);
        expect(duplicates.length).toBe(0);
    });

    test('Any two random ships in fleet should not overlap or touch eachother', () => {
        let data = testPlayer.generateFleetData();
        let numCollisions = 0;

        for(let n = 0; n < data.length; n++) {
            for(let m = 0; m < data.length; m++) {
                if(m !== n) {
                    let shipOne = data[n];
                    let shipOneSquares = [];
                    let shipTwo = data[m];
                    let shipTwoSquares = [];

                    if(shipOne.orientation === 'h') {
                        for(let i = shipOne.position; i < shipOne.position + shipOne.length; i++) {
                            shipOneSquares.push(i);
                        }
                    }

                    if(shipOne.orientation == 'v') {
                        for(let i = shipOne.position; i < shipOne.position + 10 * shipOne.length; i = i + 10) {
                            shipOneSquares.push(i);
                        }
                    }

                    if(shipTwo.orientation === 'h') {
                        for(let i = shipTwo.position; i < shipTwo.position + shipTwo.length; i++) {
                            shipTwoSquares.push(i);
                        }
                    }

                    if(shipTwo.orientation === 'v') {
                        for(let i = shipTwo.position; i < shipTwo.position + 10 * shipTwo.length; i = i + 10) {
                            shipTwoSquares.push(i);
                        }
                    }

                    for(let i = 0; i < shipOneSquares.length; i++) {
                        for(let j = 0; j < shipTwoSquares.length; j++) {
                            let first = shipOneSquares[i].position;
                            let second = shipTwoSquares[j].position;

                            if(Math.floor(first / 100) === Math.floor(second)) {
                                if(second === first - 1 || second === first || second === first + 1) {
                                    numCollisions++;
                                }
                            } else if(Math.floor(first / 100) === Math.floor(second + 1)) {
                                if(second === first - 10 || second === first - 10 - 1 || second === first - 10 + 1) {
                                    numCollisions++;
                                }
                            } else if(Math.floor(first / 100) === Math.floor(second - 1)) {
                                if(second === first + 10 || second === first + 10 - 1 || second === first + 10 + 1) {
                                    numCollisions++;
                                }
                            }
                        }
                    }
                }
            }
        }
        
        expect(numCollisions).toBe(0);
    });
}); 