const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restart");
const gameStatus = document.getElementById("status");
const winCondition = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
var marker = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
var running = false;

startGame();

function startGame() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click",function(){
        const cellIndex = this.getAttribute("index");

        if (marker[cellIndex] != "" || !running) {
            return;
        }

        updateCell(this,cellIndex);
        checkWinner();
    });
  }
  restartButton.addEventListener("click", restartGame);
  gameStatus.innerText = `${currentPlayer}'s turn`;
  running = true;
}
/** function to update each cell in the game */
function updateCell(cell, index) {
  marker[index] = currentPlayer;
  cell.innerText = currentPlayer;
}
function checkWinner() {
  let gameWon = false;

  for (let i = 0; i < winCondition.length; i++) {
    const condition = winCondition[i];
    const cellA = marker[condition[0]];
    const cellB = marker[condition[1]];
    const cellC = marker[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      gameWon = true;
      break;
    }
  }

  if (gameWon) {
    gameStatus.innerText = `${currentPlayer} wins!`;
    running = false;
  } else if (!marker.includes("")) {
    gameStatus.innerText = `Draw!`;
    running = false;
  } else {
    changePlayerTurn();
  }
}
/** function to change player turn "switch between x and 0" */
function changePlayerTurn() {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    gameStatus.innerText = `${currentPlayer}'s turn`;
}
/**function to restart game everytime restart button is pressed */
function restartGame() {
  currentPlayer = "X";
  marker = ["", "", "", "", "", "", "", "", ""];
  gameStatus.innerText = `${currentPlayer}'s turn`;
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
  }
  running = true;
}
