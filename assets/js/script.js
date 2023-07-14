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

function createQuestion() {

    // loop through the array of questions
    // for each question make some HTML
    let question = document.getElementById('question-block');
    question.innerHTML = allQuestions[this.current].q;
    // increment score
    // create radio button options
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
}