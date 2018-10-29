let data = []
const resolution = 10
let i = 0
let j = 0
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
  const b = data[j + 1]
  if (a > b) {
    swap(data, j, j + 1)
  }
  j++
  if (j >= data.length - i - 1) {
    j = 0
    i++
    if (i >= data.length) {
      noLoop();
      finish = true
    }
  }


  data.forEach((n, x) => {
    if (finish) {
      fill(0, 255, 0)
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