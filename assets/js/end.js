// Variables stored in local storage are retrieved
// Elements are targeted with ID selectors and stored in variables to make some HTML content
let finalScore = document.getElementById("final-score");
const mostRecentScore = localStorage.getItem("mostRecentScore");
let difficultyLevel = document.getElementById("difficulty-level");
let quizPlayer = document.getElementById("quiz-player");
let userLevel = localStorage.getItem("userLevel");
let user = window.localStorage.getItem("username");
let finalMessage = document.getElementById("final-message");
const resultImageDiv = document.getElementById("result-image");
const total = 10;
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// make some HTML to display the results of the quiz
finalScore.innerHTML = `<h2>Your Score: ${mostRecentScore}/${total}</h2>`;
difficultyLevel.innerHTML = `<h2>Level: ${userLevel}</h2>`;
quizPlayer.innerHTML = `<h3>Thank you ${user} for completing the quiz!</h3>`;

/**
 * This function is used to display custom messages with score, level info and
 * an appropriate success image to user based on difficulty level and score.
 */

function displayCustomResult() {
    let imageUrl = "";
    if (userLevel == "Easy") {
        if (mostRecentScore >= 8) {
            finalMessage.innerHTML = `<h2>Great job! You're a geography superstar!</h2>`;
            imageUrl = "assets/images/zac_durant_unsplash.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="a man with open arms looking at the sunset">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
        else if (mostRecentScore >= 5) {
            finalMessage.innerHTML = `<h2>Nice work! You have a good grasp of geography.</h2>`;
            imageUrl = "assets/images/jordan_whitfield_unsplash.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="image which has work harder text as neon light">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
        else {
            finalMessage.innerHTML = `<h2>Keep practicing! You're improving.</h2>`;
            imageUrl = "assets/images/drew_beamer_unsplash.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="image with a motivational text">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
    }
    else if (userLevel == "Medium") {
        if (mostRecentScore >= 7) {
            finalMessage.innerHTML = `<h2>Impressive job! You're a geography expert!</h2>`;
            imageUrl = "assets/images/medium_success_1.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="image of 3 men cheering for the success of a man">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
        else if (mostRecentScore >= 4) {
            finalMessage.innerHTML = `<h2>Well done! You're getting the hang of it.</h2>`;
            imageUrl = "assets/images/medium_success_2.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="badge with text good job">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
        else {
            finalMessage.innerHTML = `<h2>Don't give up! Keep learning and improving.</h2>`;
            imageUrl = "assets/images/nik_unsplash.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="motivational quote written on a blackboard">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
    }
    else if (userLevel == "Hard") {
        if (mostRecentScore >= 6) {
            finalMessage.innerHTML = `<h2>Outstanding performance! You're a true geography enthusiast!</h2>`;
            imageUrl = "assets/images/hard_success_1.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="woman carrying the earth">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
        else if (mostRecentScore >= 3) {
            finalMessage.innerHTML = `<h2>Good effort! Keep challenging yourself.</h2>`;
            imageUrl = "assets/images/hard_success_2.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="image of a hiker with a motivational quote">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
        else {
            finalMessage.innerHTML = `<h2>Don't lose heart! Keep learning and trying.`;
            imageUrl = "assets/images/hard_success_3.jpg";
            resultImageDiv.innerHTML = `<img src="${imageUrl}" alt="image of someone jumping and a motivational quote">`;
            resultImageDiv.firstChild.className = "end-quiz-img";
        }
    }
}

/**
 * This function is used to save the highScores by creating a score object having keys -
 * score, name of player, difficulty level and the object is pushed to the highScores array and
 * scores are sorted and top 5 scores are displayed. Using localStorage the highScores will be
 * retrieved later.
 * @param {event} e
 */
function saveHighScore(e) {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: user,
        level: userLevel
    };

    highScores.push(score);

    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    highScores.splice(5);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("./index.html");
}

displayCustomResult();
