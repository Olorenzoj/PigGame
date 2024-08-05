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
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.close-modal');
//animations
const diceAnim = [
    { transform: "translate(-50%) rotate(0) scale(2)" },
    { transform: "translate(-50%) rotate(360deg) scale(1)" },
];
const timing = {
    duration: 500,
    iterations: 1,
};

const numberAnim = [
    { transform: 'scale(2)' },
    { transform: 'scale(1)' }
]
//Handle changing the players
const changePlayer = function (player) {
    if (player === 1) {
        document.querySelector('.player--1').classList.remove('player--active')
        document.querySelector('.player--0').classList.add('player--active')
        score1.textContent = 0
    } else if (player === 2) {
        document.querySelector('.player--0').classList.remove('player--active')
        document.querySelector('.player--1').classList.add('player--active')
        score2.textContent = 0
    }
}
//close modal button
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};
//to open the modal window
const openModal = function () {
    console.log('Button clicked');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden')
};
//roll the dice
btnRoll.addEventListener('click', function () {
    let number = Math.floor(Math.random() * 6) + 1;
    console.log(number);
    dice.classList.remove('hidden');
    dice.animate(diceAnim, timing)
    dice.src = `dice-${number}.png`
    if (number !== 1) {
        if (player == 1) {
            score1.animate(numberAnim)
            score1.textContent = number
            currentScore1.textContent = number + Number(currentScore1.textContent)
        } else {
            score2.animate(numberAnim, timing)
            score2.textContent = number
            currentScore2.textContent = number + Number(currentScore2.textContent)
        }
    } else {
        if (player == 1) {
            currentScore1.textContent = 0
            player = 2
            changePlayer(player)
        } else {
            currentScore2.textContent = 0
            player = 1
            changePlayer(player)
        }
    }

});
//hold the score
btnHold.addEventListener('click', function () {
    if (player == 1) {
        player = 2
        changePlayer(player)
    } else {
        player = 1
        changePlayer(player)
    }
});
//New Game
btnNew.addEventListener('click', function () {
    player = 1
    changePlayer(player)
    dice.classList.add('hidden')
    score2.textContent = 0
    currentScore1.textContent = 0
    currentScore2.textContent = 0

})
// Handle Modal window of the rule Book
btnRules.addEventListener('click', function () {
    modal.classList.remove('hidden')
    overlay.classList.remove('hidden')
})
//Call the open and close modal functions
btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
//Close modal if the 'ESC' its pressed
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    };
})




