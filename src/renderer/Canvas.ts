import Drawer, { LineOption, TransformOption } from "../graphics/Drawer";
import Point from "../graphics/Point";
import BaseGraph from "../graphics/BaseGraph";

interface CanvasLineOption extends LineOption {
  converted?: boolean;
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

  convertCoordinate(point: Point, reverse: boolean = false) {
    if (!this.canvas) {
      throw new Error('canvas doesnt exist');
    }
    const center = this.center;
    let transformX;
    const transformY = center.y - point.y;
    if (reverse) {
      transformX = point.x - center.x;
    } else {
      transformX = center.x + point.x;
    }
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

  clear() {
    if (!this.canvas || !this.ctx) {
      return;
    }
    const gradient = this.ctx.createLinearGradient(0, 0, this.width, this.height);
    gradient.addColorStop(0, "#d5d5d5");
    gradient.addColorStop(1, "#d5d5d5");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.drawLine(new Point(0, this.center.y), new Point(this.width, this.center.y), { converted: true });
    this.drawLine(new Point(this.center.x, 0), new Point(this.center.x, this.height), { converted: true });
  }

  prepare() {
    if (!this.canvas || !this.ctx) {
      return;
    }
    if (!this.prepared) {
      this.canvas.setAttribute('width', `${this.width}px`);
      this.canvas.setAttribute('height', `${this.height}px`);
      console.log(this);
      this.clear()
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

    const { x: startX, y: startY } = option.converted ? start : this.convertCoordinate(start);
    const { x: endX, y: endY } = option.converted ? end : this.convertCoordinate(end);

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
    const { x, y } = option.converted ? center : this.convertCoordinate(center);

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
    const { x: startX, y: startY } = option.converted ? start : this.convertCoordinate(start);
    const { x: endX, y: endY } = option.converted ? end : this.convertCoordinate(end);
    this.ctx.rect(startX, startY, endX - startX, endY - startY);
    this.ctx.stroke();
    this.ctx.closePath();

    this.ctx.restore();
  }

  transform(graph: BaseGraph, option: TransformOption<any>) {
    graph.transform(option, () => {
      this.clear();
      this.drawGraph(graph);
    });
  }

  toString() {
    return `CanvasDrawer`;
  }
}

export default Canvas;