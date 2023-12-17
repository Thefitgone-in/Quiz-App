const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

//make a array of objects that store qustions, choices and answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model properties?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },
    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["sting", "boolean", "object", "float"],
        answer: "float"
    },
    {
        question: "Q. Which of the following is not a  valid way to declare a function in JavaScript?",
        choices: ["function myFunction(){}", "let myFunction = function(){};", "myFunction:function(){}", "const myFunction = () => {};"],
        answer: "myFunction:function(){}"
    },
    {
        question: "Q. Which of the purpose of this keyword in JavaScript",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", "It is used for comments."],
        answer: "It refers to the current object."
    }
]

// making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;

//Arrow function to show Questions
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;


    choicesBox.textContent = "";
    for(i=0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];

        const choiceDiv = document.createElement('div');

        choiceDiv.textContent = currentChoice;

        choiceDiv.classList.add('choice');

        choicesBox.appendChild(choiceDiv);


        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }else{
                choiceDiv.classList.add('selected');
            }
        });
    }
    if(currentQuestionIndex < quiz.length){
        stratTimer();
       }
   
 }

//Function to check answers

const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        // alert("correct answer!");
        displayAlert("Correct Answer!")
        score++;
    }
    else{
        // alert("wrong answer");
        displayAlert(`Wrong Answer! 
        ${quiz[currentQuestionIndex].answer} is correct answer`)
    }
    timeLeft = 15;
    currentQuestionIndex++;
   if(currentQuestionIndex < quiz.length){
        
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
    }
   
}

//Function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}
// Function to show alert.
const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}

// function to Start Timer
const stratTimer = () => {
    clearInterval(timerID);// check for any exist timer
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time up!!! Do you want to play quiz again");

            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = none;
                return;
            }
        }
    }
   timerID = setInterval(countDown, 1000);
}

// Function to stop Timer
const stopTimer = ()=>{
    clearInterval(timerID);
}

// Function to shuffle questions...
const shuffleQuestions = () => {
for(let i=quiz.length-1; i>0; i--){
    const j = Math.floor(Math.random() * (i+1));
    [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
}
currentQuestionIndex = 0;
showQuestions();
}
//Function to start quiz
const startQuiz = () => {
    timeLeft = 15;
    timer.style.display = "flex";
    showQuestions();
}

//Adding Event Listener to Start Button
startBtn.addEventListener('click', ()=> {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
})


nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');

    if(!selectedChoice && nextBtn.textContent === "Next"){
        // alert("Select your answer");
        displayAlert("Select Your Answer")
        return;
    }
    if(quizOver === true){
        
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    
    else{
        checkAnswer();
    }

    checkAnswer();
       
});