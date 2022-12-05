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
const incorrectMsg = document.querySelector(".fail");
let currentQuestion; //current question object in quiz
let questionsCopy; //spliced questions
let questionNum = 0;
let multiplierPoint = false;
let multiplierPointScore = 0;

function reset() {}

function loss() {
  //You lost, please try again
  //restart button()
  // console.log("loser");
}

function loadQuiz() {
  console.log(questionsCopy.length);
  let index = Math.floor(Math.random() * questionsCopy.length - 1);
  currentQuestion = questionsCopy.splice(index, 1);
  questionsTitle.innerHTML = currentQuestion[0].question;
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

//Check answer function. If correct returns loadQuiz
function checkAnswer(e) {
  if (e.target.tagName !== "BUTTON") {
    return;
  }
  let answer = e.target.innerHTML;
  if (answer !== currentQuestion[0].correctAnswer) {
    console.log("FAIL");
    parseTimer(-5);
    incorrectMsg.classList.remove("hide");
    multiplierPoint = false;
  } else {
    incorrectMsg.classList.add("hide");
    parseTimer(5);
    // let choiceChild = choicesDiv.lastElementChild;
    // console.log(choiceChild);
    // choiceChild.remove(); Hallelujah
    // choicesDiv.remove.lastElementChild;
    for (let i = 0; i <= 3; i++) {
      let choiceChild = choicesDiv.lastElementChild;
      choiceChild.remove();
    }
    if (multiplierPoint === true) {
      multiplierPointScore += 0.5;
      multi.textContent = multiplierPointScore;
    }
    multiplierPoint = true;
    console.log(multiplierPointScore);
    questionNum++;
    if ((questionNum = 10)) {
      //Winner
    }
    console.log(questionNum);
    return loadQuiz();
  }
}

function timerFunction() {
  time.textContent = 50;
  multi.textContent = 0;
  multiplierPointScore = 0;
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
  }, 1000);
}

let startGame = function () {
  startScreen.classList.add("hide");
  timerFunction();
};

//start button event Listener
startBtn.addEventListener("click", startGame);
choicesDiv.addEventListener("click", checkAnswer);

//if timer is active then questions start
//maybe try give an extra bonus point if previous click was correct
//repeat untill either timer has finished or all answers have been answered correctly
//if timer runs out then display Game over message and suggest to try again
//else if all answers have been answered show score (amount of time left on timer)
//then request them to put in initials and log score to localstorage and update highscores html
//else if timer has hit 0 questions go away and score is popped up
