import Circle from './src/graphics/Circle';
import CanvasDrawer from './src/renderer/Canvas';
import Point from './src/graphics/Point';

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const drawer = new CanvasDrawer(canvas);
  const circle = new Circle(drawer, new Point(0 ,0), 1);
  circle.draw();
}