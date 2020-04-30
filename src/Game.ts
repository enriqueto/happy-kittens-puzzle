import { GameConstants } from "./GameConstants";
import { PreLoader } from "./PreLoader";
import { LevelSelectionState } from "./level-selection/LevelSelectionState";
import { LevelEditionState } from "./levelEditionState/LevelEditionState";
import { BoardState } from "./board/BoardState";
import { Boot } from "./Boot";

export class Game extends Phaser.Game {

    public static currentInstance: Game;

    constructor() {

        super(GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT, Phaser.AUTO , "content", null, false, true);

        Game.currentInstance = this;

        this.state.add("PreLoader", PreLoader, false);
        this.state.add("LevelSelectionState", LevelSelectionState, false);
        this.state.add("LevelEditionState", LevelEditionState, false);
        this.state.add("BoardState", BoardState, false);

        this.state.add("Boot", Boot, true);
    }
}
