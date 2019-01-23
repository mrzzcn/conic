import Drawer from "./Drawer";

interface Drawable {
  drawWith(drawer: Drawer);
}

class BaseGraph implements Drawable {
  /**
   *
   */
  constructor() {
  }

  drawWith(drawer: Drawer) {
    console.log(`Drawing ${this} with ${drawer}`);
  }
}

export { Drawable };

export default BaseGraph;