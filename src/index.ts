import {
  Physics,
  Engine,
  CollisionType,
  vec,
  DisplayMode,
  randomIntInRange,
  PointerScope,
} from "excalibur";
import { Level } from "./levels/level";
import { Fruit, fruits } from "./actors/fruit";

Physics.useRealisticPhysics();
Physics.gravity = vec(0, 500);
const game = new Engine({
  canvasElementId: "gameCanvas",
  width: 600,
  height: 700,
  displayMode: DisplayMode.FitScreen,
  pointerScope: PointerScope.Document,
});

const level = new Level();

let currentFruit = new Fruit(
  vec(game.halfDrawWidth, 30),
  CollisionType.PreventCollision,
  fruits[randomIntInRange(0, 2)]
);
level.add(currentFruit)

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
  level.add(currentFruit);
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

game.start().then(() => {
  game.add("level", level);
  game.goToScene("level");
});

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
