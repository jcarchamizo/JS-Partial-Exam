// Generates random number between 1 and 100
let numberSecret = Math.floor(Math.random() * 100) + 1;

// Initialize variables
let attempts = 0;
const maxAttempts = 10;
let gameFinished = false;
let recordAttempts = [];

// References to the DOM
const form = document.getElementById("form");
const inputNumber = document.getElementById("inputNumber");
const message = document.getElementById("message");
const counter = document.getElementById("counter");
const listRecord = document.getElementById("record");
const buttonRestart = document.getElementById("restart");

// Event when submitting the form
form.addEventListener("submit", function(event) {
  event.preventDefault();

  if (gameFinished) return;

  const numberUser = parseInt(inputNumero.value);
  if (isNaN(numberUser) || numberUser < 1 || numberUser > 100) {
    showMessage("Enter a valid number between 1 and 100", "error");
    return;
  }

  attempts++;
  contador.textContent = intentos;
  recordAttempts.push(numberUser);
  updateRecord();

  if (numberUser === numberSecret) {
    showMessage(`Correct! The number was ${numeroSecreto}.`, "success");
    gameFinished = true;
  } else if (numberUser < numberSecret) {
    showMessage("Too low...", "error");
  } else {
    showMessage("Too high...", "error");
  }

  if (attempts >= maxAttempts && numberUser !== numberSecret) {
    showMessage(`You lost. The number was ${numberSecret}.`, "error");
    gameFinished = true;
  }

  inputNumber.value = "";
});

// Display message with class according to type
function showMessage(text, type) {
  message.textContent = text;
  message.className = `message ${type}`;
}

// Show attempt history in list <ul>
function updateRecord() {
  listRecord.innerHTML = "";
  recordAttempts.forEach((num, index) => {
    const li = document.createElement("li");
    li.textContent = `Attempt ${index + 1}: ${num}`;
    listRecord.appendChild(li);
  });
}

// Restart the game
buttonRestart.addEventListener("click", function() {
  numberSecret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  gameFinished = false;
  recordAttempts = [];

  counter.textContent = "0";
  message.textContent = "";
  message.className = "mensaje";
  listRecord.innerHTML = "";
  inputNumber.value = "";
});