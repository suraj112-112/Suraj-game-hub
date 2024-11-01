const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('game-over');
let score = 0;
let missedBubbles = 0;

// रंगीन बबल्स के लिए रंगों की सूची
const colors = ['#ff6f61', '#6b5b95', '#88b04b', '#f7cac9', '#92a8d1'];

// बबल बनाने का कार्य
function createBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    bubble.style.left = Math.floor(Math.random() * 350) + 'px';

    bubble.addEventListener('click', () => {
        score += 10;
        scoreDisplay.innerText = score;
        bubble.remove();
    });

    bubble.addEventListener('animationend', () => {
        bubble.remove();
        missedBubbles += 1;

        if (missedBubbles >= 3) {
            endGame();
        }
    });

    gameArea.appendChild(bubble);
}

// गेम खत्म करने का कार्य
function endGame() {
    gameOverMessage.classList.remove('hidden');
    clearInterval(bubbleInterval);
}

// हर 1 सेकंड में बबल बनाना शुरू करें
const bubbleInterval = setInterval(createBubble, 1000);
