function Game() {
  const STEP_1 = 10;
  const STEP_2 = STEP_1 + 15;
  const STEP_3 = STEP_2 + 15;
  const STEP_4 = STEP_3 + 15;
  const STEP_5 = STEP_4 + 15;
  const STEP_6 = STEP_5 + 15;
  const STEP_7 = STEP_6 + 15;
  const STEP_8 = STEP_7 + 15;
  const STEP_9 = STEP_8 + 15;
  const STEP_10 = STEP_9 + 17;

  const BACKGROUND_00 = black;
  const BACKGROUND_01 = black;
  const BACKGROUND_02 = white;
  const BACKGROUND_03 = black;
  const BACKGROUND_04 = white;
  const BACKGROUND_05 = white;
  const BACKGROUND_06 = white;
  const BACKGROUND_07 = black;
  const BACKGROUND_08 = black;
  const BACKGROUND_09 = white;

  const BACKGROUND_1 = stars2;
  const BACKGROUND_2 = stars4;
  const BACKGROUND_3 = stars6;
  const BACKGROUND_4 = oulu1;
  const BACKGROUND_5 = oulu2;
  const BACKGROUND_6 = oulu3;
  const BACKGROUND_7 = wood3;
  const BACKGROUND_8 = wood4;
  const BACKGROUND_9 = wood6;

  const PREDEFINED_DIAMETER_1 = 50;
  const PREDEFINED_DIAMETER_2 = 70;
  const PREDEFINED_DIAMETER_3 = 80;
  const PREDEFINED_DIAMETER_4 = 100;
  const PREDEFINED_DIAMETER_5 = 110;
  const PREDEFINED_DIAMETER_6 = 120;
  const PREDEFINED_DIAMETER_7 = 150;
  var me = this;
  let startTime = 0;
  let timeTaken = 0;
  let bubbles = [];
  let backgrounds = [];

  let lapTimes = [];
  let distances = [];
  const predefinedDiameters = [
    PREDEFINED_DIAMETER_1,
    PREDEFINED_DIAMETER_2,
    PREDEFINED_DIAMETER_3,
    PREDEFINED_DIAMETER_4,
    PREDEFINED_DIAMETER_5,
    PREDEFINED_DIAMETER_6,
    PREDEFINED_DIAMETER_7,
  ];
  let selectedPredefinedDiameters = [];
  let filenames = [];
  let diameters = [];
  let coordinates = [];
  let ids = [];
  const boardRadius = 250;
  let distance = 0;
  let p = 0;
  const angleConversion = Math.PI / 180;

  const obj = {
    graycircle50: graycircle50,
    graycircle70: graycircle70,
    graycircle80: graycircle80,
    graycircle100: graycircle100,
    graycircle110: graycircle110,
    graycircle120: graycircle120,
    graycircle150: graycircle150,
  };

  // ja bym te wszystkie obiekty trzymał w jakimś nadrzędnym obiecie,
  // i wtedy łatwo się tworzy dynamiczne klucze dla tego obiektu

  class Bubble {
    constructor(id, angle, image, diameter) {
      this.id = id;
      let x = getXForAngle(angle);
      let y = getYForAngle(angle);
      let xOffset = width / 2;
      let yOffset = height / 2;
      this.centerX = x + xOffset;
      this.centerY = y + yOffset;
      this.diameter = diameter;
      let radius = diameter / 2;
      this.radius = radius;
      this.cornerX = x + xOffset - radius;
      this.cornerY = y + yOffset - radius;
      this.image = image;
    }

    clicked(px, py) {
      if (
        bubbles[0].id == this.id &&
        dist(px, py, this.centerX, this.centerY) <= this.diameter / 2
      ) {
        if (!Array.isArray(lapTimes) || !lapTimes.length) {
          //jesli tablica jest pusta -> kliknięte jest pierwsze kółko
          console.log('Start licznika');
          startTime = Date.now();
        }
        /* Lap time is total time minus previous lap time */
        timeTaken = Date.now() - startTime;
        lapTimes.push(timeTaken);
        startTime = Date.now();
        console.log('timeTaken', timeTaken);

        // diameters.push(this.diameter);
        bubbles.shift();
        backgrounds.shift();
        p++;
      }
    }

    show() {
      image(this.image, this.cornerX, this.cornerY);
    }
  }

  function getXForAngle(angle) {
    let angleInRadians = angle * angleConversion;
    return boardRadius * Math.cos(angleInRadians);
  }

  function getYForAngle(angle) {
    let angleInRadians = angle * angleConversion;
    return boardRadius * Math.sin(angleInRadians);
  }

  this.mousePressed = function() {
    for (let i = 0; i < bubbles.length; i++) {
      bubbles[i].clicked(mouseX, mouseY, i);
    }
  };

  this.enter = function() {
    textSize(12);
    textAlign(LEFT);
    initGame();
  };

  this.draw = function() {
    background(backgrounds[0], [1]);

    if (bubbles.length > 1) {
      bubbles[0].show();
    } else {
      lapTimes.shift();

      function uploadToFirebase() {
        var firebaseConfig = {
          apiKey: "AIzaSyCFS_9Xd58UY1ub8Wq8VtIJo5EBeSBBvqc",
          authDomain: "fitts-law-faab1.firebaseapp.com",
          databaseURL: "https://fitts-law-faab1.firebaseio.com",
          projectId: "fitts-law-faab1",
          storageBucket: "fitts-law-faab1.appspot.com",
          messagingSenderId: "230890672188",
          appId: "1:230890672188:web:4324ffec82fa9b1f043339",
          measurementId: "G-X563BWFPQ6"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        const d = new Date()
        const date = d.getDate()
        const year = d.getFullYear()
        const month = ("0" + (d.getMonth() + 1)).slice(-2)
        const day = (d.getDate() < 10 ? '0' : '') + d.getDate();
        const hours = `${d.getHours()}`.padStart(2, '0')
        const minutes = `${d.getMinutes()}`.padStart(2, '0')
        const seconds = `${d.getSeconds()}`.padStart(2, '0')
        const formatted = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`

        var db = firebase.database();
        var ref = db.ref(formatted);
  
        ref.set({
          personalData: {
            fname: window.fname,
            age: window.age,
            gender: window.gender,
            pointerType: window.pointerType,
            screenSize: window.screenSize,
            screenDistance: window.screenDistance,
            illnesses: window.illnesses,
            drugs: window.drugs
          },
          experimentData: {
            ids: ids,
            lapTimes: lapTimes,
            distances: distances,
            diameters: diameters,
            coordinates: coordinates
          }
        });
      }

      uploadToFirebase();

      this.sceneManager.showScene(GameOver);
    }
  };

  function initGame() {
    getDiameterFromArray();
    for (let i = 1; i < STEP_10 + 1; i++) {
      bubbles[i - 1] = new Bubble(
        i,
        getRandomIntInclusive(0, 360),
        filenames[i - 1],
        selectedPredefinedDiameters[i - 1]
      );
    }

    backgrounds[0] = BACKGROUND_00;
    backgrounds[1] = BACKGROUND_01;
    backgrounds[2] = BACKGROUND_02;
    backgrounds[3] = BACKGROUND_03;
    backgrounds[4] = BACKGROUND_04;
    backgrounds[5] = BACKGROUND_05;
    backgrounds[6] = BACKGROUND_06;
    backgrounds[7] = BACKGROUND_07;
    backgrounds[8] = BACKGROUND_08;
    backgrounds[9] = BACKGROUND_09;

    for (let i = STEP_1; i < STEP_2; i++) {
      backgrounds[i] = BACKGROUND_1;
    }
    for (let i = STEP_2; i < STEP_3; i++) {
      backgrounds[i] = BACKGROUND_2;
    }
    for (let i = STEP_3; i < STEP_4; i++) {
      backgrounds[i] = BACKGROUND_3;
    }
    for (let i = STEP_4; i < STEP_5; i++) {
      backgrounds[i] = BACKGROUND_4;
    }
    for (let i = STEP_5; i < STEP_6; i++) {
      backgrounds[i] = BACKGROUND_5;
    }
    for (let i = STEP_6; i < STEP_7; i++) {
      backgrounds[i] = BACKGROUND_6;
    }
    for (let i = STEP_7; i < STEP_8; i++) {
      backgrounds[i] = BACKGROUND_7;
    }
    for (let i = STEP_8; i < STEP_9; i++) {
      backgrounds[i] = BACKGROUND_8;
    }
    for (let i = STEP_9; i < STEP_10; i++) {
      backgrounds[i] = BACKGROUND_9;
    }
    lapTimes = [];

    for (let i = 0; i < bubbles.length - 1; i++) {
      console.log(
        i +
          ' ' +
          dist(
            bubbles[i].centerX,
            bubbles[i].centerY,
            bubbles[i + 1].centerX,
            bubbles[i + 1].centerY
          ).toFixed(2)
      );
      distances.push(
        (
          dist(
            bubbles[i].centerX,
            bubbles[i].centerY,
            bubbles[i + 1].centerX,
            bubbles[i + 1].centerY
          ) +
          bubbles[i].radius +
          bubbles[i + 1].radius
        ).toFixed(2)
      );
    }
    distances.pop()
    bubbles.forEach(element => {
      coordinates.push(element.centerX.toFixed(0) + ' ' + element.centerY.toFixed(0));
    });
    coordinates.pop();
    ids = bubbles.map(bubble => bubble.id);
    ids.pop();
    
    diameters = bubbles.map(bubble => bubble.diameter);
    diameters.pop();

    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getDiameterFromArray() {
      for (let index = 0; index < 150; index++) {
        selectedPredefinedDiameters.push(
          predefinedDiameters[Math.floor(Math.random() * predefinedDiameters.length)]
        );
        filenames.push(obj[`graycircle${selectedPredefinedDiameters[index]}`]);
      }
    }
  }
}
