import BaseGraph, { Drawable } from "./BaseGraph";
import Drawer, { TransformOption } from "./Drawer";
import Point from "./Point";

class Rectangle extends BaseGraph implements Drawable {
  start: Point;
  end: Point;

  /**
   *
   */
  constructor(start: Point, end: Point) {
    super();

    this.start = start;
    this.end = end;
  }

  toString() {
    return `Rectangle(start: {x: ${this.start.x}, y: ${this.start.y}}, end: {x: ${this.end.x}, y: ${this.end.y}}`;
  }

  drawWith(drawer: Drawer) {
    drawer.drawRect(this.start, this.end, {});
  }
  
  transform(option: TransformOption<any>, doAnimation: () => void) {
    console.warn('Not Implemented.', option, doAnimation);
  }
}

export default Rectangle;