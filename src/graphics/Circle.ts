import BaseGraph, { Drawable } from "./BaseGraph";
import Drawer from "./Drawer";
import Point from "./Point";

class Circle extends BaseGraph implements Drawable {
  center: Point;
  radius: number;

  /**
   *
   */
  constructor(center: Point, radius: number) {
    super();
    this.center = center;
    this.radius = radius;
  }

  toString() {
    return `Circle({x: ${this.center.x}, y: ${this.center.y}}, R: ${this.radius})`;
  }

  drawWith(drawer: Drawer) {
    drawer.drawArc(this.center, this.radius, 0, Math.PI * 2, {});
  }
}

export default Circle;