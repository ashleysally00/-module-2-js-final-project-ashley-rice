// Function to load a random quote from the local quotes.json file
// Constants to access DOM elements
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
let typingSpeed;

// Get the modal from W3 schools
var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Event listener to handle typing input
quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");

  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("correct");
      characterSpan.classList.remove("incorrect");
      correct = false;
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) {
    typingSpeed = calculateTypingSpeed(startTime, new Date(), numberOfCharacters);
    console.log("Typing Speed:", typingSpeed);
    moveCarDivForward(typingSpeed);
    renderNewQuote();
  }
});

// Function to load a random quote from the local quotes.json file
async function getRandomQuote() {
  try {
    const response = await fetch('quotes.json');  // Correct path, assuming quotes.json is in the same folder
    const quotes = await response.json();
    
    // Pick a random quote from the array
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex].quote;
  } catch (error) {
    console.error('Error fetching the quote:', error);
    return "Error loading quote.";
  }
}

// Function to render a new quote on the screen
async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerHTML = "";
  quote.split("").forEach((character) => {
    const characterSpan = document.createElement("span");
    characterSpan.innerText = character;
    quoteDisplayElement.appendChild(characterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

// Timer and game logic
let startTime;
let intervalId;

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();
  clearInterval(intervalId);
  intervalId = setInterval(() => {
    timerElement.innerText = getTimerTime();
    moveCarDivForward(typingSpeed);
  }, 1000);  // No 'eval' here, directly using function
}

function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

// Calculate typing speed
const numberOfCharacters = quoteInputElement.value.trim().split(/\s+/).length;

function calculateTypingSpeed(startTime, endTime, numberOfCharacters) {
  const timeDiff = (endTime - startTime) / 60000;
  const wordsPerMinute = numberOfCharacters / timeDiff;
  return wordsPerMinute;
}

// Move the car div forward based on typing speed
function moveCarDivForward(typingSpeed) {
  const pixelsPerWord = 1;
  const distanceToAdd = pixelsPerWord * (typingSpeed * 10);
  const carDiv = document.getElementById("carDiv");
  const currentLeft = parseInt(carDiv.style.left) || 0;
  const newLeft = currentLeft + distanceToAdd;
  console.log("Moving Car:", newLeft, "pixels");
  carDiv.style.left = newLeft + "px";
}

// window.onload to start the game after the page loads
window.onload = function () {
  renderNewQuote();
};


