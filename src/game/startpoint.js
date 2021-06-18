var canvasWidth = 700;
var canvasHeight = 700;

let black, white, graycircle50, graycircle100, graycircle150, illusion1, illusion2, illusion3, illusion4, illusion5, illusion6, stars1, stars2, stars3, stars4, stars5, stars6, wood1, wood2, wood3, wood4, wood5, wood6

function preload() {
  oulu1 = loadImage('src/assets/oulu1.bmp');
  oulu2 = loadImage('src/assets/oulu2.bmp');
  oulu3 = loadImage('src/assets/oulu3.bmp');
  stars2 = loadImage('src/assets/stars2.png');
  stars4 = loadImage('src/assets/stars4.png');
  stars6 = loadImage('src/assets/stars6.png');  
  wood3 = loadImage('src/assets/wood3.png');
  wood4 = loadImage('src/assets/wood4.png');
  wood6 = loadImage('src/assets/wood6.png');
  graycircle50 = loadImage('src/assets/graycrop50.png');
  graycircle70 = loadImage('src/assets/graycrop70.png');
  graycircle80 = loadImage('src/assets/graycrop80.png');
  graycircle100 = loadImage('src/assets/graycrop100.png');
  graycircle110 = loadImage('src/assets/graycrop110.png');
  graycircle120 = loadImage('src/assets/graycrop120.png');
  graycircle150 = loadImage('src/assets/graycrop150.png');
  black = loadImage('src/assets/black.png');
  white = loadImage('src/assets/white.png');
}

function test() {
  event.preventDefault();
  window.age = document.querySelector('#age').value
  window.fname = document.querySelector('#fname').value
  window.screen = document.querySelector('#screen').value
  window.distance = document.querySelector('#distance').value
  window.illnesses = document.getElementsByName('#illnesses').value
  window.drugs = document.getElementsByName('drugs').value
  window.gender = document.getElementsByName('gender').value

  console.log('age', age);
  console.log('fname', fname);
  console.log('screen', screen);
  console.log('distance', distance);
  console.log('illnesses', illnesses);
  console.log('drugs', drugs);
  console.log('gender', gender);
  createCanvas(canvasWidth, canvasHeight);
  var mgr = new SceneManager();
  mgr.wire();
  mgr.showScene( Intro );
}

function setup()
{
  const appScreen = document.querySelector('#pokequiz-app');
  const quizTemplate = document.getElementById('quiz-template');
  appScreen.innerHTML = quizTemplate.innerHTML;
}
