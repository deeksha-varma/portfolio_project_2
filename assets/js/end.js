let finalScore = document.getElementById("final-score");
let totalScore = localStorage.getItem("totalScore");
let quizPlayer = document.getElementById("quiz-player");
let userLevel = localStorage.getItem("userLevel");
let user = window.localStorage.getItem("username");
const total = 10;

finalScore.innerHTML = `<h2>You scored ${totalScore}/${total} at the ${userLevel} level</h2>`;
quizPlayer.innerHTML = `<h2>Congratulations ${user}!</h2>`;
