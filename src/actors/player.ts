import {
  Actor,
  Engine,
  CollisionType,
  vec,
  randomIntInRange,
  Color,
  PointerEvent,
  Vector,
} from "excalibur";
import { Fruit, fruits } from "./fruit";

export class Player extends Actor {
  bottomLeftCorner: Vector;

  constructor(args: { color: Color }) {
    super({ width: 100, height: 50, color: args.color });
    this.bottomLeftCorner = vec(-this.width / 2, this.height / 2);
  }

  onInitialize(game: Engine): void {
    this.pos = vec(game.halfDrawWidth, 30);
    this.spawnFruit();

    game.input.pointers.primary.on("move", this.move.bind(this));
    game.input.pointers.primary.on("down", this.dropHeldFruit.bind(this));
  }

  private spawnFruit() {
    this.addChild(
      new Fruit({
        pos: this.bottomLeftCorner,
        fruitType: fruits[randomIntInRange(0, 2)],
      })
    );
  }

  private dropHeldFruit() {
    const heldFruit = this.children.at(0);
    if (!heldFruit || !(heldFruit instanceof Fruit)) return;
    heldFruit.unparent();
    this.scene.add(heldFruit);
    heldFruit.pos = this.pos.add(this.bottomLeftCorner);
    heldFruit.body.collisionType = CollisionType.Active;

    this.scene.engine.clock.schedule(() => {
      this.spawnFruit();
    }, 600);
  }

  private move(evt: PointerEvent) {
    let heldFruitOffset = 0;
    const heldFruit = this.children.at(0);
    if (heldFruit && heldFruit instanceof Fruit)
      heldFruitOffset = heldFruit.width / 2;
    const leftBoundary = 50 + heldFruitOffset;
    const rightBoundary = this.scene.engine.drawWidth - 50 - heldFruitOffset;
    const x = clamp(evt.worldPos.x, leftBoundary, rightBoundary);
    this.pos.x = x + this.width / 2;
  }
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
