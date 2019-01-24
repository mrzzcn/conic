import BaseGraph, { Drawable } from "./BaseGraph";
import Drawer, { TransformOption } from "./Drawer";
import Point from "./Point";

interface CircleTransformOptionArgs {
  radius?: number;
}
class CircleTransformOption extends TransformOption<CircleTransformOptionArgs> {
  transforming: false;

  /**
   *
   */
  constructor(to: Point, seconds = 1, force = false) {
    super();
    this.to = to;
    this.seconds = seconds;
    this.force = force;
  }

}
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

  transform(option: CircleTransformOption, doAnimation: () => void) {
    const { seconds } = option;
    if (seconds <= 0) {
      throw new Error('Transform time must bigger than 0');
    }
    const distanceX = option.to.x - this.center.x;
    const distanceY = option.to.y - this.center.y;

    const ms = seconds * 1000;
    const startedOn = +new Date();
    let prevState = 0;
    const start = () => {
      const progress = (+new Date() - startedOn) / ms;
      const stepX = distanceX * (progress - prevState);
      const stepY = distanceY * (progress - prevState);
      this.center.x += stepX;
      this.center.y += stepY;
      if (progress >= 1) {
        this.center.x = option.to.x;
        this.center.y = option.to.y;
      } else {
        requestAnimationFrame(() => {
          start();
        });
      }
      Promise.resolve().then(() => doAnimation());
      console.log('doAnimation', this.center);

      prevState = progress;
    }

    start();
  }

  drawWith(drawer: Drawer) {
    drawer.drawArc(this.center, this.radius, 0, Math.PI * 2, {});
  }
}

export { CircleTransformOption };
export default Circle;