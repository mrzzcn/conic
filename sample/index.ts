import CanvasDrawer from '../src/renderer/Canvas';
import Point from '../src/graphics/Point';

import Circle from '../src/graphics/Circle';
import Rectangle from '../src/graphics/Rectangle';

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  console.log(canvas.clientWidth, canvas.clientHeight);
  const drawer = new CanvasDrawer(canvas);

  const circle = new Circle(new Point(0, 0), 100);
  drawer.drawGraph(circle);

  const rectangle = new Rectangle(new Point(-100, 100), new Point(100, -100));
  drawer.drawGraph(rectangle);
}