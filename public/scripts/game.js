class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;

        // Define the shapes (example rectangles here)
        this.shapes = [
            { x: 50, y: 50, width: 50, height: 50, name: 'Main' },
            { x: 150, y: 150, width: 50, height: 50, name: 'collectable' },
            { x: 250, y: 250, width: 50, height: 50, name: 'collectable' }
        ];

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

        // Display the score
        this.displayScore();
    }

    handleInput(e) {
        // Current position and dimensions of the 'Main' shape
        const mainShape = this.shapes[0];
        const moveSpeed = 10;

        if (e.key === 'ArrowRight' && mainShape.x + mainShape.width + moveSpeed <= this.canvas.width) {
            mainShape.x += moveSpeed;
        } else if (e.key === 'ArrowDown' && mainShape.y + mainShape.height + moveSpeed <= this.canvas.height) {
            mainShape.y += moveSpeed;
        } else if (e.key === 'ArrowUp' && mainShape.y - moveSpeed >= 0) {
            mainShape.y -= moveSpeed;
        } else if (e.key === 'ArrowLeft' && mainShape.x - moveSpeed >= 0) {
            mainShape.x -= moveSpeed;
        }
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

        // Loop through each shape to check for collisions with the "Main" shape
        for (let i = 1; i < this.shapes.length; i++) {
            if (this.checkCollision(this.shapes[0], this.shapes[i])) {
                console.log(`Collision detected between Main and shape ${i}!`);

                // Increase the score
                this.score++;

                // Remove the colliding shape from the array
                this.shapes.splice(i, 1);

                // Decrease index so we don't skip the next shape due to the splice operation
                i--;

                // Spawn a new collectable shape
                this.spawnCollectable();
            }
        }

        requestAnimationFrame(() => this.update());
    }


}

// Initialize the game
document.myGame = new Game();



// log the score once every second
setInterval(() => console.log(document.myGame.score), 1000);