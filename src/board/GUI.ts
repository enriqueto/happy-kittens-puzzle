import { AudioButton } from "../AudioButton";
import { GameConstants } from "../GameConstants";
import { GameVars } from "../GameVars";
import { BoardState } from "./BoardState";
import { AudioManager } from "../AudioManager";
import { BoardManager } from "./BoardManager";

export class GUI extends Phaser.Group {

    private resetButton: Phaser.Button;

    constructor(game: Phaser.Game) {

        super(game, null, "gui");

        this.resetButton = new Phaser.Button(this.game, 270 / GameVars.stripesScale, 16, "texture_atlas_1", this.onResetClicked, this);
        this.resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png");
        
        BoardState.currentInstance.hud.lowerStripe.add(this.resetButton);
    }

    private onResetClicked(): void {

        AudioManager.getInstance().playSound("click");

        BoardManager.resetLevel();
    }
}
