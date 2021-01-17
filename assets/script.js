// variable querySelectors:
var startButtonEl = document.querySelector("#playNow");
var mainContainerEl = document.querySelector("#main-container");
var welcomeHeaderEl = document.querySelector("#welcome-header");
var askVisitorEl = document.querySelector("#question-visitor");
var questionEl = document.querySelector("#game-instructions");
var answerEl = document.querySelector("#button-choices");

var definedIndex = 0;

// Arrays of objects (questions)
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript:",
        choices: ["<javascript>", "<script>", "<js>", "<style>"],
        answer: 1
    },

    {
        question: "Conditional Statements for JS are:",
        choices: [".for() {};", ".while() {};", ".if(){} else{};", "function() {};"],
        answer: 2
    }
];

// Hide and Show elements functions
function hideElement(elementToHide) {
    if (elementToHide !== undefined) {
        elementToHide.style.display = "none"
    }
};

function showElement(elementToShow, displayStyle) {

    console.log(elementToShow);
    console.log(displayStyle);
    if (elementToShow !== undefined & displayStyle === undefined) {
        elementToShow.style.display = displayStyle;
    };
    if (displayStyle !== undefined) {
        elementToShow.style.display = displayStyle;
    };
};

//<<<<<< 1. When I click start/play game the timer should start and question prompt to be presented:

function startGame() {
    console.log("Game started");
    nextQuestion();
};

// Dynamic website using Web API
function nextQuestion() {
    var availableQuestion = questions[definedIndex].question;
    questionEl.textContent = availableQuestion;
    questionEl.setAttribute("style", "font-size: 30px;");
    answerEl.innerHTML = "";

    console.log(questionEl);
    for (i = 0; i < questions[definedIndex].choices.length; i++) {

        var possibleAnswer = document.createElement("p");
        possibleAnswer.setAttribute("class", "list-group-item-warning");
        possibleAnswer.setAttribute("value", questions[definedIndex].choices[i]);
        possibleAnswer.textContent = questions[definedIndex].choices[i];
        answerEl.appendChild(possibleAnswer);

        console.log(possibleAnswer);
    }
};


// <<<<<< When I answer a question, the next one is presented

// <<<<<< If answer incorrect the time is substracted from the clock

// <<<<<< If all question answered or the timer reaches 0 - Game is over

// <<<<<< If game is over prompt a form to save initials and score


//_____Event Listeners_____
startButtonEl.addEventListener("click", function () {
    startGame();
    hideElement(welcomeHeaderEl);
    hideElement(askVisitorEl);

    var hint = document.createElement("h5");
    hint.textContent = "HINT:";
    mainContainerEl.insertBefore(hint, mainContainerEl.children[0]);

    var focusOn = document.createElement("h6");
    focusOn.textContent = "Carefully read and answer the following questions.";
    mainContainerEl.insertBefore(focusOn, mainContainerEl.children[1]);

});


