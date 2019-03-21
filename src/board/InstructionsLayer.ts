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

            const instructionsStr = "MEOW! Use direction pad or numbers 2(up), 8(down), 4(left), 6(right) to move and press enter to select the kitty.";

            const instructionsLabel = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, 120, instructionsStr, { font: "22px Concert One", fill: "#FFFFFF"});
            instructionsLabel.anchor.set(.5);
            instructionsLabel.setShadow(1.25, 1.25, "rgba(0, 0, 0, 1)", 0);
            instructionsLabel.wordWrap = true;
            instructionsLabel.wordWrapWidth = 200;
            this.add(instructionsLabel);

            const removeLabel = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT - 40, "Press Enter to start playing", { font: "18px Concert One", fill: "#FF0000"});
            removeLabel.anchor.set(.5, 1);
            removeLabel.setShadow(1.25, 1.25, "rgba(0, 0, 0, 1)", 0);
            this.add(removeLabel);

            this.game.add.tween(removeLabel)
                .to({ alpha: 0}, 1000, Phaser.Easing.Cubic.In, true, 0, -1, true);
        }

        public removeInstructions(): void {
            
            if (this.inTutorial) {
                BoardState.currentInstance.instructionsLayer = null;
                BoardState.currentInstance.activateTutorial();
            }

            this.destroy();
        }
    }
}
