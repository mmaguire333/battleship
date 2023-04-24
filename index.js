import { player } from './player.js'
import { display } from './display.js';

function checkWin(gameboard) {
    for(let i = 0; i < gameboard.ships.length; i++) {
        if(gameboard.ships[i].isSunk() === false) {
            return false;
        }
    }

    return true;
}

// Declare player and game variables and initialize them on form submission
let humanPlayer;
let computer;
let humanFleetData;
let computerFleetData;
let boardDisplays;

// Form event listener 
document.getElementById('form-submit').addEventListener('click', () => {
    let playerName = document.getElementById('player-name').value;

    // Initialize players
    humanPlayer = player(playerName);
    computer = player('Computer');

    // Randomly generate data for their ships
    humanFleetData = humanPlayer.generateFleetData();
    computerFleetData = computer.generateFleetData();

    // Add those ships to their gameboards
    for(let i = 0; i < humanFleetData.length; i++) {
        humanPlayer.board.placeShip(humanFleetData[i].position, humanFleetData[i].orientation, humanFleetData[i].length);
    }

    for(let i = 0; i < computerFleetData.length; i++) {
        computer.board.placeShip(computerFleetData[i].position, computerFleetData[i].orientation, computerFleetData[i].length);
    }
    
    // Initialize board diplays and render ships on players board
    boardDisplays = display(humanPlayer, computer);
    boardDisplays.renderPlayerBoard();
    boardDisplays.renderComputerBoard();

    document.querySelector('form').style.display = 'none';
});


// Listen for player attacking enemy board, execute attack, then have computer counterattack -- this serves as the game loop
document.addEventListener('click', (e) => {
    let target = e.target.closest('.computer-grid-square');

    if(target) {
        let playerAttackIndex = Number(target.id);

        if(humanPlayer.previousShots.includes(playerAttackIndex)) {
            return;
        }

        humanPlayer.previousShots.push(playerAttackIndex);
        computer.board.recieveAttack(playerAttackIndex);
        boardDisplays.renderComputerBoard(playerAttackIndex);

        if(checkWin(computer.board)) {
            boardDisplays.displayWinMessage(humanPlayer);
            return;
        }

        // Computer returns fire after 2 seconds
        setTimeout(() =>{
            let computerAttackIndex = computer.randomAttack();
            humanPlayer.board.recieveAttack(computerAttackIndex);
            boardDisplays.renderPlayerBoard();

            if(checkWin(humanPlayer.board)) {
                boardDisplays.displayWinMessage(computer);
                return;
            }
        }, 200);
    }
})