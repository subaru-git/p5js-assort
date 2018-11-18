const resolution = 15
let snake
let feed

function setup() {
  createCanvas(600, 600)
  frameRate(10)
  const x = width / resolution / 2
  const y = height / resolution / 2
  snake = new Snake(x, y, resolution)
  feed = new Feed(snake, width / resolution, height / resolution, resolution)
}

function drawgrid(cols, rows) {
  fill(51)
  noStroke()
  for (let i = 0.; i < rows; i++) {
    for (let j = 0.; j < cols; j++) {
      const x = i * resolution + 1
      const y = j * resolution + 1
      rect(x, y, resolution - 1, resolution - 1)
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.turn(-1, 0)
  } else if (keyCode === RIGHT_ARROW) {
    snake.turn(1, 0)
  } else if (keyCode === UP_ARROW) {
    snake.turn(0, -1)
  } else if (keyCode === DOWN_ARROW) {
    snake.turn(0, 1)
  }
}

function draw() {
  background(100)
  drawgrid(width / resolution, height / resolution)
  if (snake.eat(feed)) {
    feed = new Feed(snake, width / resolution, height / resolution, resolution)
  }
  snake.move()
  if (snake.edges(width / resolution, height / resolution)) {
    noLoop();
    console.log('GAME OVER!!!');
  }
  feed.show()
  snake.show()
}