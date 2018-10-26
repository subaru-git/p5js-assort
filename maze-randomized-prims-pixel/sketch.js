const cells = [];
const frontiers = [];
let current;

function setup() {
  createCanvas(200, 200);
  frameRate(60)
  const d = pixelDensity();
  for (let i = 0; i < height * d; i++) {
    cells[i] = []
    for (let j = 0; j < width * d; j++) {
      cells[i][j] = true;
    }
  }
  let col = floor(random(height * d));
  let row = floor(random(width * d));
  current = {col, row};
  frontiers.push([current, current]);
  console.log(current)
}

function tick() {
  let pick = floor(random(frontiers.length));
  let pair = frontiers.splice(pick, 1)[0];
  current = pair[1];
  const ccol = current.col;
  const crow = current.row;
  if (cells[ccol][crow]) {
    cells[pair[0].col][pair[0].row] = false;
    cells[ccol][crow] = false;

    const d = pixelDensity();
    if ( crow >= 2 && cells[ccol][crow - 2] == true) {
      frontiers.push([{col: ccol, row: crow - 1}, {col: ccol, row: crow - 2}])
    }
    if ( ccol >= 2 && cells[ccol - 2][crow] == true) {
      frontiers.push([{col: ccol - 1, row: crow}, {col: ccol - 2, row: crow}])
    }
    if ( crow < (width * d) - 2 && cells[ccol][crow + 2] == true) {
      frontiers.push([{col: ccol, row: crow + 1}, {col: ccol, row: crow + 2}])
    }
    if ( ccol < (height * d) - 2 && cells[ccol + 2][crow] == true) {
      frontiers.push([{col: ccol + 1, row: crow}, {col: ccol + 2, row: crow}])
    }
  }
}

function check() {
  if (!frontiers.length) {
    noLoop();
    return true;
  }
  return false;
}

function draw() {
  for(let i = 0; i < 50; i++) {
    tick();
    if (check()) break;
  }
  loadPixels();
  const d = pixelDensity();
  for (let i = 0; i < height * d; i++) {
    for (let j = 0; j < width * d; j++) {
      let col = color(255, 255, 255);
      if (current.col == i && current.row == j) {
        col = color(255, 0, 0);
      } else if (cells[i][j]) {
        col = color(0, 0, 0);
      }
      let pixelIndex = ((i * height * d) + (j)) * 4;
      pixels[pixelIndex] = red(col);
      pixels[pixelIndex + 1] = green(col);
      pixels[pixelIndex + 2] = blue(col);
      pixels[pixelIndex + 3] = alpha(col);
    }
  }

  frontiers.forEach(pair => {
    let col = color(0, 255, 255);
    let pixelIndex = ((pair[1].col * height * d) + (pair[1].row)) * 4;
    pixels[pixelIndex] = red(col);
    pixels[pixelIndex + 1] = green(col);
    pixels[pixelIndex + 2] = blue(col);
    pixels[pixelIndex + 3] = alpha(col);
  })
  updatePixels();
}