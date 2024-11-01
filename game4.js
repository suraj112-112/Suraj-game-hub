document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const width = 8;
    const squares = [];
    let score = 0;

    const candyColors = ['red', 'blue', 'green', 'yellow', 'purple'];

    // Create the board and reset score
    function createBoard() {
        score = 0; // Reset score to 0
        scoreDisplay.innerHTML = score; // Display the updated score

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement('div');
            square.setAttribute('draggable', true);
            square.setAttribute('id', i);
            let randomColor = Math.floor(Math.random() * candyColors.length);
            square.classList.add('candy');
            square.classList.add(candyColors[randomColor]);
            grid.appendChild(square);
            squares.push(square);
        }
        
        checkMatches(); // Clear any initial matches
    }
    createBoard();

    // Dragging functions
    let colorBeingDragged, colorBeingReplaced, squareIdBeingDragged, squareIdBeingReplaced;

    squares.forEach(square => square.addEventListener('dragstart', dragStart));
    squares.forEach(square => square.addEventListener('dragend', dragEnd));
    squares.forEach(square => square.addEventListener('dragover', dragOver));
    squares.forEach(square => square.addEventListener('dragenter', dragEnter));
    squares.forEach(square => square.addEventListener('dragleave', dragLeave));
    squares.forEach(square => square.addEventListener('drop', dragDrop));

    function dragStart() {
        colorBeingDragged = this.className.split(' ')[1];
        squareIdBeingDragged = parseInt(this.id);
    }

    function dragOver(e) { e.preventDefault(); }
    function dragEnter(e) { e.preventDefault(); }
    function dragLeave() { }

    function dragDrop() {
        colorBeingReplaced = this.className.split(' ')[1];
        squareIdBeingReplaced = parseInt(this.id);
        squares[squareIdBeingDragged].className = 'candy ' + colorBeingReplaced;
        squares[squareIdBeingReplaced].className = 'candy ' + colorBeingDragged;
    }

    function dragEnd() {
        let validMoves = [
            squareIdBeingDragged - 1,
            squareIdBeingDragged - width,
            squareIdBeingDragged + 1,
            squareIdBeingDragged + width
        ];

        let validMove = validMoves.includes(squareIdBeingReplaced);

        if (squareIdBeingReplaced && validMove) {
            squareIdBeingReplaced = null;
        } else if (squareIdBeingReplaced && !validMove) {
            squares[squareIdBeingReplaced].className = 'candy ' + colorBeingReplaced;
            squares[squareIdBeingDragged].className = 'candy ' + colorBeingDragged;
        } else squares[squareIdBeingDragged].className = 'candy ' + colorBeingDragged;
        
        checkMatches();
    }

    // Check for matches and update score
    function checkMatches() {
        let matchFound = false;
        matchFound = checkRowForMatches() || checkColumnForMatches();

        if (matchFound) {
            setTimeout(checkMatches, 100); // Continue to check for new matches
        }
    }

    function checkRowForMatches() {
        let matchFound = false;
        for (let i = 0; i < 64; i++) {
            let row = [i, i + 1, i + 2, i + 3, i + 4];
            let decidedColor = squares[i].className.split(' ')[1];
            const isBlank = !squares[i].classList.contains('candy');

            if (i % width < width - 4 && row.every(index => squares[index].classList.contains(decidedColor) && !isBlank)) {
                score += 20;
                matchFound = true;
                row.forEach(index => {
                    squares[index].classList.remove(decidedColor);
                    squares[index].classList.add('candy', candyColors[Math.floor(Math.random() * candyColors.length)]);
                });
            } else if (i % width < width - 3 && row.slice(0, 4).every(index => squares[index].classList.contains(decidedColor) && !isBlank)) {
                score += 10;
                matchFound = true;
                row.slice(0, 4).forEach(index => {
                    squares[index].classList.remove(decidedColor);
                    squares[index].classList.add('candy', candyColors[Math.floor(Math.random() * candyColors.length)]);
                });
            } else if (i % width < width - 2 && row.slice(0, 3).every(index => squares[index].classList.contains(decidedColor) && !isBlank)) {
                score += 5;
                matchFound = true;
                row.slice(0, 3).forEach(index => {
                    squares[index].classList.remove(decidedColor);
                    squares[index].classList.add('candy', candyColors[Math.floor(Math.random() * candyColors.length)]);
                });
            }
        }
        if (matchFound) scoreDisplay.innerHTML = score; // Update score after matches found
        return matchFound;
    }

    function checkColumnForMatches() {
        let matchFound = false;
        for (let i = 0; i < 47; i++) {
            let column = [i, i + width, i + width * 2, i + width * 3, i + width * 4];
            let decidedColor = squares[i].className.split(' ')[1];
            const isBlank = !squares[i].classList.contains('candy');

            if (column.every(index => squares[index].classList.contains(decidedColor) && !isBlank)) {
                score += 20;
                matchFound = true;
                column.forEach(index => {
                    squares[index].classList.remove(decidedColor);
                    squares[index].classList.add('candy', candyColors[Math.floor(Math.random() * candyColors.length)]);
                });
            } else if (column.slice(0, 4).every(index => squares[index].classList.contains(decidedColor) && !isBlank)) {
                score += 10;
                matchFound = true;
                column.slice(0, 4).forEach(index => {
                    squares[index].classList.remove(decidedColor);
                    squares[index].classList.add('candy', candyColors[Math.floor(Math.random() * candyColors.length)]);
                });
            } else if (column.slice(0, 3).every(index => squares[index].classList.contains(decidedColor) && !isBlank)) {
                score += 5;
                matchFound = true;
                column.slice(0, 3).forEach(index => {
                    squares[index].classList.remove(decidedColor);
                    squares[index].classList.add('candy', candyColors[Math.floor(Math.random() * candyColors.length)]);
                });
            }
        }
        if (matchFound) scoreDisplay.innerHTML = score; // Update score after matches found
        return matchFound;
    }

    // Continuously check for matches
    window.setInterval(function() {
        checkMatches();
    }, 100);
});
