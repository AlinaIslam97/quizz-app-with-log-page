function registration() {
  event.preventDefault()
  var name = document.getElementById("name")
  var email = document.getElementById("email")
  var phoneNumber = document.getElementById("phoneNumber")
  var password = document.getElementById("password")
  var cpassword = document.getElementById("cpassword")

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  if (password.value !== cpassword) {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Sign up succussfully",
      showConfirmButton: false,
      timer: 1500
    });
  } else if (!regex.test(password.value)) {
    Swal.fire(`At least one lowercase alphabet i.e. [a-z]
            At least one uppercase alphabet i.e. [A-Z]
            At least one Numeric digit i.e. [0-9]
            At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
            Also, the total length must be in the range [8-15]`);
  }

  console.log(name.value, email.value, phoneNumber.value, password.value, cpassword.value);

  var userData = {
    name: name.value,
    email: email.value,
    phoneNumber: phoneNumber.value,
    password: password.value,
    cpassword: cpassword.value
  }

  localStorage.setItem("userData", JSON.stringify(userData))
  // var getData = localStorage.getItem("userData")
  // var parseData = JSON.parse(getData)
  // console.log(parseData);
  setTimeout(() => {
    window.location.href = "./dashboard.html"
  }, 2000);
}

//             ...........For Quiz App.......... 

function getLocalData() {
  var getData = localStorage.getItem("userData")
  var parseData = JSON.parse(getData)

  var getLocalDataDiv = document.getElementById("getLocalDataDiv")
  getLocalDataDiv.innerHTML = `
  <ul>
        <li>Name: ${parseData.name}</li>
        <li>Email: ${parseData.email}</li>
        <li>Phone Number: ${parseData.phoneNumber}</li>
  </ul>
  `
}

getLocalData()

var quizData = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<scripting>", "<javascript>", "<js>", "<script>"],
    correct: "<script>"

  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["alert('Hello World');", "msg('Hello World');",
      "alertBox('Hello World');", "msgBox('Hello World');"],
    correct: "alert('Hello World');"
  },
  {
    question: "How to write an IF statement in JavaScript?",
    options: ["if i == 5 then", "if i = 5 then",
      "if (i == 5)", "if i = 5"],
    correct: "if (i == 5)"
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: ["<script name = 'xxx.js'>", "<script href = 'xxx.js'>",
      "<script src = 'xxx.js'>", "<script link = 'xxx.js'>"],
    correct: "<script src = 'xxx.js'>"
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function:myFunction()", "function = myFunction()",
      "function myFunction()", "function ; myFunction()"],
    correct: "function myFunction()"
  }
];

var currentQuestion = 0;
var score = 0;
var timeLeft = 10;
var timerInterval;

var questionElement = document.getElementById("question");
var optionButtons = document.querySelectorAll(".option");
var nextButton = document.getElementById("next-btn");
var timeElement = document.getElementById("time");

function loadQuestion() {
  var currentQuiz = quizData[currentQuestion];
  questionElement.textContent = currentQuiz.question;
  optionButtons.forEach((button, index) => {
    button.textContent = currentQuiz.options[index];
    button.onclick = () => {
      stopTimer();
      selectAnswer(button);
    };
  });

  startTimer();

  // Change button text if it's the last question
  nextButton.textContent = (currentQuestion === quizData.length - 1) ? "Submit" : "Next Question";
}

function selectAnswer(button) {
  var correctAnswer = quizData[currentQuestion].correct;
  if (button.textContent === correctAnswer) {
    score++;
    button.style.backgroundColor = "#28a745";
  } else {
    button.style.backgroundColor = "#dc3545";
  }
  optionButtons.forEach(btn => btn.disabled = true);
}

function startTimer() {
  timeLeft = 10;
  timeElement.textContent = timeLeft;

  timerInterval = setInterval(() => {
    timeLeft--;
    timeElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      autoSelectAnswer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function autoSelectAnswer() {
  optionButtons.forEach(button => {
    button.disabled = true;
  });
  nextQuestion();
}

nextButton.addEventListener("click", () => {
  stopTimer();

  if (currentQuestion < quizData.length - 1) {
    nextQuestion();
  } else {
    submitQuiz();
  }
});

function nextQuestion() {
  currentQuestion++;
  resetOptions();
  loadQuestion();
}

function submitQuiz() {
  Swal.fire(`Quiz finished! Your score is ${score} out of ${quizData.length}`);
}

function resetOptions() {
  optionButtons.forEach(button => {
    button.style.backgroundColor = "#007bff";
    button.disabled = false;
  });
}

loadQuestion();

function redirect() {
  window.location.href = "./index.html"
}

//             ...........For log in page.......... 

function login() {
  event.preventDefault()
  var email = document.getElementById("email")
  var password = document.getElementById("password")

  var getData = localStorage.getItem("userData")
  var parseData = JSON.parse(getData)

  if (parseData.email !== email.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Invalid Email",
    });
  } else if (parseData.password !== password.value) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "incoreect password",
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "LOG In succussfully",
      showConfirmButton: false,
      timer: 1500
    });
    window.location.href = "./dashboard.html"
  }

}
