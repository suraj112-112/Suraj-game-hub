const gameContainer = document.getElementById("gameContainer");
const scoreDisplay = document.getElementById("score");
let score = 0;
const gridSize = 8; // 8x8 grid

// Function to initialize the game board
function createGrid() {
    gameContainer.innerHTML = '';
    score = 0;
    scoreDisplay.textContent = score;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const block = document.createElement("div");
        block.classList.add("block");
        block.addEventListener("click", () => fillBlock(block));
        gameContainer.appendChild(block);
    }
}

// Function to fill a block and update score
function fillBlock(block) {
    if (!block.classList.contains("filled")) {
        block.classList.add("filled");
        score += 5;
        scoreDisplay.textContent = score;

        // Check win condition
        if (isGameComplete()) {
            alert("Congratulations! You've filled all blocks!");
            resetGame();
        }
    }
}

// Function to check if all blocks are filled
function isGameComplete() {
    const blocks = document.querySelectorAll(".block");
    return [...blocks].every(block => block.classList.contains("filled"));
}

// Function to reset the game
function resetGame() {
    createGrid();
}

// Initialize the game on page load
window.onload = createGrid;
