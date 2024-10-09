console.log("Script initialized.");
const correctAudio = new Audio('extras/correct.wav');
const wrongAudio = new Audio('extras/wrong.wav');
let cheatMode = false;

let randomNumber = getRandomIntInRange(1,20);

let lastFiveGuesses = [];

/* If user input != randomNumber, +1 to score and check for potential high score.
   Update randomNumber to new randomNumber. */
const checkButton = document.querySelector(".check");

checkButton.addEventListener("click", () => {
    checkInput();
});

// Check if input is correct.
function checkInput() {
    const guessSelector = document.querySelector(".guess");
    const userInput = guessSelector.value;
    // User input is not an integer OR between 1 and 20.
    if (!Number.isInteger(Number(userInput)) || (Number(userInput > 20)) || (Number(userInput < 1))) {
        alert("Please input integer between 1-20.");
    }
    // User input is an integer between 1 and 20.
    else {
        addToGuesses(userInput);
        // Check if input is the same as randomNumber.
        if (Number(userInput) !== randomNumber) {
            addToScore(1);
            setNewRandomNumber();
            correctAudio.play();
        } else {
            setScore(0);
            setNewRandomNumber();
            wrongAudio.play();
            flashRed();
        }
        guessSelector.value = "";
    }
}

const againButton = document.querySelector(".again");
againButton.addEventListener("click", () => {
    setScore(0);
    setHighScore(0);
    resetGuessHistory();
});

const questionMark = document.querySelector(".number");
questionMark.addEventListener("click", () => {
    if(!cheatMode) questionMark.textContent = randomNumber;
    else questionMark.textContent = "?";
    cheatMode = !cheatMode;
})

// Keydown event - add input to user input without needing to click the input field.
window.addEventListener("keydown", (event) => {
    const userInput = document.querySelector(".guess");
    const keyPress = event.key;
    const integerCheck = /[0-9]/;
    // If keypress is between 0 and 9, add to input unless input length is more than 1.
    if(integerCheck.test(keyPress) && userInput.value.length < 2) {
        // If there is no input, 0 is not allowed. This disallows inputs like "01" and "07" from happening.
        if(userInput.value.length === 0 && keyPress === "0") userInput.value = "";
        else userInput.value += keyPress;
    }
    // On backspace, if there is an input, remove the last character from input.
    if(keyPress === "Backspace" && userInput.value.length > 0) userInput.value = userInput.value.slice(0,userInput.value.length-1);
    if(keyPress === "Enter") checkInput();
})

function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setNewRandomNumber() {
    randomNumber = getRandomIntInRange(1,20);
    if(cheatMode) questionMark.textContent = randomNumber;
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

function flashRed() {
    document.body.classList.add('red');
    window.setTimeout(function() {
        document.body.classList.remove('red')
    }, 100)

}