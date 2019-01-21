import BaseGraph, { Drawable } from "./BaseGraph";
import Drawer from "./Drawer";
import Point from "./Point";

class Circle extends BaseGraph implements Drawable {
  center: Point;
  radius: number;

  /**
   *
   */
  constructor(drawer: Drawer, center: Point, radius: number) {
    super(drawer);
    this.center = center;
    this.radius = radius;
  }

  toString() {
    return `Circle({x: ${this.center.x}, y: ${this.center.y}}, R: ${this.radius})`;
  }
}

export default Circle;