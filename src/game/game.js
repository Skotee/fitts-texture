function Game() {
  const STEP_1 = 8;
  const STEP_2 = 26;
  const STEP_3 = 41;
  const STEP_4 = 56;
  const STEP_5 = 71;
  const STEP_6 = 86;
  const STEP_7 = 101;
  const STEP_8 = 116;
  const STEP_9 = 131;
  const STEP_10 = 3;

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
  let fname = document.querySelector('#fname');
  // let gender = document.querySelector('input[name="gender"]').value;
  let screen = document.querySelector('#screen');
  let screenDistance = document.querySelector('#distance');
  //   let quiz = document.querySelector('#quiz-template');

  // console.log('quiz-template', quiz);
  // let age = quiz.content.querySelector('#age').value

  // const addAge = (ev) => {
  //   ev.preventDefault();
  //   let age = {
  //     age1: document.getElementById('age').value
  //   }
  //   arguments.push(age);
  //   console.warn('add', {ages});
  // }
  // document.addEventListener('DOOOOM', () => {
  //   document.getElementById('startGameButton', addAge);
  // })
  // console.log('age', age);
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

        diameters.push(this.diameter);
        bubbles.shift();
        backgrounds.shift();
        p++;
        console.log('p:' + p);
        console.log('bubbles.length:', bubbles.length);
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
    const appScreen = document.querySelector('#pokequiz-app');
    initGame();
  };

  this.draw = function() {
    background(backgrounds[0], [1]);

    if (bubbles.length > 1) {
      bubbles[0].show();
    } else {
      lapTimes.shift();
      // save(lapTimes, 'my.txt');
      // let rows = [];

      console.log('ids:', ids);
      console.log('lapTimes:', lapTimes);
      console.log('distances:', distances);
      console.log('bubbles:', bubbles);
      console.log('diameters:', diameters);
      console.log('coordinates:', coordinates);
      console.log('age:', window.age);
      // console.log('gender:', gender);
      console.log('screen:', window.screen);
      console.log('screenDistance:', window.screenDistance);
      console.log('fname:', window.fname);

      function downloadExcel() {
        var tableHeaders = ['Bubble id', 'Time lapse', 'Distances', 'Diameter', 'Coordinates'];

        //now a container for the excel data i.e. tableHeaders+datacreated:
        // var dataTable = new Array();
        // dataTable.push(tableHeaders);

        // //now looping around the data
        // rows.forEach(function(col) {
        //   dataTable.push([col,col, 'Feature Film', 'Feature Film', 'Feature Film']);
        // });

        //now converting the array given into a `csv` content
        let csvContent = 'data:text/csv;charset=utf-8,';
        // dataTable.forEach(function(rowArray) {
        //   let row = rowArray.join('\n');
        //   csvContent += row + '\t';
        // });
        csvContent += tableHeaders + '\n';
        csvContent += ids + '\n';
        csvContent += lapTimes + '\n';
        csvContent += distances + '\n';
        csvContent += diameters + '\n';
        csvContent += coordinates + '\n';
        csvContent += age + '\n';
        // csvContent += gender + '\n';
        csvContent += screen + '\n';
        csvContent += screenDistance + '\n';
        csvContent += fname + '\n';

        //calling the csv download via anchor tag(link) so we can provide a name for the file
        var encodedUri = encodeURI(csvContent);
        var link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.style.display = 'none';
        link.setAttribute('download', 'myCSV.csv'); //change it to give your own name
        link.innerHTML = 'Click Here to download';
        document.body.appendChild(link); // Required for FF

        link.click();
        link.remove(); //removing the link after the download
      }

      rows = [
        [ids, lapTimes, distances, diameters, coordinates, age, screen, screenDistance, fname],
      ];

      downloadExcel();
      // let csvContent = "data:text/csv;charset=utf-8,"
      //     + rows.map(e => e.join(",")).join("\n");
      // let encodedUri = encodeURI(csvContent);
      // // window.open(encodedUri);
      // save(rows, 'my.txt');

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
    console.log(bubbles);

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
    bubbles.forEach(element => {
      coordinates.push(element.centerX.toFixed(0) + ' ' + element.centerY.toFixed(0));
    });
    // bubbles.forEach(element => {
    //   ids.push(element.id)
    // });
    ids = bubbles.map(bubble => bubble.id);
    diameters = bubbles.map(bubble => bubble.diameter);

    console.log('ids:', ids);

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
