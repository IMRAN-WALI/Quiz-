const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyperlinks and Text Markup Language",
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyper Transfer Markup Language"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag is used to define an internal style sheet?",
        options: ["<style>", "<css>", "<script>", "<link>"],
        correct: 0
    },
    {
        question: "What is the correct CSS syntax to change the background color of an element?",
        options: [
            "background-color: red;",
            "bgcolor: red;",
            "color-background: red;",
            "background: red;"
        ],
        correct: 0
    },
    {
        question: "Which is the correct syntax for referring to an external JavaScript file?",
        options: [
            "<script href='app.js'>",
            "<script src='app.js'>",
            "<script link='app.js'>",
            "<script file='app.js'>"
        ],
        correct: 1
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-style", "font-style", "text-size"],
        correct: 0
    },
    {
        question: "How do you create a function in JavaScript?",
        options: [
            "function = myFunction()",
            "function myFunction()",
            "function:myFunction()",
            "create.myFunction()"
        ],
        correct: 1
    },
    {
        question: "How do you add a comment in CSS?",
        options: [
            "// This is a comment",
            "<!-- This is a comment -->",
            "/* This is a comment */",
            "'This is a comment"
        ],
        correct: 2
    },
    {
        question: "What is the correct HTML element for the largest heading?",
        options: ["<heading>", "<h6>", "<h1>", "<h5>"],
        correct: 2
    },
    {
        question: "How can you add a background color in HTML?",
        options: [
            "<body style='background-color:yellow;'>",
            "<background>yellow</background>",
            "<body bg='yellow'>",
            "<body bgcolor='yellow'>"
        ],
        correct: 0
    },
    {
        question: "Which JavaScript method is used to select an element by its ID?",
        options: [
            "getElementById()",
            "querySelector()",
            "getElementsByClass()",
            "getById()"
        ],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let selectedAnswers = [];

const questionEl = document.querySelector('.question');
const optionsEl = document.querySelector('.options');
const progressEl = document.querySelector('.progress');
const scoreEl = document.querySelector('.score');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

function loadQuestion() {
    const question = quizData[currentQuestion];
    questionEl.textContent = `Q ${currentQuestion + 1}: ${question.question}`;

    optionsEl.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = `${index + 1}. ${option}`;
        button.classList.add('option');
        button.addEventListener('click', () => selectOption(index, button));
        optionsEl.appendChild(button);
        
        // Highlight selected option if previously selected
        if (selectedAnswers[currentQuestion] !== undefined) {
            if (index === selectedAnswers[currentQuestion]) {
                button.classList.add(
                    index === question.correct ? 'correct' : 'incorrect'
                );
            }
        }
    });

    updateProgress();
    updateButtons();
}

function selectOption(index, button) {
    const question = quizData[currentQuestion];
    const options = optionsEl.querySelectorAll('.option');

    // Disable all options after an answer is selected
    options.forEach(option => option.disabled = true);

    // Store selected answer
    selectedAnswers[currentQuestion] = index;

    // Mark as correct or incorrect
    if (index === question.correct) {
        button.classList.add('correct');
        // Increment score if this is the first time selecting this answer
        if (selectedAnswers[currentQuestion] === index) {
            score++;
        }
    } else {
        button.classList.add('incorrect');
        options[question.correct].classList.add('correct');
    }

    // Update score immediately
    updateScore();
}

function updateProgress() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressEl.style.width = `${progress}%`;
}

function updateScore() {
    const totalQuestions = quizData.length;
    const maxScore = 10;

    // Calculate the score based on 10 points and round it to the nearest integer
    const scaledScore = Math.round((score / totalQuestions) * maxScore);

    scoreEl.textContent = `Score: ${scaledScore}/${maxScore}`;
}

function finishQuiz() {
    questionEl.textContent = 'Quiz Completed!';
    optionsEl.innerHTML = '';
    updateScore();
    prevBtn.disabled = true;
    nextBtn.disabled = true;
}

function updateButtons() {
    // Disable Previous button on the first question
    prevBtn.disabled = currentQuestion === 0;

    // Change Next button to Finish on the last question
    nextBtn.textContent = currentQuestion === quizData.length - 1 ? 'Finish' : 'Next';
}

// Event listeners for Previous and Next buttons
prevBtn.addEventListener('click', () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
});

loadQuestion();