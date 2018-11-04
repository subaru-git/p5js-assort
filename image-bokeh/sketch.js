let origin
let mosaic
let bokehing = false

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
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const x = pos.x + j;
      const y = pos.y + i;
      if ((0 <= x && x < width) && (0 <= y && y < height) ) {
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

function bokeh(current) {
  current.loadPixels()
  next = createImage(600, 600)
  next.loadPixels()
  for (let y = 0; y < current.height; y++ ) {
    for (let x = 0; x < current.width; x++) {
      const pos = createVector(x, y)
      const neighbors = getNeighbors(pos, current.width, current.height)
      const col = calcMean(current.pixels, neighbors)
      const index = vecToIndex(pos, current.width)
      next.pixels[index]     = red(col)
      next.pixels[index + 1] = green(col)
      next.pixels[index + 2] = blue(col)
      next.pixels[index + 3] = alpha(col)
    }
  }
  next.updatePixels()
  return next
}

function mousePressed() {
  if (!bokehing) {
    bokehing = true
    mosaic = bokeh(mosaic)
    background(51)
    image(origin, 0, 0)
    image(mosaic, 600, 0)
    console.log('done')
    bokehing = false
  }
}

function setup() {
  createCanvas(1200, 600)
  mosaic = bokeh(origin)
  background(51)
  image(origin, 0, 0)
  image(mosaic, 600, 0)
  noLoop()
}

