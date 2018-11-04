let origin
let mosaic
let during = false
let threshold
let ditheringButton

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

function grayscale(current) {
  current.loadPixels()
  next = createImage(600, 600)
  next.loadPixels()
  for (let y = 0; y < current.height; y++) {
    for (let x = 0; x < current.width; x++) {
      const pos = createVector(x, y)
      const index = vecToIndex(pos, current.width)
      const c = current.pixels[index] + current.pixels[index + 1] + current.pixels[index + 2] / 3
      const col = floor(map(c, 0, 255, 0, threshold.value())) * 255 / threshold.value()
      next.pixels[index] = col
      next.pixels[index + 1] = col
      next.pixels[index + 2] = col
      next.pixels[index + 3] = current.pixels[index + 3]
    }
  }
  next.updatePixels()
  return next
}

function grayscaling() {
  if (!during) {
    during = true
    mosaic = grayscale(origin)
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
  grayscalingButton = createButton('dithring')
  grayscalingButton.mousePressed(() => {
    grayscaling()
  })
  mosaic = grayscale(origin)
  background(51)
  image(origin, 0, 0)
  image(mosaic, 600, 0)
  noLoop()
}