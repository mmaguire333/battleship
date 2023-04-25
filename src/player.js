import { gameboard } from './gameboard.js';

export function player(name, typeOfPlayer) {
    return {
        name: name,
        previousShots: [],
        board: gameboard(),
        randomAttack() {
            let randcoordinate = Math.floor(Math.random() * 100);
            
            if(!this.previousShots.includes(randcoordinate)) {
                this.previousShots.push(randcoordinate)
                return randcoordinate;
            } else {
                return this.randomAttack();
            }
        },
        generateFleetData() {
            let fleet = [];

            
            for(let i = 0; i < 10; i++) {
                // randomly set orientation to "h" or "v"
                let orientation = Math.floor(Math.random() * 2) % 2 === 0 ? 'h' : 'v';

                // set length so that the length of the ships are 4, 3, 3, 2, 2, 2, 1, 1, 1, 1
                let length = -1;
                if(i === 0) {
                    length = 4;
                } else if(i === 1 || i === 2) {
                    length = 3;
                } else if(i >= 3 && i <= 5) {
                    length = 2
                } else if(i > 5) {
                    length = 1;
                }

                // randomly set position but make sure there are no intersections and ship is in bounds
                let position = -1;
                let availablePositions = [];
                
                let occupiedPositions = [];
                for(let j = 0; j < fleet.length; j++) {
                    if(fleet[j].orientation === 'h') {
                        for(let k = fleet[j].position; k < fleet[j].position + fleet[j].length; k++) {
                            occupiedPositions.push(k);
                        }
                    }

                    if(fleet[j].orientation === 'v') {
                        for(let k = fleet[j].position; k < fleet[j].position + 10 * fleet[j].length; k = k + 10) {
                            occupiedPositions.push(k);
                       }
                    }
                }

                
                for(let j = 0; j < 100; j++) {
                    let currentShipSquares = [];
                    let col = j % 10;
                    let row = Math.floor(j / 10);

                    if(orientation === 'h') {
                        // go to next iteration if current position causes ship to go out of bounds
                        if(col + length >= 10) {
                            continue;
                        }

                        if(j % 10 !== 0) {
                            currentShipSquares.push(j - 1);

                            if(j > 9) {
                                currentShipSquares.push(j - 1 - 10)
                            }

                            if(j < 90) {
                                currentShipSquares.push(j - 1 + 10);
                            }
                        }

                        if((j + length - 1) % 10 !== 9) {
                            currentShipSquares.push(j + 1);
                            
                            if(j > 9) {
                                currentShipSquares.push(j + 1 - 10);
                            }

                            if(j < 90) {
                                currentShipSquares.push(j + 1 + 10);
                            }
                        }

                        for(let k = j; k < j + length; k++) {
                            currentShipSquares.push(k);
                            
                            if(k > 9) {
                                currentShipSquares.push(k - 10);
                            }

                            if(k < 90) {
                                currentShipSquares.push(k + 10);
                            }
                        }
                    }

                    if(orientation === 'v') {
                        // go to next iteration if current position causes ship to go out of bounds
                        if(row + (length - 1) >= 10) {
                            continue;
                        }

                        if(j > 9) {
                            currentShipSquares.push(j - 10);

                            if(j % 10 !== 0) {
                                currentShipSquares.push(j - 10 - 1);
                            }

                            if(j % 10 !== 9) {
                                currentShipSquares.push(j - 10 + 1);
                            }
                        }
                        
                        if(j + 10 * (length - 1) < 90) {
                            currentShipSquares.push(j + 10 * length);

                            if(j % 10 !== 0) {
                                currentShipSquares.push(j + (10 * length) - 1);
                            }

                            if(j % 10 !== 9) {
                                currentShipSquares.push(j + (10 * length) + 1);
                            }
                        }

                        for(let k = j; k < j + 10 * length; k = k + 10) {
                            currentShipSquares.push(k);
                            
                            if(j % 10 !== 0) {
                                currentShipSquares.push(k - 1);
                            }
                            
                            if(j % 10 !== 9) {
                                currentShipSquares.push(k + 1);
                            }
                        }
                    }

                    //currentShipSquares = currentShipSquares.filter(elem => elem >= 0 && elem <= 99);
                    let intersection = currentShipSquares.some(square => occupiedPositions.includes(square));

                    if(intersection === false) {
                        availablePositions.push(j);
                    }
                }

                let randIndex = Math.floor(Math.random() * availablePositions.length);
                position = availablePositions[randIndex];
                
                fleet.push({position: position, orientation: orientation, length: length});
            }

            return fleet;
        }
    }
}