/////////////////////////////////////////////////////////////////GLOBAL VARIABLES
let cardContainer = document.querySelector(".card-container");
let pair = [];
let highScore = 0;
let firstCard;
let secondCard;
let firstKey;
let secondKey;
let count = 0;
let numFliped = 0;

/////////////////////////////////////////////////////////////////EVENT LISTENER FOR THE CLICK EVENT TO FlIP CARDS

cardContainer.addEventListener("click", function (e) {
  /////////////////////////////////////////////////////////////////LOCAL VARIABLES

  let dataNick = e.target.dataset.nick;
  let name = e.target.dataset.name;
  let card = e.target;
  let parent = e.target.parentElement.parentElement;
  let children = parent.children;

  /////////////////////////////////////////////////////////////////CONDITIONALS TO ONLY LET THE CARDS BE SELECTED TO FLIP

  if (name === "container" && dataNick === undefined) {
    return;
  } else if (name === "box" && dataNick === undefined) {
    return;
  }

  /////////////////////////////////////////////////////////////////CONDITIONAL TO ONLY ALLOW 2 CARDS TO BE SHOWING AT ONCE

  if (numFliped >= 2) {
    return;
  }

  /////////////////////////////////////////////////////////////////CONDITIONALS TO ONLY LET TWO BE SELECTED AT ONCE

  card.parentElement.setAttribute("data-fliped", "true");

  /////////////////////////////////////////////////////////////////CONDITIONALS TO PUSH DATA ATTRIBUTES TO AN ARRAY IF ZERO OR ONLY ONE CARD IS SHOWING

  if (pair.length === 0) {
    pair.push(dataNick);
    firstCard = e.target.parentElement;
    firstCard.classList.toggle("flip");
    firstKey = e.target.dataset.key;
  } else if (pair.length === 1) {
    pair.push(dataNick);
    secondCard = e.target.parentElement;
    secondCard.classList.toggle("flip");
    secondKey = e.target.dataset.key;
  }

  /////////////////////////////////////////////////////////////////CONDITIONAL TO CHECK TO SEE IF THOSE TWO IMAGES SHOWING ARE NOT MATCHES, IF NOT, THEN RESET THE PAIR ARRAY

  if (
    pair.length === 2 &&
    pair[0] !== pair[1] &&
    pair[0] !== "undefined" &&
    pair[1] !== "undefined"
  ) {
    numFliped = 2;
    let timer = setInterval(function () {
      firstCard.classList.toggle("flip");
      secondCard.classList.toggle("flip");
      for (var child of children) {
        child.setAttribute("data-fliped", "false");
      }
      pair = [];
      numFliped = 0;
      clearInterval(timer);
    }, 1000);
  }

  /////////////////////////////////////////////////////////////////CONDITIONAL TO PREVENT THE USER FROM DOUBLE CLICKING THE SAME IMAGE
  else if (
    pair[0] === pair[1] &&
    pair[0] !== "undefined" &&
    pair[1] !== "undefined" &&
    firstKey === secondKey
  ) {
    let timer = setInterval(function () {
      firstCard.classList.toggle("flip");
      secondCard.classList.toggle("flip");
      clearInterval(timer);
    }, 1000);
    pair = [];
  }

  /////////////////////////////////////////////////////////////////CONDITIONAL TO CHECK IF BOTH IMAGES MATCH AND ARE UNIQUE KEY VALUES
  else if (
    pair[0] === pair[1] &&
    pair[0] !== "undefined" &&
    pair[1] !== "undefined"
  ) {
    pair = [];
    highScore++;
  }
});

///////////////////////////////////////////////////////////////TIMER
function formatTimeLeft(time) {
  // The largest round integer less than or equal to the result of time divided being by 60.
  const minutes = Math.floor(time / 60);

  // Seconds are the remainder of the time divided by 60 (modulus operator)
  let seconds = time % 60;

  // If the value of seconds is less than 10, then display seconds with a leading zero
  if (seconds < 10) {
    seconds = `0${ seconds }`;
  }

  // The output in MM:SS format
  return `${ minutes }:${ seconds }`;
}

// Start with an initial value of 20 seconds
const TIME_LIMIT = 20;

// Initially, no time has passed, but this will count up
// and subtract from the TIME_LIMIT
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

document.getElementById("app").innerHTML = `...`;

function startTimer() {
  timerInterval = setInterval(() => {
    // The amount of time passed increments by one
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;

    // The time left label is updated
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
  }, 1000);
}

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">
    ${ formatTime(timeLeft) }
  </span>
</div>
