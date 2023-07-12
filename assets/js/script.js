/** On page load hide the welcome user section */

window.addEventListener("load", (event) => {
    document.getElementsByClassName("welcome-area")[0].style.display = "none";
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
        document.getElementsByClassName("welcome-area")[0].style.display = "initial";
        document.getElementsByClassName("form-area")[0].style.display = "none";
        window.localStorage.setItem("username", userNameField.value);
    }
}

let user = window.localStorage.getItem("username");
console.log(user);
document.getElementById("welcome-text").innerText = `Welcome to the Quiz ${user}!`;
