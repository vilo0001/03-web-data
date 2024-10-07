console.log("Script initialized.");

function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

console.log(getRandomIntInRange(1,20));

const checkButton = document.querySelector(".check");
checkButton.addEventListener("click", () => {
    const userInput = document.querySelector(".guess").value;
    console.log(userInput);
});