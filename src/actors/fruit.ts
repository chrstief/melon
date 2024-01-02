import {
  Actor,
  Color,
  CollisionType,
  Vector,
} from "excalibur";

export type FruitType = { type: string; radius: number; color: Color };
export const fruits: FruitType[] = [
  { type: "Blueberry", radius: 10, color: Color.Blue },
  { type: "Cherry", radius: 20, color: Color.Red },
  { type: "Lime", radius: 30, color: Color.Green },
  { type: "Orange", radius: 40, color: Color.Orange },
  { type: "Orange", radius: 50, color: Color.Viridian },
  { type: "Orange", radius: 60, color: Color.Chartreuse },
  { type: "Orange", radius: 70, color: Color.Cyan },
  { type: "Orange", radius: 80, color: Color.Magenta },
  { type: "Orange", radius: 90, color: Color.Rose },
  { type: "Orange", radius: 100, color: Color.Vermilion },
  { type: "Orange", radius: 110, color: Color.Yellow },
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
