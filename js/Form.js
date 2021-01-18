class Form {

  constructor() {
    this.input = createInput("Name");
    this.button = createButton('Play');
    this.greeting = createElement('h2');
    this.title = createElement('h2');
    this.reset = createButton("Restart");
    
  }
  hide(){
    this.greeting.hide();
    this.button.hide();
    this.input.hide();
    this.title.hide();
  }

  display(){
    this.title.html("Car Racing Game");
    this.title.position(displayWidth/2-250, 0);
    this.title.style('font-size', '70px');
    this.title.style('color', 'blue');
    this.input.style('width', '200px');
    this.input.style('height', '20px');
    this.input.style('background', 'pink');
    this.button.style('width', '200px');
    this.button.style('height', '20px');
    this.button.style('background', 'pink');
    this.reset.style('width', '200px');
    this.reset.style('height', '20px');
    this.reset.style('background', 'pink');
    this.reset.position(displayWidth-300,50);
    this.input.position(displayWidth/2 - 100 , displayHeight/2 - 80);
    this.button.position(displayWidth/2-100, displayHeight/2-40);

    this.button.mousePressed(()=>{
      this.input.hide();
      this.button.hide();
      player.name = this.input.value();
      playerCount+=1;
      player.index = playerCount;
      player.update();
      player.updateCount(playerCount);
      this.greeting.html("Hello " + player.name);
      this.greeting.position(displayWidth/2-250, displayHeight/4);
      this.greeting.style('font-size', '70px');
      this.greeting.style('color', 'blue');
      engineSound.play();
    });

    this.reset.mousePressed(()=>{
      player.updateCount(0);
      player.updateRank(0);
      game.update(0);
      database.ref("/").update({
        players:null
      })
      game = new Game();
      game.start();
      background(carBackImage);
      car1.remove();
      car2.remove();
      car3.remove();
      car4.remove();
      music.stop();
    })
  }
}
