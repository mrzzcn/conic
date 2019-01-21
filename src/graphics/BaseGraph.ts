import Drawer from "./Drawer";

interface Drawable {
  draw();
  drawWith(drawer: Drawer);
}

class BaseGraph implements Drawable {
  drawer: Drawer;

  /**
   *
   */
  constructor(drawer: Drawer) {
    this.drawer = drawer;
  }

  draw() {
    this.drawWith(this.drawer);
  }

  drawWith(drawer: Drawer) {
    console.log(`Drawing ${this} with ${drawer}`);
  }
}

export { Drawable };

export default BaseGraph;