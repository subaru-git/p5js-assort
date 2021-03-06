class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.left = true;
    this.top = true;
    this.right = true;
    this.bottom = true;
    this.visited = false;
    this.start = false;
    this.goal = false;
    this.route = false;
    this.current = false;
  }

  visit() {
    this.visited = true;
  }

  show() {
    const left = this.x * this.w;
    const top = this.y * this.w;
    const bottom = top + this.w;
    const right = left + this.w;
    noStroke();
    if (this.start) {
      fill(255, 0, 255)
    } else if (this.goal) {
      fill(255, 0, 255)
    } else if (this.current) {
      fill(255, 0, 0)
    } else if (this.route) {
      fill(0, 255, 255)
    } else if (this.visited) {
      fill(200, 255, 200)
    } else {
      fill(255, 255, 255);
    }
    rect(left + 1, top + 1, this.w - 1, this.w - 1);
    stroke(0);
    strokeWeight(1);
    if (this.left) line(left, bottom, left, top);
    if (this.top) line(left, top, right, top);
    if (this.right) line(right, top, right, bottom);
    if (this.bottom) line(right, bottom, left, bottom);
  }

  static getUnVisitedNeighbours(current, cells) {
    return cells.filter(cell =>
      ((current.x === cell.x - 1 && current.y === cell.y    ) ||
       (current.x === cell.x     && current.y === cell.y - 1) ||
       (current.x === cell.x + 1 && current.y === cell.y    ) ||
       (current.x === cell.x     && current.y === cell.y + 1)) &&
      (!cell.visited)
      )
  }

  static removeWall(current, target) {
    if (current.x - 1 === target.x && current.y === target.y ) {
      current.left = false;
      target.right = false;
    } else if (current.x === target.x && current.y - 1 === target.y ) {
      current.top = false;
      target.bottom = false;
    } else if (current.x + 1 === target.x && current.y === target.y ) {
      current.right = false;
      target.left = false;
    } else if (current.x === target.x && current.y + 1 === target.y ) {
      current.bottom = false;
      target.top = false;
    }
  }
}