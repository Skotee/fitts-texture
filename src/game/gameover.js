function GameOver() {
  var oGame;

  this.setup = function() {
    // find a different scene using the SceneManager
    oGame = this.sceneManager.findScene(Game).oScene;
  };

  this.draw = function() {
    background(22), fill('white');
    textSize(map(sin(frameCount * 0.1), 0, 1, 24, 32));
    textAlign(CENTER);
    text('Koniec', width / 2, height / 2);
    text('Dziękuję za wzięcie udziału w teście', width / 2, height / 2 + 40);

    textSize(20);
    text('Radosław Wojaczek, praca magisterska', width / 2, height - 40);
  };

  this.keyPressed = function() {
    this.sceneManager.showScene(Intro);
  };

  this.mousePressed = function() {
    this.sceneManager.showScene(Intro);
  };
}
