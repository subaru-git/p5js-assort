const nodes = [];
const w = 10;
let goalNode;
let currentNode;
let openNodes = [];
let count = 0;

function setup() {
  createCanvas(600, 600);
  frameRate(60)
  const rows = floor(width / w)
  const cols = floor(height / w)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let node = new ANode(j, i, w)
      node.invalid = random() > 0.6;
      nodes.push(node);
    }
  }
  // const start = floor(random(nodes.length));
  // const goal = floor(random(nodes.length));
  const start = 0;
  const goal = nodes.length - 1;
  console.log(start, goal)
  currentNode = nodes[start];
  currentNode.invalid = false;
  goalNode = nodes[goal];
  goalNode.invalid = false;

  currentNode.open(0, null, goalNode);
  openNodes.push(currentNode);
  goalNode.goal = true;
}

function tick() {
  currentNode = openNodes.reduce((min, current) => {
    if (min.score > current.score) {
      return current;
    } else if (min.score === current.score) {
      if (min.cost > current.cost) {
        return current
      }
    }
    return min
  });

  let arroundNodes = ANode.getAroundNodes(currentNode, nodes);
  openNodes = openNodes.concat(arroundNodes).filter((node, index, self) => self.indexOf(node) === index);
  openNodes.forEach(node => {
    node.open(currentNode.cost + 1, currentNode, goalNode);
  });
  currentNode.close();
  openNodes.splice(openNodes.indexOf(currentNode), 1);
}

function check() {
  if (openNodes.length === 0) {
    console.log('no goal')
    noLoop();
    return true;
  }
  const goal = openNodes.find(node => node.goal);
  if (goal) {
    let route = ANode.getRoute(goal);
    console.table(route)
    route.forEach(node => node.route());
    noLoop();
    return true;
  }
  return false;
}

function mousePressed() {
  if (mouseButton === LEFT) {
    count++;
    if (count === 10) count = 0;
  } else if (mouseButton ===RIGHT) {
    count = 0;
  }
}

function draw() {
  background(51);
  for (let i = 0; i < count; i++) {
    tick();
    if (check()) break;
  }
  if (openNodes.length === 0) noLoop();
  nodes.forEach(node => node.show());
}