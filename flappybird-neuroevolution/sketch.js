let birds = []
let savedBirds = []
const birdsCount = 10;
let pipes = []
let counter = 0
let slider

function setup() {
  createCanvas(400, 600)
  for (let i = 0; i < birdsCount; i++) {
    birds.push(new Bird())
  }
  pipes.push(new Pipe())
  slider = createSlider(1, 100, 1);
}

function draw() {
  for (let n = 0; n < slider.value(); n++) {
    background(51)

    if (counter % 75 === 0) {
      pipes.push(new Pipe())
    }
    counter++

    let hit = false
    pipes = pipes.filter(pipe => {
      pipe.update()

      birds = birds.filter(bird => {
        if (pipe.hits(bird)) {
          savedBirds.push(bird)
          return false
        }
        return true
      })
      return !pipe.offscreen()
    })

    birds = birds.filter(bird => {
      if (bird.offscreen()) {
        savedBirds.push(bird)
        return false
      }
      return true
    })

    birds.forEach(bird => {
      bird.think(pipes)
      bird.update()
    });

    if (birds.length === 0) {
      counter = 0
      nextGeneration()
      pipes = []
    }
  }

  background(51)
  birds.forEach(bird => bird.show())
  pipes.forEach(pipe => pipe.show())
}