'use strict';

let player = 1;
const currentScore1 = document.getElementById('current--0');
const currentScore2 = document.getElementById('current--1');
const score1 = document.getElementById('score--0');
const score2 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const btnRules = document.querySelector('.btn--rules');
const modal = document.querySelector('.modal');
const modal2 = document.querySelector('.modal2');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
const btnClose2 = document.querySelector('.close-modal2');
const btnSett = document.querySelector('.btn--settings');
const radioButtons = document.querySelectorAll('.gameRadio');
const setGameBtn = document.getElementById('setGame');
const playerInput1 = document.querySelector('.playerInput1');
const playerInput2 = document.querySelector('.playerInput2');
const name1 = document.getElementById('name--0');
const name2 = document.getElementById('name--1');
const gameTo = document.querySelector('.gameTo');

//animations
const diceAnim = [
  { transform: 'translate(-50%) rotate(0) scale(2)' },
  { transform: 'translate(-50%) rotate(360deg) scale(1)' },
];
const timing = {
  duration: 500,
  iterations: 1,
};

const numberAnim = [{ transform: 'scale(2)' }, { transform: 'scale(1)' }];

//reset scores(newGame, and setting function)

const reset = () => {
  player = 1;
  changePlayer(player);
  dice.classList.add('hidden');
  score2.textContent = 0;
  currentScore1.textContent = 0;
  currentScore2.textContent = 0;
}

//Handle changing the players
const changePlayer = function (player) {
  if (player === 1) {
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');
    score1.textContent = 0;
  } else if (player === 2) {
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.add('player--active');
    score2.textContent = 0;
  }
};

//roll the dice
btnRoll.addEventListener('click', function () {
  let number = Math.floor(Math.random() * 6) + 1;
  console.log(number);
  dice.classList.remove('hidden');
  dice.animate(diceAnim, timing);
  dice.src = `dice-${number}.png`;
  if (number !== 1) {
    if (player == 1) {
      score1.animate(numberAnim);
      score1.textContent = number;
      currentScore1.textContent = number + Number(currentScore1.textContent);
    } else {
      score2.animate(numberAnim, timing);
      score2.textContent = number;
      currentScore2.textContent = number + Number(currentScore2.textContent);
    }
  } else {
    if (player == 1) {
      currentScore1.textContent = 0;
      player = 2;
      changePlayer(player);
    } else {
      currentScore2.textContent = 0;
      player = 1;
      changePlayer(player);
    }
  }
});

//hold the score
btnHold.addEventListener('click', function () {
  if (player == 1) {
    player = 2;
    changePlayer(player);
  } else {
    player = 1;
    changePlayer(player);
  }
});

//New Game
btnNew.addEventListener('click', function () {
  reset()
});

//close modal button
const closeModal = function (modalToClose) {
  modalToClose.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Handle Modal window of the rule Book
btnRules.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

// Handle Modal window of the settings
btnSett.addEventListener('click', function () {
  modal2.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

//Call the open and close modal functions
btnClose.addEventListener('click', () => closeModal(modal)); // Close first modal
btnClose2.addEventListener('click', () => closeModal(modal2)); //close second modal
overlay.addEventListener('click', () => {
  if (!modal.classList.contains('hidden'))
    closeModal(modal); // Close first modal if it's open
  else if (!modal2.classList.contains('hidden')) closeModal(modal2); // Otherwise, close the second modal if it's open
});

//Close modal if the 'ESC' its pressed
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    if (!modal.classList.contains('hidden')) closeModal(modal);
    else if (!modal2.classList.contains('hidden')) closeModal(modal2);
  }
});

//settings
setGameBtn.addEventListener('click', () => {
  let selectedValue = null;

  for (let i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      selectedValue = radioButtons[i].value;
      break; // Exit the loop once   
    }
  };
  name1.textContent = playerInput1.value;
  name2.textContent = playerInput2.value;

  if (!modal.classList.contains('hidden')) closeModal(modal);
  else if (!modal2.classList.contains('hidden')) closeModal(modal2);

  gameTo.textContent ='Game to🎯: ' + selectedValue
  gameTo.classList.remove('hidden')
  reset()

})