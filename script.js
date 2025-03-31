const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which is the largest planet in our solar system?",
        options: ["Earth", "Jupiter", "Mars", "Venus"],
        answer: "Jupiter"
    },
    {
        question: "Who developed the theory of relativity?",
        options: ["Newton", "Einstein", "Galileo", "Tesla"],
        answer: "Einstein"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreElement = document.getElementById("score");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option, button));
        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedOption, button) {
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        button.style.backgroundColor = "#28a745"; // Green for correct
        score++;
    } else {
        button.style.backgroundColor = "#dc3545"; // Red for incorrect
    }

    // Disable all buttons after selecting an answer
    Array.from(optionsElement.children).forEach(btn => btn.disabled = true);

    nextButton.style.display = "block"; // Show next button
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        nextButton.style.display = "none";
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreElement.textContent = `${score} / ${questions.length}`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");
    loadQuestion();
    nextButton.style.display = "none";
}

// Load the first question
loadQuestion();