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
const finalScore = document.querySelector("#final-score");
const feedback = document.querySelector("#feedback");
const endScreen = document.querySelector("#end-screen");
const finalScoreText = document.querySelector("#final-score");
const initialsText = document.querySelector("#initials");
const initialsBtn = document.querySelector("#submit");
const lossSlide = document.querySelector("#lossSlide");
const restartBtn = document.querySelector("#restart");
let currentQuestion; //current question object in quiz
let questionsCopy; //spliced questions
let questionNum = 0; //questionNum, at 10 gameCompletes
let multiplierPoint = false; //Used to gain "bonus" multiplier points
let multiplierPointScore = 1;
let feedbackTimer = null; //Used to clear ongoing feedback interval timer if !null
let gameFin = false;

//reset function. resets multiple aspects of page and stats.
function reset() {
  questionNum = 0;
  multiplierPoint = false;
  multiplierPointScore = 1;
  time.textContent = 60;
  gameFin = true;
  multiDiv.classList.add("hide");
  timerDiv.classList.add("hide");
}

//loss Function. upon losing sets up restart page.
function loss() {
  reset();
  removeChoices();
  questionsTitle.textContent = "";
  lossSlide.classList.remove("hide");
}

//removeChoices function.
function removeChoices() {
  choicesDiv.innerHTML = "";
}

//scoreCalc function. Works out total score based on time left * multiplier points
function scoreCalc() {
  let num = parseInt(time.textContent);
  let total = num * multiplierPointScore;
  return total;
}

//loadQuiz Function. Takes previously set questionsCopy and extracts information to display it.
function loadQuiz() {
  let index = Math.floor(Math.random() * questionsCopy.length - 1);
  currentQuestion = questionsCopy.splice(index, 1);
  questionsTitle.textContent = currentQuestion[0].question;
  for (let choice of currentQuestion[0].choices) {
    choicesDiv.insertAdjacentHTML(
      "beforeend",
      `<p class="choices"><button class="choice-button">${choice}</button></p>`
    );
  }
}

//feedbackDisplay function. determines feedback element text
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

//parseTimer function. Converts timer from string -> num(+/-) -> string
function parseTimer(num) {
  let toNum = parseInt(time.textContent);
  toNum += num;
  time.textContent = toNum;
  return time.textContent;
}

//checkAnswer function. checks answer and reacts accordingly.
function checkAnswer(e) {
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  let answer = e.target.innerHTML;
  if (answer !== currentQuestion[0].correctAnswer) {
    feedbackDisplay(0);
    parseTimer(-10);
    multiplierPoint = false;
  } else {
    feedbackDisplay(1);
    parseTimer(5);
    removeChoices();
    if (multiplierPoint === true) {
      multiplierPointScore += 0.5;
      multi.textContent = multiplierPointScore;
    }
    multiplierPoint = true;
    questionNum++;
    if (questionNum === 10) {
      return gameComplete();
    }
    return loadQuiz();
  }
}

//timerFunction. starts quiz timer.
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

//startGame function
let startGame = function () {
  if (lossSlide.classList.contains("hide")) {
    startScreen.classList.add("hide");
  } else {
    lossSlide.classList.add("hide");
  }
  gameFin = false;
  timerFunction();
};

//updateLocalStorage function. Puts initials and score into local storage. Changes href to highscore.html
function updateLocalStorage(initials) {
  let newScore = finalScoreText.textContent;
  let userObject = { initials: initials, score: newScore };
  if (localStorage.getItem("userScores") !== null) {
    let allScores = JSON.parse(localStorage.getItem("userScores"));
    allScores.push(userObject);
    localStorage.setItem("userScores", JSON.stringify(allScores));
  } else {
    let userArray = [userObject];
    localStorage.setItem("userScores", JSON.stringify(userArray));
  }
  location.href = "highscores.html";
}

//initialsBtnFun. Checks for valid initials, calls addInitials function if valid
function initialBtnFun() {
  let initials = initialsText.value;
  initialsText.value = "";
  if (initials.length > 3) {
    alert("Please choose initials no longer than 3 characters");
    return;
  } else {
    updateLocalStorage(initials);
  }
}

//gameComplete function. updates page for post game. updates final score.
function gameComplete() {
  questionsBox.classList.add("hide");
  feedback.classList.add("hide");
  endScreen.classList.remove("hide");
  let finalScore = scoreCalc();
  finalScoreText.textContent = finalScore;
  reset();
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
