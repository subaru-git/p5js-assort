let data
let digits = []
let index = 0
const r = 250
const colors = [
  '#ff000020',
  '#00ff0020',
  '#0000ff20',
  '#ffff0020',
  '#ff00ff20',
  '#00ffff20',
  '#ff7f7f20',
  '#7fff7f20',
  '#7f7fff20',
  '#7f7f7f20',
]

function preload() {
  data = loadStrings('pi-million.txt')
}

function setup() {
  createCanvas(600, 600)
  const strings = data[0].split('')
  strings.forEach(num => {
    digits.push(parseInt(num))
  })
  background(51)
  // translate(width / 2, height / 2)
  // stroke(255, 170)
  // noFill()
  // ellipse(0, 0, r * 2, r * 2)
}

function draw() {
  translate(width / 2, height / 2)
  const current = digits[index]
  const next = digits[index + 1]
  const third = digits[index + 2]
  const fourth = digits[index + 4]
  const diff = TWO_PI / 9
  const a1 = map(current, 0, 9, 0, TWO_PI) + random(-diff / 2, diff / 2)
  const a2 = map(next, 0, 9, 0, TWO_PI) + random(-diff / 2, diff / 2)
  const a3 = map(third, 0, 9, 0, TWO_PI) + random(-diff / 2, diff / 2)
  const a4 = map(fourth, 0, 9, 0, TWO_PI) + random(-diff / 2, diff / 2)
  const x1 = r * cos(a1)
  const y1 = r * sin(a1)
  const x2 = r * cos(a2)
  const y2 = r * sin(a2)
  const x3 = r * cos(a3)
  const y3 = r * sin(a3)
  const x4 = r * cos(a4)
  const y4 = r * sin(a4)
  stroke(color(colors[current]))
  noFill()
  bezier(x1, y1, x2, y2, x3, y3, x4, y4)
  index++
  if (index >= digits.length - 2) {
    noLoop()
  }
}