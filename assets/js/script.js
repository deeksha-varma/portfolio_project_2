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
const quiz = document.getElementsByClassName("quiz-container")[0];

function createQuestion() {

    // deselect answers
    for (let i = 0; i < allQuestions[this.current].answers.length; i++) {
        document.forms.radioAnswers.elements.choice[i].checked = false;
    }
        // make some HTML to display each question
        let question = document.getElementById('question-block');
        question.innerHTML = allQuestions[this.current].q;
        // increment score
        // create radio button options
        createChoices();
}

function createChoices() {
    // loop through the radio button options
    for (let i = 0; i < allQuestions[this.current].answers.length; i++){
        let option = document.getElementById("label"+i);
        // append answer text to each radio button label element
        option.innerHTML = allQuestions[this.current].answers[i];
    }
}

function getSelectedChoice() {
    for (let i = 0; i < allQuestions[this.current].answers.length; i++){
        if (document.forms.radioAnswers.elements.choice[i].checked == true){
            let userAnswer = document.forms.radioAnswers.elements.choice[i].value;
            return userAnswer;
        }
    }
}

const next = document.getElementById("next");
next.addEventListener("click", () => {
    const answer = getSelectedChoice();
    if (answer) {
        if (answer == allQuestions[this.current].correct) {
            score++;
            incrementScore();
        } else {
            console.log("wrong answer");
            incrementWrongAnswer();
        }
        this.current++;
        if (this.current < allQuestions.length){
            createQuestion();
        }
        else {
            quiz.innerHTML = `<h2>Quiz ends. You answered ${score}/${allQuestions.length} questions correctly</h2>`;
        }
    }
});

/**
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
    createQuestion();
    document.getElementsByClassName("quiz-area")[0].style.display = "initial"; //displays the quiz section
    document.getElementsByClassName("welcome-area")[0].style.display = "none"; //hides welcome user section
    localStorage.setItem("userLevel", userChoice);
    return allQuestions;
}
