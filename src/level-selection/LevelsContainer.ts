namespace SquaresOut {

    export class LevelsContainer extends Phaser.Group {

        constructor(game: Phaser.Game) {

            super(game, null, "level-container");

            let levelSelectionButton: LevelSelectionButton;

            for (let col: number = 0; col < 3; col++) {
                for (let row: number = 0; row < 4; row++) {

                    levelSelectionButton = new LevelSelectionButton(this.game, (col + 1 ) + 3 * row);
                    levelSelectionButton.x = GameConstants.GAME_WIDTH / 2 - 80 * (1 - col);
                    levelSelectionButton.y = GameConstants.GAME_HEIGHT / 2 - 80 * ( 2 - row);
                    this.add(levelSelectionButton);
                }
            }
        }
    }
}
