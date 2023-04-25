import { ship } from './ship.js';

export function gameboard() {
    let grid = [];
    for(let i = 0; i < 100; i++) {
        grid.push({material: 'water', beenHit: false});
    }

    return {
        grid: grid,
        ships: [],

        shipOutOfBounds(ship) {
            let col = ship.position % 10;
            let row = Math.floor(ship.position / 10);

            if(ship.orientation === 'h') {
                if(col + ship.length >= 10) {
                    return true;
                } else {
                    return false;
                }
            }

            if(ship.orientation === 'v') {
                if(row + ship.length - 1 >= 10) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        placeShip(shipPosition, shipOrientation, shipLength) {
            let newShip = ship(shipPosition, shipOrientation, shipLength);

            // reject placement if ship goes out of bounds
            if(this.shipOutOfBounds(newShip)) {
                return false;
            }

            // reject placement if it causes collision with previously place ship
            if(newShip.orientation === 'h') {
                for(let i = newShip.position; i < newShip.position + newShip.length; i++) {
                    if(this.grid[i].material === 'ship') {
                        return false;
                    }
                }
            } else if(newShip.orientation === 'v') {
                for(let i = newShip.position; i <= newShip.position + 10 * (newShip.length - 1); i = i + 10) {
                    if(this.grid[i].material === 'ship') {
                        return false;
                    }
                }
            }

            if(newShip.orientation === 'h') {
                for(let i = newShip.position; i < newShip.position + newShip.length; i++) {
                    this.grid[i].material = 'ship';
                }
            }

            if(newShip.orientation === 'v') {
                for(let i = newShip.position; i <= newShip.position + 10 * (newShip.length - 1); i = i + 10) {
                    this.grid[i].material = 'ship';
                }
            }

            this.ships.push(newShip);
            return true;
        },

        getShipAtCoordinate(coordinate) {
            for(let i = 0; i < this.ships.length; i++) {
                if(this.ships[i].orientation === 'h') {
                    for(let j = this.ships[i].position; j < this.ships[i].position + this.ships[i].length; j++) {
                        if(j === coordinate) {
                            return this.ships[i];
                        }
                    }
                }

                if(this.ships[i].orientation === 'v') {
                    for(let j = this.ships[i].position; j <= this.ships[i].position + 10 * this.ships[i].length; j = j + 10) {
                        if(j === coordinate) {
                            return this.ships[i];
                        }
                    }
                }
            }
        },

        recieveAttack(attackPosition) {
            // attacked ship will be a ship object or undefined if attackPosition is not on a ship
            let attackedShip = this.getShipAtCoordinate(attackPosition);

            if(this.grid[attackPosition].beenHit === false) {
                this.grid[attackPosition].beenHit = true;

                // attackedShip must be a ship object in order to call hit
                if(attackedShip != undefined) {
                    attackedShip.hit();
                    return 'hit';
                } else {
                    return 'miss';
                }
            }
        }
    }
}