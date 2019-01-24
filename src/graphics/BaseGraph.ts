import Drawer, { TransformOption } from "./Drawer";

interface Drawable {
  drawWith(drawer: Drawer);
}

abstract class BaseGraph implements Drawable {
  /**
   *
   */
  constructor() { }

  abstract transform(option: TransformOption<any>, doAnimation: () => void);

  abstract drawWith(drawer: Drawer);
}

export { Drawable };

export default BaseGraph;