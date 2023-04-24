export function display(player, computer) {
    let playerBoard = document.querySelector('.player-one-grid');
    playerBoard.style.display = 'grid';
    playerBoard.style.gridTemplateColumns = 'repeat(10, 30px)';
    playerBoard.style.gridTemplateRows = 'repeat(10, 30px)';

    let computerBoard = document.querySelector('.player-two-grid');
    computerBoard.style.display = 'grid';
    computerBoard.style.gridTemplateColumns = 'repeat(10, 30px)';
    computerBoard.style.gridTemplateRows = 'repeat(10, 30px)';

    let playerGridCells = [];
    let computerGridCells = [];

    for(let i = 0; i < 100; i++) {
        let playerSquare = document.createElement('div');
        playerSquare.id = i;
        playerSquare.classList.add('player-grid-square');
        playerGridCells.push(playerSquare);

        let computerSquare = document.createElement('div');
        computerSquare.classList.add('computer-grid-square');
        computerSquare.id = i;
        computerGridCells.push(computerSquare);

        playerBoard.appendChild(playerSquare);
        computerBoard.appendChild(computerSquare);
    }

    return {
        playerBoard: playerBoard,
        computerBoard: computerBoard,

        renderPlayerBoard() {
            for(let i = 0; i < player.board.grid.length; i++) {
                if(player.board.grid[i].material === 'ship') {
                    if(player.board.grid[i].beenHit === true) {
                        playerGridCells[i].style.backgroundColor = 'red';
                    } else {
                        playerGridCells[i].style.backgroundColor = 'blue'
                    }
                }

                if(player.board.grid[i].material === 'water' && player.board.grid[i].beenHit === true) {
                    playerGridCells[i].style.backgroundColor = 'green';
                }
            }
        },

        renderComputerBoard() {
            for(let i = 0; i < computer.board.grid.length; i++) {
                if(computer.board.grid[i].beenHit === true) {
                    if(computer.board.grid[i].material === 'ship') {
                        computerGridCells[i].style.backgroundColor = 'red'
                    }

                    if(computer.board.grid[i].material === 'water') {
                        computerGridCells[i].style.backgroundColor = 'green';
                    }
                }
            }
        },

        displayWinMessage(winningPlayer) {
            document.querySelector('.winner-message').textContent = winningPlayer.name + ' wins!';
        }
    }
}