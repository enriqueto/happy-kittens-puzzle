import { GameVars } from "../GameVars";
import { LevelSelectionButton } from "./LevelSelectionButton";

export class LevelsContainer extends Phaser.Group {

    public i: number;

    constructor(game: Phaser.Game, i: number) {

        super(game, null, "level-container");

        this.i = i;
        this.scale.y = GameVars.scaleY;

        let levelSelectionButton: LevelSelectionButton;

        for (let col = 0; col < 3; col++) {
            for (let row = 0; row < 4; row++) {

                levelSelectionButton = new LevelSelectionButton(this.game, this.i * 12 + (col + 1 ) + 3 * row);
                levelSelectionButton.x =  - 140 * (1 - col);
                levelSelectionButton.y =  - 140 * (1.5 - row);
                this.add(levelSelectionButton);
            }
        }
    }
}
