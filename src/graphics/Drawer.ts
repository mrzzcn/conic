import Point from "./Point";
import BaseGraph from "./BaseGraph";

interface LineOption {
  lineWidth?: number;
}

abstract class TransformOption<T> {
  to: Point;
  force: boolean;
  seconds: number;
  args: T;
}

interface Drawer {
  clear();

  convertCoordinate(point: Point, reverse: boolean);
  drawPoint(point: Point);
  drawPoints(points: [Point]);
  drawGraph(graph: BaseGraph);

  drawLine(start: Point, end: Point, option: LineOption);
  drawArc(center: Point, radius: number, startAngle: number, toAngle: number, option: LineOption);
  drawRect(start: Point, end: Point, option: LineOption);

  transform(graph: BaseGraph, option: TransformOption<any>);
}

export { LineOption, TransformOption };
export default Drawer;