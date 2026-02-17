const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const restartBtn = document.querySelector(".restart");

const gameOverBox = document.querySelector(".game-over");
const finalScore = document.querySelector(".final-score");
const playAgain = document.querySelector(".play-again");

const eatSound = document.getElementById("eat");
const overSound = document.getElementById("over");

let gameOver = false;
let running = false;

let foodX, foodY;
let snakeX = 10, snakeY = 10;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;
let speed = 120;

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// random food
const updateFoodPosition = () => {
  foodX = Math.floor(Math.random() * 30) + 1;
  foodY = Math.floor(Math.random() * 30) + 1;
};

// direction
const changeDirection = (e) => {
  if (e.key === "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
};

controls.forEach(btn =>
  btn.addEventListener("click", () => changeDirection({ key: btn.dataset.key }))
);
document.addEventListener("keydown", changeDirection);

// game over
const handleGameOver = () => {
  clearInterval(setIntervalId);
  running = false;
  overSound.play();
  finalScore.innerText = `Your Score: ${score}`;
  gameOverBox.classList.remove("hide");
};

const initGame = () => {
  if (gameOver) return handleGameOver();

  let html = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;

  // eat food
  if (snakeX === foodX && snakeY === foodY) {
    updateFoodPosition();
    snakeBody.push([foodX, foodY]);
    score++;
    eatSound.play();

    // speed increase
    if (score % 5 === 0 && speed > 60) {
      speed -= 10;
      clearInterval(setIntervalId);
      setIntervalId = setInterval(initGame, speed);
    }

    highScore = score > highScore ? score : highScore;
    localStorage.setItem("high-score", highScore);

    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
  }

  snakeX += velocityX;
  snakeY += velocityY;

  // wall cross
  if (snakeX <= 0) snakeX = 30;
  if (snakeX > 30) snakeX = 1;
  if (snakeY <= 0) snakeY = 30;
  if (snakeY > 30) snakeY = 1;

  // body move
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }
  snakeBody[0] = [snakeX, snakeY];

  // draw snake
  for (let i = 0; i < snakeBody.length; i++) {
    html += `<div class="${i == 0 ? "head" : "body"}" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;

    // self hit
    if (
      i !== 0 &&
      snakeBody[0][0] === snakeBody[i][0] &&
      snakeBody[0][1] === snakeBody[i][1]
    ) {
      gameOver = true;
    }
  }

  playBoard.innerHTML = html;
};

// START
startBtn.addEventListener("click", () => {
  if (running) return;

  running = true;
  gameOver = false;

  // ⭐ IMPORTANT FIX → default move right
  velocityX = 1;
  velocityY = 0;

  snakeBody = [[snakeX, snakeY]];
  updateFoodPosition();
  setIntervalId = setInterval(initGame, speed);
});

// PAUSE
pauseBtn.addEventListener("click", () => {
  if (!running) return;
  running = false;
  clearInterval(setIntervalId);
});

// restart buttons
restartBtn.addEventListener("click", () => location.reload());
playAgain.addEventListener("click", () => location.reload());
