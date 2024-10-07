console.log("Script initialized.");

let randomNumber = getRandomIntInRange(1,20);

let lastFiveGuesses = [];

/* If user input != randomNumber, +1 to score and check for potential high score.
   Update randomNumber to new randomNumber. */
const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", () => {
    // Get userInput as a number.
    const guessSelector = document.querySelector(".guess");
    const userInput = guessSelector.value;
    // Check if input is an integer between 1 and 20. Alert if not.
    if(!Number.isInteger(Number(userInput)) || (Number(userInput > 20)) || (Number(userInput < 1))) {
        alert("Please input integer between 1-20.");
    }
    // User input is an integer between 1 and 20.
    else {
        addToGuesses(userInput);
        // Check if input is the same as randomNumber.
        if (Number(userInput) !== randomNumber) {
            addToScore(1);
            setNewRandomNumber();
        } else {
            setScore(0);
            setNewRandomNumber();
        }
        guessSelector.value = "";
    }
});

const againButton = document.querySelector(".again");
againButton.addEventListener("click", () => {
    setScore(0);
    setHighScore(0);
    resetGuessHistory();
});

function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNewRandomNumber() {
    randomNumber = getRandomIntInRange(1,20);
}

function addToGuesses (number) {
    // Add number to front.
    lastFiveGuesses.unshift(number);
    // If there are more than 5 guesses in the array, remove the last number.
    if(lastFiveGuesses.length > 5) {
        lastFiveGuesses.pop();
    }

    for(let i=0; i<lastFiveGuesses.length; i++) {
        const currentHistoryGuess = document.querySelector(`.guess-history li:nth-child(${i+1})`);
        currentHistoryGuess.textContent = `${i+1} - ${lastFiveGuesses[i]}`;
    }
}

function resetGuessHistory () {
    for(let i=0; i<lastFiveGuesses.length; i++) {
        const currentHistoryGuess = document.querySelector(`.guess-history li:nth-child(${i+1})`);
        currentHistoryGuess.textContent = `${i+1} - `;
    }
    lastFiveGuesses = [];
}

// Add number to current score.
function addToScore(addNumber) {
    const scoreSelector = document.querySelector(".score");
    const currentScore = scoreSelector.textContent;
    const newScore = Number(currentScore) + addNumber;

    scoreSelector.textContent = newScore;

    // Update high score if new score is higher than high score.
    const highScoreSelector = document.querySelector(".highscore");
    const highScore = highScoreSelector.textContent;
    if(newScore > highScore) {
        setHighScore(newScore);
    }
}

function setScore(newScore) {
    const scoreSelector = document.querySelector(".score");
    scoreSelector.textContent = newScore;
}

function setHighScore(newHighScore) {
    const highScoreSelector = document.querySelector(".highscore");
    highScoreSelector.textContent = newHighScore;
}