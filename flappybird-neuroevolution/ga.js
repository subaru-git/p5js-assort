const nextGeneration = () => {
  console.log('next generation');
  calculateFitness();
  for (let i = 0; i < birdsCount; i++) {
    birds[i] = pickOne();
  }
  savedBirds = [];
}

const pickOne = () => {
  let index = 0;
  let r = random(1);
  while (r > 0) {
    r = r - savedBirds[index].fitness;
    index++;
  }
  index--;
  let bird = savedBirds[index];
  let child = new Bird(bird.brain);
  child.mutate();
  return child;
}

const calculateFitness = () => {
  let sum = 0;
  for (let bird of savedBirds) {
    sum += bird.score;
  }
  for (let bird of savedBirds) {
    bird.fitness = bird.score / sum;
  }
}