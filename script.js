'use strict';

//Selecting Elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentScore0 = document.getElementById('current--0');
const currentScore1 = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

//Initial Conditions
const init = () => {

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  playing = true;

  diceElement.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  btnRoll.disabled = false;
};

init();

//functions
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
  btnRoll.disabled = !btnRoll.disabled;
};

//Button Roll Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1. Generate a random dice number
    const dice = Math.floor(Math.random() * 6) + 1;


    //2. Display dice
    diceElement.src = `dice-${dice}.jpg`;
    diceElement.classList.remove('hidden');

    //2. Check if the number is equal to 1; If true, move to the next player.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to Next Player
      switchPlayer();
    }
    btnRoll.disabled = true;
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add the current score to the player's score
    scores[activePlayer] += currentScore;
    
    // 2. Display the score to the current player's scores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 3. Check if the player's score >= 30, if true, that player wins
    if (scores[activePlayer] >= 30) {
      // Finish the game
      diceElement.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
        
      // Disable Hold and Roll buttons after a player wins
      btnHold.disabled = true;
      btnRoll.disabled = true;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  // Initialize a new game
  init();
  
  // Enable Hold and Roll buttons for a new game
  btnHold.disabled = false;
  btnRoll.disabled = false;
});



