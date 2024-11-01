let randomNumber;
let attempts = 0; // Number of attempts

function startGame() {
    randomNumber = Math.floor(Math.random() * 3) + 1; // Random number between 1 and 3
    attempts = 0; // Reset attempts
    document.getElementById('resultMessage').innerText = ''; // Clear message
    document.getElementById('restartGame').classList.add('hidden'); // Hide restart button
    generateGuessOptions(); // Generate guess buttons
}

function generateGuessOptions() {
    const guessOptionsDiv = document.getElementById('guessOptions');
    guessOptionsDiv.innerHTML = ''; // Clear previous options

    // Create three options
    const options = [];
    while (options.length < 3) {
        const option = Math.floor(Math.random() * 3) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    // Ensure the correct answer is included
    options[Math.floor(Math.random() * 3)] = randomNumber;

    options.forEach(option => {
        const guessButton = document.createElement('button');
        guessButton.innerText = option; // Display the option
        guessButton.addEventListener('click', () => makeGuess(option)); // Add click event
        guessOptionsDiv.appendChild(guessButton); // Append button to options
    });
}

function makeGuess(guess) {
    attempts++; // Increment attempts

    if (guess === randomNumber) {
        document.getElementById('resultMessage').innerHTML = `<span class="congratulations">Congratulations! 🎉</span> You guessed the correct number ${randomNumber} in ${attempts} attempts!`;
        document.getElementById('restartGame').classList.remove('hidden'); // Show restart button
        disableGuessButtons(); // Disable buttons after guessing
    } else {
        document.getElementById('resultMessage').innerText = 'Sorry, that\'s not correct. Try again!';
    }
}

// Disable guess buttons after winning
function disableGuessButtons() {
    const guessButtons = document.querySelectorAll('#guessOptions button');
    guessButtons.forEach(button => {
        button.disabled = true; // Disable all guess buttons
    });
}

// Restart the game
document.getElementById('restartGame').addEventListener('click', startGame);

// Start the game initially
startGame();
