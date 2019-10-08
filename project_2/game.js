/* Samantha Earl
* CS 413
* Project 2 - Puzzles
*/

// Initialize and load stage
var gameport = document.getElementById("gameport");
var WIDTH = 600;
var HEIGHT = 550;
var renderer = PIXI.autoDetectRenderer({ width: WIDTH, height: HEIGHT, backgroundColor: 0x3344ee});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();
PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

// All necessary variables throughout game
var startButton, instructionsButton, backButton;
var mainMenuBackground, instructionsPage, gameBackground;
var star, music;

var beginStar = false;



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
	
	// Position start button
	startButton.anchor.x = 0.5;
	startButton.anchor.y = 0.5;
	startButton.position.x = WIDTH/2;
	startButton.position.y = 180;
	
	// Position instructions button
	instructionsButton.anchor.x = 0.5;
	instructionsButton.anchor.y = 0.5;
	instructionsButton.position.x = WIDTH/2;
	instructionsButton.position.y = 360;
	
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
function startButtonHandler(e){
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
	
	animateDancer();
	
}

// Loads dancing sprite and loops through 3 frames
// NOTE: FIX LATER
function animateDancer(){
	let sheet = PIXI.Loader.shared.resources["Assets/dancer_sprite_sheet.json"].spritesheet;
	dancer = new PIXI.AnimatedSprite(sheet.animations["dancer"]);
}

// Load stars
/*if(beginStar == true)
{
	setInterval(function loadStars(){
		// 0 for a, 2 for w, 3 for s, 4 for d
		var randomSpot = Math.floor(Math.random() * Math.floor(4));
		
		if(randomSpot == 0)
		{
			star.position.x = 100;
			var new_x = 150;
			var new_y = star.position.y + 10;
		}
		if(randomSpot == 1)
		{
			star.position.x = 250;
			var new_x = 150;
			var new_y = star.position.y + 10;
		}
		
		if(randomSpot == 2)
		{
			star.position.x = 400;
			var new_x = 150;
			var new_y = star.position.y + 10;	
		}
		
		if(randomSpot == 3)
		{
			star.position.x = 550;
			var new_x = 150;
			var new_y = star.position.y + 10;
		}
	}, 1000);	
}*/
function renderStage(){
	requestAnimationFrame(renderStage);
	renderer.render(stage);
}

renderStage();
startMainMenu();

