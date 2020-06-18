let cardContainer = document.querySelector(".card-container");

let isTwoShowing = false;
let pair = [];
let highScore = 0;

cardContainer.addEventListener("click", function (e) {
  let card = e.target;
  let dataKey = e.target.dataset.key;
  let dataNick = e.target.dataset.nick;
  console.log(dataNick);

  if (pair.length === 0) {
    pair.push(dataNick);
    card.parentElement.classList.toggle("flip");
  } else if (pair.length === 1) {
    pair.push(dataNick);
    card.parentElement.classList.toggle("flip");
  } else if (
    pair.length === 2 &&
    pair[0] !== pair[1] &&
    pair[0] !== "undefined" &&
    pair[1] !== "undefined"
  ) {
    let timer = setInterval(function () {
      card.parentElement.classList.toggle("flip");
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

  // let card = $(`.card-front[data-key="${ dataKey }"]`);
  // console.log(card);

  // isTwoShowing = false;
  //
  // let timer = setInterval(function () {
  //   card.parentElement.classList.toggle("flip");
  //   clearInterval(timer);
  // }, 1000);
});

///////////////////////////////////////////////////////////////
