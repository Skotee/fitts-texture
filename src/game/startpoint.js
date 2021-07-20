var canvasWidth = 700;
var canvasHeight = 700;

let black,
  white,
  graycircle50,
  graycircle100,
  graycircle150,
  illusion1,
  illusion2,
  illusion3,
  illusion4,
  illusion5,
  illusion6,
  stars1,
  stars2,
  stars3,
  stars4,
  stars5,
  stars6,
  wood1,
  wood2,
  wood3,
  wood4,
  wood5,
  wood6;

function preload() {
  texture11 = loadImage('images/11.jpg');
  texture12 = loadImage('images/12.jpg');
  texture13 = loadImage('images/13.jpg');
  texture21 = loadImage('images/21.jpg');
  texture22 = loadImage('images/22.jpg');
  texture23 = loadImage('images/23.jpg');
  texture31 = loadImage('images/31.jpg');
  texture32 = loadImage('images/32.jpg');
  texture33 = loadImage('images/33.jpg');
  texture41 = loadImage('images/41.jpg');
  texture42 = loadImage('images/42.jpg');
  texture43 = loadImage('images/43.jpg');
  texture51 = loadImage('images/51.jpg');
  texture52 = loadImage('images/52.jpg');
  texture53 = loadImage('images/53.jpg');
  textureLetters = loadImage('images/litery.jpg');
  texture_break = loadImage('images/break.png');


  graycircle50 = loadImage('images/graycrop50.png');
  graycircle70 = loadImage('images/graycrop70.png');
  graycircle80 = loadImage('images/graycrop80.png');
  graycircle100 = loadImage('images/graycrop100.png');
  graycircle110 = loadImage('images/graycrop110.png');
  graycircle120 = loadImage('images/graycrop120.png');
  graycircle150 = loadImage('images/graycrop150.png');
  black = loadImage('images/black.png');
  white = loadImage('images/white.png');
}

function test(e) {
  e.preventDefault();
  window.age = document.querySelector('input[name="age"]:checked').value;
  window.screenSize = document.querySelector('#screenSize').value;
  window.screenDistance = document.querySelector('#screenDistance').value;
  window.pointerType = document.querySelector('input[name="pointerType"]:checked').value;
  window.illnesses = document.querySelector('input[name="illnesses"]:checked').value;
  window.drugs = document.querySelector('input[name="drugs"]:checked').value;
  window.gender = document.querySelector('input[name="gender"]:checked').value;

  // console.log('age', age);
  // console.log('gender', gender);
  // console.log('pointerType', pointerType);
  // console.log('screenSize', screenSize);
  // console.log('screenDistance', screenDistance);
  // console.log('illnesses', illnesses);
  // console.log('drugs', drugs);

  createCanvas(canvasWidth, canvasHeight);
  var mgr = new SceneManager();
  mgr.wire();
  mgr.showScene(Intro);
}

function setup() {
  const appScreen = document.querySelector('#fittslaw-app');
  const quizTemplate = document.getElementById('quiz-template');
  appScreen.innerHTML = quizTemplate.innerHTML;
}
