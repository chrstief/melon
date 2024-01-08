import { Loader, Color } from "excalibur";
import { fruits } from "../actors/fruit";

export const loader = new Loader();
fruits.forEach((emoji) => {
  loader.addResource(emoji.imageSource);
});
loader.loadingBarColor = Color.Black;
loader.backgroundColor = Color.White.toString();
loader.suppressPlayButton = true;
loader.logo =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
