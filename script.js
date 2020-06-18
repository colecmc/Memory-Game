let cardContainer = document.querySelector(".card-container");

let pair = [];
let highScore = 0;
let firstCard;
let secondCard;

cardContainer.addEventListener("click", function (e) {
  let dataKey = e.target.dataset.key;
  let dataNick = e.target.dataset.nick;

  if (pair.length === 0) {
    pair.push(dataNick);
    firstCard = e.target.parentElement;
    firstCard.classList.toggle("flip");
  } else if (pair.length === 1) {
    pair.push(dataNick);
    secondCard = e.target.parentElement;
    secondCard.classList.toggle("flip");
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
    pair[1] !== "undefined"
  ) {
    pair = [];
    highScore++;
  }
});

///////////////////////////////////////////////////////////////
