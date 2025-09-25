let currentLevel = 1;
let lives = 5;
let hintsLeft = 2;
let secretNumber = generateRandomNumber();
let gameOver = false;


function generateRandomNumber() {
  let a = Math.floor(Math.random() * 100) + 1;
  console.log(a);
  return;
}

function updateUI() {
  document.getElementById("level").textContent = `Level: ${getLevelName()}`;
  document.getElementById("lives").textContent = `Lives: ${lives}`;
  document.getElementById("hintCount").textContent = `Hints left: ${hintsLeft}`;
}

function getLevelName() {
  return currentLevel === 1 ? "Easy" : currentLevel === 2 ? "Medium" : "Hard";
}

function showLevelUpAnimation() {
  const anim = document.getElementById("levelUpAnimation");
  anim.classList.remove("hidden");
  setTimeout(() => {
    anim.classList.add("hidden");
  }, 2000);
}

function checkGuess() {
  if (gameOver) return;

  const guess = parseInt(document.getElementById("guessInput").value);
  const message = document.getElementById("message");

  if (!guess || guess < 1 || guess > 100) {
    message.textContent = "Please enter a valid number (1-100).";
    return;
  }

  if (guess === secretNumber) {
    message.textContent = `🎉 Correct! Moving to next level...`;
    if (currentLevel === 3) {
      message.textContent = "🏆 Congratulations! You completed all levels!";
      gameOver = true;
      return;
    }
    showLevelUpAnimation();
    nextLevel();
  } else {
    lives--;
    if (lives <= 0) {
      message.textContent = `💥 Game Over! The number was ${secretNumber}`;
      gameOver = true;
      return;
    }

    message.textContent = guess < secretNumber ? "Too low!" : "Too high!";
  }

  updateUI();
}

function useHint() {
  const message = document.getElementById("message");
  if (hintsLeft <= 0) {
    message.textContent = "❌ No hints left!";
    return;
  }
  hintsLeft--;
  const range = 10;
  const low = Math.max(secretNumber - range, 1);
  const high = Math.min(secretNumber + range, 100);
  message.textContent = `🔍 Hint: The number is between ${low} and ${high}`;
  updateUI();
}

function nextLevel() {
  currentLevel++;
  if (currentLevel === 2) lives = 3;
  else if (currentLevel === 3) lives = 2;
  secretNumber = generateRandomNumber();
  updateUI();
  document.getElementById("guessInput").value = "";
}

function resetGame() {
  currentLevel = 1;
  lives = 5;
  hintsLeft = 2;
  gameOver = false;
  secretNumber = generateRandomNumber();
  document.getElementById("message").textContent = "";
  document.getElementById("guessInput").value = "";
  updateUI();
}



