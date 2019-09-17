var gameport = document.getElementById("gameport");

var WIDTH = 600;
var HEIGHT = 400;
var fps = 15;

var renderer = PIXI.autoDetectRenderer({ width: 600, height: 400, backgroundColor: 0x3344ee });

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

var texture1 = PIXI.Texture.fromImage("char2.png");
var texture2 = PIXI.Texture.fromImage("fireball.png");

var wizard = new PIXI.Sprite(texture1);
var fireball = new PIXI.Sprite(texture2);

wizard.anchor.x = 0.5;
fireball.anchor.x = 0.5;

wizard.anchor.y = 0.5;
fireball.anchor.y = 0.5;

wizard.position.x = 100;
wizard.position.y = 100;

stage.addChild(wizard);
//stage.addChild(fireball);

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
        stage.addChild(fireball);
        fireball.position.x = wizard.position.x;
        fireball.position.y = wizard.position.y;
		
        shootFireballUp();
    }
    if (e.keyCode == 75) { // down key
        stage.addChild(fireball);
        fireball.position.x = wizard.position.x;
        fireball.position.y = wizard.position.y;

        shootFireballDown();
    }
    if (e.keyCode == 74) { // left key
        stage.addChild(fireball);
        fireball.position.x = wizard.position.x;
        fireball.position.y = wizard.position.y;

        shootFireballLeft();
    }
    if (e.keyCode == 76) { // right key
        stage.addChild(fireball);
        fireball.position.x = wizard.position.x;
        fireball.position.y = wizard.position.y;

        shootFireballRight();
    } 
}

function shootFireballUp() {
    stage.addChild(fireball);
    setTimeout(function () {
		
        if (fireball.position.y < 0) {
            stage.removeChild(fireball);
			return;
        }
		
        requestAnimationFrame(shootFireballUp);
        fireball.position.y -= 10;

    }, 1000 / fps);

}

function shootFireballDown() {
    setTimeout(function () {
        if (fireball.position.y > HEIGHT) {
            stage.removeChild(fireball);
			return;
        }
		
        requestAnimationFrame(shootFireballDown);

        fireball.position.y += 10;


    }, 1000 / fps);

    
}

function shootFireballLeft() {
    setTimeout(function () {
		if (fireball.position.x < 0) {
            stage.removeChild(fireball);
		   return;
        }
        requestAnimationFrame(shootFireballLeft);
        fireball.position.x -= 10;
        
    }, 1000 / fps);

   
}

function shootFireballRight() {
    setTimeout(function () {
		if (fireball.position.x > WIDTH) {
            stage.removeChild(fireball);
			return;
        }
		
        requestAnimationFrame(shootFireballRight);
        fireball.position.x += 10;
        
    }, 1000 / fps);

    
}


document.addEventListener('keydown', keydownEventHandler);

function animate() {
    requestAnimationFrame(animate);
   // wizard.rotation += 0.1;
    renderer.render(stage);
    
}

animate();
