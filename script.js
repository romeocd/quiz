
var headerEl=document.getElementById("top");
var contentId=document.getElementById("content");


function createElement(element, type, value, text) {
    var tmp = document.createElement(element);
    tmp.setAttribute(type, value);
    tmp.textContent = text;
    return tmp;
};

function createButton(idValue) {
    var tmp = document.createElement("button");
    tmp.setAttribute("type", "button");
    tmp.setAttribute("class", "answers");
    tmp.setAttribute("id", idValue);
    return tmp;
};

function createSpan(idValue) {
    var tmp = document.createElement("span");
    tmp.setAttribute("data-answer", "option" + idValue);
    tmp.setAttribute("id", "option" + idValue);
    return tmp;
};

function appendChild(location, element) {
    var tmp = location.appendChild(element);
    return tmp;
};

function startQuiz(event) {
    event.preventDefault;

    questionList = [];

    var question0 = {
        text: "Commonly used data types do NOT include:",
        choices: ["1 - Booleans", "2 - Alerts", "3 - Strings", "4 - Numbers"],
        correctAnswer: "option1",
    };
    questionList.push(question0);

    var question1 = {
        text: "The condition of an if/else statement is enclosed within ______.",
        choices: ["1 - Quotes", "2 - Curly Brackets", "3 - Parentheses", "4 - Square Brackets"],
        correctAnswer: "option2",
    };
    questionList.push(question1);

    var question2 = {
        text: "Arrays in Javascript can be used to store ______.",
        choices: ["1 - Numbers and strings", "2 - Other Arrays", "3 - Booleans", "4 - All of the above",],
        correctAnswer: "option3",
    };
    questionList.push(question2);

    var question3 = {
        text: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["1 - Quotes", "2 - Curly Brackets", "3 - Commas", "4 - Parentheses"],
        correctAnswer: "option3",
    };
    questionList.push(question3);

    var question4 = {
        text: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["1 - Javascript", "2 - console.log", "3 - Terminal/bash", "4 - For loops"],
        correctAnswer: "option1",
    };
    questionList.push(question4);

    shuffle(questionList);

    var lastQuestionIndex = questionList.length - 1;
    var score = 0;
    var currentQuestionIndex = 0;
    countDown = 75;
    countDownSpan.textContent = countDown;

    document.querySelector("#description").style.display = "none";
    document.querySelector("#start-quiz").style.display = "none";
    contentId.style.textAlign = "left";

    setTime();

    createAnswers();

    renderQuestion();

    var answerList = document.querySelectorAll(".answers");
    for (var i = 0; i < answerList.length; i++) {
        answerList[i].addEventListener('click', checkAnswer)
    };

    function setTime() {
        var timerInterval = setInterval(function () {
            countDown--;
            countDownSpan.textContent = countDown;
            if (countDown === 0) {
                clearInterval(timerInterval);
                gameOver();
            } else if (countDown < 0) {
                clearInterval(timerInterval);
                gameOver();
                countDown = 0
            }
            else if (currentQuestionIndex === lastQuestionIndex) {
                clearInterval(timerInterval);
            }
        }, 1000);
    };

    function createAnswers() {
        var q = questionList[currentQuestionIndex];
        var answers = createElement("div", "id", "answers");
        appendChild(contentId, answers);
        var answersDiv = document.getElementById("answers");
        appendChild(answersDiv, button0);
        appendChild(answersDiv, button1);
        appendChild(answersDiv, button2);
        appendChild(answersDiv, button3);
        for (var i = 0; i < q.choices.length; i++) {
            var textSpan = createSpan(i);
            appendChild(document.getElementById("btn" + i), textSpan)
        };
    };

    function shuffle(array) {
        var currentIndex = array.length;
        var temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    };

    function renderQuestion() {
        var q = questionList[currentQuestionIndex];

        questionH1.textContent = q.text;

        for (var i = 0; i < q.choices.length; i++) {
            document.getElementById("option" + i).textContent = q.choices[i];
        }
    };

    function checkAnswer(event) {
        event.preventDefault();
        var wrongAnswer = 10;
        var q = questionList[currentQuestionIndex];
        var userInput = this.children[0].getAttribute("data-answer");
        if (userInput === q.correctAnswer) {
            score++;
            displayCorrect();
        } else {
            countDown = countDown - wrongAnswer;
            countDown.textContent = countDown;
            displayWrong();
        };
        if (currentQuestionIndex < lastQuestionIndex) {
            currentQuestionIndex++;
            renderQuestion();
        } else {
            gameOver();
        };
    };

    function displayCorrect() {
        var correct = createElement("h3", "id", "correct", "Correct!");
        appendChild(document.body, correct);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("correct");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

    function displayWrong() {
        var wrong = createElement("h3", "id", "wrong", "Wrong!")
        appendChild(document.body, wrong);
        timer = 1;
        var timerInterval = setInterval(function () {
            timer--;
            if (timer === 0) {
                clearInterval(timerInterval);
                var element = document.getElementById("wrong");
                element.parentNode.removeChild(element);
                timer = 1;
            };
        }, 1000);
    };

    function gameOver() {
        countDownSpan.textContent = 0;
        contentId.style.textAlign = "center";
        questionH1.textContent = "GAME OVER"
        hideButtons();
        showScore();
        addInitials()
    }

    function hideButtons() {
        var q = questionList[currentQuestionIndex];
        for (var i = 0; i < q.choices.length; i++) {
            document.getElementById("btn" + i).style.display = "none";
        };
    };

    function showScore() {
        var scoreDiv = createElement("h2", "class", "score", "Score: " + score);
        appendChild(contentId, scoreDiv);
    };

    function addInitials() {
        var input = createElement("input", "type", "text");
        input.setAttribute("id", "input");
        input.setAttribute("placeholder", "Type your initials!");
        input.setAttribute("size", "20");
        var submit = createElement("button", "id", "submit", "Submit");
        var msg = createElement("div", "id", "msg");
        appendChild(contentId, input);
        appendChild(contentId, submit);
        appendChild(contentId, msg);

        document.getElementById("submit").addEventListener("click", function () {
            if (document.getElementById("input").value == "") {
                document.getElementById("msg").textContent = "Please type in your initials!"
            } else {
                var highScoreList = JSON.parse(localStorage.getItem("highScores"));
                if (highScoreList == null) {
                    var highScoreList = [];
                    var newScore = new Object();
                    newScore.initials = document.getElementById("input").value;
                    newScore.score = score;
                    highScoreList.push(newScore);
                    var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
                    localStorage.setItem("highScores", JSON.stringify(rankedScore));
                }
                else {
                    var highScore = new Object();
                    highScore.initials = document.getElementById("input").value;
                    highScore.score = score;
                    highScoreList.push(highScore);
                    var rankedScore = highScoreList.sort(({ score: a }, { score: b }) => b - a);
                    localStorage.setItem("highScores", JSON.stringify(rankedScore));
                };
                location.href = "highscores.html"
            };
        });
    };
};

var highScoreDiv = createElement("div", "id", "high-scores");
highScoreDiv.setAttribute("class", "top-position");
appendChild(headerEl, highScoreDiv);
var highScoreA = createElement("a");
highScoreA.setAttribute("href", "highscores.html");
highScoreA.textContent = "View High Scores";
appendChild(document.getElementById("high-scores"), highScoreA);

var countDown = 0;
var timerDiv = createElement("div", "id", "timer", "Timer: ");
timerDiv.setAttribute("class", "top-position");
appendChild(headerEl, timerDiv);
var countDownSpan = createElement("span", "id", "countdown", countDown);
headerEl.childNodes[1].appendChild(countDownSpan);

var questionH1 = createElement("h1", "id", "h1", "Coding Quiz Challenge");
appendChild(contentId, questionH1);

var descriptionDiv = createElement("p", "id", "description", "Try to answer the following code - related questions within the time limit. Keep in mind that incorrect answers will penalize your scoretime by ten seconds!");
appendChild(contentId, descriptionDiv);

var startButton = createElement("button", "id", "start-quiz", "Start Quiz");
startButton.setAttribute("type", "button");
appendChild(contentId, startButton);

var button0 = createButton("btn0");
var button1 = createButton("btn1");
var button2 = createButton("btn2");
var button3 = createButton("btn3");

document.getElementById("start-quiz").addEventListener("click", startQuiz);