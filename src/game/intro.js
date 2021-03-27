function Intro() {
  let ball = { x: width / 2, y: height / 1.5, size: 150 };
  let flag=false;

  this.draw = function() {
    background('white'), angleMode(DEGREES);
    drawIntroScreen();
  };

  this.mousePressed = function() {
    if (dist(mouseX, mouseY, ball.x, ball.y) < ball.size / 2) {
      this.sceneManager.showScene(Game);
    }
  };

  function drawIntroScreen() {
    textSize(30);
    textAlign(CENTER);
    fill('purple');
    text('Prawo Fittsa', width / 2, 50);
    textSize(20);
    fill('black');

    text(
      'W tym eksperymencie czekają na ciebie 34 rundy, w każdej z nich',
      width / 2,
      100
    );
    text(
      'musisz kliknąć kursorem myszy na białym przycisk znajdujący się pośrodku',
      width / 2,
      130
    );
    text('ekranu, a następnie możliwie jak najszybciej na szary okrąg,', width / 2, 160);
    text('który pokaże się natychmiastowo po kliknięciu na wspomniany biały', width / 2, 190);
    fill('green');
    text('Eksperyment trwa łącznie około pół minuty', width / 2, 280);
    fill('orange');
    text('Proszę o użycie myszki do realizacji tego eksperymentu', width / 2, 320);

    var sizeFactor = 1 + cos(2 * frameCount) * 0.3;
    textSize(sizeFactor * 30);
    fill('Black');
    text('Powodzenia!', width / 2, height - 50);
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

    textSize(18);
    fill(color);
    text('ZACZNIJ\nEKSPERYMENT', width / 2, height / 1.5 - 10);
  }
}
