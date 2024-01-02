import {
  Physics,
  Engine,
  CollisionType,
  vec,
  CollisionStartEvent,
  DisplayMode,
  Vector,
  randomIntInRange,
  PointerScope,
} from "excalibur";
import { Level } from "./levels/level";
import { Fruit, fruits, type FruitType } from "./actors/fruit";

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

function spawnFruit(
  position: Vector,
  collisionType: CollisionType,
  fruitType: FruitType
) {
  const fruit = new Fruit(position, collisionType, fruitType);
  fruit.on("collisionstart", (ev: CollisionStartEvent) => {
    if (
      !(ev.other instanceof Fruit) ||
      !(ev.target instanceof Fruit) ||
      ev.other.fruitType !== ev.target.fruitType ||
      ev.target.fruitType === fruits.at(-1) ||
      ev.target.isKilled()
    )
      return;

    ev.other.kill();
    ev.target.kill();
    const mergedPosition = ev.contact.points[0];
    const mergedFruitType = fruits[fruits.indexOf(ev.target.fruitType) + 1];
    spawnFruit(mergedPosition, CollisionType.Active, mergedFruitType);
  });
  level.add(fruit);
  return fruit;
}

let circle = spawnFruit(
  vec(game.halfDrawWidth, 30),
  CollisionType.PreventCollision,
  fruits[randomIntInRange(0, 2)]
);

game.input.pointers.primary.on("move", (evt) => {
  circle.pos.x = clamp(
    evt.worldPos.x,
    50 + circle.width / 2,
    game.drawWidth - 50 - circle.width / 2
  );
});

let canClick = true;
game.input.pointers.primary.on("down", (evt) => {
  if (!canClick) return;
  canClick = false;
  circle.body.collisionType = CollisionType.Active;
  circle = spawnFruit(
    vec(0, 30),
    CollisionType.PreventCollision,
    fruits[randomIntInRange(0, 2)]
  );
  circle.pos.x = clamp(
    evt.worldPos.x,
    50 + circle.width / 2,
    game.drawWidth - 50 - circle.width / 2
  );
  circle.graphics.visible = false;
  game.clock.schedule(() => {
    canClick = true;
    circle.graphics.visible = true;
  }, 600);
});

game.start().then(() => {
  game.add("level", level);
  game.goToScene("level");
});

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
