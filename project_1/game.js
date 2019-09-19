var gameport = document.getElementById("gameport");

var WIDTH = 600;
var HEIGHT = 400;
var fps = 15;

var renderer = PIXI.autoDetectRenderer({ width: 600, height: 400, backgroundColor: 0x3344ee });

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var wizardTexture = PIXI.Texture.fromImage("Assets/char2.png");
var monsterTextureLeft = PIXI.Texture.fromImage("Assets/monster_l.png");
var monsterTextureRight = PIXI.Texture.fromImage("Assets/monster_r.png");
	

var wizard = new PIXI.Sprite(wizardTexture);
var fireballTexture = PIXI.Texture.fromImage("Assets/fireball.png");

wizard.anchor.x = 0.5;

wizard.anchor.y = 0.5;

wizard.position.x = 100;
wizard.position.y = 100;

stage.addChild(wizard);

function keydownEventHandler(e) {
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

    if (e.keyCode == 73) { // up key
        var newFireball = new PIXI.Sprite(fireballTexture);
        newFireball.position.x = wizard.position.x;
        newFireball.position.y = wizard.position.y;

        stage.addChild(newFireball);

        shootFireball(newFireball, 73);

    }

    if (e.keyCode == 75) { // down key
        var newFireball = new PIXI.Sprite(fireballTexture);
        newFireball.position.x = wizard.position.x;
        newFireball.position.y = wizard.position.y;

        stage.addChild(newFireball);

        shootFireball(newFireball, 75);
    }

    if (e.keyCode == 74) { // left key
        var newFireball = new PIXI.Sprite(fireballTexture);
        newFireball.position.x = wizard.position.x;
        newFireball.position.y = wizard.position.y;

        stage.addChild(newFireball);

        shootFireball(newFireball, 74);
    }

    if (e.keyCode == 76) { // right key
        var newFireball = new PIXI.Sprite(fireballTexture);
        newFireball.position.x = wizard.position.x;
        newFireball.position.y = wizard.position.y;

        stage.addChild(newFireball);

        shootFireball(newFireball, 76);
    } 
}

function shootFireball(newFireball, keyCode) {
    setTimeout(function () {

        if (newFireball.position.y < 0 || newFireball.position.y > HEIGHT ||
            newFireball.position.x < 0 || newFireball.position.x > WIDTH) {
            stage.removeChild(newFireball);
			return;
        }
		
        requestAnimationFrame(function (temp) {

            shootFireball(newFireball, keyCode);

        });

        if (keyCode == 73) {
            newFireball.position.y -= 10;
        }

        if (keyCode == 75) {
            newFireball.position.y += 10;
        }

        if (keyCode == 74) {
            newFireball.position.x -= 10;
        }

        if (keyCode == 76) {
            newFireball.position.x += 10;
        }

    }, 1000 / fps);

}

document.addEventListener('keydown', keydownEventHandler);

function animate() {
    requestAnimationFrame(animate);
   // wizard.rotation += 0.1;
    renderer.render(stage);
    
}
// Spawns a new monster every second
setInterval(function spawnMonsters(){
// 0 for going down, 1 for going up, 2 for going left, 3 for going right.
	
	var randomDirection = Math.floor(Math.random() * Math.floor(4));
	
	var monsterLeft = new PIXI.Sprite(monsterTextureLeft);
	
	var monsterRight = new PIXI.Sprite(monsterTextureRight);
	
	monsterLeft.anchor.x = 0.5;
	monsterRight.anchor.x = 0.5;
	monsterLeft.anchor.y = 0.5;
	monsterRight.anchor.y = 0.5;
	
	// starting from top, going down
	if(randomDirection == 0){
		monsterLeft.position.y = 0;
		monsterLeft.position.x = Math.floor(Math.random() * WIDTH);
		stage.addChild(monsterLeft);
		
		sendMonster(monsterLeft, randomDirection);
	}

    // starting form bottom, going up
	if(randomDirection == 1){
        monsterRight.position.y = HEIGHT;
        monsterRight.position.x = Math.floor(Math.random() * WIDTH);
        stage.addChild(monsterRight);

        sendMonster(monsterRight, randomDirection);
	}
	
	// starting from the right, going left
	if(randomDirection == 2){
		monsterLeft.position.y = Math.floor(Math.random() * HEIGHT);
        monsterLeft.position.x = WIDTH;

		stage.addChild(monsterLeft);
	
		sendMonster(monsterLeft, randomDirection);
	}

    // starting from the left, going right
    if (randomDirection == 3) {
        monsterRight.position.y = 0;
        monsterRight.position.x = Math.floor(Math.random() * WIDTH);

        stage.addChild(monsterRight);

        sendMonster(monsterRight, randomDirection);
	}
	
	
	
}, 1000);

// Sends monster in specific direction
function sendMonster(monster, direction){
	setTimeout(function () {
		
		if(monster.position.x < 0 || monster.position.x > WIDTH ||
		monster.position.y < 0 || monster.position.y > HEIGHT){
			stage.removeChild(monster);
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
		
	}, 1000/fps);
}

animate();