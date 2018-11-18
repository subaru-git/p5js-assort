const target = 'https://scrapbox.io/tech-train'
let toInteger
let toExponent
let qrInitial

function preload() {
  toInteger = loadStrings('./gf2-8-to-int.data')
  toExponent = loadStrings('./gf2-8-to-exponent.data')
  qrInitial = loadJSON('./qrcode-initial.json')
}

function setup() {
  createCanvas(370, 370)
  background(200)
  toInteger = toInteger.map(e => Number(e))
  toExponent = toExponent.map(e => Number(e))

  const buffer = new ArrayBuffer(62)
  const data = new BinalyDataView(buffer)
  data.set(0, 4, 4)
  data.set(4, 8, target.length)
  let datasize = 2
  target.split('').forEach((c, index) => {
    data.set(12 + (index * 8), 8, (new TextEncoder).encode(c))
    datasize++
  })
  for (let i = 0; i < 62 - datasize; i++) {
    if (i % 2 === 0) {
      data.set((datasize + i) * 8, 8, 236)
    } else {
      data.set((datasize + i) * 8, 8, 17)
    }
  }

  const d = [data.get(0, 15), data.get(15, 15), data.get(30, 16), data.get(46, 16)]
  const err = [genErrorDetection(d[0]), genErrorDetection(d[1]), genErrorDetection(d[2]), genErrorDetection(d[3])]
  console.table(d);
  console.table(err);

  const qr = new QRCode(d, err)
  qr.dataSetting()
  qr.show()
}

const gx = [0, 215, 234, 158, 94, 184, 97, 118, 170, 79, 187, 152, 148, 252, 179, 5, 98, 96, 153]

function genErrorDetection(data) {
  let exponent_co = gx
  let int_co = data
  for (let i = 0; i < data.length; i++) {
    const a = toExponent[int_co[0]]
    let fxdash = []
    for (let j = 0; j < exponent_co.length; j++) {
      const ex = (exponent_co[j] + a) % 255
      const integer = toInteger[ex]
      fxdash.push(integer ^ int_co[j])
    }
    fxdash.shift()
    int_co = fxdash
  }
  return int_co
}