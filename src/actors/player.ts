import {
  Actor,
  Engine,
  CollisionType,
  vec,
  randomIntInRange,
  Color,
} from "excalibur";
import { Fruit, fruits } from "./fruit";

export class Player extends Actor {
  constructor() {
    super({ width: 100, height: 50, color: Color.White });
  }
  onInitialize(game: Engine): void {
    this.pos = vec(game.halfDrawWidth, 30);
    let heldFruit = this.newFruit();
    game.currentScene.add(heldFruit);

    game.input.pointers.primary.on("move", (evt) => {
      const leftBoundary = 50 + heldFruit.width / 2;
      const rightBoundary = game.drawWidth - 50 - heldFruit.width / 2;
      const x = clamp(evt.worldPos.x, leftBoundary, rightBoundary);
      this.pos.x = x + this.width / 2;
      heldFruit.pos.x = x;
    });

    game.input.pointers.primary.on("down", (evt) => {
      if (!heldFruit.graphics.visible) return;

      heldFruit.body.collisionType = CollisionType.Active;
      heldFruit = this.newFruit();
      heldFruit.graphics.visible = false;
      game.currentScene.add(heldFruit);

      game.clock.schedule(() => {
        heldFruit.graphics.visible = true;
      }, 600);
    });
  }
  private newFruit() {
    return new Fruit(
      this.pos.add(vec(-this.width / 2, this.height / 2)),
      CollisionType.PreventCollision,
      fruits[randomIntInRange(0, 2)]
    );
  }
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
