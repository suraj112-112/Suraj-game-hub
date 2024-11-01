let selectedBottle = null;

// Function to handle bottle selection
function selectBottle(index) {
    const bottles = document.querySelectorAll('.bottle');
    const bottle = bottles[index];

    if (selectedBottle === null) {
        selectedBottle = bottle;
        bottle.classList.add('selected');
    } else {
        if (selectedBottle !== bottle) {
            animatePour(selectedBottle, bottle);
            selectedBottle.classList.remove('selected');
            selectedBottle = null;
        }
    }
}

// Function to animate water pouring from one bottle to another
function animatePour(fromBottle, toBottle) {
    fromBottle.classList.add('pouring');
    setTimeout(() => {
        pourWater(fromBottle, toBottle);
        fromBottle.classList.remove('pouring');
    }, 600);
}

// Function to pour water from one bottle to another
function pourWater(fromBottle, toBottle) {
    const fromLayers = fromBottle.querySelectorAll('.layer');
    const toLayers = toBottle.querySelectorAll('.layer');
    const fromTopColor = getTopColor(fromLayers);
    const toTopColor = getTopColor(toLayers);

    if (fromTopColor && (toTopColor === null || fromTopColor === toTopColor)) {
        const fromTopLayer = [...fromLayers].find(layer => layer.classList.contains(fromTopColor));
        if (fromTopLayer) {
            toBottle.insertBefore(fromTopLayer, toLayers[0] || null);
            checkWinCondition();
        }
    }
}

// Helper function to get the top color of a bottle
function getTopColor(layers) {
    for (let layer of layers) {
        if (layer.classList.length > 1) {
            return layer.classList[1];
        }
    }
    return null;
}

// Function to check if all bottles are sorted correctly
function checkWinCondition() {
    const bottles = document.querySelectorAll('.bottle');
    let isWin = true;
    bottles.forEach(bottle => {
        const layers = bottle.querySelectorAll('.layer');
        if (layers.length > 0) {
            const color = layers[0].classList[1];
            if (![...layers].every(layer => layer.classList.contains(color))) {
                isWin = false;
            }
        }
    });
    if (isWin) {
        alert("Congratulations! You've sorted all the colors.");
    }
}

// Function to restart the game
function restartGame() {
    location.reload();
}
