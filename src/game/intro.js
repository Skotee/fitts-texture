function Intro() {
  let ball = { x: width / 2, y: height / 1.5, size: 150 };

  this.draw = function() {
    background('white'), angleMode(DEGREES);
    drawIntroScreen();
  };

  this.setup = function() {
    const appScreen = document.querySelector('#fittslaw-app');
    const disTemplate = document.getElementById('dis');
    appScreen.innerHTML = disTemplate.innerHTML;
  };

  this.mousePressed = function() {
    if (dist(mouseX, mouseY, ball.x, ball.y) < ball.size / 2) {
      this.sceneManager.showScene(Game);
    }
  };

  function drawIntroScreen() {
    textAlign(CENTER);
    fill('purple');
    textStyle(NORMAL);
    textSize(25);
    text('After clicking on button experiment will start', width / 2, 110);
    textSize(18);
    textStyle(ITALIC);
    text('Po kliknięciu na poniższy przycisk zacznie się eksperyment', width / 2, 160);
    textStyle(NORMAL);

 
    // text('', width / 2, 190);
    // fill('green');
    // text('Proszę o użycie myszki lub touchpada do realizacji tego eksperymentu', width / 2, 320);

    var sizeFactor = 1 + cos(2 * frameCount) * 0.3;
    textSize(sizeFactor * 30);
    fill('Black');
    text('Good luck!', width / 2, height - 50);
    textSize(sizeFactor * 15)
    textStyle(ITALIC);
    text('Powodzenia!', width / 2, height - 20);
    scale(1);

    fill(200, 200, 200);
    noStroke();
    ellipse(ball.x, ball.y, ball.size);

    var color = 'black';
    if (dist(mouseX, mouseY, ball.x, ball.y) < ball.size / 2) {
      noFill();
      strokeWeight(2);
      stroke('black');
      ellipse(ball.x, ball.y, ball.size + 10);
      noStroke();

      color = 'red';
    }
    textStyle(NORMAL);
    textSize(22);
    fill(color);
    text('START', width / 2, height / 1.5 + 5);
  }
}
