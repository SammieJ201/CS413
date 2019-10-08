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
var startButton, instructionsButton, backButton;
var mainMenuBackground, instructionsPage, gameBackground;

var beginStar = false;

// int and text display for score 
var score = 0;
var scoreText = new PIXI.Text("Score: " + score);
scoreText.anchor.x = 0;
scoreText.anchor.y = 0;
scoreText.position.set(0,0);
scoreText.style.fill = 0xffffff;

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
	
	// Position start button_sprite_sheet
	startButton.anchor.set(0.5);
	startButton.position.set(WIDTH/2, 180);
	
	// Position instructions button
	instructionsButton.anchor.set(0.5);
	instructionsButton.position.set(WIDTH/2, 360);
	
	// Set both buttons as interactable and call necessary functions
	// when clicked.
	instructionsButton.interactive = true;
	instructionsButton.on('mousedown', instructButtonHandler);
	startButton.interactive = true;
	startButton.on('mousedown', startButtonHandler);
	
	// Add both buttons to stage
	stage.addChild(startButton);
	stage.addChild(instructionsButton);
	
}


// This is called when the instructions button is clicked - loads intructions page and
// back button
function instructButtonHandler(e){
	// Remove background and buttons from main menu.
	stage.removeChild(mainMenuBackground);
	stage.removeChild(startButton);
	stage.removeChild(instructionsButton);
	
	// Load and add instructions page sprite to stage
	instructionsPage = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/instructions_page.png"));
	stage.addChild(instructionsPage);
	
	// Load back button and position
	backButton = new PIXI.Sprite(PIXI.Texture.fromFrame("back_button.png"));
	backButton.position.x = 0;
	backButton.position.y = 0;
	
	// Set back button as interactable and send to backButtonHandler when clicked.
	backButton.interactive = true;
	backButton.on('mousedown', backButtonHandler);
	
	// Add back button to stage.
	stage.addChild(backButton);
}

// Removes everything from instructions page and reloads main menu.
function backButtonHandler()
{
	stage.removeChild(instructionsPage);
	stage.removeChild(backButton);
	
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
	
	// Load and display game background
	gameBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/background.png"));
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