class BinalyDataView {
  constructor(buffer) {
    this.data = new DataView(buffer)
  }

  set(offset, size, value) {
    const byteoffset = floor(offset / 8)
    let bitoffset = offset % 8
    const bytesize = ceil((bitoffset + size) / 8)
    let sizeoffset = bitoffset + size
    for (let i = 0; i < bytesize; i++) {
      const shift = (8 - sizeoffset)
      let v = value
      if (shift < 0) {
        v >>= abs(shift)
      } else {
        v <<= shift
      }
      v |= this.data.getUint8(byteoffset + i)
      this.data.setUint8(byteoffset + i, v)
      bitoffset = 0
      sizeoffset -= 8
    }
  }
  get(offset, size) {
    const ret = []
    for (let i = 0; i < size; i++) {
      ret.push(this.data.getUint8(offset + i))
    }
    return ret
  }

  debug() {
    for (let i = 0; i < this.data.byteLength; i++) {
      let byte = this.data.getUint8(i)
      let string = ''
      for (let j = 0; j < 8; j++) {
        if (byte % 2 === 1) {
          string += '1'
        } else {
          string += '0'
        }
        byte >>= 1
      }
      string = string.split("").reverse().join("")
      console.log(`${string} `);

    }
    console.log(this.data.byteLength);
  }
}