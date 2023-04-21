import { gameboard } from "./gameboard";

export function player(name) {
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
        }
    }
}