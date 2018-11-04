function setup() {
  createCanvas(600, 600)
}

const f = n => x => {
  let sum = 1
  for (let i = 0; i < n; i++) {
    sum *= x
  }
  return sum
}

function draw() {
  background(51)
  const fx = f(2)
  stroke(255, 255, 255, 100)
  line(0, height / 2, width, height / 2)
  line(width / 2, 0, width / 2, height)
  for (let i = -1; i <= 1; i += 0.01) {
    stroke(255)
    const x = map(i, -1, 1, 0, width)
    const y = map(fx(i), -1, 1, height, 0)
    point(x, y)
  }
  noLoop()
}