let cardContainer = document.querySelector(".card-container");

cardContainer.addEventListener("click", function (e) {
  let card = e.target;
  // let dataKey = e.target.dataset.key;
  // let card = $(`.card-front[data-key="${ dataKey }"]`);
  // console.log(card);

  card.parentElement.classList.toggle("flip");
  let timer = setInterval(function () {
    card.parentElement.classList.toggle("flip");
    clearInterval(timer);
  }, 1000);
});

///////////////////////////////////////////////////////////////
