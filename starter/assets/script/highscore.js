//Query Selected variables
const highScoresOL = document.querySelector("#highscores");
const clear = document.querySelector("#clear");

//orderScores function. Takes in scores and orders correctly
function orderScores(scores) {
  scores.forEach((score) => {
    score.score = Number(score.score);
  });
  scores.sort((a, b) => {
    return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
  });
}

//fillScoreboard function. Fills in scoreboard with local storage data
function fillScoreboard() {
  highScoresOL.innerHTML = "";
  if (localStorage.length === 0) {
    return;
  }
  let scores = JSON.parse(localStorage.getItem("userScores"));
  orderScores(scores);
  for (let score of scores) {
    highScoresOL.insertAdjacentHTML(
      "beforeend",
      `<li class="score"> ${score.score} <span class="initial-span">"${score.initials}"</span>  </li>`
    );
  }
}

//init scoreboard
fillScoreboard();

//Event Listener
clear.addEventListener("click", function () {
  localStorage.clear();
  highScoresOL.innerHTML = "";
});
