export function gameboard() {
    let grid = [];
    for(let i = 0; i < 100; i++) {
        grid.push({material: 'water', beenHit: false});
    }

    return {
        grid: grid,

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
                if(row + ship.length >= 10) {
                    return true;
                } else {
                    return false;
                }
            }
        },

        placeShip(ship) {
            // reject placement if ship goes out of bounds
            if(this.shipOutOfBounds(ship)) {
                return false;
            }

            // reject placement if it causes collision with previously place ship
            if(ship.orientation === 'h') {
                for(let i = ship.position; i < ship.position + ship.length; i++) {
                    if(this.grid[i].material === 'ship') {
                        return false;
                    }
                }
            } else if(ship.orientation === 'v') {
                for(let i = ship.position; i <= ship.position + 10 * (ship.length - 1); i = i + 10) {
                    if(this.grid[i].material === 'ship') {
                        return false;
                    }
                }
            }

            if(ship.orientation === 'h') {
                for(let i = ship.position; i < ship.position + ship.length; i++) {
                    this.grid[i].material = 'ship';
                }
            }

            if(ship.orientation === 'v') {
                for(let i = ship.position; i <= ship.position + 10 * (ship.length - 1); i = i + 10) {
                    this.grid[i].material = 'ship';
                }
            }

            return true;
        },

        recieveAttack(attackPosition) {
            if(this.grid[attackPosition].beenHit === false) {
                this.grid[attackPosition].beenHit = true;
                return true;
            } else {
                return false;
            }
        }
    }
}