import { Engine, Actor, Color, CollisionType, vec, Scene } from "excalibur";
import { Player } from "../actors/player";

export class Level extends Scene {
  onInitialize(game: Engine) {
    const ground = new Actor({
      pos: vec(game.halfDrawWidth, game.drawHeight),
      width: game.drawWidth,
      height: 100,
      color: Color.DarkGray,
      collisionType: CollisionType.Fixed,
    });
    game.add(ground);
    const leftWall = new Actor({
      pos: vec(0, game.halfDrawHeight),
      width: 100,
      height: game.drawHeight,
      color: Color.DarkGray,
      collisionType: CollisionType.Fixed,
    });
    game.add(leftWall);
    const rightWall = new Actor({
      pos: vec(game.drawWidth, game.halfDrawHeight),
      width: 100,
      height: game.drawHeight,
      color: Color.DarkGray,
      collisionType: CollisionType.Fixed,
    });
    game.add(rightWall);

    game.add(new Player({ inputMethod: "Mouse", color: Color.White }));
    // const gamePad1 = game.input.gamepads.at(0);
    // const gamePad2 = game.input.gamepads.at(1);
    // const gamePad3 = game.input.gamepads.at(2);
    // const gamePad4 = game.input.gamepads.at(3);
    // game.add(new Player({ inputMethod: gamePad1, color: Color.White }));
    // game.add(new Player({ inputMethod: gamePad2, color: Color.Orange }));

    
  }
}
