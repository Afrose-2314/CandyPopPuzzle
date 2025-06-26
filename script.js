let timer = 30;
let score = 0;
let interval;
let gameActive = false;
let shapes = ["circle", "square", "triangle"];
let targetShape = "circle";

function startGame() {
  if (gameActive) return;
  gameActive = true;
  score = 0;
  timer = 30;
  document.getElementById("score").innerText = score;
  document.getElementById("timer").innerText = timer;
  document.getElementById("message").innerText = "";
  document.getElementById("game-board").innerHTML = "";
  targetShape = shapes[Math.floor(Math.random() * shapes.length)];
  document.getElementById("target-shape").innerText = capitalize(targetShape);
  interval = setInterval(updateTimer, 1000);
  spawnShapes();
}

function updateTimer() {
  timer--;
  document.getElementById("timer").innerText = timer;
  if (timer <= 0) {
    endGame("⏱️ Time's Up!");
  }
}

function spawnShapes() {
  if (!gameActive) return;

  const board = document.getElementById("game-board");
  const shape = document.createElement("div");
  const type = shapes[Math.floor(Math.random() * shapes.length)];
  shape.className = `shape ${type}`;
  shape.style.top = Math.random() * 260 + "px";
  shape.style.left = Math.random() * 260 + "px";

  shape.onclick = () => {
    if (!gameActive) return;
    if (type === targetShape) {
      score++;
      document.getElementById("score").innerText = score;
      shape.remove();
    } else {
      endGame("❌ Wrong Shape!");
    }
  };

  board.appendChild(shape);

  setTimeout(() => {
    if (board.contains(shape)) shape.remove();
  }, 1500);

  if (gameActive) {
    setTimeout(spawnShapes, 800);
  }
}

function endGame(message) {
  gameActive = false;
  clearInterval(interval);
  document.getElementById("message").innerText = message + " Your Score: " + score;
  document.getElementById("game-board").innerHTML = "";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
