namespace HappyKittensPuzzle {

    export class InstructionsLayer extends Phaser.Group {

        private inTutorial: boolean;

        constructor(game: Phaser.Game, inTutorial?: boolean) {

            super(game, null, "instructions");

            this.inTutorial = inTutorial || false;

            const background = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
            background.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);
            background.alpha = .85;
            background.inputEnabled = true;
            background.events.onInputDown.add(function(): void {
                //
            }, this);
            this.add(background);

            const instructionsStr = "MEOW! use the keys 1, 2, 3, 4 to select the kitty, blah, blah, blah...";

            const instructionsLabel = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, 120, instructionsStr, { font: "28px Concert One", fill: "#FFFFFF"});
            instructionsLabel.anchor.set(.5);
            instructionsLabel.setShadow(1.25, 1.25, "rgba(0, 0, 0, 1)", 0);
            instructionsLabel.wordWrap = true;
            instructionsLabel.wordWrapWidth = 180;
            this.add(instructionsLabel);

            const button = new Phaser.Button( this.game, GameConstants.GAME_WIDTH / 2, 280, "texture_atlas_1", this.removeInstructions, this);
            button.setFrames("button-level-selection-on-on.png", "button-level-selection-on-off.png", "button-level-selection-on-on.png");
            button.anchor.set(.5);
            this.add(button);
        }

        private removeInstructions(b: Phaser.Button): void {

            b.clearFrames();
            
            if (this.inTutorial) {
                BoardState.currentInstance.instructionsLayer = null;
                BoardState.currentInstance.activateTutorial();
            }

            this.destroy();
        }
    }
}
