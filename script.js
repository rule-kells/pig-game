//variables
//player 1
const p1 = document.querySelector('.player--0')
const p1Score = document.querySelector('.score--0')
const p1CurrentScore = document.querySelector('.current--0')
//player 2
const p2 = document.querySelector('.player--1')
const p2Score = document.querySelector('.score--1')
const p2CurrentScore = document.querySelector('.current--1')

//dice
const dice = document.querySelector('.dice')
//buttons
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')
const btnReset = document.querySelector('.btn--reset')

//starting variables
let scores, currentScore, activePlayer, inputedScore
const theScoreInputed = document.getElementById('score__input')

//starting conditions

const init = function () {
  scores = [0, 0]
  scoreRemaining = [100, 100]
  currentScore = 0
  activePlayer = 0
  playing = true
  scores.textContent = 0

  p1Score.textContent = 0
  p2Score.textContent = 0
  
  p1.querySelector(`.player__title--0`).textContent = 'Player 1'
  p2.querySelector(`.player__title--1`).textContent = 'Player 2'
  p1CurrentScore.textContent = 0
  p2CurrentScore.textContent = 0
  dice.classList.add('dice--hidden')
  p1.classList.remove('player--winner')
  p2.classList.remove('player--winner')
  p1.classList.add('player--active')
  p2.classList.remove('player--active')
}

const switchPlayer = (_) => {
  document.querySelector(`.current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  p1.classList.toggle('player--active')
  p2.classList.toggle('player--active')
}

init()

btnRoll.addEventListener('click', function () {
  if (playing) {
    inputedScore = theScoreInputed.value

    const diceRoll = Math.floor(Math.random() * 6 + 1)
    dice.classList.remove('dice--hidden')
    dice.src = `images/dice-${diceRoll}.png`

    if (diceRoll !== 1) {
      currentScore += diceRoll
      document.querySelector(
        `.current--${activePlayer}`,
      ).textContent = currentScore
    } else {
      //switch player
      switchPlayer()
    }
  }
})

btnHold.addEventListener('click', function () {
  scores[activePlayer] += currentScore
  document.querySelector(`.score--${activePlayer}`).textContent =
    scores[activePlayer]

  if (scores[activePlayer] >= inputedScore) {
    playing = false
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active')

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner')
      
    document.querySelector(`.player__title--${activePlayer}`).textContent = 'Winner'

  } else {
    switchPlayer()
  }
})

btnReset.addEventListener('click', init)
