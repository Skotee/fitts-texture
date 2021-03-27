function Game() {
  var me = this;
  let startTime = 0;
  let timeTaken = 0;
  let bubbles = [];
  let backgrounds = [];
  let lapTimes = [];
  let distances = [];
  const predefinedDiameters = [50, 70, 80, 100, 110, 120, 150];
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

      rows = [[ids, lapTimes, distances, diameters, coordinates]];

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

    for (let i = 1; i < 147; i++) {
      bubbles[i - 1] = new Bubble(
        i,
        getRandomIntInclusive(0, 360),
        filenames[i - 1],
        selectedPredefinedDiameters[i - 1]
      );
    }

    backgrounds[0] = black;
    backgrounds[1] = black;
    backgrounds[2] = white;
    backgrounds[3] = black;
    backgrounds[4] = white;
    backgrounds[5] = white;
    backgrounds[6] = white;
    backgrounds[7] = black;
    backgrounds[8] = black;
    backgrounds[9] = white;

    for (let i = 10; i < 26; i++) {
      backgrounds[i] = stars2;
    }
    for (let i = 26; i < 41; i++) {
      backgrounds[i] = stars4;
    }
    for (let i = 41; i < 56; i++) {
      backgrounds[i] = stars6;
    }
    for (let i = 56; i < 71; i++) {
      backgrounds[i] = oulu1;
    }
    for (let i = 71; i < 86; i++) {
      backgrounds[i] = oulu2;
    }
    for (let i = 86; i < 101; i++) {
      backgrounds[i] = oulu3;
    }
    for (let i = 101; i < 116; i++) {
      backgrounds[i] = wood3;
    }
    for (let i = 116; i < 131; i++) {
      backgrounds[i] = wood4;
    }
    for (let i = 131; i < 146; i++) {
      backgrounds[i] = wood6;
    }
    lapTimes = [];
    console.log(bubbles);

    for (let i = 0; i < bubbles.length - 1; i++) {
      console.log(i+" "+(dist(bubbles[i].centerX , bubbles[i].centerY, bubbles[i+1].centerX, bubbles[i+1].centerY)).toFixed(2));
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
