let questions = [
    {
        question: "What is the capital of France?",
        option: ["New York", "London", "Paris", "Dublin"],
        answer: 2
    },
       
    {
        question: "What is the capital of Pakistan?",
        option: ["Karachi", "Islamabad", "Lahore", "Quetta"],
        answer: 1
    },

    {
        question: "What is the capital of USA?",
        option: ["New York", "Washington DC", "Los Angeles", "Chicago"],
        answer: 1
    },

    {
        question: "What is the capital of China?",
        option: ["Beijing", "Shanghai", "Hong Kong", "Guangzhou"],
        answer: 0
    }
]

let question_count = 0;
let scoreCount = 0;
var lenght = questions.length;

var question_answer = document.querySelector(".question");
var next_btn = document.getElementById("next-btn");
var answer_option = document.querySelector(".answer-box");
var start_btn = document.getElementById("start-btn");
var prev_btn = document.getElementById("prev-btn");
var next_btn = document.getElementById("next-btn");
let selectedAnswers = Array(lenght).fill(null);
console.log(selectedAnswers);


let isRestarting = false;

function quiz_start() {
    start_btn.style.display = "none";
    prev_btn.style.visibility = "visible";
    next_btn.style.visibility = "visible";
    showNextQuestion(question_count);

    next_btn.addEventListener("click", () => {
        reset();

        // Check if we should restart the quiz instead of showing the next question
        if (isRestarting || question_count >= lenght - 1) {
            // Set the flag to true to indicate we are restarting
            isRestarting = true;

            // Immediately hide elements and show the restart button with modified text
            document.querySelector(".container h1").innerText = "Quiz Completed";
            document.querySelector(".wrapper").style.display = "none";
            document.querySelector(".result").style.display = "block";
            prev_btn.style.visibility = "visible";
            next_btn.style.visibility = "visible";
            prev_btn.style.display = "none";
            next_btn.style.display = "none";
            document.querySelector(".result span").innerText = scoreCount;

            var restart = document.createElement("button");
            restart.innerText = "Restart";
            restart.classList.add("button");
            restart.classList.add("restart-btn");
            //restart.style.marginLeft = "30%";
            restart.style.width = "100px";
            document.querySelector(".buttons").appendChild(restart);
            //document.querySelector(".buttons").style.textAlign = "center";

            restart.addEventListener("click", () => {
                location.reload();
            });
        } else {
            question_count++;
            showNextQuestion(question_count);
        }
    });

    prev_btn.addEventListener("click", () => {
        reset();

        if (question_count > 0) {
            question_count--;
            showNextQuestion(question_count);
        }
    });
}
    function showNextQuestion(question_count){
        document.querySelector(".container h1").innerText = "Question " + (question_count + 1) + " of " + lenght;
        question_answer.innerText = questions[question_count].question;
        questions[question_count].option.forEach((value, index) => {
            var button = document.createElement("button");
            button.innerText = value;
            button.classList.add("btn");

            if (selectedAnswers[question_count] !== null) {
                button.disabled = true;
                button.style.cursor = "no-drop";
                if (index === selectedAnswers[question_count]) {
                    button.style.backgroundColor = index === questions[question_count].answer ? "#A2CA71" : "#FF0000";
                }
                // Highlight the correct answer if an incorrect one was previously selected
                if (index === questions[question_count].answer && selectedAnswers[question_count] !== index) {
                    button.style.backgroundColor = "#A2CA71";
                }
            }
    
            button.addEventListener("click", (e) => {
                selectedAnswers[question_count] = index;
                if(index === questions[question_count].answer){
                    scoreCount++;
                    e.target.style.backgroundColor = "#A2CA71";
                    
                }else{
                    e.target.style.backgroundColor = "#FF0000";

                    // Highlight the correct answer
                    answer_option.children[questions[question_count].answer].style.backgroundColor = "#A2CA71";
                }
                Array.from(document.querySelectorAll('.answer-box .btn')).forEach(btn => {
                    btn.disabled = true;
                    btn.style.cursor = "no-drop";
                });

            });
            answer_option.appendChild(button);
        });
        document.querySelector(".wrapper").style.display = "block";
    }
    function reset(){
        while(answer_option.firstChild){
            answer_option.removeChild(answer_option.firstChild);
        }
    }
    
start_btn.addEventListener("click", () => {
    quiz_start();
});