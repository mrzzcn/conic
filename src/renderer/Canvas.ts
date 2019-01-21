import Drawer from "../graphics/Drawer";
import Point from "../graphics/Point";
import BaseGraph from "../graphics/BaseGraph";

class Canvas implements Drawer {
  canvas: HTMLCanvasElement;

  /**
   *
   */
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
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

  toString() {
    return `CanvasDrawer`;
  }
}

export default Canvas;