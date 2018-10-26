class ANode {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.cost = 0;
    this.hcost = 0;
    this.score = 0;
    this.status = 'none'
    this.parent = null;
    this.goal = false;
    this.invalid = false;
  }

  open(cost, parent, goal) {
    if (this.status !== 'none') return;

    this.status = 'open';
    this.cost = cost;
    this.parent = parent;
    const dx = abs(goal.x - this.x);
    const dy = abs(goal.y - this.y);
    // this.hcost = max(dx, dy);
    this.hcost = dx + dy;
    this.score = this.cost + this.hcost;
  }

  close() {
    this.status = 'close';
  }

  route() {
    this.status = 'route'
  }

  show() {
    if (this.invalid) {
      fill(51)
    } else if (this.status === 'route') {
      fill(255, 255, 0);
    } else if (this.goal) {
      fill(0, 255, 255)
    } else if (this.status === 'none') {
      fill(255, 255, 255);
    } else if (this.status === 'open') {
      fill(255, 0, 255);
    } else if (this.status === 'close') {
      fill(0, 255, 0);
    }
    strokeWeight(1);
    const x = this.x * this.w;
    const y = this.y * this.w;
    const w = this.w
    rect(x, y, w - 1, w - 1);
    fill(0)
    textSize(10)
    textAlign(LEFT, TOP);
    text(`cost : ${this.cost}`, x, y + 10)
    text(`hcost : ${this.hcost}`, x, y + 20)
    text(`score : ${this.score}`, x, y + 30)
  }

  static getAroundNodes(target, nodes) {
    return nodes.filter(node =>
      ((target.x - 1 <= node.x && node.x <= target.x + 1) &&
       (target.y - 1 <= node.y && node.y <= target.y + 1) &&
       (target.x !== node.x || node.y !== target.y) &&
       (!node.invalid && node.status !== 'close'))
    )
  }

  static getRoute(node) {
    let route = [node];
    if (node.parent) {
      route = route.concat(ANode.getRoute(node.parent))
    }
    return route;
  }
}