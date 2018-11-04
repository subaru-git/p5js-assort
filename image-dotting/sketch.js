let origin
let mosaic
let during = false
let threshold
let dottingButton
let radius

function preload() {
  origin = loadImage('kitten.jpg')
}

function indexToVec(index, width) {
  const i = floor(index / 4)
  const y = floor(i / width)
  const x = floor(i % width)
  return createVector(x, y)
}

function vecToIndex(vec, width) {
  return index = vec.y * width * 4 + vec.x * 4
}

function getNeighbors(pos, width, height) {
  let neighbors = []
  const end = vecToIndex(createVector(width - 1, height - 1), width)
  const r = radius.value()
  for (let i = -r; i <= r; i++) {
    for (let j = -r; j <= r; j++) {
      const x = pos.x + j;
      const y = pos.y + i;
      if ((0 <= x && x < width) && (0 <= y && y < height)) {
        const p = createVector(x, y)
        const index = vecToIndex(p, width)
        if (0 <= index && index <= end) {
          neighbors.push(p)
        }
      }
    }
  }
  return neighbors
}

function calcMean(pixels, neighbors) {
  let r = 0
  let g = 0
  let b = 0
  let a = 0
  neighbors.forEach(pos => {
    const index = vecToIndex(pos, origin.width)
    r += pixels[index]
    g += pixels[index + 1]
    b += pixels[index + 2]
    a += pixels[index + 3]
  });
  return color(r / neighbors.length, g / neighbors.length, b / neighbors.length, a / neighbors.length)
}

function dot(current) {
  current.loadPixels()
  next = createImage(600, 600)
  next.loadPixels()
  const r = radius.value()
  for (let y = r; y < current.height; y += r * 2) {
    for (let x = r; x < current.width; x += r * 2) {
      const pos = createVector(x, y)
      const neighbors = getNeighbors(pos, current.width, current.height)
      const meanCol = calcMean(current.pixels, neighbors)
      const c = red(meanCol) + green(meanCol) + blue(meanCol) / 3
      const count = floor(map(c, 0, 255, 0, threshold.value() * r))
      neighbors.forEach(p => {
        const index = vecToIndex(p, current.width)
        next.pixels[index] = 255
        next.pixels[index + 1] = 255
        next.pixels[index + 2] = 255
        next.pixels[index + 3] = 255
      })
      for (let i = 0; i < count; i++) {
        if (i >= neighbors.length) break
        const p = random(neighbors)
        const index = vecToIndex(p, current.width)
        next.pixels[index] = 0
        next.pixels[index + 1] = 0
        next.pixels[index + 2] = 0
        next.pixels[index + 3] = 255
        neighbors.splice(neighbors.indexOf(p), 1)
      }
    }
  }
  next.updatePixels()
  return next
}

function dotting() {
  if (!during) {
    during = true
    mosaic = dot(origin)
    background(51)
    image(origin, 0, 0)
    image(mosaic, 600, 0)
    console.log('done')
    during = false
  }
}

function setup() {
  createCanvas(1200, 600)
  threshold = createSlider(0, 10, 5, 1)
  radius = createSlider(1, 10, 5, 1)
  dottingButton = createButton('dotting')
  dottingButton.mousePressed(() => {
    dotting()
  })
  mosaic = dot(origin)
  background(51)
  image(origin, 0, 0)
  image(mosaic, 600, 0)
  noLoop()
}