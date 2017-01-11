namespace SquaresOut {

    export class LevelSelectionButton extends Phaser.Group {

        private static leavingScene: boolean = false;

        private level: number;
        private buttonSprite: Phaser.Sprite;

        constructor(game: Phaser.Game, level: number) {

            super(game, null, "level-selection-button");

            this.level = level;

            let isBlocked: boolean = GameVars.levelsBestResults[level - 1] === -1 ? true : false;

            this.buttonSprite = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.RED_SQUARE));
            this.buttonSprite.scale.set(70 / 65);
            this.buttonSprite.anchor.set(.5);
            this.buttonSprite.inputEnabled = true;

            if (!isBlocked) {

                this.buttonSprite.events.onInputDown.add(this.onClick, this);

                if (this.game.device.desktop) {
                    this.buttonSprite.events.onInputOver.add(this.onOver, this);
                    this.buttonSprite.events.onInputOut.add(this.onOut, this);
                }
            }

            this.add(this.buttonSprite);

            let levelLabel: Phaser.Text = new Phaser.Text(this.game, 0, 0, this.level.toString(), { font: "30px Arial", fill: "#FFFFFF"});
            levelLabel.anchor.set(.5);

            if (isBlocked) {
                levelLabel.alpha = .5;
            }

            this.add(levelLabel);
        }

        private onClick(): void {

            if (LevelSelectionButton.leavingScene) {
                return;
            }

            LevelSelectionButton.leavingScene = true;

            this.buttonSprite.loadTexture(this.game.cache.getBitmapData(GameConstants.BLUE_SQUARE));

            this.game.time.events.add(150, function(): void {
                GameManager.levelSelected(this.level);
            }, this);
        }

        private onOver(): void {
            this.buttonSprite.loadTexture( this.game.cache.getBitmapData(GameConstants.GREEN_SQUARE));
        }

        private onOut(): void {
            this.buttonSprite.loadTexture( this.game.cache.getBitmapData(GameConstants.RED_SQUARE));
        }
    }
}
