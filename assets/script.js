// variable querySelectors:
var startButtonEl = document.querySelector("#playNow");
var notYetEl = document.querySelector("#notYet");
var welcomeHeaderEl = document.querySelector("#welcome-header");
var hintEl = document.querySelector("#welcome-header");
var adviceEl = document.querySelector("#question-visitor");
var questionEl = document.querySelector("#game-instructions");
var answerEl = document.querySelector("#button-choices");
var timerEl = document.querySelector("#given-time");
var finalScoreEl = document.querySelector("#final-score");
var userFormEl = document.querySelector("#user-input");
var submitButtonEl = document.querySelector("#submit");
var userStoredEl = document.querySelector("#user-stored");
var scoreStoredEl = document.querySelector("#score-stored");
var checkAnswerEl = document.querySelector("#title-check");
var highScoreEl = document.querySelector("#high-score");
var scoreListEl = document.querySelector("#highscore-list");
var appendLiEl = document.querySelector("#append-li");
var hideHighscoreEl = document.querySelector("#hide-highscores");

var givenTime = 60;
var timeTicking;

var definedIndex = 0;
var userScore = 0;

var scoreList = [];
var localHighscores = localStorage.getItem("scoreList")
if (localHighscores !== null) {
    scoreList = JSON.parse(localHighscores);
};

// Array of objects (questions)
var questions = [
    {
        question: "JavaScript is the same as Java:",
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
        choices: ["Math.random()", "MathInt()", "Math.Floor()", "Math.round()"],
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
function startGame() {
    console.log("Game started");
    timeTicking = setInterval(timer, 1000);
    nextQuestion();
};
// <<<<<< If timer reaches 0 - Game is over
function timer() {
    givenTime--;
    timerEl.textContent = givenTime;
    if (givenTime <= 0) {
        givenTime = 0;
        timerEl.textContent = "Time out"
        changeDom();
    }
};

function changeDom() {
    clearInterval(timeTicking);
    hintEl.textContent = "Share to your friends so they can try out the Quiz! "
    questionEl.innerHTML = "Your score is: " + userScore + " out of 100!";
    answerEl.innerHTML = "<button onClick=\"window.location.reload();\" id=\"start-again\" class=\"btn bg-success m-3 p-2\">" + "Start again" + "</h3>";
    userFormEl.setAttribute("style", "block");
    finalScoreEl.textContent = userScore + " ";
    userFormEl.setAttribute("style", "block");
};
// Dynamic website using Web API
function nextQuestion() {
    var availableQuestion = questions[definedIndex].question;
    questionEl.textContent = availableQuestion;
    questionEl.setAttribute("style", "font-size: 25px;");
    answerEl.innerHTML = "";

    for (i = 0; i < questions[definedIndex].choices.length; i++) {

        var possibleAnswer = document.createElement("button");
        possibleAnswer.setAttribute("class", "btn answer-btn bg-warning m-3 p-2",);
        possibleAnswer.setAttribute("value", questions[definedIndex].choices[i]);
        possibleAnswer.textContent = questions[definedIndex].choices[i];
        answerEl.append(possibleAnswer);
        possibleAnswer.onclick = checkAnswer;
    }
};
// <<<<<< 2. When I answer a question, the next one is presented
function checkAnswer() {

    if (this.value === questions[definedIndex].answer) {

        userScore += 10;
        console.log(userScore);
        // .setAttribute("style", "background-color: green");
        checkAnswerEl.textContent = "Correct";
        checkAnswerEl.setAttribute("class", "bg-green quiz-game-nav")
        setTimeout(function () {
            checkAnswerEl.textContent = "Quiz Game";
            checkAnswerEl.classList.remove("bg-green")
        }, 1000);

        // <<<<<< If answer incorrect the time is substracted from the clock
    } else {
        givenTime -= 10;
        // this.setAttribute("style", "background-color: red");
        checkAnswerEl.textContent = "Wrong";
        checkAnswerEl.setAttribute("class", "bg-red quiz-game-nav")
        setTimeout(function () {
            checkAnswerEl.textContent = "Quiz Game";
            checkAnswerEl.classList.remove("bg-red")
        }, 1000);
    }
    definedIndex++;
    // <<<<<< If all question answered - Game is over
    if (definedIndex === questions.length) {
        timerEl.textContent = "That was all";
        changeDom();
    } else {
        nextQuestion();
    }
};

//<<<<<<< I can save my initials and my score
function form() {
    var finalScore = localStorage.getItem("finalScore");
    var userInput = localStorage.getItem("userInput");

    if (!finalScore || !userInput) {
        return;
    }

    userStoredEl.textContent = userInput;
    scoreStoredEl.textContent = finalScore;
};

//_____Event Listeners_____

//  registered user
submitButtonEl.addEventListener("click", function (event) {
    event.preventDefault();

    var userInput = document.querySelector("#initials").value;
    var finalScore = userScore;

    if (userInput === "") {
        alert("Input area cannot be blank");
    } else {
        localStorage.setItem("finalScore", userScore);
        localStorage.setItem("userInput", userInput);

        scoreList.push([userInput, finalScore]);
        localStorage.setItem("scoreList", JSON.stringify(scoreList));
        form();
    }
});

// append li of stored users
highScoreEl.addEventListener("click", function () {
    appendLiEl.innerHTML = "";
    for (var i = 0; i < scoreList.length; i++) {
        var user = document.createElement("li");
        user.textContent = scoreList[i][0] + ": " + scoreList[i][1] + " points";
        appendLiEl.appendChild(user);
    }
    scoreListEl.setAttribute("style", "block");
});

// clear scoreList
hideHighscoreEl.addEventListener("click", function () {
    appendLiEl.innerHTML = "";
});

// start button
startButtonEl.addEventListener("click", function () {
    startGame();

    hintEl.innerHTML = "";
    adviceEl.innerHTML = "";

    var hint = document.createElement("h5");
    hint.textContent = "HINT: Read Carefully since there are penalties";
    welcomeHeaderEl.appendChild(hint);

    var focusOn = document.createElement("h6");
    focusOn.textContent = "Correct answer: 10 points; Wrong answer - substract 10 sec:";
    welcomeHeaderEl.appendChild(focusOn);
});

// not ready yet
notYetEl.addEventListener("click", function () {
    alert("Ok, whenever you feel ready come back and press Play Now.");
});
