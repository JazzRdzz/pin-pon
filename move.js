var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Variables de la pelota
var ballRadius = 10;
var ballX = canvas.width / 2;
var ballY = canvas.height - 30;
var ballDX = 2;
var ballDY = -2;

// Variables de la paleta
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

// Variables de las teclas
var rightPressed = false;
var leftPressed = false;

// Event listeners para las teclas
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

// Función para dibujar la pelota
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Función para dibujar la paleta
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Función para detectar colisiones con la pared
function wallCollisionDetection() {
    if(ballX + ballDX > canvas.width - ballRadius || ballX + ballDX < ballRadius) {
        ballDX = -ballDX;
    }
    if(ballY + ballDY < ballRadius) {
        ballDY = -ballDY;
    }
    else if(ballY + ballDY > canvas.height - ballRadius) {
        if(ballX > paddleX && ballX < paddleX + paddleWidth) {
            ballDY = -ballDY;
        }
        else {
            alert("¡Juego terminado!");
            document.location.reload();
        }
    }
}

// Función para actualizar la posición de la pelota
function updateBallPosition() {
    ballX += ballDX;
    ballY += ballDY;
}

// Función para actualizar la posición de la paleta
function updatePaddlePosition() {
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
}

// Función principal de dibujo
