class Game {
  constructor(){
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      background(carBackImage);
      music.stop();
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    right = createSprite(1190, 500, 30, 10000);
    left = createSprite(260, 500, 30, 10000);
    car1 = createSprite(100,200);
    car1.addImage(car1Image);
    car2 = createSprite(300,200);
    car2.addImage(car2Image);
    car3 = createSprite(500,200);
    car3.addImage(car3Image);
    car4 = createSprite(700,200);
    car4.addImage(car4Image);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
    background(grass);
    right.visible = false;
    left.visible = false;
    image(trackImage, 0,- displayHeight*4, displayWidth, displayHeight*5);
    Player.getPlayerInfo();
    player.getRank();
    
    if(allPlayers !== undefined){
      var index = 0;
      var x = 190;
      var y;
      
      for(var plr in allPlayers){
        index = index + 1 ;
        x = x + 220;
        y = displayHeight - allPlayers[plr].distanceY;
        x2 = x + allPlayers[plr].distanceX;
        cars[index-1].x = x2;
        cars[index-1].y = y;

        if(cars[index-1].isTouching(left)) {
          player.distanceX += 10;
        }
        if(cars[index-1].isTouching(right)) {
          player.distanceX -= 10;
        }

        if(index === player.index){
          fill("red");
          ellipse(x2, y, 60, 60);
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }

        fill("white")
        textSize(15);
        textFont("georgia");
        textAlign(CENTER);
        text(allPlayers[plr].name, x2, y+70);
      }
    

    if(player.index !== null){
      if(keyIsDown(UP_ARROW) ) {
        player.distanceY +=10
        player.update();
      }
      if(keyIsDown(LEFT_ARROW)) {
          player.distanceX -=10;
          player.update();
      }
      if(keyIsDown(RIGHT_ARROW)) {
          player.distanceX +=10;
          player.update();
      }
    }
  }
    
    if(player.distanceY >= 4250) {
      camera.position.x = 720;
      camera.position.y = 810;
      gameState=2;
      rank++;
      player.rank = rank;
      player.update();
      player.updateRank(rank);
    }
    
    car1.bounceOff(car2);
    car1.bounceOff(car3);
    car1.bounceOff(car4);
    car2.bounceOff(car3);
    car2.bounceOff(car4);
    car3.bounceOff(car4);
    drawSprites();
  }

  end(){
    image(goldImage,displayWidth/2-150,displayHeight/2,350,700);
    image(silverImage,displayWidth/2-550,displayHeight/2, 350,600);
    image(bronzeImage,displayWidth/2+250,displayHeight/2, 350,600);
    fill("black");
    textSize(25);
    textFont("times");
    textAlign(CENTER);
    if(player.rank===1){
      text(player.name + ", you won "+player.rank+"st place!!!",displayWidth/2,displayHeight/2-20);
    } else if(player.rank===2) {
        text(player.name + ", you won "+player.rank+"nd place!!!",displayWidth/2,displayHeight/2-20);
    } else if(player.rank===3) {
        text(player.name + ", you won "+player.rank+"rd place!!!",displayWidth/2,displayHeight/2-20);
    } else if(player.rank===4) {
        text(player.name + ", you won "+player.rank+"th place!!!",displayWidth/2,displayHeight/2-20);
    }
    for(var plr in allPlayers){
      if(allPlayers[plr].rank===1) {
        name1 = allPlayers[plr].name;
      } else if(allPlayers[plr].rank===2) {
        name2 = allPlayers[plr].name;
      } else if(allPlayers[plr].rank===3) {
        name3 = allPlayers[plr].name;
      } else if(allPlayers[plr].rank===4) {
        name4 = allPlayers[plr].name;
      }
    }
    text(name1,displayWidth/2,displayHeight/2+500);
    text(name2,displayWidth/2-400,displayHeight/2+450);
    text(name3,displayWidth/2+400,displayHeight/2+450);
    text("4th Place: "+name4,displayWidth/2,displayHeight/2+750);
  }
}
