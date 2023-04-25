export function display(player, computer) {
    let playerBoard = document.querySelector('.player-one-grid');
    playerBoard.style.display = 'grid';
    playerBoard.style.gridTemplateColumns = 'repeat(10, 30px)';
    playerBoard.style.gridTemplateRows = 'repeat(10, 30px)';

    let computerBoard = document.querySelector('.player-two-grid');
    computerBoard.style.display = 'grid';
    computerBoard.style.gridTemplateColumns = 'repeat(10, 30px)';
    computerBoard.style.gridTemplateRows = 'repeat(10, 30px)';

    document.querySelector('.player-one-name').textContent = player.name;
    document.querySelector('.player-two-name').textContent = 'Computer';

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
                        playerGridCells[i].textContent = '\u00D7';
                        playerGridCells[i].style.fontSize = '50px';
                        playerGridCells[i].style.color = 'black';
                    } else {
                        playerGridCells[i].style.backgroundColor = 'blue';
                    }
                }

                if(player.board.grid[i].material === 'water' && player.board.grid[i].beenHit === true) {
                    playerGridCells[i].textContent = '\u2022';
                    playerGridCells[i].style.backgroundColor = '#eeeeee';
                    playerGridCells[i].style.color = 'black';
                }
            }
        },

        renderComputerBoard() {
            for(let i = 0; i < computer.board.grid.length; i++) {
                if(computer.board.grid[i].beenHit === true) {
                    if(computer.board.grid[i].material === 'ship') {
                        computerGridCells[i].style.backgroundColor = 'red';
                        computerGridCells[i].textContent = '\u00D7';
                        computerGridCells[i].style.fontSize = '50px';
                        computerGridCells[i].style.color = 'black';
                    }

                    if(computer.board.grid[i].material === 'water') {
                        computerGridCells[i].textContent = '\u2022';
                        computerGridCells[i].style.backgroundColor = '#eeeeee';
                        computerGridCells[i].style.color = 'black';
                    }
                }
            }
        },

        clearPlayerBoard() {
            for(let i = 0; i < playerGridCells.length; i++) {
                playerGridCells[i].textContent = '';
                playerGridCells[i].style.backgroundColor = 'white';
            }
        },

        clearComputerBoard() {
            for(let i = 0; i < computerGridCells.length; i++) {
                computerGridCells[i].textContent = '';
                computerGridCells[i].style.backgroundColor = 'white';
            }
        },

        displayWinMessage(winningPlayer) {
            document.querySelector('.winner-message').textContent = winningPlayer.name + ' wins!';
        }
    }
}