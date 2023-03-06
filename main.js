const circles = document.querySelectorAll('.circle')
const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const closeButton = document.querySelector('#close')
const scoreSpan = document.querySelector('.score')
const scoreEnd = document.querySelector('.scoreEnd')
const overlay = document.querySelector('.overlay')
const startSound = new Audio('frog_quak-81741 copy.mp3')
const endSound = new Audio('game finish.wav')


let score = 0
let active = 0
let timer
let pace = 1000
let rounds = 0

circles.forEach((circle, i) => {
  circle.addEventListener('click', () => clickCircle(i))
})

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

const clickCircle = (i) => {
  if (i !== active) {
    return endGame()
  }
  rounds -= 1
  score += 10
  scoreSpan.textContent = score
}

const enableCircles = () => {
  circles.forEach(circle => {
    circle.style.pointerEvents = 'auto'
  })
}

const startGame = () => {
  const startSound = new Audio('frog_quak-81741 copy.mp3');
  startSound.play()
  if (rounds >= 3) {
  return endGame()
  }
  
  startButton.classList.add('hidden')
  endButton.classList.remove('hidden')

  enableCircles()
  const nextActive = pickNew(active)

  circles[nextActive].classList.toggle('active')
  circles[active].classList.remove('active')

  active = nextActive

  timer = setTimeout(startGame, pace)

  pace -= 10
  rounds++

  function pickNew (active) {
    const nextActive = getRandomInt(0, 3)
    if (nextActive !== active
    ) {
      return nextActive
    }
    return pickNew(active)
  }
}

const endGame = () => {
  const startSound = new Audio('frog_quak-81741 copy.mp3');
  startSound.pause()
  const endSound = new Audio('game finish.wav');
  endSound.play()
  scoreEnd.textContent = score
  endButton.classList.remove('hidden')
  startButton.classList.add('hidden')
  overlay.style.visibility = 'visible'
  clearTimeout(timer)
}

const resetGame = () => {
  window.location.reload()
}

startButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame)
closeButton.addEventListener('click', resetGame)
