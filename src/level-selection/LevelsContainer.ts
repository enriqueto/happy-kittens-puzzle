namespace SquaresOut {

    export class LevelsContainer extends Phaser.Group {

        constructor(game: Phaser.Game) {

            super(game, null, "level-container");

            let levelSelectionButton: LevelSelectionButton = new LevelSelectionButton(this.game, 1);
            levelSelectionButton.x = 100;
            levelSelectionButton.y = 100;
            this.add(levelSelectionButton);
        }
    }
}
