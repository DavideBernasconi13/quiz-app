const questions = [
    {
        question: "Qual è la capitale dell'Italia?",
        answers: [
            { text: "Roma", correct: true },
            { text: "Milano", correct: false },
            { text: "Napoli", correct: false },
            { text: "Torino", correct: false }
        ]
    },
    {
        question: "Qual è il pianeta più vicino al Sole?",
        answers: [
            { text: "Mercurio", correct: true },
            { text: "Venere", correct: false },
            { text: "Terra", correct: false },
            { text: "Marte", correct: false }
        ]
    },
    {
        question: "Chi ha scritto 'La Divina Commedia'?",
        answers: [
            { text: "Dante Alighieri", correct: true },
            { text: "Giovanni Boccaccio", correct: false },
            { text: "Francesco Petrarca", correct: false },
            { text: "Ludovico Ariosto", correct: false }
        ]
    },
    {
        question: "Quale gas compone principalmente l'atmosfera terrestre?",
        answers: [
            { text: "Azoto", correct: true },
            { text: "Ossigeno", correct: false },
            { text: "Anidride carbonica", correct: false },
            { text: "Idrogeno", correct: false }
        ]
    }
]


let questionElement = document.getElementById("question");
let answerButtons = document.getElementById("answers-btn");
let nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function starQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    console.log('currentQuestion è:', currentQuestion);
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        //creo l'elemento e lo appendo
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    document.body.style.background = "";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore() {
    resetState();

    if (score == questions.length) {
        questionElement.innerHTML = `Complimenti hai fatto il punteggio massimo di ${questions.length} punti :)`;
        document.body.style.background = "green";
    } else if (score == 0) {
        questionElement.innerHTML = `Hai fatto ${score} punti. VAI A STUDIARE ;)`;
        document.body.style.background = "red";
    } else {
        questionElement.innerHTML = `Hai fatto ${score} punti su un totale di ${questions.length} punti!`;
    }
    nextButton.innerHTML = "Gioca ancora";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        starQuiz();
    }
})

starQuiz(); 