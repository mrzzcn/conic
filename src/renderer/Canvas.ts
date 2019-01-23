import Drawer, { LineOption } from "../graphics/Drawer";
import Point from "../graphics/Point";
import BaseGraph from "../graphics/BaseGraph";

interface CanvasLineOption extends LineOption {
  transformed ? : boolean;
}

class Canvas implements Drawer {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  prepared: boolean;

  /**
   *
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.prepare();
  }

  get width() {
    return this.canvas.clientWidth;
  }
  get height() {
    return this.canvas.clientHeight;
  }
  get center() {
    return new Point((this.width % 2 === 0 ? this.width - 1 : this.width) / 2, (this.height % 2 === 0 ? this.height - 1 : this.height) / 2)
  }

  transform(point: Point) {
    if (!this.canvas) {
      throw new Error('canvas doesnt exist');
    }
    const center = this.center;
    const transformX = center.x + point.x;
    const transformY = center.y + point.y;
    return new Point(transformX, transformY);
  }

  drawPoint(point: Point) {
    console.log('Drawing', point);
  }

  drawPoints(points: [Point]) {
    console.log('Drawing', points);
  }

  drawGraph(graph: BaseGraph) {
    graph.drawWith(this);
  }

  prepare() {
    if (!this.prepared) {
      this.canvas.setAttribute('width', `${this.width}px`);
      this.canvas.setAttribute('height', `${this.height}px`);
      console.log(this);
      this.drawLine(new Point(0, this.center.y), new Point(this.width, this.center.y), { transformed: true });
      this.drawLine(new Point(this.center.x, 0), new Point(this.center.x, this.height), { transformed: true });

      this.prepared = true;
    }
  }

  drawLine(start: Point, end: Point, option: CanvasLineOption = {}) {
    if (!this.ctx) {
      return;
    }
    this.ctx.save();
    this.ctx.beginPath();
    if (option && option.lineWidth) {
      this.ctx.lineWidth = option.lineWidth;
    }

    const { x: startX, y: startY } = option.transformed ? start : this.transform(start);
    const { x: endX, y: endY } = option.transformed ? end : this.transform(end);

    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawArc(center: Point, radius: number, startAngle: number, toAngle: number, option: CanvasLineOption = {}) {
    if (!this.ctx) {
      return;
    }
    this.ctx.save();

    this.ctx.beginPath();
    const { x, y } = option.transformed ? center : this.transform(center);

    this.ctx.arc(x, y, radius, startAngle, toAngle);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawRect(start: Point, end: Point, option: CanvasLineOption = {}) {
    if (!this.ctx) {
      return;
    }
    this.ctx.save();

    this.ctx.beginPath();
    const { x: startX, y: startY } = option.transformed ? start : this.transform(start);
    const { x: endX, y: endY } = option.transformed ? end : this.transform(end);
    this.ctx.rect(startX, startY, endX - startX, endY - startY);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.restore();
  }

  toString() {
    return `CanvasDrawer`;
  }
}

export default Canvas;