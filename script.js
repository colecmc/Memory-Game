let cardContainer = document.querySelector(".card-container");

let pair = [];
let highScore = 0;
let firstCard;
let secondCard;
let firstKey;
let secondKey;
let count = 0;
let isTwoTrue = false;

cardContainer.addEventListener("click", function (e) {
  let dataNick = e.target.dataset.nick;
  let name = e.target.dataset.name;
  let card = e.target;

  if (name === "container" && dataNick === undefined) {
    return;
  } else if (name === "box" && dataNick === undefined) {
    return;
  }

  let parent = e.target.parentElement.parentElement;
  let children = parent.children;

  // console.log(children);
  card.parentElement.setAttribute("data-fliped", "true");

  /////////////////////////////////////////////////////////////////CONDITIONALS TO ONLY LET TWO BE SELECTED AT ONCE

  let isTrueCount = 0;

  for (var child of children) {
    if (child.dataset.fliped === "true") {
      isTrueCount++;
    }
  }

  if (isTrueCount >= 3) {
    for (var child of children) {
      // child.dataset.fliped === "false";
      child.setAttribute("data-fliped", "false");
      console.log(child.dataset);
      console.log("changing data-flip to false");
    }
    console.log(children);
    console.log(isTrueCount);
    return;
  }

  /////////////////////////////////////////////////////////////////

  // for (var child of children) {
  //   if (child.dataset.fliped === "true") {
  //     count++;
  //     console.log(count);
  //   }
  //
  //   if (count > 2) {
  //     for (var child of children) {
  //       child.setAttribute("data-fliped", "false");
  //       console.log(child.dataset);
  //       console.log("changing data-flip to false");
  //     }
  //     count = 0;
  //     return;
  //   }
  // }
  // console.log(count);
  // console.log(children);
  // console.log("made it out of the loop");
  // count = 0;

  // if (card.parentElement.dataset.fliped === "true") {
  //   console.log("is true");
  // }

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

      for (var child of children) {
        child.setAttribute("data-fliped", "false");
        console.log(child.dataset);
        console.log("changing data-flip to false");
      }
      console.log(children);
      pair = [];

      clearInterval(timer);
    }, 1000);
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
    console.log("winning: " + pair);
    // console.log(firstKey);
    // console.log(secondKey);
    pair = [];
    highScore++;
    console.log(highScore);
  }
});

///////////////////////////////////////////////////////////////
