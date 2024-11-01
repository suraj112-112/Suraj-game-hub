const cells = document.querySelectorAll('[data-cell]');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const celebrationMessage = document.getElementById('celebrationMessage');
const overlayRestartButton = document.getElementById('overlayRestartButton');
let isCircleTurn = false;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.textContent = '';
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    winnerMessage.textContent = '';
    isCircleTurn = false;
    celebrationOverlay.style.display = 'none';
    removeConfetti(); // Clear confetti from previous game
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
    cell.textContent = currentClass === 'x' ? '×' : '○';
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass);
        });
    });
}

function isDraw() {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
}

function endGame(draw, currentClass) {
    if (draw) {
        winnerMessage.textContent = 'Draw!';
    } else {
        winnerMessage.textContent = `${currentClass.toUpperCase()} Wins!`;
        celebrationMessage.textContent = `${currentClass.toUpperCase()} Wins! 🎉`;
        celebrationOverlay.style.display = 'flex';
        createConfetti(); // Generate confetti
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartButton.addEventListener('click', startGame);
overlayRestartButton.addEventListener('click', startGame);

function createConfetti() {
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        document.body.appendChild(confetti);
    }
}

function removeConfetti() {
    document.querySelectorAll('.confetti').forEach(confetti => confetti.remove());
}

startGame();
