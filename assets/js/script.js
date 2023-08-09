/** On page load hide the welcome user section and quiz area */
window.addEventListener("load", (event) => {
    document.getElementsByClassName("welcome-area")[0].style.display = "none";
    document.getElementsByClassName("quiz-area")[0].style.display = "none";
});

// Code for form validation referenced from https://www.freecodecamp.org/news/form-validation-with-html5-and-javascript/
const submit = document.getElementById("submit");

submit.addEventListener("click", validate);

function validate(e) {
    e.preventDefault();

    const userNameField = document.getElementById("username");

    if (!userNameField.value) {
        const nameError = document.getElementById("usernameError");
        nameError.classList.add("visible");
        userNameField.classList.add("invalid");
        nameError.setAttribute("aria-hidden", false);
        nameError.setAttribute("aria-invalid", true);
        nameError.innerText = "Please fill in a username to proceed!"
    }

    if (userNameField.value) {
        console.log(userNameField.value)
        window.localStorage.setItem("username", userNameField.value);
        document.getElementsByClassName("welcome-area")[0].style.display = "initial";
        document.getElementsByClassName("form-area")[0].style.display = "none";
        let user = window.localStorage.getItem("username");
        document.getElementById("welcome-text").innerText = `Welcome to the Quiz, ${user}!`;
    }
}

var allQuestions;
var current = 0;
let score = 0;
const progressText = document.querySelector("#progressText");
const progressBarFull = document.querySelector("#progressBarFull");
let questionCounter = 0;
let availableQuestions = [];
let availableOptions = [];
let currentQuestion;

// push the questions into availableQuestions array
function setAvailableQuestions() {
    const totalQuestions = allQuestions.length;
    for(let i = 0; i < totalQuestions; i++) {
        availableQuestions.push(allQuestions[i]);
    }
}

function createQuestion() {
    // deselect answers
    for (let i = 0; i < allQuestions[this.current].answers.length; i++) {
        document.forms.radioAnswers.elements.choice[i].checked = false;
    }
    // generate a random question
    loadQuestion();
    // progress bar styling
    progressText.innerText = `Question ${questionCounter} of ${allQuestions.length}`
    progressBarFull.style.width = `${(questionCounter/allQuestions.length) * 100}%`
}

/**
 * This function generates a random Question.
 * Uses Math.random to generate a randomQuestionIndex and gets the position of the
 * randomQuestionIndex from the availableQuestions array and removes it from the array
 * using splice() method so that the question is not repeated.
 */
function loadQuestion() {
    let question = document.getElementById('question-block');
    const randomQuestionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    currentQuestion = randomQuestionIndex;
    // make some HTML to display each question
    question.innerHTML = currentQuestion.q;
    const randomIndex = availableQuestions.indexOf(randomQuestionIndex);
    availableQuestions.splice(randomIndex, 1);
    // incrementing question counter
    questionCounter++;
}

function getSelectedChoice(element) {
    const value = parseInt(element.value);
    if (value === currentQuestion.correct) {
        console.log("answer is correct");
        score++;
        incrementScore();
    } else {
        console.log("answer is wrong");
        incrementWrongAnswer();
    }
}

const next = document.getElementById("next");
next.addEventListener("click", () => {
    if (questionCounter === allQuestions.length) {
        console.log("Quiz ends")
        localStorage.setItem("totalScore", score);
        window.location.assign('end_quiz.html');
    } else {
        createQuestion();
    }
});

/** Code for score tracking referenced from Love Maths Project
 * This function increments the correct score.
 */
function incrementScore() {
    let oldscore = parseInt(document.getElementById("correct-counter").innerText);
    document.getElementById("correct-counter").innerText = ++oldscore;
}

/**
 * This function increments the wrong answer counter
 */
function incrementWrongAnswer() {
    let oldscore = parseInt(document.getElementById("wrong-counter").innerText);
    document.getElementById("wrong-counter").innerText = ++oldscore;
}

/**
 * Loads the set of questions based on the level of difficulty
 * chosen by the user
 * @param {string} selectedLevel
 */
function questionChoice(selectedLevel) {
    let userChoice = selectedLevel.textContent;
    if (userChoice === 'Easy') {
        allQuestions = allQuestionsEasy;
    } else if (userChoice === 'Medium') {
        allQuestions = allQuestionsMedium;
    } else if (userChoice === 'Hard') {
        allQuestions = allQuestionsHard;
    } else {
        alert('You have not made a choice!')
    };

    // Start Quiz
    setAvailableQuestions();
    createQuestion();
    document.getElementsByClassName("quiz-area")[0].style.display = "initial"; //displays the quiz section
    document.getElementsByClassName("welcome-area")[0].style.display = "none"; //hides welcome user section
    localStorage.setItem("userLevel", userChoice);
    return allQuestions;
}
