let origin
let mosaic
let during = false
const depth = 2

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

function dither(current) {
  current.loadPixels()
  next = createImage(600, 600)
  next.loadPixels()
  for (let y = 0; y < current.height; y++) {
    for (let x = 0; x < current.width; x++) {
      const pos = createVector(x, y)
      const index = vecToIndex(pos, current.width)
      next.pixels[index] = current.pixels[index] < random(256) ? 0 : 255
      next.pixels[index + 1] = current.pixels[index + 1] < random(256) ? 0 : 255
      next.pixels[index + 2] = current.pixels[index + 2] < random(256) ? 0 : 255
      next.pixels[index + 3] = current.pixels[index + 3]
    }
  }
  next.updatePixels()
  return next
}

function mousePressed() {
  if (!during) {
    during = true
    mosaic = dither(mosaic)
    background(51)
    image(origin, 0, 0)
    image(mosaic, 600, 0)
    console.log('done')
    during = false
  }
}

function setup() {
  createCanvas(1200, 600)
  mosaic = dither(origin)
  background(51)
  image(origin, 0, 0)
  image(mosaic, 600, 0)
  noLoop()
}