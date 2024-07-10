var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var player;
let pressedKeyX = "none";
let pressedKeyY = "none";
let gameOver = false;

class Player{
    constructor(){
        this.x = 240;
        this.y = 240;
        this.width = 20;
        this.height = 20;
        this.lives = 3;

        this.playerImage = new Image();
        this.playerImage.src = "images/idleanimation.gif";

        this.playerImage.onload = () => {
            this.imageLoaded = true; // Flag to track image loading status
        };


        this.update = function() {
            if (this.lives <=0){
                gameOver = true;
            }
        }
        this.draw = function(){
            if (this.imageLoaded){
                ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
            } else {
                console.warn('Player image is not yet loaded.');
            }
            

        }
    }
}

player = new Player;

function runPlayer(){
    player.update();
    player.draw();
}

function runGame(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    runPlayer();
    if (!gameOver){
        requestAnimationFrame(runGame);

    }
}
requestAnimationFrame(runGame);
