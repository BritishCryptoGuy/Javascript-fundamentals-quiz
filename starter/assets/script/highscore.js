//Query Selected variables
const highScoresOL = document.querySelector("#highscores");
const clear = document.querySelector("#clear");

//orderScores function. Takes in scores and orders correctly
function orderScores(scores) {
  scores.sort((b, a) => {
    return a.score < b.score ? -1 : a.score > b.score ? 1 : 0;
  });
  console.log(scores);
}

//fillScoreboard function. Fills in scoreboard with local storage data
function fillScoreboard() {
  if (localStorage.length === 0) {
    return;
  }
  let scores = JSON.parse(localStorage.getItem("userScores"));
  console.log(scores[0]);
  orderScores(scores);
  for (let score of scores) {
    console.log(score);
    highScoresOL.insertAdjacentHTML(
      "beforeend",
      `<li class="score"> ${score.score}       ${score.initials}  </li>`
    );
  }
}

fillScoreboard();

//Event Listener
clear.addEventListener("click", function () {
  localStorage.clear();
  highScoresOL.innerHTML = "";
});
