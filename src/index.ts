import { Physics, Engine, vec, DisplayMode, PointerScope } from "excalibur";
import { Level } from "./levels/level";

Physics.useRealisticPhysics();
Physics.gravity = vec(0, 500);
const game = new Engine({
  canvasElementId: "gameCanvas",
  width: 600,
  height: 700,
  displayMode: DisplayMode.FitScreen,
  pointerScope: PointerScope.Document,
});
game.add("level", new Level());
game.start();
game.goToScene("level");
