const cells = [];
const frontiers = [];
const w = 10;
let current;

function setup() {
  createCanvas(611, 611);
  frameRate(60)
  const rows = floor(width / w)
  const cols = floor(height / w)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells.push(new Cell(j, i, w));
    }
  }
  let start = random(cells);
  frontiers.push([start, start]);
  console.log(start)
}

function tick() {
  if(current){
    current.now = false;
  }
  cells.forEach(cell => cell.stack = false)
  let pick = floor(random(frontiers.length));
  let pair = frontiers.splice(pick, 1)[0];
  current = pair[1];
  current.now = true;
  if (current.wall) {
    pair[0].wall = false;
    pair[1].wall = false;

    const left   = cells.find(cell => (cell.x === current.x - 2 && cell.y === current.y      && cell.wall))
    const top    = cells.find(cell => (cell.x === current.x     && cell.y === current.y  - 2 && cell.wall))
    const right  = cells.find(cell => (cell.x === current.x + 2 && cell.y === current.y      && cell.wall))
    const bottom = cells.find(cell => (cell.x === current.x     && cell.y === current.y  + 2 && cell.wall))
    if (left) {
      const neighbour = cells.find(cell => (cell.x === current.x - 1 && cell.y === current.y    ))
      frontiers.push([neighbour, left])
    }
    if (top) {
      const neighbour = cells.find(cell => (cell.x === current.x     && cell.y === current.y - 1))
      frontiers.push([neighbour, top])
    }
    if (right) {
      const neighbour = cells.find(cell => (cell.x === current.x + 1 && cell.y === current.y    ))
      frontiers.push([neighbour, right])
    }
    if (bottom) {
      const neighbour = cells.find(cell => (cell.x === current.x     && cell.y === current.y + 1))
      frontiers.push([neighbour, bottom])
    }
  }
  frontiers.forEach(pair => pair[1].stack = true)
}

function check() {
  if (!frontiers.length) {
    noLoop();
  }
}

function draw() {
  tick();
  check();
  background(200);
  cells.forEach(cell => cell.show());
}