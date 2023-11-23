const PlayerRegistrationData = [];
let playerName;
let totalQuestions = 0;
let correctAnswers = 0;

// Function to calculate age
function calculateAge(dob) {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    if (
        currentDate.getMonth() < birthDate.getMonth() ||
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    return age;
}

// Function to disable/enable form fields
function disableFormFields(disable) {
    const formFields = document.getElementById('registrationForm').elements;
    for (let i = 0; i < formFields.length; i++) {
        formFields[i].disabled = disable;
    }
    document.getElementById('registerButton').disabled = disable;
}

// Function to update the score display
function updateScore() {
    document.getElementById('totalQuestions').textContent = totalQuestions;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('percentage').textContent = ((correctAnswers / totalQuestions) * 100 || 0).toFixed(2) + '%';
}

// Function to generate a question
function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    document.getElementById('num1').textContent = num1;
    document.getElementById('num2').textContent = num2;
    return num1 * num2;
}

// Task 2: Register function
function register() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
         // Validation logic here
         if (!firstName || !lastName || !dob || !gender || !email) {
        alert('All fields are required.');
        return;
    }

    if (firstName.length < 3 || lastName.length < 3) {
        alert('First and Last Name must be more than three characters in length.');
        return;
    }

    // Validate age
    const age = calculateAge(dob);
    if (age < 8 || age > 12 || isNaN(age)) {
        alert('Age must be between 8 and 12 (inclusive).');
        return;
    }

    // Validate email
    if (!email.endsWith('@gmail.com')) {
        alert('Email address must end with "@gmail.com".');
        return;
    }
    
 playerName = `${firstName} ${lastName}`;
    document.getElementById('playerName').textContent = playerName;
    // Validation logic here
    PlayerRegistrationData.push({
playerName: playerName,
dob: dob, // Add this line to include the date of birth
equation: '',
gender:gender,
userAnswer: 0,
isCorrect: false,
});
   

    // Disable registration form and enable game elements
    disableFormFields(true);
    document.getElementById('registration').style.display = 'none';
    document.getElementById('question').style.display = 'block';
    document.getElementById('score').style.display = 'block';

    // Enable Start button
    document.getElementById('startButton').disabled = false;

    
}

// Task 4: PlayGame function
function playGame() {
    // Reset totalQuestions and correctAnswers
    totalQuestions = 0;
    correctAnswers = 0;

    // Clear previous question and answer
    document.getElementById('num1').textContent = '';
    document.getElementById('num2').textContent = '';
    document.getElementById('answer').value = '';

    // Update the score display
    updateScore();
document.getElementById('checkAnswerButton').disabled = false;
document.getElementById('nextButton').disabled = false;
    // Generate and display the first question
    askQuestion();
}

// Function to ask a question
function askQuestion() {
    const correctAnswer = generateQuestion();
    const submitButton = document.getElementById('submit');

    submitButton.addEventListener('click', function () {
        totalQuestions++;
        const userAnswer = parseInt(document.getElementById('answer').value);

        if (userAnswer === correctAnswer) {
            correctAnswers++;
        }

        updateScore();
        nextQuestion();
    });
}

// Function to move to the next question
function nextQuestion() {
    // Reset the answer input field
    document.getElementById('answer').value = '';

    // Generate a new question
    generateQuestion();
}

function showAllStats() {
    // Clear the 'showallplayers' display area
    document.getElementById('showallplayers').innerHTML = '';
// Clear the 'showallplayers' display area
document.getElementById('showallplayers').innerHTML = '';

// Display all player statistics
for (const playerData of PlayerRegistrationData) {
const stats = `
<p>Name: ${playerData.playerName}</p>
<p>Age: ${calculateAge(playerData.dob)}</p>
<p>Equation: ${playerData.equation}</p>
<p>User Answer: ${playerData.userAnswer}</p>
<p>Status: ${playerData.isCorrect ? 'Correct' : 'Incorrect'}</p>
<p>Percentage: ${(playerData.isCorrect ? 100 : 0).toFixed(2)}%</p>
<hr>`;

// Append the stats to the 'showallplayers' display area
document.getElementById('showallplayers').innerHTML += stats;
}
}
// Task 6: Create a CheckAnswer function
function checkAnswer() {
    // Get the correct answer for the
// Get the correct answer for the current question
       // Get the correct answer for the current question
       const correctAnswer = parseInt(document.getElementById('num1').textContent) * parseInt(document.getElementById('num2').textContent);

       // Get the user's answer
       const userAnswer = parseInt(document.getElementById('answer').value);
   
       // Determine if the answer is correct
       const isCorrect = userAnswer === correctAnswer;
   
       if (!isCorrect) {
           alert(`Incorrect! The correct answer is: ${correctAnswer}`);
       }
   
       // Append data to PlayerRegistrationData
       PlayerRegistrationData.push({
           playerName: playerName,
           equation: `${document.getElementById('num1').textContent} x ${document.getElementById('num2').textContent}`,
           userAnswer: userAnswer,
           isCorrect: isCorrect,
       });
   
       // Update the display and proceed to the next question
       totalQuestions++;
       if (isCorrect) {
           correctAnswers++;
       }

    // Update the display and proceed to the next question
    updateScore();
    nextQuestion();
}

// Task 10: Create a findPercentageScore function
function findPercentageScore() {
    const totalPlayers = PlayerRegistrationData.length;

if (totalPlayers === 0) {
alert("No players registered yet.");
return;
}

let totalCorrectAnswers = 0;

for (const playerData of PlayerRegistrationData) {
if (playerData.isCorrect) {
    totalCorrectAnswers++;
}
}

const percentageScore = ((totalCorrectAnswers / totalPlayers) * 100 || 0).toFixed(2) + '%';

// Display statistics in the 'showpercentage' textarea
const showPercentageTextarea = document.getElementById('showpercentage');
showPercentageTextarea.value = `Name: ${playerName}\nTotal Questions: ${totalQuestions}\nCorrect Answers: ${totalCorrectAnswers}\nPercentage: ${percentageScore}`;
}


// Task 11: Create an End function
function endGame() {
    // Clear the registration form and enable inputs
    const formFields = document.getElementById('registrationForm').elements;
    for (let i = 0; i < formFields.length; i++) {
        formFields[i].disabled = false;
    }
    document.getElementById('registerButton').disabled = false;

    // Disable buttons except the Register button
    document.getElementById('startButton').disabled = true;
    document.getElementById('checkAnswerButton').disabled = true;
    document.getElementById('nextButton').disabled = true;

    // Disable Play and Results area
    document.getElementById('question').style.display = 'none';
    document.getElementById('score').style.display = 'none';

    // Call findPercentageScore
    findPercentageScore();
    showAllStats();
}



function showCharts() {
const totalPlayers = PlayerRegistrationData.length;

// Calculate gender percentages
let femaleCount = 0;
let maleCount = 0;

for (const playerData of PlayerRegistrationData) {
    if (playerData.gender && playerData.gender.toLowerCase() === 'female') {
        femaleCount++;
    } else if (playerData.gender && playerData.gender.toLowerCase() === 'male')  {
        maleCount++;
    }
}

const femalePercentage = ((femaleCount / totalPlayers) * 100 || 0).toFixed(2);
const malePercentage = ((maleCount / totalPlayers) * 100 || 0).toFixed(2);

// Display gender frequency chart
const genderChart = `
    <p>Female: <img src="./download.jpg" width="${femalePercentage}" alt="${femalePercentage}%"></p>
    <p>Male: <img src="./download.jpg" width="${malePercentage}" alt="${malePercentage}%"></p>
`;

// Calculate percentage score categories
const scoreCategories = [0, 50, 60, 70, 80, 90, 100];
const scoreCounts = Array(scoreCategories.length).fill(0);

for (const playerData of PlayerRegistrationData) {
    const percentageScore = (playerData.isCorrect ? 100 : 0).toFixed(2);

    for (let i = 0; i < scoreCategories.length - 1; i++) {
        if (percentageScore >= scoreCategories[i] && percentageScore < scoreCategories[i + 1]) {
            scoreCounts[i]++;
            break;
        }
    }
}

// Display percentage score frequency chart
let scoreChart = '';
for (let i = 0; i < scoreCategories.length - 1; i++) {
    const categoryRange = `${scoreCategories[i]} to ${scoreCategories[i + 1] - 1}`;
    const percentage = ((scoreCounts[i] / totalPlayers) * 100 || 0).toFixed(2);
    scoreChart += `<p>${categoryRange}: <img src="./download.jpg" width="${percentage}" alt="${percentage}%"></p>`;
}

// Display charts in the 'showcharts' div
document.getElementById('showcharts').innerHTML = `
    <h2>Gender Frequency Chart:</h2>
    ${genderChart}
    <h2>Percentage Score Frequency Chart:</h2>
    ${scoreChart}
`;
}

// Call showCharts every 5 seconds
setInterval(showCharts, 5000);

