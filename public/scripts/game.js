class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;

        // Define the shapes (example rectangles here)
        this.shapes = [
            { x: 10, y: 300, width: 10, height: 60, name: 'Paddle1' },
            { x: 580, y: 300, width: 10, height: 60, name: 'Paddle2' },
            { x: 295, y: 390, width: 10, height: 10, name: 'Ball', dx: 2, dy: -2 }
        ];

        // Initialize scores for both players
        this.player1Score = 0;
        this.player2Score = 0;

        // Start game loop
        this.update();

        // Handle keyboard input
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    displayScore() {
        // Define the position and style for the score display
        const scoreX = 10;  // X position of score display
        const scoreY = 30;  // Y position of score display
        this.ctx.font = "24px Arial";  // Font size and family
        this.ctx.fillStyle = "black";  // Font color

        // Clear the previous score to avoid overlap (optional but can be useful)
        this.ctx.clearRect(scoreX, scoreY - 24, 200, 30);  // Clear a rectangle area

        // Draw the score
        this.ctx.fillText("Score: " + this.score, scoreX, scoreY);
    }

    redraw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw each shape
        for (const shape of this.shapes) {
            this.ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
        }

        this.displayScore();
    }

    handleInput(e) {
        const PADDLE_SPEED = 20;

        // Player 1 controls
        if (e.key === 'w' && this.shapes[0].y > 0) {
            this.shapes[0].y -= PADDLE_SPEED;
        } else if (e.key === 's' && this.shapes[0].y + this.shapes[0].height < this.canvas.height) {
            this.shapes[0].y += PADDLE_SPEED;
        }

        // Player 2 controls
        if (e.key === 'ArrowUp' && this.shapes[1].y > 0) {
            this.shapes[1].y -= PADDLE_SPEED;
        } else if (e.key === 'ArrowDown' && this.shapes[1].y + this.shapes[1].height < this.canvas.height) {
            this.shapes[1].y += PADDLE_SPEED;
        }
    }
    updateBall() {
        let ball = this.shapes[2];
        const BALL_SPEED_INCREASE = 3; // factor to make the ball move faster
        
        ball.x += ball.dx * BALL_SPEED_INCREASE;
        ball.y += ball.dy * BALL_SPEED_INCREASE;

        // Ball collision with top and bottom
        if (ball.y <= 0 || ball.y + ball.height >= this.canvas.height) {
            ball.dy = -ball.dy;
        }

        // Ball collision with paddles
        if ((ball.dx > 0 && this.checkCollision(ball, this.shapes[1])) ||
            (ball.dx < 0 && this.checkCollision(ball, this.shapes[0]))) {
            ball.dx = -ball.dx;
        }

        // Ball goes out of bounds
        if (ball.x < 0 || ball.x > this.canvas.width) {
            // Player 2 scores if ball goes out on the left side, and vice versa
            if (ball.x < 0) this.player2Score++;
            else this.player1Score++;

            // Reset the ball's position and direction
            ball.x = 295;
            ball.y = 390;
            ball.dx = -ball.dx;
        }
    }
    displayScore() {
        // Save the current context state
        this.ctx.save();

        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = 'black'; // Assuming you want the score in black color. Adjust as necessary.
        this.ctx.textAlign = 'center'; // Center the text based on the given x position

        // Adjust these coordinates as necessary
        this.ctx.fillText(this.player1Score, this.canvas.width / 4, 30);
        this.ctx.fillText(this.player2Score, (3 * this.canvas.width) / 4, 30);

        // Restore the context state to what it was before
        this.ctx.restore();
    }

    checkForWinner() {
        if (this.player1Score >= 5) {
            this.displayWinner('Player 1 Wins!');
            return true;
        } else if (this.player2Score >= 5) {
            this.displayWinner('Player 2 Wins!');
            return true;
        }
        return false;
    }

    displayWinner(message) {
        this.ctx.font = '36px Arial';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(message, this.canvas.width / 2 - 100, this.canvas.height / 2);
    }

    checkCollision(obj1, obj2) {
        // Check if the two objects are colliding
        return obj1.x < obj2.x + obj2.width &&
            obj1.x + obj1.width > obj2.x &&
            obj1.y < obj2.y + obj2.height &&
            obj1.y + obj1.height > obj2.y;
    }

    spawnCollectable() {
        const maxWidth = this.canvas.width;
        const maxHeight = this.canvas.height;

        const randomX = () => Math.floor(Math.random() * (maxWidth - 50)); // Subtracting 50 to ensure shape stays within canvas
        const randomY = () => Math.floor(Math.random() * (maxHeight - 50));

        let newShape = {
            x: randomX(),
            y: randomY(),
            width: 50,
            height: 50,
            name: 'collectable'
        };

        // Check if the new shape overlaps with the "Main" shape
        while (this.checkCollision(newShape, this.shapes[0])) {
            newShape.x = randomX();
            newShape.y = randomY();
        }

        this.shapes.push(newShape);
    }

    update() {
        this.redraw();

        if (!this.checkForWinner()) {
            this.updateBall();
            requestAnimationFrame(() => this.update());
        }
    }

    // update() {
    //     this.redraw();

    //     // Loop through each shape to check for collisions with the "Main" shape
    //     for (let i = 1; i < this.shapes.length; i++) {
    //         if (this.checkCollision(this.shapes[0], this.shapes[i])) {
    //             console.log(`Collision detected between Main and shape ${i}!`);

    //             // Increase the score
    //             this.score++;

    //             // Remove the colliding shape from the array
    //             this.shapes.splice(i, 1);

    //             // Decrease index so we don't skip the next shape due to the splice operation
    //             i--;

    //             // Spawn a new collectable shape
    //             this.spawnCollectable();
    //         }
    //     }

    //     requestAnimationFrame(() => this.update());
    // }


}

// Initialize the game
document.myGame = new Game();



// log the score once every second
setInterval(() => console.log(document.myGame.score), 1000);