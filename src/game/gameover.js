function GameOver() {
  var oGame;

  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene(Game).oScene;
  };

  this.draw = function() {
    background(22), fill('white');
    textAlign(CENTER);

    textSize(24);
    textStyle(NORMAL);
    text('Thank you for participating to experiment', width / 2, height / 2 - 30);

    textSize(15);
    textStyle(ITALIC);
    text('Dziękuję za wzięcie udziału w teście', width / 2, height / 2 + 10);
    
    textSize(20);
    textStyle(NORMAL);
    text('Radosław Wojaczek, master thesis 2021', width / 2, height - 60);

    textSize(15);
    textStyle(ITALIC);
    text('Radosław Wojaczek, praca magisterska 2021', width / 2, height - 30);
  };
}
