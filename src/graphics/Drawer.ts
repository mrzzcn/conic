import Point from "./Point";
import BaseGraph from "./BaseGraph";

interface Drawer {
  drawPoint(point: Point);
  drawPoints(points: [Point]);
  drawGraph(graph: BaseGraph);
}

export default Drawer;