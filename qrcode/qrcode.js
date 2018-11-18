class QRCode {
  constructor(data, error) {
    this.data = data
    this.error = error
    this.rows = 37
    this.cols = 37
    this.w = 10
    this.currentX = 0
    this.dir = createVector(0, -1)
    this.debugdata = []

    this.grid = []
    for (let i = 0; i < this.rows; i++) {
      this.grid[i] = []
      for (let j = 0; j < this.cols; j++) {
        const index = i * this.rows + j
        if (qrInitial["black"].includes(index)) {
          this.grid[i][j] = 2
        } else if (qrInitial["white"].includes(index)) {
          this.grid[i][j] = 1
        } else if (qrInitial["info"].includes(index)) {
          this.grid[i][j] = 3
        } else {
          this.grid[i][j] = 0
        }
      }
    }
  }

  dataSetting() {
    let count = 0
    let pos = createVector(this.cols - 1, this.rows - 1)
    this.currentX = pos.x
    for (let i = 0; i < this.data[3].length; i++) {
      this.data.forEach(d => {
        if (d[i]) {
          // console.log(d[i], pos);

          let debugpos = []
          for (let j = 0; j < 8; j++) {
            let dm = 1
            if ((d[i] & 128) !== 0) {
              dm = 2
            }
            // mask
            if ((pos.y + pos.x) % 3 === 0) {
              if (dm === 1) {
                dm = 2
              } else if (dm === 2) {
                dm = 1
              }
            }
            this.grid[pos.y][pos.x] = dm
            debugpos.push(pos.copy())
            count++
            pos = this.next(pos)
            d[i] <<= 1
          }
          this.debugdata.push(debugpos)
        }
      });
    }
    for (let i = 0; i < this.error[3].length; i++) {
      this.error.forEach(e => {
        if (e[i]) {
          // console.log(e[i], pos);
          let debugpos = []

          for (let j = 0; j < 8; j++) {
            let em = 1
            if ((e[i] & 128) !== 0) {
              em = 2
            }
            if ((pos.y + pos.x) % 3 === 0) {
              if (em === 1) {
                em = 2
              } else if (em === 2) {
                em = 1
              }
            }
            this.grid[pos.y][pos.x] = em
            debugpos.push(pos.copy())
            count++
            pos = this.next(pos)
            e[i] <<= 1
          }
          this.debugdata.push(debugpos)
        }
      })
    }

    // info 011101000000110
    const info = [0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0]
    const infopos = [
      [createVector(8, 0), createVector(36, 8)],
      [createVector(8, 1), createVector(35, 8)],
      [createVector(8, 2), createVector(34, 8)],
      [createVector(8, 3), createVector(33, 8)],
      [createVector(8, 4), createVector(32, 8)],
      [createVector(8, 5), createVector(31, 8)],
      [createVector(8, 7), createVector(30, 8)],
      [createVector(8, 8), createVector(29, 8)],
      [createVector(7, 8), createVector(8, 30)],
      [createVector(5, 8), createVector(8, 31)],
      [createVector(4, 8), createVector(8, 32)],
      [createVector(3, 8), createVector(8, 33)],
      [createVector(2, 8), createVector(8, 34)],
      [createVector(1, 8), createVector(8, 35)],
      [createVector(0, 8), createVector(8, 36)],
    ]
    info.forEach((i, index) => {
      if (infopos[index]) {
        infopos[index].forEach(p => {
          this.grid[p.y][p.x] = i + 1
          count++
        })
      }
    });
    console.log(count);

  }

  next(pos) {
    if (pos.x === this.currentX - 1) {
      pos.add(this.dir)
      if (pos.y < 0 || this.rows <= pos.y) {
        this.dir.y *= -1
        pos.add(this.dir)
        pos.x -= 1
        this.currentX -= 2
        if (pos.x === 6) {
          pos.x -= 1
          this.currentX -= 1
        }
      } else {
        pos.x += 1
      }
      if (this.grid[pos.y][pos.x] !== 0) {
        return this.next(pos)
      }
      return pos
    } else {
      pos.x -= 1
      if (pos.x < 0) {
        pos.x = 0
        pos.add(this.dir)
      }
      if (this.grid[pos.y][pos.x] !== 0) {
        return this.next(pos)
      }
      return pos
    }
  }

  show() {
    let count = 0
    let total = 0
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        total++
        const x = j * this.w
        const y = i * this.w
        if (this.grid[i][j] === 2) {
          fill(0)
        } else if (this.grid[i][j] === 1) {
          fill(255)
        } else if (this.grid[i][j] === 3) {
          fill(0, 255, 255)
        } else {
          fill(255)
          count++
        }
        noStroke()
        rect(x + 1, y + 1, this.w - 1, this.w - 1)
      }
    }
    console.log(count);
    console.log(total);

    // this.debugdata.forEach((data, index) => {
    //   const r = random(255)
    //   const g = random(255)
    //   const b = random(255)
    //   data.forEach(d => {
    //     const x = d.x * this.w
    //     const y = d.y * this.w
    //     fill(r, g, b, 200)
    //     rect(x, y, this.w, this.w)
    //   })
    // })

  }
}