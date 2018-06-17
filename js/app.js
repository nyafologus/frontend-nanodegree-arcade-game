// Enemies our player must avoid
class Enemy {
    // Constructor function to initialize new Enemy objects
    constructor(x, y, speed) {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';

        // Initial speed of Enemy
        this.speed = speed;
        //Initial position of Enemy on the x axis
        this.x = x;
        //Initial position of Enemy on the y axis
        this.y = y;
    }

    // Update Enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // once Enemy reaches right border of canvas (550), 
    // reset its position to start again off canvas from left (-100)
    if (this.x > 550) {
        this.x = -100;
        // this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // collision detection, if distance in pixels is less than 60 on the x axis,
    // or less than 13 on y axis, reset position of player to default
    if (player.x - this.x <= 60 && player.y - this.y <= 13) {
        player.x = 200;
        player.y = 380;
        }
    }

    // Draw Enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    // Constructor function to initialze new Player objects
    constructor(x, y) {
        this.sprite = 'images/char-cat-girl.png';
        this.x = x;
        this.y = y;
        this.victory = false;
    }

    // Preventing Player to move off canvas
    update(x, y) {
        // in case Player reaches the right side of canvas
        if (this.x > 400) {
            this.x = 400;
        }

        // in case Player reaches the left side of canvas
        if (this.x < 0) {
            this.x = 0;
        }

        // in case Player reaches the bottom of canvas
        if (this.y > 400) {
            this.y = 400;
        }

        // in case Player reaches the top of canvas, the game is won
        if (this.y < 0) {
                // Player position defaults
                this.x = 200;
                this.y = 380;
                // Enemies freeze
                for (const enemy of allEnemies) {
                    enemy.speed = 0;
                }
                // Game is won
                this.victory = true;
                this.render();
                }
            }

        // Display Player on the screen
        render() {
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
            // Display victory message if game is won
            if (this.victory === true) {
            ctx.font = '88px Georgia';
            ctx.fillText('Oh,', 66, 210);
            ctx.font = '66px Georgia';
            ctx.fillText('lucky you!', 130, 280);
            ctx.font = '16px Georgia';
            ctx.fillText('Now go', 310, 420);
            ctx.font = '16px Georgia';
            ctx.fillText('hug a bug!', 325, 436);
            }
        };

        // Input made by user determines direction of Player
        handleInput(keyPress) {
            switch (keyPress) {
                // left key press moves Player 100 pixels to the left
                case 'left':
                    this.update(this.x -= 100);
                    break;
                // right key press moves Player 100 pixels to the right
                case 'right':
                    this.update(this.x += 100);
                    break;
                // pressing the up arrow moves Player 80 pixels up on y axis
                case 'up':
                    this.update(this.y -= 80);
                    break;
                // pressing the down arrow moves Player 80 pixels down on y axis
                case 'down':
                    this.update(this.y += 83);
                    break;
                }
        }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
const allEnemies = [];

// Setting initial Enemy location of Enemies on y axis
let enemyLocation = [62, 145, 225];

// Generating new enemy Objects with random speed
for (const location of enemyLocation) {
    enemy = new Enemy(-180, location, 100 + Math.floor(Math.random() * 200));
    allEnemies.push(enemy);
};

// Place the player object in a variable called player
// Initialize it with default position
const player = new Player(200, 380);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});