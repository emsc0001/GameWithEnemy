const player = document.getElementById('player');
const enemy = document.getElementById('enemy');
const gameArea = document.getElementById('gameArea');

let playerPosition = { x: 200, y: 200 };
let enemyPosition = { x: 400, y: 100 };
let enemyDirection = 1;
let score = 0;

const scoreDisplay = document.createElement('div');
scoreDisplay.id = 'score';
scoreDisplay.style.position = 'absolute';
scoreDisplay.style.top = '10px';
scoreDisplay.style.left = '10px';
scoreDisplay.style.fontSize = '24px';
scoreDisplay.style.fontWeight = 'bold';
scoreDisplay.textContent = `Score: ${score}`;
gameArea.appendChild(scoreDisplay);

function movePlayer(event) {
  const step = 10;
  if (event.key === 'ArrowUp') playerPosition.y = Math.max(playerPosition.y - step, 0);
  if (event.key === 'ArrowDown') playerPosition.y = Math.min(playerPosition.y + step, gameArea.offsetHeight - 50);
  if (event.key === 'ArrowLeft') playerPosition.x = Math.max(playerPosition.x - step, 0);
  if (event.key === 'ArrowRight') playerPosition.x = Math.min(playerPosition.x + step, gameArea.offsetWidth - 50);
}

function moveEnemy() {
  enemyPosition.y += enemyDirection * 5;
  if (enemyPosition.y <= 0 || enemyPosition.y >= gameArea.offsetHeight - 50) {
    enemyDirection *= -1; 
  }
}

function detectCollision() {
  const dx = playerPosition.x - enemyPosition.x;
  const dy = playerPosition.y - enemyPosition.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 50) {
    player.style.backgroundColor = 'yellow';
    updateScore();
  } else {
    player.style.backgroundColor = 'blue';
  }
}


function updateScore() {
    score += 1; 
    scoreDisplay.textContent = `Score: ${score}`;
  }

function updatePositions() {
  player.style.left = playerPosition.x + 'px';
  player.style.top = playerPosition.y + 'px';

  enemy.style.left = enemyPosition.x + 'px';
  enemy.style.top = enemyPosition.y + 'px';
}

function gameLoop() {
  moveEnemy();
  detectCollision();
  updatePositions();
  requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', movePlayer);
gameLoop();
