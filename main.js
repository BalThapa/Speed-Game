const circles = document.querySelectorAll(".circle");
const startButton = document.querySelector("#start");
const endButton = document.querySelector("#end");
const closeButton = document.querySelector("#close");
const scoreSpan = document.querySelector(".score");
const scoreEnd = document.querySelector(".scoreEnd");
const endText = document.querySelector("#endText");
const overlay = document.querySelector(".overlay");

let score = 0;
let active = 0;
let timer;
let pace = 1000;
let rounds = 0;

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const clickCircle = (i) => {
  if (i !== active) {
    return endGame();
  }
  rounds -= 1;
  score += 10;
  scoreSpan.textContent = score;
};

const enableCircles = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

const startGame = () => {
  const startSound = new Audio("sounds/frog_quak-81741 copy.mp3");
  startSound.play();
  if (rounds >= 3) {
    return endGame();
  }

  startButton.classList.add("hidden");
  endButton.classList.remove("hidden");

  enableCircles();
  const nextActive = pickNew(active);

  circles[nextActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = nextActive;

  timer = setTimeout(startGame, pace);

  pace -= 10;
  rounds++;

  function pickNew(active) {
    const nextActive = getRandomInt(0, 3);
    if (nextActive !== active) {
      return nextActive;
    }
    return pickNew(active);
  }
};

const endGame = () => {
  const startSound = new Audio("sounds/frog_quak-81741 copy.mp3");
  startSound.pause();
  const endSound = new Audio("sounds/game finish.wav");
  endSound.play();
  scoreEnd.textContent = score;
  endButton.classList.remove("hidden");
  startButton.classList.add("hidden");
  overlay.style.visibility = "visible";
  clearTimeout(timer);

  if (score === 0) {
    endText.textContent = "You need more practice. Try again.";
  } else if (score === 0 || score < 20) {
    endText.textContent = "Moving fast leads to catch more frogs.";
  } else if (score === 20 || score < 40) {
    endText.textContent = "You can do better.";
  } else if (score === 40 || score < 80) {
    endText.textContent = "Still more frogs are in the pond.";
  } else {
    endText.textContent = "You are a proffessional frog catcher.";
  }
};

const resetGame = () => {
  window.location.reload();
};

startButton.addEventListener("click", startGame);
endButton.addEventListener("click", endGame);
closeButton.addEventListener("click", resetGame);
