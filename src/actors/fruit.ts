import {
  Actor,
  CollisionType,
  Vector,
  Engine,
  CollisionStartEvent,
  ImageSource,
  Sprite,
} from "excalibur";

export type FruitType = {
  type: string;
  radius: number;
  imageSource: ImageSource;
};
export const fruits: FruitType[] = [
  { type: "🙂", radius: 12 },
  { type: "😇", radius: 15 },
  { type: "😂", radius: 30 },
  { type: "😷", radius: 40 },
  { type: "😘", radius: 50 },
  { type: "😵", radius: 70 },
  { type: "😬", radius: 80 },
  { type: "😶", radius: 130 },
  { type: "😋", radius: 150 },
  { type: "🤑", radius: 170 },
  { type: "😲", radius: 190 },
].map((emoji) => ({
  ...emoji,
  imageSource: new ImageSource(
    `https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/${emoji.type
      .codePointAt(0)!
      .toString(16)}.svg`
  ),
}));

export class Fruit extends Actor {
  fruitType: FruitType;

  constructor(args: { pos: Vector; fruitType: FruitType }) {
    super({
      pos: args.pos,
      radius: args.fruitType.radius,
      collisionType: CollisionType.PreventCollision,
    });
    this.fruitType = args.fruitType;
  }

  onInitialize(game: Engine): void {
    this.graphics.use(
      new Sprite({
        image: this.fruitType.imageSource,
        destSize: {
          width: this.width,
          height: this.height,
        },
      })
    );

    if (this.fruitType === fruits.at(-1)) return;
    this.on("collisionstart", (ev: CollisionStartEvent) => {
      if (
        !(ev.other instanceof Fruit) ||
        ev.other.fruitType !== this.fruitType ||
        ev.other.isKilled() ||
        this.isKilled()
      )
        return;

      ev.other.kill();
      this.kill();
      const mergedFruit = new Fruit({
        pos: ev.contact.points[0],
        fruitType: fruits[fruits.indexOf(this.fruitType) + 1],
      });
      mergedFruit.body.collisionType = CollisionType.Active;
      game.currentScene.add(mergedFruit);
    });
  }
}
