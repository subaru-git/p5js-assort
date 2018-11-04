const totalCities = 5
let cities = []
let recordDistance = 0
let bestEver = []

function setup() {
  createCanvas(400, 300)
  for (let i = 0; i < totalCities; i++) {
    cities[i] = createVector(random(width), random(height))
  }
  recordDistance = calcDistance(cities)
  bestEver = [...cities]
}

function draw() {
  background(51)
  fill(255)
  cities.forEach(city => {
    ellipse(city.x, city.y, 8, 8)
  })

  stroke(255)
  strokeWeight(1)
  noFill()
  beginShape()
  cities.forEach(city => {
    vertex(city.x, city.y)
  })
  endShape()

  stroke(255, 0, 255)
  strokeWeight(4)
  noFill()
  beginShape()
  bestEver.forEach(n => {
    vertex(n.x, n.y)
  })
  endShape()

  const i = floor(random(cities.length))
  const j = floor(random(cities.length))
  swap(cities, i, j)

  const d = calcDistance(cities)
  if (d < recordDistance) {
    recordDistance = d;
    bestEver = [...cities]
  }

}

function swap(arr, a, b) {
  const temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}

function calcDistance(points) {
  let sum = 0
  points.forEach((point, index) => {
    if (points[index + 1]) {
      sum += dist(point.x, point.y, points[index + 1].x, points[index + 1].y)
    }
  })
  return sum
}
