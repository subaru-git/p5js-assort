const target = 'This is the place which I like.'

let penn;

function preload() {
  penn = loadJSON('penn.json')
}

function setup() {
  const words = RiTa.tokenize(target)
  const poses = RiTa.getPosTags(target)
  const list = select('#poses-list')

  for (let i = 0; i < words.length; i++) {
    const tr = createRow(words[i], poses[i])
    tr.parent(list)
  }
}

function createRow(word, pos) {
  const tr = createElement('tr')
  createElement('td', word).parent(tr)
  createElement('td', pos).parent(tr)
  createElement('td', penn[pos]).parent(tr)
  return tr
}