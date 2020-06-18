let cardContainer = document.querySelector(".card-container");

let pair = [];
let highScore = 0;
let firstCard;
let secondCard;
let firstKey;
let secondKey;

cardContainer.addEventListener("click", function (e) {
  let dataNick = e.target.dataset.nick;
  let name = e.target.dataset.name;

  if (name === "container" && dataNick === undefined) {
    return;
  }

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

  if (
    pair.length === 2 &&
    pair[0] !== pair[1] &&
    pair[0] !== "undefined" &&
    pair[1] !== "undefined"
  ) {
    let timer = setInterval(function () {
      firstCard.classList.toggle("flip");
      secondCard.classList.toggle("flip");
      clearInterval(timer);
    }, 1000);
    pair = [];
  } else if (
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
  } else if (
    pair[0] === pair[1] &&
    pair[0] !== "undefined" &&
    pair[1] !== "undefined"
  ) {
    console.log(pair);
    console.log(firstKey);
    console.log(secondKey);
    pair = [];
    highScore++;
    console.log(highScore);
  }
});

///////////////////////////////////////////////////////////////
