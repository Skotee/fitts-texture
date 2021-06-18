function Intro() {
  let ball = { x: width / 2, y: height / 1.5, size: 150 };
  let flag = false;
  let slider1;
  let button1;
  let checkbox1;
  let radio1;
  let select1;
  let entry1;

  this.draw = function() {
    background('white'), angleMode(DEGREES);
    drawIntroScreen();
  };

  this.setup = function() {
    const appScreen = document.querySelector('#pokequiz-app');
    const disTemplate = document.getElementById('dis');
    appScreen.innerHTML = disTemplate.innerHTML;
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

    // button = createButton('submit');
    // button.position(input.x + input.width, 65);
    // button.mousePressed(greet);

    // greeting = createElement('h2', 'what is your name?');
    // greeting.position(20, 5);

    // textAlign(CENTER);
    // textSize(50);
    // const name = input.value();
    // greeting.html('Cześć ' + name + '!');
    // input.value('');

    text('W tym eksperymencie czekają na ciebie plansze, w każdej z nich musisz', width / 2, 100);
    text(
      'kliknąć kursorem myszy na szary przycisk znajdujący się na obwodzie koła,',
      width / 2,
      130
    );
    text('a następnie możliwie jak najszybciej na następny przycisk', width / 2, 160);
    text('', width / 2, 190);
    fill('green');
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
