const quizData = [
    { question: "What is the capital of India?", options: ["Delhi", "Mumbai", "Chennai", "Kolkata"], answer: "Delhi" },
    { question: "2 + 2 * 2 = ?", options: ["6","8","4","2"], answer: "6" },
    { question: "Which language runs in a web browser?", options: ["Python","Java","C++","JavaScript"], answer: "JavaScript" },
    { question: "HTML stands for?", options: ["Hyper Text Markup Language","High Text","Hyper Transfer","None"], answer: "Hyper Text Markup Language" },
    { question: "CSS is used for?", options: ["Styling","Logic","Database","None"], answer: "Styling" }
];

const quizCard = document.getElementById('quiz-card');
const resultCard = document.getElementById('result-card');
const questionNumberEl = document.getElementById('question-number');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const progressEl = document.getElementById('progress');
const scoreEl = document.getElementById('score');
const totalEl = document.getElementById('total');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const restartBtn = document.getElementById('restart');

let currentIndex = 0;
let score = 0;
let selectedAnswers = [];

function startQuiz(){
    quizCard.style.display = 'block';
    resultCard.style.display = 'none';
    currentIndex = 0;
    score = 0;
    selectedAnswers = Array(quizData.length).fill(null);
    showQuestion();
}

function showQuestion(){
    const currentQ = quizData[currentIndex];
    questionNumberEl.textContent = `Question ${currentIndex+1} of ${quizData.length}`;
    questionEl.textContent = currentQ.question;
    optionsEl.innerHTML = '';

    currentQ.options.forEach(option=>{
        const btn = document.createElement('button');
        btn.textContent = option;
        btn.classList.add('option-btn');

        if(selectedAnswers[currentIndex] === option){
            btn.classList.add(option === currentQ.answer ? 'correct' : 'wrong');
            disableOptions();
        }

        btn.addEventListener('click', ()=>{
            selectedAnswers[currentIndex] = option;
            markAnswer(btn, currentQ.answer);
        });
        optionsEl.appendChild(btn);
    });

    updateProgress();
    updateNavButtons();
}

function markAnswer(btn, correct){
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b=>b.disabled=true);

    if(btn.textContent === correct){
        btn.classList.add('correct');
    } else { btn.classList.add('wrong'); }
}

function disableOptions(){
    const buttons = document.querySelectorAll('.option-btn');
    buttons.forEach(b=>b.disabled=true);
}

function updateProgress(){
    const answeredCount = selectedAnswers.filter(a=>a!==null).length;
    progressEl.style.width = `${(answeredCount/quizData.length)*100}%`;
}

function updateNavButtons(){
    prevBtn.disabled = currentIndex === 0;
    nextBtn.textContent = currentIndex === quizData.length -1 ? "Submit ✅" : "Next ⏭️";
}

nextBtn.addEventListener('click', ()=>{
    if(currentIndex < quizData.length - 1){
        currentIndex++;
        showQuestion();
    } else {
        submitQuiz();
    }
});

prevBtn.addEventListener('click', ()=>{
    if(currentIndex > 0){
        currentIndex--;
        showQuestion();
    }
});

restartBtn.addEventListener('click', startQuiz);

function submitQuiz(){
    score = selectedAnswers.reduce((acc, ans, idx)=>{
        return acc + (ans === quizData[idx].answer ? 1 : 0);
    }, 0);

    quizCard.style.display = 'none';
    resultCard.style.display = 'block';
    scoreEl.textContent = score;
    totalEl.textContent = quizData.length;
}

startQuiz();