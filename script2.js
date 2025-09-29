document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll("[data-cell]");
  const statusText = document.getElementById("statusText");
  const restartBtn = document.getElementById("restartBtn");

  let currentPlayer = "X";
  let running = false;
  let options = ["", "", "", "", "", "", "", "", ""];

  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  initializeGame();

  function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    running = true;
  }

  function cellClicked() {
    const cellIndex = Array.from(cells).indexOf(this);

    if (options[cellIndex] !== "" || !running) return;

    updateCell(this, cellIndex);
    checkWinner();
  }

  function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
  }

  function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }

  function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i];
      if (options[a] && options[a] === options[b] && options[a] === options[c]) {
        roundWon = true;
        break;
      }
    }

    if (roundWon) {
      statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
      running = false;
    } else if (!options.includes("")) {
      statusText.textContent = "Draw! 😮";
      running = false;
    } else {
      changePlayer();
    }
  }

  function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
  }
});
