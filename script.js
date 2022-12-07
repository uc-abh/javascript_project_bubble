let timer_intervalid;
let randomuncheckradio_intervalid;
let uncheck_timeout_id;
var game_time = 30;
var game_speed = 1700;
let current_radioid;
var score = 0;
var is_playing = false;
const changetime_valuefinal = 86400;
const changeTime_valueinitial = 0;
const generate_numberofradiobuttons = 60;

const restartgame_href = document.getElementById("restartgamehref");
const resetgame_href = document.getElementById("resetgamehref");
const savegametime_button = document.getElementById('saveGameTimeButton');
const changegametime_input = document.getElementById('changeGameTimeInput');
var time_text = document.getElementById('time');
var score_text = document.getElementById('score');
const start_button = document.getElementById('startBtn');
const radiocontainer = document.getElementById('radiocontainer');

changegametime_input.addEventListener('keyup', function (event) {
  event.target.value = +(event.target.value);
});
savegametime_button.addEventListener('click', function () {
  if (changegametime_input.value > changeTime_valueinitial && changegametime_input.value <= changetime_valuefinal) {
    game_time = changegametime_input.value;
    time_text.textContent = game_time;
    currentTime = game_time;
  } else {
    return;
  }
});

time_text.textContent = game_time;
score_text.textContent = score;
var currentTime = game_time;
const startTimer = function () {
  timer_intervalid = setInterval(function () {
    currentTime--;
    time_text.textContent = currentTime;
    if (currentTime === 0) {
      time_text.textContent = currentTime;
      finishGame();
      currentTime = game_time;
      setTimeout(() => {
        score = 0;
      }, 1000);
      is_playing = false;
    }
  }, 1000);
};
function startgame() {
  disableChangeTime();
  if (is_playing === true) {
    is_playing = false;
    clearInterval(timer_intervalid);
    clearInterval(randomuncheckradio_intervalid);
    changeRadioButtonDisability(true);
  } else {
    is_playing = true;
    startTimer();
    changeRadioButtonDisability(false);
    score_text.textContent = score;
    randomuncheckradio_intervalid = setInterval(() => {
      randomUncheckRadio();
    }, game_speed);
  }
}
start_button.addEventListener('click', function () {
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
generateRadioButtons(generate_numberofradiobuttons);
const radioButtonArrays = document.querySelectorAll('.radio-button');
const randomUncheckRadio = function () {
  const randomValue = Math.floor(Math.random() * generate_numberofradiobuttons + 1);
  const element = document.getElementById(`radio-${randomValue}`);
  element.checked = true;
  current_radioid = element.getAttribute('id');
  uncheck_timeout_id = setTimeout(function () {
    score--;
    element.checked = false;
    score_text.textContent = score;
  }, game_speed);
};

window.addEventListener('DOMContentLoaded', function () {
  radioButtonArrays.forEach(function (radioButton) {
    radioButton.addEventListener('click', function () {
      if (this.getAttribute('id') === current_radioid) {
        score++;
        this.checked = false;
        clearTimeout(uncheck_timeout_id);
      } else {
        uncheckRadio(this);
      }
      score_text.textContent = score;
    });
  });
})

const uncheckRadio = function (radioButton) {
  setTimeout(function () {
    radioButton.checked = false;
  }, 100);
};
const finishGame = function () {
  clearInterval(uncheck_timeout_id);
  clearInterval(timer_intervalid);
  clearInterval(randomuncheckradio_intervalid);
  uncheckEveryRadioButton();
  changeRadioButtonDisability(true);
  setTimeout(() => {
    alerMsg();
  }, 1000);

};

const alerMsg = function () {
  var result = (score * 2) * 100 / game_time;
  if (result < 0) {
    result = 0;
  }
  if (result >= 80) {
    alert(`🎉🎉 Congratulations 🎉🎉 Your score is ${score} 🤗 `);
  }
  else if (result < 80 && result >= 60) {
    alert(`🤗 Good job & try again to get more scores 🤗 your score is ${score} `);
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
  changegametime_input.disabled = true;
  savegametime_button.disabled = true;
};
restartgame_href.addEventListener("click", function () {
  clearInterval(uncheck_timeout_id);
  clearInterval(timer_intervalid);
  clearInterval(randomuncheckradio_intervalid);
  uncheckEveryRadioButton();
  changeRadioButtonDisability(true);
  score = 0;
  game_speed = 1700;
  is_playing = false;
  currentTime = game_time;
  score_text.textContent = score;
  time_text.textContent = currentTime;
  setTimeout(() => {
    startgame();
    score = 0;
  }, 1000);
});
resetgame_href.addEventListener("click", function () {
  location.reload();
});

