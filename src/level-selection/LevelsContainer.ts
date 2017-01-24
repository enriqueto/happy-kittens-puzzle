namespace HappyKittensPuzzle {

    export class LevelsContainer extends Phaser.Group {

        constructor(game: Phaser.Game, i: number) {

            super(game, null, "level-container");

            this.scale.y = GameVars.scaleY;

            let levelSelectionButton: LevelSelectionButton;

            for (let col: number = 0; col < 3; col++) {
                for (let row: number = 0; row < 4; row++) {

                    levelSelectionButton = new LevelSelectionButton(this.game, i * 12 + (col + 1 ) + 3 * row);
                    levelSelectionButton.x =  - 140 * (1 - col);
                    levelSelectionButton.y =  - 140 * (1.5 - row);
                    this.add(levelSelectionButton);
                }
            }
        }
    }
}
