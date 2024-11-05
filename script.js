const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const box = 20;  // Size of each snake part and food
let score = 0;

let snake = [{ x: box * 5, y: box * 5 }];
let food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };
let direction = 'RIGHT';

// Handle keyboard controls
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
  if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

// Draw the snake
function drawSnake() {
  snake.forEach((part, index) => {
    ctx.fillStyle = index === 0 ? 'lightgreen' : 'green';
    ctx.fillRect(part.x, part.y, box, box);
  });
}

// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, box, box);
}

// Update the game state
function update() {
  // Move the snake
  let head = { ...snake[0] };

  if (direction === 'UP') head.y -= box;
  if (direction === 'DOWN') head.y += box;
  if (direction === 'LEFT') head.x -= box;
  if (direction === 'RIGHT') head.x += box;

  snake.unshift(head);

  // Check if snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById('score').textContent = 'Score: ' + score;
    food = { x: Math.floor(Math.random() * (canvas.width / box)) * box, y: Math.floor(Math.random() * (canvas.height / box)) * box };
  } else {
    snake.pop();
  }

  // Check for collisions
  if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || snakeCollision(head)) {
    clearInterval(game);
    alert('Game Over! Final Score: ' + score);
    location.reload();
  }
}

// Check if snake collides with itself
function snakeCollision(head) {
  return snake.slice(1).some(part => part.x === head.x && part.y === head.y);
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFood();
  drawSnake();
  update();
}

// Start the game
const game = setInterval(gameLoop, 100);
