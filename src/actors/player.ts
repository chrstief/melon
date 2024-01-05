import { Actor, Engine, CollisionType, vec, randomIntInRange } from "excalibur";
import { Fruit, fruits } from "./fruit";

export class Player extends Actor {
  onInitialize(game: Engine): void {
    let currentFruit = new Fruit(
      vec(game.halfDrawWidth, 30),
      CollisionType.PreventCollision,
      fruits[randomIntInRange(0, 2)]
    );
    game.currentScene.add(currentFruit);

    game.input.pointers.primary.on("move", (evt) => {
      currentFruit.pos.x = clamp(
        evt.worldPos.x,
        50 + currentFruit.width / 2,
        game.drawWidth - 50 - currentFruit.width / 2
      );
    });

    let canClick = true;
    game.input.pointers.primary.on("down", (evt) => {
      if (!canClick) return;
      canClick = false;
      currentFruit.body.collisionType = CollisionType.Active;
      currentFruit = new Fruit(
        vec(0, 30),
        CollisionType.PreventCollision,
        fruits[randomIntInRange(0, 2)]
      );
      game.currentScene.add(currentFruit);
      currentFruit.pos.x = clamp(
        evt.worldPos.x,
        50 + currentFruit.width / 2,
        game.drawWidth - 50 - currentFruit.width / 2
      );
      currentFruit.graphics.visible = false;
      game.clock.schedule(() => {
        canClick = true;
        currentFruit.graphics.visible = true;
      }, 600);
    });
  }
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
