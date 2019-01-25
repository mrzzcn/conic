import CanvasDrawer from '../src/renderer/Canvas';
import Point from '../src/graphics/Point';

import Circle, { CircleTransformOption } from '../src/graphics/Circle';

function getEventPosition(ev: MouseEvent) {
  let x;
  let y;
  if (ev.layerX || ev.layerX == 0) {
    x = ev.layerX;
    y = ev.layerY;
  } else if (ev.offsetX || ev.offsetX == 0) { // Opera
    x = ev.offsetX;
    y = ev.offsetY;
  }
  return new Point(x, y);
}

window.onload = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  console.log(canvas.clientWidth, canvas.clientHeight);
  const drawer = new CanvasDrawer(canvas);

  const circle = new Circle(new Point(150, 210), 100);
  drawer.drawGraph(circle);

  canvas.addEventListener('click', (event) => {
    const clickPoint = getEventPosition(event);
    console.log('clickPoint', clickPoint);
    const coorPoint = drawer.convertCoordinate(clickPoint, true);
    console.log('clickCoor', coorPoint);
    drawer.transform(circle, new CircleTransformOption(coorPoint, 0.5));
  });
}