import {
  Actor,
  Color,
  CollisionType,
  Vector,
} from "excalibur";

export type FruitType = { type: string; radius: number; color: Color };
export const fruits: FruitType[] = [
  { type: "Blueberry", radius: 12, color: Color.Blue },
  { type: "Cherry", radius: 15, color: Color.Red },
  { type: "Lime", radius: 30, color: Color.Green },
  { type: "Banana", radius: 40, color: Color.Yellow },
  { type: "Orange", radius: 50, color: Color.Orange },
  { type: "Apple", radius: 70, color: Color.Red },
  { type: "Peach", radius: 80, color: Color.Rose },
  { type: "Coconut", radius: 130, color: Color.Black },
  { type: "Melon", radius: 150, color: Color.Chartreuse },
  { type: "Ananas", radius: 170, color: Color.Yellow },
  { type: "Watermelon", radius: 190, color: Color.Green },
];

export class Fruit extends Actor {
  fruitType: FruitType;

  constructor(pos: Vector, collisionType: CollisionType, fruitType: FruitType) {
    super({
      pos: pos,
      radius: fruitType.radius,
      color: fruitType.color,
      collisionType: collisionType,
    });
    this.fruitType = fruitType;
  }
}
