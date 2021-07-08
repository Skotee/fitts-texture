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
  oulu1 = loadImage('images/oulu1.bmp');
  oulu2 = loadImage('images/oulu2.bmp');
  oulu3 = loadImage('images/oulu3.bmp');
  stars2 = loadImage('images/stars2.png');
  stars4 = loadImage('images/stars4.png');
  stars6 = loadImage('images/stars6.png');
  wood3 = loadImage('images/wood3.png');
  wood4 = loadImage('images/wood4.png');
  wood6 = loadImage('images/wood6.png');
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
  window.age = document.querySelector('#age').value;
  window.fname = document.querySelector('#fname').value;
  window.screenSize = document.querySelector('#screenSize').value;
  window.screenDistance = document.querySelector('#screenDistance').value;
  window.pointerType = document.querySelector('input[name="pointerType"]:checked').value;
  window.illnesses = document.querySelector('input[name="illnesses"]:checked').value;
  window.drugs = document.querySelector('input[name="drugs"]:checked').value;
  window.gender = document.querySelector('input[name="gender"]:checked').value;

  console.log('fname', fname);
  console.log('age', age);
  console.log('gender', gender);
  console.log('pointerType', pointerType);
  console.log('screenSize', screenSize);
  console.log('screenDistance', screenDistance);
  console.log('illnesses', illnesses);
  console.log('drugs', drugs);

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
