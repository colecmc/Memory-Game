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

let difficutlyBtns = document.querySelectorAll(".difficulty");
let diff1 = document.querySelector(".diff1");
let diff2 = document.querySelector(".diff2");
let diff3 = document.querySelector(".diff3");

difficutlyBtns.forEach((item) => {
  item.addEventListener("click", (e) => {
    diff1.style.pointerEvents = "none";
    diff2.style.pointerEvents = "none";
    diff3.style.pointerEvents = "none";

    let clock = document.getElementById("timer-label");
    let clockBtn = document.querySelector(".timer-btn");

    let TIME_LIMIT;

    if (e.target.classList.contains("easy")) {
      TIME_LIMIT = 20;
      clock.innerText = "00:20";
    } else if (e.target.classList.contains("medium")) {
      TIME_LIMIT = 45;
      clock.innerText = "00:45";
    } else if (e.target.classList.contains("hard")) {
      TIME_LIMIT = 60;
      clock.innerText = "01:00";
    }

    // Start with an initial value of 20 seconds
    let timePassed = 0;
    let timeLeft = TIME_LIMIT;
    let timer = setInterval(() => {
      // The amount of time passed increments by one
      timePassed = timePassed += 1;
      timeLeft = TIME_LIMIT - timePassed;

      // The time left span is updated

      clock.innerText = `00:${timeLeft}`;

      if (timeLeft < 10) {
        clock.innerText = `00:0${timeLeft}`;
        clockBtn.classList.add("btn-outline-danger");
        clockBtn.classList.remove("btn-outline-light");
      }
      if (timeLeft === 0) {
        clearInterval(timer);
        diff1.style.pointerEvents = "auto";
        diff2.style.pointerEvents = "auto";
        diff3.style.pointerEvents = "auto";
        clockBtn.classList.add("btn-outline-light");
        clockBtn.classList.remove("btn-outline-danger");
        timePassed = 0;
        timeLeft = TIME_LIMIT;
      }
    }, 1000);
  });
});

///////////////////////////////////////////////////////////////EASY/MEDIUM/HARD

let cardLoader = function (e) {
  let testing;
  let inputs = [];

  if (e.target.classList.contains("easy")) {
    cardContainer.innerText = "";
    for (var i = 1; i < 5; i++) {
      inputs.push({
        task: `<div class='card-front' data-key='${i}' data-nick='nick-${i}'></div>
        <div class='card-back'>
          <img src='images/${i}.png' alt='Photo of Nicholas Cage' />
        </div>`,
      });
    }
    for (var i = 1; i < 5; i++) {
      inputs.push({
        task: `<div class='card-front' data-key='${
          i + 6
        }' data-nick='nick-${i}'></div>
        <div class='card-back'>
          <img src='images/${i}.png' alt='Photo of Nicholas Cage' />
        </div>`,
      });
    }
  } else if (e.target.classList.contains("medium")) {
    cardContainer.innerText = "";
    for (var i = 1; i < 9; i++) {
      inputs.push({
        task: `<div class='card-front' data-key='${i}' data-nick='nick-${i}'></div>
          <div class='card-back'>
            <img src='images/${i}.png' alt='Photo of Nicholas Cage' />
          </div>`,
      });
    }
    for (var i = 1; i < 9; i++) {
      inputs.push({
        task: `<div class='card-front' data-key='${
          i + 8
        }' data-nick='nick-${i}'></div>
          <div class='card-back'>
            <img src='images/${i}.png' alt='Photo of Nicholas Cage' />
          </div>`,
      });
    }
  } else if (e.target.classList.contains("hard")) {
    cardContainer.innerText = "";
    for (var i = 1; i < 13; i++) {
      inputs.push({
        task: `<div class='card-front' data-key='${i}' data-nick='nick-${i}'></div>
            <div class='card-back'>
              <img src='images/${i}.png' alt='Photo of Nicholas Cage' />
            </div>`,
      });
    }
    for (var i = 1; i < 13; i++) {
      inputs.push({
        task: `<div class='card-front' data-key='${
          i + 12
        }' data-nick='nick-${i}'></div>
            <div class='card-back'>
              <img src='images/${i}.png' alt='Photo of Nicholas Cage' />
            </div>`,
      });
    }
  }

  let m;
  let t;
  let j;

  for (var i = 0; i < inputs.length; i++) {
    m = inputs.length;
    m--;
    j = Math.floor(Math.random() * m);

    t = inputs[m];
    inputs[m] = inputs[j];
    inputs[j] = t;
  }

  for (var i = 0; i < inputs.length; i++) {
    let div = document.createElement("div");
    div.classList.add("card-box");
    div.setAttribute("data-name", "box");
    div.innerHTML = inputs[i].task;
    cardContainer.appendChild(div);
  }
};

let easyBtn = document.querySelector(".easy");
easyBtn.addEventListener("click", cardLoader);
let mediumBtn = document.querySelector(".medium");
mediumBtn.addEventListener("click", cardLoader);
let hardBtn = document.querySelector(".hard");
hardBtn.addEventListener("click", cardLoader);
