const RANDOM_QUOTE_API_URL = "http://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timerElement = document.getElementById("timer");
let typingSpeed;

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
    typingSpeed = calculateTypingSpeed(
      startTime,
      new Date(),
      numberOfCharacters
    );
    console.log("Typing Speed:", typingSpeed);
    // Move the car every time the player finishes typing a quote correctly
    moveCarDivForward(typingSpeed);
    //call the function to render new quote
    renderNewQuote();
    console.log(typingSpeed);
  }
});

//get a random quote from the site, send it back, add it
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}

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

//start the time counting up from 0
let startTime;
let intervalId; // Declare a variable to store the interval ID globally

function startTimer() {
  timerElement.innerText = 0;
  startTime = new Date();

  // Clear the previous interval, if any
  clearInterval(intervalId);

  // Start a new interval
  intervalId = setInterval(() => {
    timer.innerText = getTimerTime();
    moveCarDivForward(typingSpeed);
  }, 1000);
}

// function startTimer() {
//   timerElement.innerText = 0;
//   startTime = new Date();
//   setInterval(() => {
//     timer.innerText = getTimerTime();
//     //move the carDiv forward every interval by adding the Typing speed px
//     moveCarDivForward(typingSpeed);
//   }, 1000);
// }
//get the time from the timer and round it down to a whole number
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000);
}

// const timeDiff = startTime - getTimerTime;

renderNewQuote();

const numberOfCharacters = quoteInputElement.value.trim().split(/\s+/).length;
const numberOfWords = numberOfCharacters / 5;

//move the carDiv based on the typing speed for that quote
// moveCarDivForward(typingSpeed);

//reset start time for next quote, when user hasn't typed anything yet

// const carInitialSpeed = 10;
const endTime = new Date();
function calculateTypingSpeed(startTime, endTime, numberOfCharacters) {
  //convert ms to minutes
  const timeDiff = (endTime - startTime) / 60000;
  const wordsPerMinute = numberOfCharacters / timeDiff;
  return wordsPerMinute;
}

function moveCarDivForward(typingSpeed) {
  const pixelsPerWord = 0.2;
  const distanceToAdd = pixelsPerWord * (typingSpeed * 10);
  const carDiv = document.getElementById("carDiv");
  const currentLeft = parseInt(carDiv.style.left) || 0;
  const newLeft = currentLeft + distanceToAdd;
  console.log("Moving Car:", newLeft, "pixels");
  carDiv.style.left = newLeft + "px";
}

// function moveCarDivForward(typingSpeed) {
//   const pixelsPerWord = 10;
//   const distanceToAdd = pixelsPerWord;
//   const carDiv = document.getElementById("carDiv");
//   console.log("Moving Car:", typingSpeed);

//   carDiv.style.left = parseInt(carDiv.style.left) || 0 + distanceToAdd + "px";
// }
setTimeout(() => moveCarDivForward(typingSpeed), typingSpeed * 1000);
