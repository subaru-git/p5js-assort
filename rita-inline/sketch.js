let penn
let sentences

function preload() {
  penn = loadJSON('penn.json')
  sentences = loadStrings('example-sentences.txt')
}

function setup() {
  const list = select('#poses-list')
  sentences.forEach(s => {
    const pos = RiTa.getPosTagsInline(s)
    const tr = createRow(pos)
    tr.parent(list)
  });
}

function createRow(pos) {
  const tr = createElement('tr')
  const words = pos.split(' ')
  const td = createElement('td').parent(tr)
  words.forEach(w => {
    const pair = w.split('/')
    createElement('span', pair[0]).parent(td)
    if (pair[1]) {
      createElement('span', `/${pair[1]}`).parent(td).class('penn')
    }
    createElement('span', ' ').parent(td)

  })
  return tr
}