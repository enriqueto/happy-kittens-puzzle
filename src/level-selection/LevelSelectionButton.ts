import { GameVars } from "../GameVars";
import { LevelSelectionState } from "./LevelSelectionState";
import { GameManager } from "../GameManager";
import { AudioManager } from "../AudioManager";

export class LevelSelectionButton extends Phaser.Group {

    private level: number;

    constructor(game: Phaser.Game, level: number) {

        super(game, null, "level-selection-button");

        this.level = level;

        const isBlocked = this.level > GameVars.achievedLevel;

        if (isBlocked) {
            const blockedButtonImage = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "button-level-selection-blocked.png");
            blockedButtonImage.anchor.set(.5);
            this.add(blockedButtonImage);
        } else {
            const button = new Phaser.Button( this.game, 0, 0, "texture_atlas_1", this.onClick, this);
            button.setFrames("button-level-selection-on-on.png", "button-level-selection-on-off.png", "button-level-selection-on-on.png");
            button.anchor.set(.5);
            this.add(button);
        }

        const levelLabel = new Phaser.Text(this.game, 0, -9, this.level.toString(), { font: "60px Concert One", fill: "#FFFFFF"});
        levelLabel.anchor.set(.5);
        this.add(levelLabel);
    }

    private onClick(): void {

        if (LevelSelectionState.leavingScene) {
            return;
        }

        LevelSelectionState.leavingScene = true;

        this.game.time.events.add(150, function(): void {
            GameManager.levelSelected(this.level);
        }, this);

        AudioManager.getInstance().playSound("click");
    }
}
