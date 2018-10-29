let data = []
const resolution = 10
let i = 0
let j = 0
let min = 0
let finish = false

function setup() {
  createCanvas(800, 600)

  // Setup data
  for (let i = 0; i < width / resolution; i++) {
    data.push(random(height))
  }
}

function draw() {
  background(51)
  noStroke()

  const a = data[j]
  const b = data[min]
  if (a < b) {
    min = j
  }
  j++
  if (j >= data.length) {
    swap(data, i, min)
    i++
    j = i
    min = j
    if (i >= data.length) {
      noLoop();
      finish = true
    }
  }

  data.forEach((n, x) => {
    if (finish) {
      fill(0, 255, 0)
    } else if (x == min) {
      fill(0, 255, 255)
    } else if (x == j) {
      fill(255, 0, 0)
    } else {
      fill(255, 255, 255)
    }
    rect(x * resolution + 1, height - n, resolution - 1, n)
  })
}

function swap(data, a, b) {
  const temp = data[a]
  data[a] = data[b]
  data[b] = temp
}