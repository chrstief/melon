import {
  Actor,
  Engine,
  CollisionType,
  vec,
  randomIntInRange,
  Color,
  PointerEvent,
  Vector,
  Gamepad,
  Axes,
  GamepadAxisEvent,
  Buttons,
} from "excalibur";
import { Fruit, fruits } from "./fruit";

export class Player extends Actor {
  inputDevice: "Mouse" | Gamepad;
  bottomLeftCorner: Vector;
  leftBoundary = 0;
  rightBoundary = 0;

  constructor(args: { inputMethod: "Mouse" | Gamepad; color: Color }) {
    super({ width: 100, height: 50, color: args.color });
    this.inputDevice = args.inputMethod;
    this.bottomLeftCorner = vec(-this.width / 2, this.height / 2);
  }

  onInitialize(game: Engine): void {
    this.pos = vec(game.halfDrawWidth, 30);
    this.spawnFruit();
    if (this.inputDevice instanceof Gamepad) {
      this.inputDevice.on("axis", this.move.bind(this));
      this.inputDevice.on("button", (be: ex.GamepadButtonEvent) => {
        if (be.button === Buttons.Face1) {
          this.dropHeldFruit();
        }
      });
    } else {
      game.input.pointers.primary.on("move", this.followMouse.bind(this));
      game.input.pointers.primary.on("down", this.dropHeldFruit.bind(this));
    }
  }

  onPostUpdate(_engine: Engine, _delta: number): void {
    this.pos.x = clamp(
      this.pos.x,
      this.leftBoundary + this.width / 2,
      this.rightBoundary + this.width / 2
    );
  }

  private spawnFruit() {
    this.addChild(
      new Fruit({
        pos: this.bottomLeftCorner,
        fruitType: fruits[randomIntInRange(0, 2)],
      })
    );
    this.updateBoundaries();
  }

  private updateBoundaries() {
    let heldFruitOffset = 0;
    const heldFruit = this.children.at(0);
    if (heldFruit && heldFruit instanceof Fruit)
      heldFruitOffset = heldFruit.width / 2;
    this.leftBoundary = 50 + heldFruitOffset;
    this.rightBoundary = this.scene.engine.drawWidth - 50 - heldFruitOffset;
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

  private followMouse(evt: PointerEvent) {
    const x = clamp(evt.worldPos.x, this.leftBoundary, this.rightBoundary);
    this.pos.x = x + this.width / 2;
  }

  private move(ae: GamepadAxisEvent) {
    if (ae.axis !== Axes.LeftStickX) return;
    this.vel.x = 200 * ae.value;
  }
}

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}
