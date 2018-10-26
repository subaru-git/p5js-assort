const cells = [];
const w = 10;
let genMazeStack = [];
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
  genMazeStack.push(cells[0]);
  generateMaze();
  cells.forEach(cell => {cell.unvisit()});
  cells[0].start = true;
  cells[0].current = true;
  cells[0].visit();
  cells[cells.length - 1].goal = true;
  stack.push(cells[0]);
}

function tick() {
  const current = stack[stack.length - 1];
  current.current = false;
  let neighbours = Cell.getNextNeighbours(current, cells);
  if (neighbours.length) {
    if (neighbours.length > 1) {
      neighbours.forEach(cell => {cell.marking()});
    }
    const next = random(neighbours);
    stack.push(next);
    if (next.goal) {
      noLoop();
      stack.forEach(cell => cell.route = true);
    }
    next.visit();
  } else {
    const prev = stack.pop();
    if (prev.mark) prev.deaded();
  }
  stack[stack.length - 1].current = true;
}

function draw() {
  background(255);
  tick();
  cells.forEach(cell => {cell.show()});
}

function mazeTick() {
  const current = genMazeStack[genMazeStack.length - 1];
  current.current = false;
  let neighbours = Cell.getUnVisitedNeighbours(current, cells);
  if (neighbours.length) {
    let next = random(neighbours);
    genMazeStack.push(next);
    Cell.removeWall(current, next);
    next.visit();
  } else {
    genMazeStack.pop();
  }
}

function check() {
  let is = cells.find(cell => !cell.visited);
  if (!is) {
    return true
  }
  return false;
}

function generateMaze() {
  for(;;) {
    mazeTick();
    if(check()) break;
  }
}
