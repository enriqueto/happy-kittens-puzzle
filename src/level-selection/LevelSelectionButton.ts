namespace HappyKittensPuzzle {

    export class LevelSelectionButton extends Phaser.Group {

        private static leavingScene: boolean = false;

        private level: number;

        constructor(game: Phaser.Game, level: number) {

            super(game, null, "level-selection-button");

            this.level = level;

            let isBlocked: boolean = GameVars.levelsBestResults[level - 1] === -1 ? true : false;

            if (isBlocked) {
                const blockedButtonImage: Phaser.Image = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "button-level-selection-blocked.png");
                blockedButtonImage.anchor.set(.5);
                this.add(blockedButtonImage);
            } else {
                const button: Phaser.Button = new Phaser.Button( this.game, 0, 0, "texture_atlas_1", this.onClick, this);
                button.setFrames("button-level-selection-on-on.png", "button-level-selection-on-off.png", "button-level-selection-on-on.png");
                button.anchor.set(.5);
                this.add(button);
            }

            let levelLabel: Phaser.Text = new Phaser.Text(this.game, 0, -9, this.level.toString(), { font: "60px Concert One", fill: "#FFFFFF"});
            levelLabel.anchor.set(.5);
            this.add(levelLabel);
        }

        private onClick(): void {

            if (LevelSelectionButton.leavingScene) {
                return;
            }

            this.game.time.events.add(150, function(): void {
                GameManager.levelSelected(this.level);
            }, this);
        }
    }
}
