class Game {
  constructor(){}

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
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
      car1 = createSprite(displayWidth/2 - 400, displayHeight - 150);
      car2 = createSprite(displayWidth/2  - 200, displayHeight - 150);
      car3 =createSprite(displayWidth/2,displayHeight -150);
      car4 = createSprite(displayWidth/2 + 200 , displayHeight - 150);
      cars=[car1,car2,car3,car4]
    }
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var i=0
      var y=0
      for(var plr in allPlayers){
        y=displayHeight-150-allPlayers[plr].distance
        cars[i].y = y  
        if (plr === "player" + player.index){
          cars[i].shapeColor = "red"
          camera.position.x = displayWidth/2
          camera.position.y = cars[i].y
        }
        else
          cars[i].shapeColor = "black"
        i++
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
}
