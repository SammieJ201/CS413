/* Samantha Earl
* CS 413
* Project 2 - Puzzles
*/

var gameport = document.getElementById("gameport");

var WIDTH = 600;
var HEIGHT = 550;

var renderer = PIXI.autoDetectRenderer({ width: WIDTH, height: HEIGHT, backgroundColor: 0x3344ee});

gameport.appendChild(renderer.view);

var stage = new PIXI.Container();
var startButton, instructionsButton, backButton;
var mainMenuBackground, instructionsPage;

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
	
	// Add both buttons to stage
	stage.addChild(startButton);
	stage.addChild(instructionsButton);
	
}

function startButtonHandler(e){
	stage.removeChild(mainMenuBackground);
	
	
}

// This is called when the instructions button is clicked - loads intructions page and
// back button
function instructButtonHandler(e){
	// Remove background and buttons from main menu.
	stage.removeChild(mainMenuBackground);
	//stage.removeChild(startButton);
	//stage.removeChilde(instructionsButton);
	
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

function renderStage(){
	requestAnimationFrame(renderStage);
	renderer.render(stage);
}



renderStage();
startMainMenu();
