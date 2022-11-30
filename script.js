let timerIntervaleId;
let randomUncheckRadioIntervalId;
let unCheckTimeoutId;
let gameTime = 30;
let gameSpeed = 1700;
let currentRadioId;
let score = 0;
var isPlaying = false;
const resetgamehref = document.getElementById("resetgamehref");


// change game time login

const saveGameTimeButton = document.getElementById('saveGameTimeButton');

const changeGameTimeInput = document.getElementById('changeGameTimeInput');


changeGameTimeInput.addEventListener('keyup', function(event) {
  event.target.value = +(event.target.value);
});









saveGameTimeButton.addEventListener('click', function () {
  
  if (changeGameTimeInput.value > 0) {
    gameTime = changeGameTimeInput.value;
    timeText.textContent = gameTime;
    currentTime=gameTime;
  } else {
    return;
  }
});
const timeText = document.getElementById('time');
const scoreText = document.getElementById('score');
const startButton = document.getElementById('startBtn');
const radiocontainer = document.getElementById('radiocontainer');

timeText.textContent = gameTime;
scoreText.textContent = score;
let currentTime = gameTime;


const startTimer = function () {
  timerIntervaleId = setInterval(function () {
    currentTime--;
    timeText.textContent = currentTime;
    
    if (currentTime === 0) {
      timeText.textContent = currentTime;
      
      finishGame();
      currentTime = gameTime;
      score = 0;
      isPlaying = false;
      // scoreText.textContent = score;
    }
  }, 1000);
};
function startgame(){
  disableChangeTime();

  if (isPlaying === true) {
    // console.log('if statment');
    isPlaying = false;

    clearInterval(timerIntervaleId);
    clearInterval(randomUncheckRadioIntervalId);
    changeRadioButtonDisability(true);
  } else {
    // console.log('else statement');

    isPlaying = true;
    startTimer();

    changeRadioButtonDisability(false);

    scoreText.textContent = score;
    randomUncheckRadioIntervalId = setInterval(() => {
      randomUncheckRadio();
    }, gameSpeed);
  }
}
startButton.addEventListener('click', function () {
  startgame();
});

const generateRadioButtons = function (totalRadioButtons) {
  for (let i = 0; i < totalRadioButtons; i++) {
    const radioMarkup = `
    <input type="radio"
    id="radio-${i + 1}" class="radio-button" />`;

    radiocontainer.insertAdjacentHTML('afterbegin', radioMarkup);
  }
};

generateRadioButtons(60);

const radioButtonArrays = document.querySelectorAll('.radio-button');

const randomUncheckRadio = function () {
  const randomValue = Math.floor(Math.random() * 60 + 1);
  const element = document.getElementById(`radio-${randomValue}`);

  element.checked = true;

  currentRadioId = element.getAttribute('id');

  unCheckTimeoutId = setTimeout(function () {
    score--;
    element.checked = false;
    scoreText.textContent = score;
  }, gameSpeed);
};

radioButtonArrays.forEach(function (radioButton) {
  radioButton.addEventListener('click', function () {
    if (this.getAttribute('id') === currentRadioId) {
      score++;
      this.checked = false;

      clearTimeout(unCheckTimeoutId);
    } else {
      uncheckRadio(this);
    }

    scoreText.textContent = score;
  });
});

const uncheckRadio = function (radioButton) {
  setTimeout(function () {
    radioButton.checked = false;
  }, 100);
};

const finishGame = function () {
  // console.log('Your score is : ' + score);
  clearInterval(unCheckTimeoutId);
  clearInterval(timerIntervaleId);
  clearInterval(randomUncheckRadioIntervalId);

  uncheckEveryRadioButton();
  changeRadioButtonDisability(true);
 

  
 setTimeout(() => {
  alerMsg();
 }, 1000);
  // console.log(result);
};

const alerMsg =function(){
  var result = (score*2)*100/10;
  if(result<0){
    result=0;
  }
  if(result>=80){
    alert(`🎉🎉 Congratulations 🎉🎉 You got ☺️ ${result}% ☺️ and Your score is ${score} `);

  }
  else if(result< 80 && result >= 60 ){
    alert(`🤗 Good job & try again to get more scores 🤗 you got ☺️ ${result}% ☺️ and your score is ${score} `);

  }
  else {
    alert(`😓 Sorry, better luck next time 😓 Your score is ${score} `);

  }
  
}

const changeRadioButtonDisability = function (value) {
  radioButtonArrays.forEach(button => {
    button.disabled = value;
  });
};

const uncheckEveryRadioButton = function () {
  radioButtonArrays.forEach(function (btn) {
    btn.checked = false;
  });
};

changeRadioButtonDisability(true);

const disableChangeTime = function () {
  changeGameTimeInput.disabled = true;
  saveGameTimeButton.disabled = true;
};


resetgamehref.addEventListener("click",function(){
  // resetgamehref.setAttribute("href", window.location.href);
  document.location.reload();
  // finishGame();
  // startgame();
  
  
});

