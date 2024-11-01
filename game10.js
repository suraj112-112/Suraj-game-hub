const gridElement = document.getElementById("grid");
const wordListElement = document.getElementById("wordList");
const messageElement = document.getElementById("message");
const levelSelect = document.getElementById("levelSelect");

const words = {
    easy: ["CAT", "DOG", "BAT", "SUN", "CAR", "TREE", "BIRD", "FISH", "HAT", "RAT"],
    medium: ["HOUSE", "MOUSE", "PLANE", "TRAIN", "APPLE", "BOTTLE", "PENCIL", "TABLE", "CHAIR", "WINDOW"],
};

const gridSize = 10;
let grid = [];
let currentWords = [];

// Initialize the game
function initGame() {
    grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(""));
    const selectedLevel = levelSelect.value;
    currentWords = words[selectedLevel];
    placeWords();
    renderGrid();
    renderWordList();
}

// Place words in the grid
function placeWords() {
    currentWords.forEach(word => {
        let placed = false;

        while (!placed) {
            const direction = Math.random() < 0.5 ? "horizontal" : "vertical";
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);

            if (canPlaceWord(word, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    if (direction === "horizontal") {
                        grid[row][col + i] = word[i];
                    } else {
                        grid[row + i][col] = word[i];
                    }
                }
                placed = true;
            }
        }
    });
}

// Check if a word can be placed
function canPlaceWord(word, row, col, direction) {
    if (direction === "horizontal" && col + word.length > gridSize) return false;
    if (direction === "vertical" && row + word.length > gridSize) return false;

    for (let i = 0; i < word.length; i++) {
        const cellValue = direction === "horizontal" ? grid[row][col + i] : grid[row + i][col];
        if (cellValue !== "" && cellValue !== word[i]) {
            return false;
        }
    }
    return true;
}

// Render the grid
function renderGrid() {
    gridElement.innerHTML = "";
    grid.forEach((row, rowIndex) => {
        row.forEach((cellValue, colIndex) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.textContent = cellValue || "";
            cellElement.onclick = () => selectCell(rowIndex, colIndex);
            gridElement.appendChild(cellElement);
        });
    });
}

// Render the word list
function renderWordList() {
    wordListElement.innerHTML = "";
    currentWords.forEach(word => {
        const wordElement = document.createElement("div");
        wordElement.classList.add("word");
        wordElement.textContent = word;
        wordListElement.appendChild(wordElement);
    });
}

// Handle cell selection
function selectCell(row, col) {
    const cell = gridElement.children[row * gridSize + col];
    if (cell.classList.contains("selected")) {
        cell.classList.remove("selected");
    } else {
        cell.classList.add("selected");
    }
    checkWin();
}

// Check if player has won
function checkWin() {
    const selectedCells = document.querySelectorAll(".cell.selected");
    const selectedLetters = Array.from(selectedCells).map(cell => cell.textContent);
    const selectedWord = selectedLetters.join("");

    if (currentWords.includes(selectedWord)) {
        messageElement.textContent = `Congratulations! You found the word: ${selectedWord}`;
    } else {
        messageElement.textContent = "";
    }
}

// Reset the game
function resetGame() {
    initGame();
    messageElement.textContent = "";
}

// Start the game on page load
window.onload = initGame;
