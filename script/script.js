const canvas = document.getElementById("interactive-game");
const ctx = canvas.getContext("2d");

let x = 100; // Start location on x-axis
let y = 100; // Start location on y-axis
let speed = 0.5; // Speed of player
let playerImage = new Image();
playerImage.src = "images/idleanimation.gif"; // Ensure this path is correct

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let playerWidth = 100; // Desired width of the player image
let playerHeight = 100; // Desired height of the player image

let bullets = []; // Array to hold bullets
let bulletInterval = 0; // Interval to control bullet creation

let gameOver = false;


let player = {
  x: x,
  y: y,
  height: playerHeight,
  width: playerWidth,
  lives: 3,
  update: function() {
    if (this.lives <=0) {
      gameOver = true
    }
  }

}

playerImage.onload = function() {
  drawGame();
};




function drawGame() {
  if (!gameOver) {
      requestAnimationFrame(drawGame);
  } else {
      ctx.fillStyle = "red";
      ctx.font = "30px Arial";
      ctx.fillText("Game Over", canvas.width / 2 - 80, canvas.height / 2);
  }
  clearScreen();
  inputs();
  boundaryCheck();
  drawPlayer();
  runBullets(); // Run bullets within the draw loop
}


function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function boundaryCheck() {
  // Up
  if (player.y < 0) {
    player.y = 0;
  }
  // Down
  if (player.y > canvas.height - playerHeight) {
    player.y = canvas.height - playerHeight;
  }
  // Left
  if (player.x < 0) {
    player.x = 0;
  }
  // Right
  if (player.x > canvas.width - playerWidth) {
    player.x = canvas.width - playerWidth;
  }
}

function inputs() {
  if (upPressed) {
    player.y -= speed;
  }
  if (downPressed) {
    player.y += speed;
  }
  if (leftPressed) {
    player.x -= speed;
  }
  if (rightPressed) {
    player.x += speed;
  }
}

function drawPlayer() {
  // Draw the animated GIF at the specified position and size
  ctx.drawImage(playerImage, player.x, player.y, playerWidth, playerHeight);
}

document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
  // W (Up)
  if (event.key === 'w') {
    upPressed = true;
  }

  // S (Down)
  if (event.key === 's') {
    downPressed = true;
  }
  // A (Left)
  if (event.key === 'a') {
    leftPressed = true;
  }

  // D (Right)
  if (event.key === 'd') {
    rightPressed = true;
  }
}

function keyUp(event) {
  // W (Up)
  if (event.key === 'w') {
    upPressed = false;
  }

  // S (Down)
  if (event.key === 's') {
    downPressed = false;
  }
  // A (Left)
  if (event.key === 'a') {
    leftPressed = false;
  }

  // D (Right)
  if (event.key === 'd') {
    rightPressed = false;
  }
}

// Bullets
class Bullet {
  constructor(x, y, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

function runBullets() {
  bulletInterval++;
  if (bulletInterval % 50 === 0) {
    let y1 = Math.floor(Math.random() * (canvas.height - 0)) + 0;
    let y2 = Math.floor(Math.random() * (canvas.height - 0)) + 0;
    let x1 = Math.floor(Math.random() * (canvas.width - 0)) + 0;
    let x2 = Math.floor(Math.random() * (canvas.width - 0)) + 0;
    bullets.push(new Bullet(-10, y1, 2, 0));
    bullets.push(new Bullet(canvas.width, y2, -2, 0));
    bullets.push(new Bullet(x1, -10, 0, 2));
    bullets.push(new Bullet(x2, canvas.height, 0, -2));
  }

  for (let i = 0; i < bullets.length; i++) {
    bullets[i].update();
    bullets[i].draw();
    if (bullets[i] &&
        bullets[i].x < -11 || bullets[i].x > 880 ||
        bullets[i].y < -11 || bullets[i].y > 550) {
        bullets.splice(i, 1);
    }
    if (collision(player, bullets[i])) {
        player.lives--;
        bullets.splice(i, 1);
        i--;

        if (player.lives <=0){
          gameOver = true;
        }
      }
    }
}

// Collision
function collision(first, second) {
  if (first.x < second.x + second.width &&
      first.x + first.width > second.x &&
      first.y < second.y + second.height &&
      first.y + first.height > second.y) {
      return true;
      }
}


function runGame() {
  ctx.clearRect(0, 0, 880, 550);
  drawPlayer();
  if (!gameOver) {
      requestAnimationFrame(runGame);
  }
}
requestAnimationFrame(runGame);
