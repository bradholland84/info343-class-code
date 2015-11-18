/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    //2d render context
    var canvas = document.getElementById('game-canvas');
    var c = canvas.getContext('2d');

    //current game state
    var gameState;

    function newGameState() {
        return {
            ball: {
              left: Math.random() * canvas.width,
              top: Math.random() * canvas.height,
              width: 10,
              height: 10,
              vectorX: 1,
              vectorY: 1,
              velocity: 5
          },
            paddle: {
                left: 20,
                top: 0,
                width: 10,
                height: canvas.height / 6
            },
            lastTimestamp: performance.now()
        };
    }

    //render current game state to canvas element
    function render() {
        //clears entire canvas
        c.clearRect(0, 0, canvas.width, canvas.height);

        var ball = gameState.ball;
        //begins the path
        c.beginPath();
        //fill in the circle
        c.arc(ball.left + (ball.width/2),
            ball.top + (ball.height/2),
            ball.width / 2, 0, 2 * Math.PI);
        c.fill();

        //render paddle
        var paddle = gameState.paddle;
        c.fillRect(paddle.left, paddle.top, paddle.width, paddle.height);
    }// render()

    //advance the animation by one step
    function step() {
        var ball = gameState.ball;
        var paddle = gameState.paddle;

        //move the ball
        ball.left += ball.vectorX * ball.velocity;
        ball.top += ball.vectorY * ball.velocity;

        //edge bounce left or right
        if (ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }

        //edge bounce top or bottom
        if (ball.top <= 0 || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }

        //bounce if hits paddle
        if (ball.left <= paddle.left + paddle.width) {
            //if bottom of ball is at or below top of paddle
            if (ball.top + ball.height >= paddle.top &&
                ball.top <= paddle.top + paddle.height) {
                ball.vectorX = -ball.vectorX;
            } else {
                //game over
                var message = 'Game Over';
                c.font = '20px "Comic Sans MS"';
                //get width of game over text
                var metrics = c.measureText(message);

                c.fillText(message, (canvas.width - metrics.width) /2,
                    (canvas.height - 20) / 2);
                return false;
            }

        }
        return true;
    } //step()

    //advance the animation and redraw
    function animate(timestamp) {
        var keepGoing = true;
        render();

        //advance animation if 16ms has passed
        if (timestamp - gameState.lastTimestamp > 16) {
            keepGoing = step();
            gameState.lastTimestamp = timestamp;
        }
        if (keepGoing) {
            requestAnimationFrame(animate);
        }
    } //animate()

    document.addEventListener('mousemove', function(event) {
        var canvasY = event.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        paddle.top = canvasY - (paddle.height / 2);
    });

    gameState = newGameState();

    //ask browser to animate as quickly as possible
    requestAnimationFrame(animate);
});
