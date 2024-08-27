const gameBoard = document.getElementById('gameBoard');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('resetButton');
const gameStatus = document.getElementById('gameStatus');

let currentPlayer = 'X';
let boardState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    // Horizontal win conditions
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Vertical win conditions
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonal win conditions
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cellIndex = event.target.getAttribute('data-index');

    if (boardState[cellIndex] !== null || !gameActive || currentPlayer !== 'X') {
        return;
    }

    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    if (checkWin(boardState)) {
        gameStatus.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== null)) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = 'O';
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    setTimeout(computerMove, 500);  // Add delay for computer move
}

function computerMove() {
    if (!gameActive) return;

    let availableCells = boardState.map((cell, index) => cell === null ? index : null).filter(index => index !== null);
    if (availableCells.length === 0) return;

    // Check if the computer can win
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] === 'O' && boardState[b] === 'O' && boardState[c] === null) {
            boardState[c] = 'O';
            cells[c].textContent = 'O';
            finalizeMove();
            return;
        }
        if (boardState[a] === 'O' && boardState[c] === 'O' && boardState[b] === null) {
            boardState[b] = 'O';
            cells[b].textContent = 'O';
            finalizeMove();
            return;
        }
        if (boardState[b] === 'O' && boardState[c] === 'O' && boardState[a] === null) {
            boardState[a] = 'O';
            cells[a].textContent = 'O';
            finalizeMove();
            return;
        }
    }

    // Check if the player is about to win and block them
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (boardState[a] === 'X' && boardState[b] === 'X' && boardState[c] === null) {
            boardState[c] = 'O';
            cells[c].textContent = 'O';
            finalizeMove();
            return;
        }
        if (boardState[a] === 'X' && boardState[c] === 'X' && boardState[b] === null) {
            boardState[b] = 'O';
            cells[b].textContent = 'O';
            finalizeMove();
            return;
        }
        if (boardState[b] === 'X' && boardState[c] === 'X' && boardState[a] === null) {
            boardState[a] = 'O';
            cells[a].textContent = 'O';
            finalizeMove();
            return;
        }
    }

    // Otherwise, choose a random move
    const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    boardState[randomIndex] = 'O';
    cells[randomIndex].textContent = 'O';
    finalizeMove();
}

function finalizeMove() {
    if (checkWin(boardState)) {
        gameStatus.textContent = 'O wins!';
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== null)) {
        gameStatus.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = 'X';
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWin(boardState) {
    return winningConditions.some(condition => {
        const [a, b, c] = condition;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    currentPlayer = 'X';
    boardState = Array(9).fill(null);
    gameActive = true;
    gameStatus.textContent = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ''));
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

gameStatus.textContent = `It's ${currentPlayer}'s turn`;
