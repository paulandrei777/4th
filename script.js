    const startScreen = document.getElementById("start-screen");
    const difficultyScreen = document.getElementById("difficulty-screen");
    const quizContainer = document.getElementById("quiz");
    const questionElement = document.getElementById("question");
    const answersContainer = document.getElementById("answers");
    const nextButton = document.getElementById("next-btn");
    const timerDisplay = document.getElementById("timer");
    const scoreDisplay = document.getElementById("score-display");

    let currentQuestionIndex = 0;
    let score = 0;
    let currentQuestions = [];
    let timeLeft = 10;
    let timer;

    const questions = {
      easy: [
        {
          question: "What does HTML stand for?",
          answers: [
            { text: "HyperText Markup Language", correct: true },
            { text: "HotMail", correct: false },
            { text: "How To Make Links", correct: false },
            { text: "HighText Machine Language", correct: false },
          ]
        },
        {
          question: "What does CSS do?",
          answers: [
            { text: "Adds logic to web pages", correct: false },
            { text: "Styles the content", correct: true },
            { text: "Stores data", correct: false },
            { text: "Structures the page", correct: false },
          ]
        },
        {
          question: "What tag is used for images?",
          answers: [
            { text: "<img>", correct: true },
            { text: "<pic>", correct: false },
            { text: "<src>", correct: false },
            { text: "<image>", correct: false },
          ]
        },
        {
          question: "Which is a heading tag?",
          answers: [
            { text: "<h1>", correct: true },
            { text: "<p1>", correct: false },
            { text: "<head>", correct: false },
            { text: "<title>", correct: false },
          ]
        },
        {
          question: "Which tag creates a link?",
          answers: [
            { text: "<a>", correct: true },
            { text: "<link>", correct: false },
            { text: "<href>", correct: false },
            { text: "<url>", correct: false },
          ]
        },
      ],
      moderate: [
        {
          question: "Which symbol selects an ID in CSS?",
          answers: [
            { text: "#", correct: true },
            { text: ".", correct: false },
            { text: "@", correct: false },
            { text: "&", correct: false },
          ]
        },
        {
          question: "Which method prints to the browser console?",
          answers: [
            { text: "console.log()", correct: true },
            { text: "print()", correct: false },
            { text: "echo()", correct: false },
            { text: "document.write()", correct: false },
          ]
        },
        {
          question: "What does DOM stand for?",
          answers: [
            { text: "Document Object Model", correct: true },
            { text: "Data Object Model", correct: false },
            { text: "Digital Output Map", correct: false },
            { text: "Display Object Mode", correct: false },
          ]
        },
        {
          question: "How do you declare a JS variable?",
          answers: [
            { text: "var x = 5;", correct: true },
            { text: "variable x = 5;", correct: false },
            { text: "x := 5;", correct: false },
            { text: "int x = 5;", correct: false },
          ]
        },
        {
          question: "What tag adds a line break?",
          answers: [
            { text: "<br>", correct: true },
            { text: "<lb>", correct: false },
            { text: "<break>", correct: false },
            { text: "<space>", correct: false },
          ]
        },
      ],
      difficult: [
        {
          question: "Which is not a valid JavaScript type?",
          answers: [
            { text: "Element", correct: true },
            { text: "Object", correct: false },
            { text: "Boolean", correct: false },
            { text: "Symbol", correct: false },
          ]
        },
        {
          question: "Which keyword defines a class in JS?",
          answers: [
            { text: "class", correct: true },
            { text: "struct", correct: false },
            { text: "define", correct: false },
            { text: "object", correct: false },
          ]
        },
        {
          question: "Which CSS property controls layer order?",
          answers: [
            { text: "z-index", correct: true },
            { text: "position", correct: false },
            { text: "order", correct: false },
            { text: "depth", correct: false },
          ]
        },
        {
          question: "What does async do in JS?",
          answers: [
            { text: "Runs script asynchronously", correct: true },
            { text: "Delays execution", correct: false },
            { text: "Pauses loading", correct: false },
            { text: "Runs script twice", correct: false },
          ]
        },
        {
          question: "What is 'this' in JS (in global scope)?",
          answers: [
            { text: "Window object", correct: true },
            { text: "Null", correct: false },
            { text: "Class itself", correct: false },
            { text: "Current function", correct: false },
          ]
        },
      ]
    };

    function showDifficulty() {
      startScreen.classList.add("hidden");
      difficultyScreen.classList.remove("hidden");
    }

    function startQuiz(level) {
      difficultyScreen.classList.add("hidden");
      quizContainer.classList.remove("hidden");
      currentQuestions = questions[level];
      currentQuestionIndex = 0;
      score = 0;
      showQuestion();
    }

    function showQuestion() {
      resetState();
      const current = currentQuestions[currentQuestionIndex];
      questionElement.innerText = current.question;
      current.answers.forEach(answer => {
        const button = document.createElement("button");
        button.classList.add("answer-btn");
        button.innerText = answer.text;
        button.onclick = () => selectAnswer(button, answer.correct);
        answersContainer.appendChild(button);
      });
      scoreDisplay.textContent = `Score: ${score}`;
      startTimer();
    }

    function resetState() {
      nextButton.style.display = "none";
      answersContainer.innerHTML = "";
      clearInterval(timer);
      timeLeft = 10;
      timerDisplay.innerText = `Time left: ${timeLeft}s`;
    }

    function startTimer() {
      timer = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
          clearInterval(timer);
          disableAnswers();
          nextButton.style.display = "inline-block";
        }
      }, 1000);
    }

    function disableAnswers() {
      const buttons = answersContainer.querySelectorAll("button");
      buttons.forEach(btn => {
        btn.disabled = true;
        if (currentQuestions[currentQuestionIndex].answers.find(a => a.text === btn.innerText && a.correct)) {
          btn.classList.add("correct");
        } else {
          btn.classList.add("wrong");
        }
      });
    }

    function selectAnswer(button, correct) {
      clearInterval(timer);
      disableAnswers();
      if (correct) score++;
      scoreDisplay.textContent = `Score: ${score}`;
      nextButton.style.display = "inline-block";
    }

    nextButton.addEventListener("click", () => {
      currentQuestionIndex++;
      if (currentQuestionIndex < currentQuestions.length) {
        showQuestion();
      } else {
        showScore();
      }
    });

    function showScore() {
      questionElement.innerText = `Quiz Finished! You scored ${score} out of ${currentQuestions.length}`;
      answersContainer.innerHTML = "";
      timerDisplay.innerText = "";
      scoreDisplay.innerText = "";
      nextButton.innerText = "Play Again";
      nextButton.onclick = () => location.reload();
      nextButton.style.display = "inline-block";
    }
