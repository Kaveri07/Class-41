var canvas, backgroundImage;
var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;
var rank, medalBackImage, carBackImage;
var form, player, game, x2;
var name1, name2, name3, name4;
var cars, car1, car2, car3, car4;
var car2Image,car1Image,car3Image,car4Image,track1Image, goldImage, silverImage, bronzeImage,grass;
var right, left, engineSound, music;

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}

function preload() {
  car1Image = loadImage("images/car1.png");
  car2Image = loadImage("images/car2.png");
  car3Image = loadImage("images/car3.png");
  car4Image = loadImage("images/car4.png");
  trackImage = loadImage("images/track.jpg");
  goldImage = loadImage("images/gold.png");
  silverImage = loadImage("images/silver.png");
  bronzeImage = loadImage("images/bronze.png");
  medalBackImage = loadImage("images/backForMedal.jpeg");
  carBackImage = loadImage("images/carWallpaper.jpeg");
  grass = loadImage("images/grass.jpeg");
  engineSound = loadSound("engine.mp3");
  music = loadSound("music.mp3");
}

function draw(){
  
  if(playerCount === 4 && gameState === 0){
    game.update(1);
    music.play();
  }

  if(gameState === 1){
    clear();
    engineSound.stop();
    game.play();
    
  }

  if(gameState===2){
    background(medalBackImage);
    if(rank===4) {
      game.end();
    } else {
      textSize(25);
      textAlign(CENTER);
      fill(0);
      textFont("georgia");
      text("Wait for the rest of the players to finish...",displayWidth/2,displayHeight/2);
    }
  } 
}
