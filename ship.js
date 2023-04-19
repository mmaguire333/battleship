export function ship(position, orientation, length) {
    return {
        position: position,
        orientation: orientation,
        length: length,
        numHits: 0,
        hit() {
            if(!this.isSunk()) {
                this.numHits++;
            }
        },
        isSunk() {
            if(this.numHits >= this.length) {
                return true;
            } else {
                return false;
            }
        }
    }
}