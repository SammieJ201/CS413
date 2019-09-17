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
        var fireballTexture = PIXI.Texture.fromImage("fireball.png");
        var newFireball = new PIXI.Sprite(fireballTexture);
        newFireball.position.x = wizard.position.x;
        newFireball.position.y = wizard.position.y;

        stage.addChild(newFireball);

        shootFireball(newFireball, 73);

    }

    if (e.keyCode == 75) { // down key
        var fireballTexture = PIXI.Texture.fromImage("fireball.png");
        var newFireball = new PIXI.Sprite(fireballTexture);
        newFireball.position.x = wizard.position.x;
        newFireball.position.y = wizard.position.y;

        stage.addChild(newFireball);

        shootFireball(newFireball, 75);
    }

    if (e.keyCode == 74) { // left key

        var fireballTexture = PIXI.Texture.fromImage("fireball.png");
        var newFireball = new PIXI.Sprite(fireballTexture);
        newFireball.position.x = wizard.position.x;
        newFireball.position.y = wizard.position.y;

        stage.addChild(newFireball);

        shootFireball(newFireball, 74);
    }

    if (e.keyCode == 76) { // right key

        var fireballTexture = PIXI.Texture.fromImage("fireball.png");
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

animate();
