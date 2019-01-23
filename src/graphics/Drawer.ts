import Point from "./Point";
import BaseGraph from "./BaseGraph";

interface LineOption {
  lineWidth ? : number;
}

interface Drawer {
  drawPoint(point: Point);
  drawPoints(points: [Point]);
  drawGraph(graph: BaseGraph);

  drawLine(start: Point, end: Point, option: LineOption);
  drawArc(center: Point, radius: number, startAngle: number, toAngle: number, option: LineOption);
  drawRect(start: Point, end: Point, option: LineOption);
}

export { LineOption };
export default Drawer;