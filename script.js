const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const resultButton = document.getElementById('result-button');
const restartButton = document.getElementById('restart-button');
const questionContainer = document.getElementById('question-container');
const answerButtonsContainer = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');

let currentQuestionIndex, score;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        showFinalScore();
    }
});

resultButton.addEventListener('click', showFinalScore);
restartButton.addEventListener('click', restartQuiz);

function startGame() {
    startButton.classList.add('hide');
    resultButton.classList.add('hide');
    currentQuestionIndex = 0;
    score = 0;
    questionContainer.classList.remove('hide');
    nextButton.classList.remove('hide');
    resultContainer.classList.add('hide');
    resultContainer.innerHTML = '';
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsContainer.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    resultButton.classList.add('hide');
    restartButton.classList.add('hide');
    while (answerButtonsContainer.firstChild) {
        answerButtonsContainer.removeChild(answerButtonsContainer.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsContainer.children).forEach(button => {
        setStatusClass(button, button.innerText === answer.text && correct);
    });

    // Update score
    if (correct) {
        score++;
    }

    // Show result button if it's the last question
    if (currentQuestionIndex === questions.length - 1) {
        resultButton.classList.remove('hide');
    } else {
        nextButton.classList.remove('hide');
    }
}

function showFinalScore() {
    questionContainer.classList.add('hide');
    nextButton.classList.add('hide');
    resultButton.classList.add('hide');
    restartButton.classList.remove('hide');
    startButton.innerText = 'Restart';
    resultContainer.innerHTML = `<p>Your Final Score: ${score}/${questions.length}</p>`;
    resultContainer.classList.remove('hide');
}

function restartQuiz() {
    startGame();
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'London', correct: false },
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false }
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: [
            { text: 'Charles Dickens', correct: false },
            { text: 'William Shakespeare', correct: true },
            { text: 'Jane Austen', correct: false },
            { text: 'Mark Twain', correct: false }
        ]
    }
];
