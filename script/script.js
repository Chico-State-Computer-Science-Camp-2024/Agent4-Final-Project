const canvas = document.getElementById("interactive-game");
const ctx = canvas.getContext("2d");

let x = 100; //start location on x-axis
let y = 100; //start location of y-axis
let radius = 50;
let speed = 0.3; //speed of player
let playerImage = new Image;
playerImage.src = "images/idleanimation.gif"

let upPressed = false;
let downPressed = false;
let leftPressed = false;
let rightPressed = false;

let playerWidth = 100
let playerHeight = 100

playerImage.onload = function(){
  drawGame();
}

function drawGame() {
  requestAnimationFrame(drawGame);
  clearScreen();
  inputs();
  boundryCheck();
  drawPlayer();
}

function clearScreen() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function boundryCheck() {
  //up
  if (y < 0) {
    y = 0;
  }
  //down
  if (y > canvas.height - playerHeight) {
    y = canvas.height - playerHeight;
  }
  //left
  if (x < 0) {
    x = 0;
  }
  //right
  if (x > canvas.width - playerWidth) {
    x = canvas.width - playerWidth;
  }
}

function inputs() {
  if (upPressed) {
    y = y - speed;
  }
  if (downPressed) {
    y = y + speed;
  }
  if (leftPressed) {
    x = x - speed;
  }
  if (rightPressed) {
    x = x + speed;
  }
}

function drawPlayer() {
  ctx.drawImage(playerImage, x, y, playerWidth, playerHeight);
  //if (upPressed) {
  //  ctx.fillStyle = "red";
  //}
  //if (downPressed) {
  //  ctx.fillStyle = "blue";
  //}
  //if (leftPressed) {
  //  ctx.fillStyle = "yellow";
  //}
  //if (rightPressed) {
  //  ctx.fillStyle = "purple";
  //}

  //ctx.beginPath();
  //ctx.arc(x, y, radius, 0, Math.PI * 2);
  //ctx.fill();
}



document.body.addEventListener("keydown", keyDown);
document.body.addEventListener("keyup", keyUp);

function keyDown(event) {
  //up
  if (event.key == 'w') {
    upPressed = true;
  }

  //down
  if (event.key == 's') {
    downPressed = true;
  }
  //left
  if (event.key == 'a') {
    leftPressed = true;
  }

  //right
  if (event.key == 'd') {
    rightPressed = true;
  }
}

function keyUp(event) {
  //up
  if (event.key == 'w') {
    upPressed = false;
  }

  //down
  if (event.key == 's') {
    downPressed = false;
  }
  //left
  if (event.key == 'a') {
    leftPressed = false;
  }

  //right
  if (event.key == 'd') {
    rightPressed = false;
  }
}

drawGame();