// variable querySelectors:
var startButtonEl = document.querySelector("#playNow");
var mainContainerEl = document.querySelector("#main-container");
var welcomeHeaderEl = document.querySelector("#welcome-header");
var hintEl = document.querySelector("#welcome-header");
var adviceEl = document.querySelector("#question-visitor");
var questionEl = document.querySelector("#game-instructions");
var answerEl = document.querySelector("#button-choices");
var timerEl = document.querySelector("#given-time")

var givenTime = 60;
var timeTicking;

var definedIndex = 0;
var userScore = 0;

// Arrays of objects (questions)
var questions = [
    {
        question: "JavaScript is the same as Java?",
        choices: ["True", "False",],
        answer: "False"
    },

    {
        question: "How long did it take a person to develop JavaScript?",
        choices: ["10 days", "5 weeks", "4 months", "1 year"],
        answer: "10 days"
    },

    {
        question: "Inside which HTML element do we put the JavaScript:",
        choices: ["<javascript>", "<script>", "<js>", "<style>"],
        answer: "<script>"
    },



    {
        question: "Correct syntax for referring to an external script called \"xxx.js\":",
        choices: ["<script name=\"xxx.js\">", "<script src=\"xxx.js\">", "<script href=\"xxx.js\">"],
        answer: "<script src=\"xxx.js\">"
    },

    {
        question: "Conditional Statements for JS are:",
        choices: [".for() {};", ".while() {};", ".function() {};", ".if(){} else{};"],
        answer: ".if(){} else{};"
    },

    {
        question: "WHILE loop start:",
        choices: ["while (i <= 10)", "while (i <= 10; i++)", "while i <= 10"],
        answer: "while (i <= 10)"
    },

    {
        question: "How A function in JavaScript looks like:",
        choices: ["function {myFunction}", "function.myFunction[]", "function myFunction()"],
        answer: "function myFunction()"
    },

    {
        question: "function to round down a decimal number to the nearest integer ?",
        choices: ["Math.random()", "MathInt()", "Math.Floor()", "ParseInt()"],
        answer: "Math.Floor()"
    },

    {
        question: "The method to sellect elements from html:",
        choices: [".querySellector()", ".getElementById", ".getElementsByClassName", "all of them"],
        answer: "all of them"
    },

    {
        question: "The method to listen for a click event:",
        choices: [".onClickEvent()", ".ifClick()", ".afterClick", ".addEventListener()"],
        answer: ".addEventListener()"
    }
];

//<<<<<< 1. When I click start/play game the timer should start and question prompt to be presented:


// Time reaches 0
function timer() {

    givenTime--;
    timerEl.textContent = givenTime;
    if (givenTime <= 0) {
        givenTime = 0;
        timerEl.textContent = "Time out"
        clearInterval(timeTicking);
        hintEl.textContent = "Share to your friends so they can try out the Quiz! "
        questionEl.innerHTML = "Your score is: " + userScore + " out of 100!";
        answerEl.innerHTML = "<button class=\"btn bg-success m-3 p-2\">" + "HighScores:" + "</button>";
    }
}

function timeOut() {
    clearInterval(timeTicking);
    timerEl.textContent = "That was all";
    questionEl.textContent = userScore;
    hintEl.textContent = "Share to your friends so they can try out the Quiz! "
    questionEl.innerHTML = "Your score is: " + userScore + " out of 100!";
    answerEl.innerHTML = "<button class=\"btn bg-success m-3 p-2\">" + "HighScores:" + "</h3>";


}

function startGame() {
    console.log("Game started");
    timeTicking = setInterval(timer, 1000);
    nextQuestion();

}

// Dynamic website using Web API
function nextQuestion() {
    var availableQuestion = questions[definedIndex].question;
    questionEl.textContent = availableQuestion;
    questionEl.setAttribute("style", "font-size: 25px;");
    answerEl.innerHTML = "";

    for (i = 0; i < questions[definedIndex].choices.length; i++) {

        // First time I created a <p> element but looks like it's easier to create a <button> element 
        var possibleAnswer = document.createElement("button");
        possibleAnswer.setAttribute("class", "btn answer-btn bg-warning m-3 p-2",);
        possibleAnswer.setAttribute("value", questions[definedIndex].choices[i]);
        possibleAnswer.textContent = questions[definedIndex].choices[i];
        answerEl.append(possibleAnswer);

        possibleAnswer.onclick = checkAnswer;


        console.log(possibleAnswer);
    }
};

// <<<<<< When I answer a question, the next one is presented
function checkAnswer() {
    if (this.value === questions[definedIndex].answer) {
        userScore += 10;
        console.log(userScore);

        // Penalty for wrong answer
    } else {
        givenTime -= 5;

    }
    definedIndex++;
    // If last question timOut
    if (definedIndex === questions.length) {
        timeOut();
    } else {
        nextQuestion();
    }

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

    // var time = document.createElement("h2");
    // time.textContent = givenTime;
    // welcomeHeaderEl.insertBefore(time, welcomeHeaderEl.children[0]);
    // time.setAttribute("class", "btn bg-warning btn-lg");
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
