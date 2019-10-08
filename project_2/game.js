/* Samantha Earl
* CS 413
* Project 2 - Puzzles
*/

// Initialize and load stage
var gameport = document.getElementById("gameport");
var WIDTH = 600;
var HEIGHT = 550;
var fps = 15;
var renderer = PIXI.autoDetectRenderer({ width: WIDTH, height: HEIGHT, backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// All necessary variables throughout game
var startButton, instructionsButton, backButtonInst, backButtonCred, creditsButton;
var mainMenuBackground, instructionsPage, gameBackground, endBackground, creditsBackground;

var beginStar = false;

// int and text display for score 
var score = 0;
var scoreText = new PIXI.Text("Score: " + score);
scoreText.anchor.x = 0;
scoreText.anchor.y = 0;
scoreText.position.set(0,0);
scoreText.style.fill = 0xffffff;

var gameOver = false;
// Starts everything by loading sprite sheet.	
function startMainMenu(){
	PIXI.loader
		.add("Assets/button_sprite_sheet.json")
		.load(mainMenuReady);
}

// Load main menu and all needed buttons.
function mainMenuReady(){
	// Load main menu background
	mainMenuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/main_menu.png"));
	stage.addChild(mainMenuBackground);

	// Load sprites for start and instructions button from sprite sheet.
	startButton = new PIXI.Sprite(PIXI.Texture.fromFrame("start_button.png"));
	instructionsButton = new PIXI.Sprite(PIXI.Texture.fromFrame("instructions_button.png"));
	creditsButton = new PIXI.Sprite(PIXI.Texture.fromFrame("credits_button.png"));
	
	// Position start button
	startButton.anchor.set(0.5);
	startButton.position.set(WIDTH/2, 180);
	
	// Position instructions button
	instructionsButton.anchor.set(0.5);
	instructionsButton.position.set(WIDTH/2, 320);
	
	// Position credits button
	creditsButton.anchor.set(0.5);
	creditsButton.position.set(WIDTH/2, 460);
	
	// Set all buttons as interactable and call necessary functions
	// when clicked.
	startButton.interactive = true;
	startButton.on('mousedown', startButtonHandler);
	instructionsButton.interactive = true;
	instructionsButton.on('mousedown', instructButtonHandler);
	creditsButton.interactive = true;
	creditsButton.on('mousedown', creditsButtonHandler);
	
	// Add buttons to stage
	stage.addChild(startButton);
	stage.addChild(instructionsButton);
	stage.addChild(creditsButton);
}


// This is called when the instructions button is clicked - loads intructions page and
// back button
function instructButtonHandler(e){
	// Remove background and buttons from main menu.
	stage.removeChild(mainMenuBackground);
	stage.removeChild(startButton);
	stage.removeChild(instructionsButton);
	stage.removeChild(creditsButton);
	
	// Load and add instructions page sprite to stage
	instructionsPage = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/instructions_page2.png"));
	stage.addChild(instructionsPage);
			
	// Load back button and position
	backButtonInst = new PIXI.Sprite(PIXI.Texture.fromFrame("back_button.png"));
	backButtonInst.position.x = 0;
	backButtonInst.position.y = 0;
		
	// Set back button as interactable and send to backButtonHandler when clicked.
	backButtonInst.interactive = true;
	backButtonInst.on('mousedown', backButtonInstHandler);
	// Add back button to stage.
	stage.addChild(backButtonInst);
}

// This is called when the credits button is clicked - loads credits page and
// back button
function creditsButtonHandler(e){
	// Remove background and buttons from main menu.
	stage.removeChild(mainMenuBackground);
	stage.removeChild(startButton);
	stage.removeChild(instructionsButton);
	stage.removeChild(creditsButton);
	
	// Load and add instructions page sprite to stage
	creditsBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/credits_screen.png"));
	stage.addChild(creditsBackground);
	
	// Load back button and position
	backButtonCred = new PIXI.Sprite(PIXI.Texture.fromFrame("back_button.png"));
	backButtonCred.position.x = 0;
	backButtonCred.position.y = 0;
		
	// Set back button as interactable and send to backButtonHandler when clicked.
	backButtonCred.interactive = true;
	backButtonCred.on('mousedown', backButtonCreditHandler);
	// Add back button to stage.
	stage.addChild(backButtonCred);
}

// Removes everything from instructions page and reloads main menu.
function backButtonInstHandler()
{
	stage.removeChild(instructionsPage);
	stage.removeChild(backButtonInst);
	
	mainMenuReady();
}

// Removes everything from credits page and reloads main menu.
function backButtonCreditHandler()
{
	stage.removeChild(creditsBackground);
	stage.removeChild(backButtonCred);
	
	mainMenuReady();
}

// Load sprite sheet with sprites for game and load startGame when ready.
function startButtonHandler(){
	PIXI.loader
		.add("Assets/dancer_sprite_sheet.json")
		.load(startGame);
}

function startGame(){
	// Remove elements of main menu
	stage.removeChild(mainMenuBackground);
	stage.removeChild(startButton);
	stage.removeChild(instructionsButton);
	stage.removeChild(creditsButton);
	
	// Load and display game background
	gameBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/background2.png"));
	stage.addChild(gameBackground);
	
	// Play background music
	PIXI.sound.Sound.from({
		url: 'Assets/music.mp3',
		autoPlay: true,
		loop: true,
		complete: function() {
			console.log('Sound finished');
		}
	});
	
	// Load and animate dancer sprites
	var sheet = PIXI.Loader.shared.resources["Assets/dancer_sprite_sheet.json"].spritesheet;
	var dancer = new PIXI.AnimatedSprite(sheet.animations["sprite"]);
	dancer.anchor.set(0.5);
	dancer.position.set(WIDTH/2, HEIGHT/2 + 90);
	dancer.play();
	dancer.animationSpeed = 0.1;
	stage.addChild(dancer);
	stage.addChild(scoreText);
	//spawnBalloons();
	spawnStars();
} 
function spawnBalloons(){
	setInterval(function temp(){
		var randomSpot = Math.floor(Math.random() * Math.floor(WIDTH));
		var balloon = new PIXI.Sprite(PIXI.Texture.fromFrame("balloon.png"));
		balloon.anchor.set(0.5);
		balloon.position.set(randomSpot, 0);
		stage.addChild(balloon);
		dropBalloon(balloon);
	}, 1500);
}

function dropBalloon(balloon)
{
	var new_x = Math.floor(Math.random() * Math.floor(WIDTH));
	var new_y = HEIGHT;
	createjs.Tween.get(balloon).to({alpha:1}, 1000).call(handleComplete, [balloon], this);
}

function handleComplete(balloon)
{
	stage.removeChild(balloon);
}

function spawnStars(){
	if(gameOver == false){
		setInterval(function temp(){
		var randomSpot = Math.floor(Math.random() * Math.floor(4));
		var star = new PIXI.Sprite(PIXI.Texture.fromFrame("star.png"));
		star.anchor.set(0.5);
		
		if(randomSpot == 0){
			star.position.set(70, 20);
		}
		
		if(randomSpot == 1){
			star.position.set(220, 20);
		}
		
		if(randomSpot == 2){
			star.position.set(380, 20);
		}
		
		if(randomSpot == 3){
			star.position.set(540, 20);
		}
		
		star.interactive = true;
		star.on('mousedown', starEventHandler);
		stage.addChild(star);
		dropStar(star);
		
		}, 700);
	}

}

function dropStar(star){
	setTimeout(function(){
		if(star.position.x > HEIGHT){
			stage.removeChild(star);
			return;
		}
		
		requestAnimationFrame(function (temp)
		{
			dropStar(star);
		});
		
		star.position.y += 10;

	}, 1000/fps);
	
	
}

function starEventHandler()
{
	/*if (e.keyCode == 87) { // W key
        if(this.position.y < HEIGHT 
			&& this.position.y > HEIGHT/2 + 130
			&& this.position.x < 260
			&& this.position.x > 150){
		score += 10;
		scoreText.text = "Score: " + score;
		stage.removeChild(this);
		}
	}
	
	if (e.keyCode == 83) { // S key
		if(this.position.y < HEIGHT 
			&& this.position.y > HEIGHT/2 + 130
			/*&& this.position.x > 300
			&& this.position.x < 450){
		score += 10;
		scoreText.text = "Score: " + score;
		stage.removeChild(this);
		}
	}
	if (e.keyCode == 65) { // A key
		if(this.position.y < HEIGHT 
			&& this.position.y > HEIGHT/2 + 130
			/*&& this.position.x > 0
			&& this.position.x < 130*{
		score += 10;
		scoreText.text = "Score: " + score;
		stage.removeChild(this);
		}
	}
	if (e.keyCode == 68) { // D key
		if(this.position.y < HEIGHT 
			&& this.position.y > HEIGHT/2 + 130
			/*&& this.position.x > 470
			&& this.position.x < WIDTH){
		score += 10;
		scoreText.text = "Score: " + score;
		stage.removeChild(this);
		}
	}*/
	
	if(this.position.y < HEIGHT && this.position.y > HEIGHT/2 + 130)
	{
		score += 10;
		scoreText.text = "Score: " + score;
		stage.removeChild(this);
	}
	
}	

function renderStage(){
	requestAnimationFrame(renderStage);
	renderer.render(stage);
}

renderStage();
startMainMenu();