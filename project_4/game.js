var gameport = document.getElementById("gameport");

// Frame init
var WIDTH = 1000;
var HEIGHT = 400;
var renderer = PIXI.autoDetectRenderer({width: WIDTH, height: HEIGHT, backgroundColor: 0x1a52ff});
gameport.appendChild(renderer.view);
var stage = new PIXI.Container();
var first_played = false;

/// Menu Stage ////////////////////////
var menuStage = new PIXI.Container();
stage.addChild(menuStage);
var menuBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
menuStage.addChild(menuBackground);

// Add play Button
var playButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-play.png"));
playButton.anchor.set(0.5);
playButton.position.set(WIDTH/2,HEIGHT/4);
playButton.interactive = true;
playButton.buttonMode = true;
playButton.on('mousedown', playButtonHandler);
menuStage.addChild(playButton);

// Handles mouse click on play button
function playButtonHandler(e)
{
  stage.removeChild(winStage);  // Get rid of win stage in case this is the 2nd+ playthrough
  stage.removeChild(menuStage); // leave main menu
  stage.addChild(gameStage);    // Go to game stage

  if(first_played == false)
  {
    PIXI.loader
	.add("Assets/Character/char_spritesheet.json")
	.load(startGame);
  }
  else if(first_played == true)
  {
    startGame();
  }
}

// Add instructions Button
var instrButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-instructions.png"));
instrButton.anchor.set(0.5);
instrButton.position.set(WIDTH/2,2*HEIGHT/4);
instrButton.interactive = true;
instrButton.buttonMode = true;
instrButton.on('mousedown', instrButtonHandler);
menuStage.addChild(instrButton);

// Handles mouse click on instructions button
function instrButtonHandler(e)
{
  stage.removeChild(menuStage); // Leave main menu
  stage.addChild(instrStage);   // Go to instructions menu
}

// Add credits Button
var creditButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-credits.png"));
creditButton.anchor.set(0.5);
creditButton.position.set(WIDTH/2,3*HEIGHT/4);
creditButton.interactive = true;
creditButton.buttonMode = true;
creditButton.on('mousedown', creditButtonHandler);
menuStage.addChild(creditButton);

// Handles mouse click on credits button
function creditButtonHandler(e)
{
  stage.removeChild(menuStage); // Leave main menu
  stage.addChild(creditStage);  // Go to credits screen
}
/// END of Menu stage /////////////////

/// Instructions Stage ////////////////
var instrStage = new PIXI.Container();
var instrBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
instrStage.addChild(instrBackground);
var returnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
returnButton.anchor.set(1.0);
returnButton.position.set(WIDTH, HEIGHT);
returnButton.interactive = true;
returnButton.buttonMode = true;
returnButton.on('mousedown', returnButtonHandler);
instrStage.addChild(returnButton);

// Instructions text
var instrText = new PIXI.Text('Use the "a" and "d" keys to move \nleft and right. \nUse the "w" key to \njump over obstacles.\n\nReach the flag to get to the next level. \nFinish all 3 levels to win!');
instrText.anchor.set(0.5);
instrText.position.set(WIDTH/2,HEIGHT/2-50);
instrStage.addChild(instrText);
/// END of instrucions Stage //////////

/// Credits Stage ////////////////////
var creditStage = new PIXI.Container();
var creditBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
creditStage.addChild(creditBackground);
var returnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
returnButton.anchor.set(1.0);
returnButton.position.set(WIDTH, HEIGHT);
returnButton.interactive = true;
returnButton.buttonMode = true;
returnButton.on('mousedown', returnButtonHandler);
creditStage.addChild(returnButton);

// Credits text
var creditText = new PIXI.Text('Riley McWilliams\nSamantha Earl\nWyatt Evans\nGwen Morris');
creditText.anchor.set(0.5);
creditText.position.set(WIDTH/2,HEIGHT/2);
creditStage.addChild(creditText);
/// END of Credits Stage //////////////

/// Win Stage /////////////////////////
var winStage = new PIXI.Container();
var winBackground = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Backgrounds/background-menu.png"));
winStage.addChild(winBackground);
var returnButton = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Buttons/button-return.png"));
returnButton.anchor.set(1.0);
returnButton.position.set(WIDTH, HEIGHT);
returnButton.interactive = true;
returnButton.buttonMode = true;
returnButton.on('mousedown', returnButtonHandler);
winStage.addChild(returnButton);

// Win text
var winText = new PIXI.Text('You win!!!');
winText.anchor.set(0.5);
winText.position.set(WIDTH/2,HEIGHT/2);
winStage.addChild(winText);
/// END of win Stage //////////////////

// Handles mouse click on return button
function returnButtonHandler(e)
{
  stage.removeChild(instrStage);  // Leave instructions menu
  stage.removeChild(winStage);    // Leave win screen
  stage.removeChild(creditStage); // Leave credits screen
  stage.addChild(menuStage);      // Go to main menu
}

/// Game Stage ////////////////////////
var gameStage = new PIXI.Container();
var levelOne = new PIXI.Container();
var levelTwo = new PIXI.Container();
var levelThree = new PIXI.Container();
var TILE_HEIGHT = 50;
var TILE_WIDTH = 50;
var skyTileTex = PIXI.Texture.fromImage("Assets/Tiles/sky_tile.png");   // 0 in the tileMap array
var grassTileTex = PIXI.Texture.fromImage("Assets/Tiles/grass_tile.png"); // 1 in the tileMap array
var dirtTileTex = PIXI.Texture.fromImage("Assets/Tiles/dirt_tile.png");   // 2 in the tileMap array
var cloudTileTex = PIXI.Texture.fromImage("Assets/Tiles/cloud_tile.png");   // 3 in the tileMap array
var levelNum = 1;
var tileMap1 =
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2],
    [2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    [2, 0, 0, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 0, 0, 2, 2, 2, 0, 0, 2, 2, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
    [2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
    [2, 0, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 2, 2],
    [2, 0, 0, 2, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 0, 0, 3, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]];

var tileMap2 =
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2, 2],
    [2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2],
    [2, 0, 0, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2],
    [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 1, 1, 1, 0, 0, 0, 3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
    [2, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 2, 2],
    [2, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 0, 0, 3, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]];

var tileMap3 =
    [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 2, 2, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 3, 0, 0, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 1, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 3, 1, 1, 1, 1, 0, 0, 0, 2, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 1, 2, 2, 2, 2, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 2],
    [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
    [2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
    [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]];
// Collision Detection variables
var tileSprites = [];
//var collision_detected_h = false;
//var collision_detected_v = false;
var collision_detected = false;

// Used to save the top right tile to calculate flag placement.
var topRightTile;

// Iterates starting from the bottom left to the top right.
// To make the map bigger, add rows to the top and columns to the right.
function draw_map(tileMap, levelStage)
{
  tileSprites = [];
  var cur_x = 0; // Keep track of current x position
  var cur_y = HEIGHT; // Keep track of current y position

  for(var i = tileMap.length-1; i >= 0; i--) // Iterate through y
  {
    var subArray = tileMap[i];  // Save row

    for(var j = 0; j < subArray.length; j++) // Iterate through x
    {
      if(subArray[j] == 0)
      {
        var newTile = new PIXI.Sprite(skyTileTex);  // Load sprite
        newTile.anchor.set(0, 1);                   // Set anchor
        newTile.position.set(cur_x, cur_y);         // Set position
        levelStage.addChild(newTile);                // Add to stage
      }
      if(subArray[j] == 1) // Draw grass
      {
        var newTile = new PIXI.Sprite(grassTileTex);  // Load sprite
        newTile.anchor.set(0, 1);                     // Set anchor
        newTile.position.set(cur_x, cur_y);           // Set position
        levelStage.addChild(newTile);                  // Add to stage
      }
      if(subArray[j] == 2) // Draw dirt
      {
        var newTile = new PIXI.Sprite(dirtTileTex); // Load sprite
        newTile.anchor.set(0, 1);                   // Set anchor
        newTile.position.set(cur_x, cur_y);         // Set position
        levelStage.addChild(newTile);                // Add to stage
      }
	    if(subArray[j] == 3) // Draw cloud
      {
        var newTile = new PIXI.Sprite(cloudTileTex);  // Load sprite
        newTile.anchor.set(0, 1);                     // Set anchor
        newTile.position.set(cur_x, cur_y);           // Set position
        levelStage.addChild(newTile);                  // Add to stage
      }
      cur_x += TILE_WIDTH;  // Increment x position

      // Storing all tiles that can be collided with
      if(subArray[j] != 0 && subArray[j] != 3) // Can't collide with sky or cloud tiles
      {
        tileSprites.push(newTile);
      }

      if(i == 0 && j == subArray.length-1) // If top left tile
      {
        topRightTile = newTile;
      }
    }
    cur_x = 0;            // Reset x position
    cur_y -= TILE_HEIGHT; // Increment y position
  }
  
  gameStage.addChild(levelStage);
}
draw_map(tileMap1, levelOne);

// Adds ending flag to stage
var endFlag = new PIXI.Sprite(PIXI.Texture.fromImage("Assets/Tiles/flag.png"));
endFlag.anchor.set(1, 0);
endFlag.position.set(topRightTile.x, topRightTile.y);
//endFlag.position.set(1000, 200); // For testing
gameStage.addChild(endFlag);
/// End of game stage /////////////////


/// Player ////////////////////////////
var character = new PIXI.Container();
character.height = 100;
character.width = 100;
character.pivot.set(50, 50);
character.position.set(WIDTH/2, HEIGHT - 150);

/// Score text ///////////////////////
var scoreText = new PIXI.Text("Level: " + levelNum);
scoreText.anchor.x = 0;
scoreText.anchor.y = 1;
scoreText.position.x = 0;
scoreText.position.y = HEIGHT;
levelOne.addChild(scoreText); 

var gamePlaying = false;
var sheet;

function startGame()
{
	if(first_played == false) // Execute this branch to initialize the game state on the first run
	{
		// Play background music
        PIXI.sound.Sound.from({
            url: 'Assets/Sounds/background_music2.mp3',
            autoPlay: true,
            volume: .5,
            loop: true,
            complete: function() {
                console.log('Sound finished');
            }
        });
	    sheet = PIXI.Loader.shared.resources["Assets/Character/char_spritesheet.json"].spritesheet;
	    first_played = true;
        levelOne.addChild(character);
        runIdle();
        loadMonsters(1);
        makeMonstersMove();
        winText.text = 'You win!!!';
        gamePlaying = true;
	}
	else // Execute this branch on all subsequent runs
	{
        makeMonstersMove();
        winText.text = 'You win!!!';
        gamePlaying = true;
	}
}

//var idle = true;
var idle, runner;
var runnerRight, runnerLeft;
var vx = 0; // velocity in the x direction
var vy = 0; // velocity in the y direction
var runnerOnStage = false;
var jumping = false;
var up, left, right;

// Runs the idle animation.
function runIdle()
{
	idle = new PIXI.AnimatedSprite(sheet.animations["idle"]);
	//idle.position.set(WIDTH/2, HEIGHT - 150);
	//idle.anchor.set(0.5);
	idle.animationSpeed = 0.1;
	character.addChild(idle);
	idle.play();
	
}
var enemies = [];
var newPos1_1, newPos2_1, newPos3_1, newPos1_2, newPos2_2, newPos3_2, originalPos1, originalPos2, originalPos3;

function loadMonsters(lvl)
{
	// Load 3 monster sprites and play the animation on each of them
    for (var i = 0; i < 3; i++)
    {
        var monster = new PIXI.Container();
        monster.height = 100;
        monster.width = 100;
        monster.pivot.set(50, 50);
		
		// There are 2 available sprites for monster - oni1 and oni2
        var oni = new PIXI.AnimatedSprite(sheet.animations["oni"]);
        oni.animationSpeed = 0.05;
        monster.addChild(oni);
        oni.play();
        enemies[i] = monster;
    }
	// Set monsters to certain positions for level 1
	if(lvl == 1)
	{		
		enemies[0].position.set(1100, HEIGHT - 150);
		enemies[1].position.set(1700, HEIGHT - 150);
		enemies[2].position.set(550, -600);	
			
		levelOne.addChild(enemies[0]);
		levelOne.addChild(enemies[1]);
		levelOne.addChild(enemies[2]);
	}
	// Set monsters to certain positions for level 2
	if(lvl == 2)
	{		
		enemies[0].position.set(1600, -200);
		enemies[1].position.set(900, -600);
		enemies[2].position.set(400, -600);
		
		levelTwo.addChild(enemies[0]);
		levelTwo.addChild(enemies[1]);
		levelTwo.addChild(enemies[2]);

	}
	// Set monsters to certain positions for level 3
    if(lvl == 3)
	{
		enemies[0].position.set(1650, -600);
		enemies[1].position.set(400, -300);
		enemies[2].position.set(1100, -600);

		levelThree.addChild(enemies[0]);
		levelThree.addChild(enemies[1]);
		levelThree.addChild(enemies[2]);

	}
   //enemies[2].position.set();
	
	// Getting 2 positions for the monster to pace between in makeMonstersMove()
	// Finding position 1
    newPos1_1 = enemies[0].position.x - 100;
    newPos2_1 = enemies[1].position.x - 100;
    newPos3_1 = enemies[2].position.x - 100;
	
	// Finding position 2
    newPos1_2 = enemies[0].position.x + 100;
    newPos2_2 = enemies[1].position.x + 100;
    newPos3_2 = enemies[2].position.x + 100;

	// Save original positions in case the game is reloaded
    originalPos1 = enemies[0].position.x;
    originalPos2 = enemies[1].position.x;
    originalPos2 = enemies[2].position.x;
}// end loadMonsters

/*var remove_monsters(levelStage)
{
	levelStage.removeChild(enemies[0]);
	levelStage.removeChild(enemies[1]);
	levelStage.removeChild(enemies[2]);
}
*/


var goLeft1 = true;
var goLeft2 = true;
var goLeft3 = true;

// Makes monsters walk back and forth between two points
function makeMonstersMove()
{
    setTimeout(function () {
		if(gamePlaying){
			for (var i = 0; i < 3; i++) {
				if (character.position.x <= enemies[i].position.x + 50 &&
					character.position.x >= enemies[i].position.x - 50 &&
					character.position.y <= enemies[i].position.y + 50 &&
					character.position.y >= enemies[i].position.y - 50) {

					character.position.set(WIDTH / 2, HEIGHT - 150);
					stage.removeChild(gameStage);
					stage.addChild(winStage);
					winText.text = "Rip you dude";
					gamePlaying = false;
					return;
				} // end if character in monster hit box
			}// end for loop

			requestAnimationFrame(function () {
				makeMonstersMove();
			});
			
			// Checking if each enemy has hit the left-most part of their walking zone
			if (enemies[0].position.x == newPos1_1) {
				goLeft1 = false;
				enemies[0].scale.x = -1;
			}
			if (enemies[1].position.x == newPos2_1) {
				goLeft2 = false;
				enemies[1].scale.x = -1;
			}
			if (enemies[2].position.x == newPos3_1) {
				goLeft3 = false;
				enemies[2].scale.x = -1;
			}
		
			// Checking if each enemy has hit the right-most part of their walking zone
			if (enemies[0].position.x == newPos1_2) {
				goLeft1 = true;
				enemies[0].scale.x = 1;
			}
			if (enemies[1].position.x == newPos2_2) {
				goLeft2 = true;
				enemies[1].scale.x = 1;
			}
			if (enemies[2].position.x == newPos3_2) {
				goLeft3 = true;
				enemies[2].scale.x = 1;
			}
			
			// Make monsters go left or right
			if (goLeft1) {
				enemies[0].position.x -= 1;
			}
			else {
				enemies[0].position.x += 1;
			}

			if (goLeft2) {
				enemies[1].position.x -= 1;
			}
			else {
				enemies[1].position.x += 1;
			}

			if (goLeft3) {
				enemies[2].position.x -= 1;
			}
			else {
				enemies[2].position.x += 1;
			}
		
		} // end if gamePlaying
		
    }//end function()
    )// end setTimeout
} // end makeMonstersMove
// Handles key down event
function keyDownHandler(e)
{
  if(e.keyCode == 87 || e.keyCode == 65 ||e.keyCode == 68)
  {
  	if(runnerOnStage == false){
		//runner = new PIXI.AnimatedSprite(sheet.animations["running"]);	
  		runnerLeft = new PIXI.AnimatedSprite(sheet.animations["runningleft"]);
		runnerRight = new PIXI.AnimatedSprite(sheet.animations["running"]);
  		//runner.position.set(WIDTH/2, HEIGHT - 150);
  		//runner.anchor.set(0.5);
  		runnerLeft.animationSpeed = 0.1;
		runnerRight.animationSpeed = 0.1;
  		runnerOnStage = true;
  	}
	
    // Switch to running animation
    character.removeChild(idle);
	
  	if(e.keyCode == 87 && jumping == false) // W key
    {
		up = true;
		// If 'a' is being pressed at the same time, play the runningleft anim
		if(left)
		{
			character.addChild(runnerLeft);
			character.removeChild(runnerRight);
			runnerLeft.play();
		}
		// else, play the default running anim
		else
		{
			character.addChild(runnerRight);
			character.removeChild(runnerLeft);
			runnerRight.play();
		}
  	}
	// Going left - play runningleft
    if(e.keyCode == 65) // A
    {
		left = true;
		character.addChild(runnerLeft);
		runnerLeft.play();
	  //runner.scale.x = -1;

    }
	// Going right - play running (default - goes right). 
    if(e.keyCode == 68) // D
    {
		right = true;
		character.addChild(runnerRight);
		runnerRight.play();
	  //runner.scale.x = 1;
  	}
	
  }
}

// Handles key up event
function keyUpHandler(e)
{
  if(e.keyCode == 87) // W
  {
    up = false;
  }
  if(e.keyCode == 65) // A key
  {
    left = false;

    // Switch to idle animation
    character.removeChild(runnerLeft);
	character.removeChild(runnerRight);
    character.addChild(idle);
  	idle.play();
  }

  if(e.keyCode == 68) // D key
  {
    right = false;

    // Switch to idle animation
    character.removeChild(runnerLeft);
	character.removeChild(runnerRight);
    character.addChild(idle);
  	idle.play();
  }
}

document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);


// A function for handling collision detection
var collision_counter = 0;
function detectCollision()
{
    var num = 0;
    if(runnerOnStage){
        // Iterate over sprites that can be collided with
        for(num = 0; num < tileSprites.length; num ++){
            if(
            (character.position.y + 70 - character.height/2) + (character.height/2) > tileSprites[num].position.y - 25
            && (character.position.y + 70 - character.height/2) < (tileSprites[num].position.y - 25) + 25
            && (character.position.x - character.width/2) + (character.width/2) > tileSprites[num].position.x - 25
            && (character.position.x - character.width/2) < (tileSprites[num].position.x - 25) + 25)
            {
                collision_detected = true;
                collision_counter++;
            }
            if(
            (character.position.y - character.height/2) + (character.height/2) > tileSprites[num].position.y - 25
            && (character.position.y - character.height/2) < (tileSprites[num].position.y - 25) + 25
            && (character.position.x - character.width/2) + (character.width/2) > tileSprites[num].position.x - 25
            && (character.position.x - character.width/2) < (tileSprites[num].position.x - 25) + 25)
            {
                collision_detected = true;
                collision_counter++;
            }
        }
    }
}

// Controls player movement based on keyboard input
function update_movement()
{
  if(up && jumping == false) // W key
  {
    vy -= 25; // Change this for jump height
    jumping = true;
  }
  if(left) // A key
  {
    vx -= 2;
    //character.scale.x = -1; // Make character face left
	//character.childNodes.scale.x = -1;
  }
  if(right) // D key
  {
    vx += 2;
    //character.scale.x = 1; // Make character face right
	//character.childNodes.scale.x = 1;
  }

  vy += 2;  // gravity

  // Horizontal Handling
  character.position.x += vx; // Make character move left or right

  detectCollision(); // Check for Collision Detection
  if(collision_detected) // Horizontal Collision Detection
  {
    character.position.x -= vx; // Reset Movement
    collision_detected = false; // Reset Flag
  }

  // Vertical Handling
  character.position.y += vy; // Make character move up

  detectCollision(); // Check for Collision Detection
  if(collision_detected) // Vertical Collision Detection
  {
    character.position.y -= vy; // Reset Movement
    vy = 0;                     // Stop downward velocity
    collision_detected = false  // Reset Flag
    if(character.position.y < HEIGHT - 150)
    {
        jumping = false // Allow for jumping from platforms
    }
  }

  //console.log(character.position.x + " " + character.position.y);
  vx *= 0.8; // friction

  //console.log(character.position.y);

  // Makes sure player doesn't fall through the floor
  if(character.y > HEIGHT-150)
  {
    jumping = false;
    character.y = HEIGHT - 150;
    vy = 0;
  }

  collision_counter = 0;
}
/// End of Player /////////////////////

// Moves the stage with charcater.
function update_camera()
{
  gameStage.position.x = WIDTH/2 - character.x;
  gameStage.position.y = HEIGHT - 50 - character.y - character.height;
  scoreText.position.x = character.x - WIDTH/2;
  scoreText.position.y = character.y - HEIGHT/2;
  
}

// Checks if character has hit a flag.
function check_win()
{
  if(character.y <= endFlag.y+100 &&
     character.y >= endFlag.y &&
     character.x >= endFlag.x-150 &&
     character.x <= endFlag.x)
     {
	   levelNum++;
	   // Load level 2
	   
	   if(levelNum == 2)
	   {
	       levelOne.removeChildren();
		   gameStage.removeChild(levelOne);
		   draw_map(tileMap2, levelTwo);
		   character.position.set(WIDTH/2, HEIGHT - 150);
		   loadMonsters(2);
		   levelTwo.addChild(character);
		   levelTwo.addChild(scoreText);
		   scoreText.text = "Level: " + levelNum;
		   gameStage.addChild(endFlag);
	   }
	   // Load level 3
	   else if(levelNum == 3)
	   {
	       levelTwo.removeChildren();
	       gameStage.removeChild(levelTwo);
		   draw_map(tileMap3, levelThree);
		   character.position.set(WIDTH/2, HEIGHT - 150);
		   loadMonsters(3);
		   levelThree.addChild(character);
		   levelThree.addChild(scoreText);
		   scoreText.text = "Level: " + levelNum;
		   gameStage.addChild(endFlag);
	   }
	   // Show end screen
	   else
	   {		   
		   character.position.set(WIDTH/2, HEIGHT - 150);
		   stage.removeChild(gameStage);
		   stage.addChild(winStage);
	   }
     }
}

function animate()
{
    update_movement();
    update_camera();
    check_win();
    requestAnimationFrame(animate);
    renderer.render(stage);
}
animate();
