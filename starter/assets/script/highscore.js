const highScoresOL = document.querySelector("#highscores");
const clear = document.querySelector("#clear");
console.log(localStorage);
function orderScores(scores) {
  scores.sort((b, a) => {
    return a.score < b.score ? -1 : a.score > b.score ? 1 : 0;
  });
  console.log(scores);
}
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
clear.addEventListener("click", function () {
  localStorage.clear();
  highScoresOL.innerHTML = "";
  // for (let i = 0; i <= ; i++) {
  //   let choiceChild = choicesDiv.lastElementChild;
  //   choiceChild.remove();
  // }
});
