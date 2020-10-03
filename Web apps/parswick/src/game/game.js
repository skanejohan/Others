import { Title } from "../framework/content/title.js";

export { Game };

class Game { }

Game.startLocation = "fictionSection";
Game.startMessage = "Welcome to Parswick Books";
Game.startCutscene = "intro";
Game.startGoal = "office";
Game.title = new Title("Parswick Books", 100, 100);