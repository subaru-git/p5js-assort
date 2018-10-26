const cells = [];
const w = 10;
let stack = [];

function setup() {
  createCanvas(601, 601);
  const rows = floor(width / w)
  const cols = floor(height / w)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      cells.push(new Cell(j, i, w));
    }
  }
  cells[0].visit();
  cells[0].start = true;
  stack.push(cells[0]);
}

function tick() {
  const current = stack[stack.length - 1];
  current.current = false;
  let neighbours = Cell.getUnVisitedNeighbours(current, cells);
  if (neighbours.length) {
    let next = random(neighbours);
    stack.push(next);
    Cell.removeWall(current, next);
    next.visit();
  } else {
    stack.pop();
  }
  stack[stack.length - 1].current = true;
}

function check() {
  let is = cells.find(cell => !cell.visited);
  if (!is) {
    stack[stack.length - 1].goal = true;
    stack.forEach(cell => cell.route = true);
    noLoop();
  }
}

function draw() {
  background(200);
  tick();
  check();
  cells.forEach(cell => cell.show());
}