/* Samantha Earl
*
*/

var gameport = document.getElementById("gameport");

var WIDTH = 800;
var HEIGHT = 400;
var fps = 15;
var score = 0;

var renderer = PIXI.autoDetectRenderer({ width: WIDTH, height: HEIGHT, backgroundColor: 0x3344ee});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();


// Add background to stage
var background = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/background.png"));
background.anchor.x = 0.5;
background.anchor.y = 0.5;
background.position.x = 400;
background.position.y = 200;
stage.addChild(background);

// Load game over pic to stage
var gameOverPic = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/gameOverScreen.png"));
gameOverPic.anchor.x = 0.5;
gameOverPic.anchor.y = 0.5;
gameOverPic.position.x = 400;
gameOverPic.position.y = 200;

var scoreText = new PIXI.Text("Monsters slain: " + score);
scoreText.anchor.x = 0;
scoreText.anchor.y = 1;

scoreText.position.x = 0;
scoreText.position.y = HEIGHT;

stage.addChild(scoreText);

// Load wizard and add to stage
var wizardTexture = PIXI.Texture.fromImage("Assets/char2.png");
var wizard = new PIXI.Sprite(wizardTexture);
wizard.anchor.x = 0.5;
wizard.anchor.y = 0.5;
wizard.position.x = 400;
wizard.position.y = 200;
stage.addChild(wizard);

// Load fireball texture
var fireballTexture = PIXI.Texture.fromImage("Assets/fireball.png");

// Load 2 monster textures.
var monsterTextureLeft = PIXI.Texture.fromImage("Assets/monster_l.png");
var monsterTextureRight = PIXI.Texture.fromImage("Assets/monster_r.png");

// Load 8 monsters to add to stage
// monsters 1 - 4 = left-facing monsters
var monster1 = new PIXI.Sprite(monsterTextureLeft);
var monster2 = new PIXI.Sprite(monsterTextureLeft);
var monster3 = new PIXI.Sprite(monsterTextureLeft);
var monster4 = new PIXI.Sprite(monsterTextureLeft);
// monsters 5 - 8 = right-facing monsters
var monster5 = new PIXI.Sprite(monsterTextureRight);
var monster6 = new PIXI.Sprite(monsterTextureRight);
var monster7 = new PIXI.Sprite(monsterTextureRight);
var monster8 = new PIXI.Sprite(monsterTextureRight);

// Add all monsters to monster arrays. I'm keeping this global so the wizard and 
// fireballs have access to them.
var monsterLeftArr = [monster1, monster2, monster3, monster4] 
var monsterRightArr = [monster5, monster6, monster7, monster8];
var monsterLeftIndex = 0;
var monsterRightIndex = 0;
var numOfMonsters = 0;
// Game over variable that will stop everything if the wizard is hit.
var gameOver = false;

// Handles wizard movement.
function wizardEventHandler(e) {
	if(gameOver == false){	
		if (e.keyCode == 87) { // W key
			wizard.position.y -= 10;
		}
		if (e.keyCode == 83) { // S key
			wizard.position.y += 10;
		}
		if (e.keyCode == 65) { // A key
			wizard.position.x -= 10;
		}
		if (e.keyCode == 68) { // D key
			wizard.position.x += 10;
		}
	}
}

// Spawn fireballs 
function fireballEventHandler(e) {
	if(gameOver == false)
	{
		var newFireball = new PIXI.Sprite(fireballTexture);
		newFireball.position.x = wizard.position.x;
		newFireball.position.y = wizard.position.y;

		if (e.keyCode == 73) { // i key
			stage.addChild(newFireball);
			
			shootFireball(newFireball, 73);
		}

		if (e.keyCode == 75) { // k key
			stage.addChild(newFireball);

			shootFireball(newFireball, 75);
		}

		if (e.keyCode == 74) { // j key
			stage.addChild(newFireball);

			shootFireball(newFireball, 74);
		}

		if (e.keyCode == 76) { // l key
			stage.addChild(newFireball);

			shootFireball(newFireball, 76);
		}
	}
}

	// Spawns a new monster every second
setInterval(function spawnMonsters() {
    if (gameOver == false && numOfMonsters != 7) {
		var randomDirection = Math.floor(Math.random() * Math.floor(4));
		if(monsterLeftIndex == 4){monsterLeftIndex = 0;}
		if(monsterRightIndex == 4){monsterRightIndex = 0;}
		// 0 for going down, 1 for going up, 2 for going left, 3 for going right.
		// starting from top, going down
		if(randomDirection == 0){
			var monsterLeft = monsterLeftArr[monsterLeftIndex];
			monsterLeftIndex++;
			
			monsterLeft.position.y = 0;
			monsterLeft.position.x = Math.floor(Math.random() * (WIDTH-10));
			
			stage.addChild(monsterLeft);
			
			sendMonster(monsterLeft, randomDirection);
		}

		// starting from bottom, going up
		if(randomDirection == 1){
			var monsterRight = monsterRightArr[monsterRightIndex];
			monsterRightIndex++;
			
			monsterRight.position.y = HEIGHT;
			monsterRight.position.x = Math.floor(Math.random() * (WIDTH-10));
			
			stage.addChild(monsterRight);
			
			sendMonster(monsterRight, randomDirection);
		}
		
		// starting from the right, going left
		if(randomDirection == 2){
			var monsterLeft = monsterLeftArr[monsterLeftIndex];
			monsterLeftIndex++;
			
			monsterLeft.position.y = Math.floor(Math.random() * (HEIGHT-10));
			monsterLeft.position.x = WIDTH;

			stage.addChild(monsterLeft);
			
			sendMonster(monsterLeft, randomDirection);
		}

		// starting from the left, going right
		if (randomDirection == 3) {
			var monsterRight = monsterRightArr[monsterRightIndex];
			monsterRightIndex++;

			monsterRight.position.y = 0;
			monsterRight.position.x = Math.floor(Math.random() * (HEIGHT-10));

			stage.addChild(monsterRight);
			sendMonster(monsterRight, randomDirection);
        }
        numOfMonsters++;
	}
	
}, 1000); // End spawn monsters


// Sends monster in specific direction
function sendMonster(monster, direction){	   
	setTimeout(function(){
		if(monster.position.x < 0 || monster.position.x > WIDTH ||
		monster.position.y < 0 || monster.position.y > HEIGHT){
            stage.removeChild(monster);
            numOfMonsters--;
			return;
		}
		
		requestAnimationFrame(function (temp) {
			
			sendMonster(monster, direction);
			
		});
		
		// send monster down
		if(direction == 0)
		{
			monster.position.y += 10;
		}
		
		// send monster up
		if(direction == 1){
			monster.position.y -= 10;
		}
		
		// Send monster left
		if(direction == 2) {
			monster.position.x -= 10;
		}
		
		// send monster right
		if(direction == 3){
			monster.position.x += 10;
		}
		// Check if the wizard hit a monster
	    if(wizard.position.y >= monster.position.y - 25 && 
		   wizard.position.y <= monster.position.y + 25 &&
	       wizard.position.x >= monster.position.x - 25 && 
		   wizard.position.x <= monster.position.x + 25)
		   {
			// If the wizard hit a monster, show game over screen
			// and cancel everything.
			stage.addChild(gameOverPic);
			gameOver = true;
			}
		
	}, 1000/fps);
}

function shootFireball(newFireball, keyCode) {
    setTimeout(function () {
		// If fireball hits sides of stage, remove it.
        if (newFireball.position.y < 0 || newFireball.position.y > HEIGHT ||
            newFireball.position.x < 0 || newFireball.position.x > WIDTH) {
            stage.removeChild(newFireball);
            return;
        }
		
        requestAnimationFrame(function (temp) {

            shootFireball(newFireball, keyCode);

        });
		// Send fireball up
        if (keyCode == 73) {
            newFireball.position.y -= 15;
        }
		// Send fireball down
        if (keyCode == 75) {
            newFireball.position.y += 15;
        }
		// send fireball to the left
        if (keyCode == 74) {
            newFireball.position.x -= 15;
        }
		// send fireball to the right
        if (keyCode == 76) {
            newFireball.position.x += 15;
        }
		
		// Check if fireball has collided with a monster.
		for(var i = 0; i < 4; i++){
			// Check if fireball has hit any left-facing monsters.
			if(newFireball.position.y >= monsterLeftArr[i].position.y - 30 && 
			   newFireball.position.y <= monsterLeftArr[i].position.y + 30 &&
			   newFireball.position.x >= monsterLeftArr[i].position.x - 30 && 
			   newFireball.position.x <= monsterLeftArr[i].position.x + 30)
			   {
                newFireball.position.x += 400;
                //monster.position.x -= 400;
                numOfMonsters -= 1;
				stage.removeChild(monsterLeftArr[i]);// get rid of monster
				stage.removeChild(newFireball); // get rid of fireball
				// increment score & display
				score++;
				scoreText.text = "Monsters slain: " + score;
				}
			 // Check if fireball has hit any right-facing monsters.
		    if(newFireball.position.y >= monsterRightArr[i].position.y - 30 && 
			   newFireball.position.y <= monsterRightArr[i].position.y + 30 &&
		       newFireball.position.x >= monsterRightArr[i].position.x - 30 && 
		       newFireball.position.x <= monsterRightArr[i].position.x + 30)
		       {
                newFireball.position.x += 400;
                //monster.position.x -= 400;
                numOfMonsters -= 1;
				stage.removeChild(monsterRightArr[i]); // get rid of monster
				stage.removeChild(newFireball); // get rid of fireball
				// increment score & display
				score++; 
				scoreText.text = "Monsters slain: " + score;
				}
		}
    }, 1000 / fps);

}

function animate() {
    requestAnimationFrame(animate);
   // wizard.rotation += 0.1;
    renderer.render(stage);
}
animate();

document.addEventListener('keydown', wizardEventHandler);

document.addEventListener('keydown', fireballEventHandler);
