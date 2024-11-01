const board = document.getElementById('board');
const resetButton = document.getElementById('reset');

const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A8', '#33FFF7'];
const backgroundColors = ['#FFD700', '#ADFF2F', '#87CEFA', '#FFB6C1', '#DDA0DD', '#FFA07A'];

let grid = [];
let score = 0;

function createBoard() {
    for (let i = 0; i < 64; i++) {
        const candy = document.createElement('div');
        candy.classList.add('candy');

        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        candy.style.color = randomColor; // Candy color

        const randomBackgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
        candy.style.backgroundColor = randomBackgroundColor; // Background color

        candy.setAttribute('data-color', randomColor);
        candy.setAttribute('data-id', i);
        candy.addEventListener('click', handleCandyClick);
        board.appendChild(candy);
        grid.push(candy);
    }
}

function handleCandyClick() {
    const selectedCandy = this;
    const selectedColor = selectedCandy.getAttribute('data-color');
    
    // Find all candies with the same color
    const matchingCandies = grid.filter(candy => candy.getAttribute('data-color') === selectedColor);
    
    if (matchingCandies.length >= 3) {
        let points = 0;
        if (matchingCandies.length === 3) points = 5;
        else if (matchingCandies.length === 4) points = 10;
        else if (matchingCandies.length >= 5) {
            points = 20;
            createBomb(selectedCandy);
        }

        // Update score
        score += points;
        console.log(`Score: ${score}`);

        // Remove matched candies from the board
        matchingCandies.forEach(candy => {
            candy.style.display = 'none';
        });
        
        // Call function to refill the board
        refillBoard();
    }
}

function createBomb(candy) {
    candy.style.backgroundColor = '#000'; // Bomb color
    candy.style.color = '#FFF'; // Bomb text color
    candy.innerText = ''; // Display bomb
}

function refillBoard() {
    const candies = document.querySelectorAll('.candy');
    candies.forEach((candy, index) => {
        if (candy.style.display === 'none') {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            candy.style.color = randomColor;
            candy.style.backgroundColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
            candy.setAttribute('data-color', randomColor);
            candy.style.display = 'flex'; // Show the candy again
        }
    });
}

function resetGame() {
    board.innerHTML = '';
    grid = [];
    score = 0;
    createBoard();
}

resetButton.addEventListener('click', resetGame);
createBoard();
