// variable querySelectors:
var startButtonEl = document.querySelector("#playNow");
var mainContainerEl = document.querySelector("#main-container");
var welcomeHeaderEl = document.querySelector("#welcome-header");
var hintEl = document.querySelector("#welcome-header");
var adviceEl = document.querySelector("#question-visitor");
var questionEl = document.querySelector("#game-instructions");
var answerEl = document.querySelector("#button-choices");

var givenTime = 60;
var timeTicking;
var definedIndex = 0;

// Arrays of objects (questions)
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript:",
        choices: ["<javascript>", "<script>", "<js>", "<style>"],
        answer: "<script>"
    },

    {
        question: "Conditional Statements for JS are:",
        choices: [".for() {};", ".while() {};", ".if(){} else{};", "function() {};"],
        answer: ".if(){} else{};",
    }
];

//<<<<<< 1. When I click start/play game the timer should start and question prompt to be presented:
function startGame() {
    console.log("Game started");
    timer();
    nextQuestion();

};

// Start timer as game started 
function timer() {
    console.log("Timer started");
    var timer = setInterval(function () {
        givenTime--;
        if (givenTime <= 0) {
            clearInterval(timer);
        } else {
            timeTicking.textContent = givenTime;
        }
    }, 1000);
};

// Dynamic website using Web API
function nextQuestion() {
    var availableQuestion = questions[definedIndex].question;
    questionEl.textContent = availableQuestion;
    questionEl.setAttribute("style", "font-size: 25px;");
    answerEl.innerHTML = "";

    console.log(questionEl);

    for (i = 0; i < questions[definedIndex].choices.length; i++) {

        // First time I created a <p> element but looks like it's easier to create a <button> element 
        var possibleAnswer = document.createElement("button");
        possibleAnswer.setAttribute("class", "btn answer-btn bg-warning m-3 p-2",);
        possibleAnswer.setAttribute("value", questions[definedIndex].choices[i]);
        possibleAnswer.textContent = questions[definedIndex].choices[i];
        answerEl.appendChild(possibleAnswer);
        possibleAnswer.onclick = checkAnswer();

        console.log(possibleAnswer);
    }
};

// <<<<<< When I answer a question, the next one is presented
function checkAnswer() {

};

//_____Event Listeners_____
startButtonEl.addEventListener("click", function () {
    startGame();

    hintEl.innerHTML = "";
    adviceEl.innerHTML = "";

    var hint = document.createElement("h5");
    hint.textContent = "HINT: Carefully read and answer the following questions.";
    welcomeHeaderEl.appendChild(hint);

    var focusOn = document.createElement("h6");
    focusOn.textContent = "Correct answer - 10 points; Wrong answer - substract 5 sec:";
    welcomeHeaderEl.appendChild(focusOn);

    var time = document.createElement("h2");
    time.textContent = givenTime;
    welcomeHeaderEl.insertBefore(time, welcomeHeaderEl.children[0]);
    time.setAttribute("class", "btn bg-warning btn-lg");
    timeTicking = time;
});
// <<<<<< If answer incorrect the time is substracted from the clock

// <<<<<< If all question answered or the timer reaches 0 - Game is over

// <<<<<< If game is over prompt a form to save initials and score




// Hide and Show elements functions

// function hideElement(elementToHide) {
//     if (elementToHide !== undefined) {
//         elementToHide.style.display = "none"
//     }
// };

// function showElement(elementToShow, displayStyle) {

//     console.log(elementToShow);
//     console.log(displayStyle);
//     if (elementToShow !== undefined & displayStyle === undefined) {
//         elementToShow.style.display = displayStyle;
//     };
//     if (displayStyle !== undefined) {
//         elementToShow.style.display = displayStyle;
//     };
// };
