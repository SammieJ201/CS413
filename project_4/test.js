var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 1000;
var HEIGHT = 400;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();

// Menu stage
var menuStage = new PIXI.Container();
stage.addChild(menuStage);
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);

// Add play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(250,100);
playButton.interactive = true;
playButton.buttonMode = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);

// Add credits Button
var creditsButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/creditsBtn.png"));
creditsButton.anchor.set(0.5);
creditsButton.position.set(250,200);
creditsButton.interactive = true;
creditsButton.buttonMode = true;
creditsButton.on('mousedown', creditsButtonHandler);
menuStage.addChild(creditsButton);

// Add instructions Button
var instructionsButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/htpBtn.png"));
instructionsButton.anchor.set(0.5);
instructionsButton.position.set(250,300);
instructionsButton.interactive = true;
instructionsButton.buttonMode = true;
instructionsButton.on('mousedown', instructionsButtonHandler);
menuStage.addChild(instructionsButton);

// Handles mouse click on play button
function playButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
  setKeys();
  PIXI.loader
	.add("Assets/Character/char_spritesheet.json")
	.load(startGame);
}

// Handles mouse click on instructions button
//TODO: Wire up to background-instructions
function instructionsButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
}

// Handles mouse click on credits button
//TODO: Wire up to background-credits
function creditsButtonHandler(e)
{
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage
  
}

/// Game Stage ////////////////////////
var gameStage = new PIXI.Container();
var gameGround = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-ground.png"));
gameGround.position.set(0,350);
var gameSky = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-game-sky.png"));
gameStage.addChild(gameGround);
gameStage.addChild(gameSky);

/// End of game stage /////////////////

// Load player
/*var runner = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Character/running1.png"));
runner.anchor.set(0, 1.0);
runner.position.set(WIDTH/2, 350);
gameStage.addChild(runner);
*/

var character = new PIXI.Container();

function startGame()
{
	gameStage.addChild(character);
	runIdle();
}

//var idle = true;
var idle, runner;
// Runs the idle animation.
function runIdle()
{
	var sheet = PIXI.Loader.shared.resources["Assets/Character/char_spritesheet.json"].spritesheet;
	idle = new PIXI.AnimatedSprite(sheet.animations["idle"]);
	idle.position.set(WIDTH/2, 350);
	idle.anchor.set(0.5);
	idle.animationSpeed = 0.1;
	idle.play();
	character.addChild(idle);
	runningOnStage = false;
	
}

/*function runnerControlHandler(e)
{
  var sheet = PIXI.Loader.shared.resources["Assets/Character/char_spritesheet.json"].spritesheet;
  
  if(e.keyCode == 87 || e.keyCode == 83 ||e.keyCode == 65 ||e.keyCode == 68)
  {
	runner = new PIXI.AnimatedSprite(sheet.animations["running"]);
	runner.position.set(WIDTH/2, 350);
	runner.anchor.set(0.5);
	runner.animationSpeed = 0.1;
	character.removeChild(idle);
	character.addChild(runner);
	runner.play();
	
	if(e.keyCode == 87) { runner.position.y -= 10; } // W
    if(e.keyCode == 83) { runner.position.y += 10; } // S
    if(e.keyCode == 65) { runner.position.x -= 10; } // A
    if(e.keyCode == 68) { runner.position.x += 10; } // D
	  
  }
  

  if(runner.position.x > WIDTH) {runner.position.x = 0;}
  if(runner.position.x < 0) {runner.position.x = WIDTH;}
  if(runner.position.y > HEIGHT) {runner.position.y = 0;}
  if(runner.position.y < 0) {runner.position.y = HEIGHT;}

  // Move stage with charcater
  gameStage.x = WIDTH/2 - runner.x - runner.width/2;
  gameStage.y = HEIGHT/2 - runner.y - runner.height/2;
}
document.addEventListener('keydown', runnerControlHandler);


*/


function keyboard(e)
{
	var key = {};
	key.value = value;
	key.isDown = false;
	key.isUp = true;
	key.press = undefined;
	key.release = undefined;
	
	//The `downHandler`
	key.downHandler = event => {
		if (event.key === key.value) {
			if (key.isUp && key.press) key.press();
				key.isDown = true;
				key.isUp = false;
				event.preventDefault();
			}
		};
	
	key.upHandler = event => {
		if (event.key === key.value) {
			if (key.isDown && key.release) key.release();
				key.isDown = false;
				key.isUp = true;
				event.preventDefault();
			}
		};
		
	//Attach event listeners
	const downListener = key.downHandler.bind(key);
	const upListener = key.upHandler.bind(key);
  
	window.addEventListener(
		"keydown", downListener, false
	  );
	window.addEventListener(
		"keyup", upListener, false
	  );
	  
	
}

var wKey, aKey, sKey, dKey;
var runningOnStage = false;

function setKeys()
{
	wKey = keyboard(87);
	aKey = keyboard(65);
	sKey = keyboard(83);
	dKey = keyboard(68);
	
	
	wKey.press = () =>{
		character.position.y -= 10;
	};
	aKey.press = () =>{
		character.position.x -= 10;
	};
	sKey.press = () =>{
		character.position.y += 10;
	};
	dKey.press = () =>{
		character.position.x += 10;
	};
	
	wKey.release = () => {
		character.removeChild(runner);
		runIdle();
	};	
	
	aKey.release = () => {
		character.removeChild(runner);
		runIdle();
	};	
	
	sKey.release = () => {
		character.removeChild(runner);
		runIdle();
	};	
	
	dKey.release = () => {
		character.removeChild(runner);
		runIdle();
	};	
}

function runRunningAnim()
{
	if(!runningOnStage)
	{
		runner = new PIXI.AnimatedSprite(sheet.animations["running"]);
		runner.position.set(WIDTH/2, 350);
		runner.anchor.set(0.5);
		runner.animationSpeed = 0.1;
		character.removeChild(idle);
		character.addChild(runner);
		runner.play();
		runningOnStage = true;
	}
}


function animate()
{
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
