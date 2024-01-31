//creating the questions
const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            {text: "shark", correct: false},
            {text: "Blue whale", correct: true},
            {text: "Elephant", correct: false},
            {text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text: "Kalahari", correct: false},
            {text: "Gobi", correct: false},
            {text: "Sahara", correct: false},
            {text: "Antartica", correct: true},
        ]
    },  
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text: "Asia", correct: false},
            {text: "Australia", correct: true},
            {text: "Arctic", correct: false},
            {text: "Africa", correct: false},
        ]
    },  
];

//extracting value of elements from html 
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("next-btn");

//storing index so that we can change the index value of questions 
let currentQuestionIndex = 0;
let score = 0;

//creating function knowning the index value of question number 
//create the question number to zero when starting the quiz
function startQuiz(){
    currentQuestionIndex = 0;        //question number   
    score = 0;                     //set score 0 in new game
    nextButton.innerHTML = "Next";   //starting the quiz again
    showQuestion();               //called another functions
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];      //get the question u are on 
    let questionNo = currentQuestionIndex + 1;         //question number according to the index
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;             //getting the text of the question

    currentQuestion.answers.forEach(answer => {                         //go to the answer 
        const button = document.createElement("button");                 //extracting the ansswers
        button.innerHTML = answer.text;                                   //displaying the options 
        button.classList.add("btn");                                           
        answerButtons.appendChild(button);    //putting the answers in buttons so extracted the head file answerButton
       if(answer.correct){
        button.dataset.correct = answer.correct;
       }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
 if(currentQuestionIndex < questions.length ){
        handleNextButton();}
    else{
        startQuiz();
    }
    })
//To display the output 
startQuiz();

