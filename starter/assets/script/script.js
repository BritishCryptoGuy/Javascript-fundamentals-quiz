//document selected element variables
const multiDiv = document.querySelector(".multiPoints");
let multi = document.querySelector("#multiScore");
const timerDiv = document.querySelector(".timer");
let time = document.querySelector("#time");
const startScreen = document.querySelector("#start-screen");
const startBtn = document.querySelector("#start");
const questionsBox = document.querySelector("#questions");
const questionsTitle = document.querySelector("#question-title");
const choicesDiv = document.querySelector("#choicesDiv");
const choices = document.querySelector(".choices");
const endscreenDiv = document.querySelector("#end-screen");
const finalScore = document.querySelector("#final-score");
const initials = document.querySelector("#initials");
const submitBtn = document.querySelector("#submit");
const feedback = document.querySelector("#feedback");
const highscoresOL = document.querySelector("#highscores");
const clearBtn = document.querySelector("#clear");
// const incorrectMsg = document.querySelector(".fail");
const endScreen = document.querySelector("#end-screen");
const finalScoreText = document.querySelector("#final-score");
const initialsText = document.querySelector("#initials");
const initialsBtn = document.querySelector("#submit");
const lossSlide = document.querySelector("#lossSlide");
const restartBtn = document.querySelector("#restart");
let currentQuestion; //current question object in quiz
let questionsCopy; //spliced questions
let questionNum = 0;
let multiplierPoint = false;
let multiplierPointScore = 1;
let feedbackTimer = null;
let gameFin = false;

function reset() {
  questionNum = 0;
  multiplierPoint = false;
  multiplierPointScore = 1;
  time.textContent = 60;
  gameFin = true;
  multiDiv.classList.add("hide");
  timerDiv.classList.add("hide");
}

function loss() {
  reset();
  removeChoices();
  questionsTitle.textContent = "";
  lossSlide.classList.remove("hide");
  // questionsTitle
  //You lost, please try again
  //restart button()
  // console.log("loser");
}

function scoreCalc() {
  let num = parseInt(time.textContent);
  let total = num * multiplierPointScore;
  console.log(total);
  return total;
}
function loadQuiz() {
  console.log(questionsCopy.length);
  let index = Math.floor(Math.random() * questionsCopy.length - 1);
  currentQuestion = questionsCopy.splice(index, 1);
  questionsTitle.textContent = currentQuestion[0].question;
  for (let choice of currentQuestion[0].choices) {
    choicesDiv.insertAdjacentHTML(
      "beforeend",
      `<p class="choices"><button class="choice-button">${choice}</button></p>`
    );
  }
  console.log(questionsCopy.length);
}

//parseTimer function. Converts timer from string -> num -> string
function parseTimer(num) {
  let toNum = parseInt(time.textContent);
  toNum += num;
  time.textContent = toNum;
  console.log(time.textContent);
  return time.textContent;
}

function feedbackDisplay(e) {
  if (feedbackTimer) {
    clearInterval(feedbackTimer);
  }
  let fTime = 30;
  feedback.textContent = e === 0 ? "Incorrect Answer" : "Correct!";
  feedbackTimer = setInterval(function () {
    feedback.classList.remove("hide");
    fTime--;
    if (fTime === 0 || gameFin === true) {
      clearInterval(feedbackTimer);
      feedback.classList.add("hide");
    }
  }, 100);
}
function removeChoices() {
  for (let i = 0; i <= 3; i++) {
    let choiceChild = choicesDiv.lastElementChild;
    choiceChild.remove();
  }
}

//Check answer function. If correct returns loadQuiz
function checkAnswer(e) {
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  let answer = e.target.innerHTML;
  if (answer !== currentQuestion[0].correctAnswer) {
    feedbackDisplay(0);
    // feedback.classList.remove("hide");
    // feedback.textContent = "Incorrect Answer";

    parseTimer(-5);
    multiplierPoint = false;
  } else {
    feedbackDisplay(1);
    // feedback.classList.remove("hide");
    // feedback.textContent = "Correct!";
    parseTimer(5);
    removeChoices();
    if (multiplierPoint === true) {
      multiplierPointScore += 0.5;
      multi.textContent = multiplierPointScore;
    }
    multiplierPoint = true;
    console.log(multiplierPointScore);
    questionNum++;
    if (questionNum === 2) {
      console.log("winner");
      return gameComplete();
      //Winner
    }
    console.log(questionNum);
    return loadQuiz();
  }
}

function timerFunction() {
  time.textContent = 60;
  multi.textContent = 1;
  multiplierPointScore = 1;
  multiDiv.classList.remove("hide");
  timerDiv.classList.remove("hide");
  questionsBox.classList.remove("hide");
  questionsCopy = questions.slice();
  loadQuiz();
  let countdown = setInterval(function () {
    time.textContent--;
    if (time.textContent <= 0) {
      time.textContent = 0;
      clearInterval(countdown);
      loss();
    }
    if (gameFin) {
      clearInterval(countdown);
    }
  }, 1000);
}
function gameComplete() {
  questionsBox.classList.add("hide");
  feedback.classList.add("hide");
  endScreen.classList.remove("hide");
  let finalScore = scoreCalc();
  finalScoreText.textContent = finalScore;
  reset();
  //reset
}
let startGame = function () {
  if (lossSlide.classList.contains("hide")) {
    startScreen.classList.add("hide");
  } else {
    lossSlide.classList.add("hide");
  }
  gameFin = false;
  timerFunction();
};

function addInitals(initials) {
  let newScore = finalScoreText.textContent;
  let userObject = { initials: initials, score: newScore };
  if (localStorage.getItem("userScores") !== null) {
    let allScores = JSON.parse(localStorage.getItem("userScores"));
    allScores.push(userObject);
    console.log(allScores);
    localStorage.setItem("userScores", JSON.stringify(allScores));
  } else {
    let userArray = [userObject];
    localStorage.setItem("userScores", JSON.stringify(userArray));
  }
  location.href = "highScores.html";
}

//
function initialBtnFun() {
  let initials = initialsText.value;
  initialsText.value = "";
  if (initials.length > 3) {
    alert("Please choose initials no longer than 3 characters");
    return;
  } else {
    addInitals(initials);
  }
}

//Event Listeners
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
choicesDiv.addEventListener("click", checkAnswer);
initialsBtn.addEventListener("click", initialBtnFun);
initialsText.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    return initialBtnFun();
  } else {
    return;
  }
});
