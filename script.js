let cardContainer = document.querySelector(".card-container");

let isTwoShowing = false;
let pair = [];

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
  }

  if (
    pair[0] === pair[1] &&
    pair[0] !== "undefined" &&
    pair[1] !== "undefined"
  ) {
    console.log("pair 0 equals pair 1");
    console.log(`dataKey: ${dataNick}, pair: ${pair[0]} ${pair[1]}`);
  }

  if (pair.length >= 2) {
    pair = [];
  }

  // let card = $(`.card-front[data-key="${ dataKey }"]`);
  // console.log(card);

  isTwoShowing = false;

  let timer = setInterval(function () {
    card.parentElement.classList.toggle("flip");
    clearInterval(timer);
  }, 1000);
});

///////////////////////////////////////////////////////////////
