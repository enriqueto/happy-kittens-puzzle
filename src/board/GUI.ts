namespace SquaresOut {

    export class GUI extends Phaser.Group {

        private resetButton: Phaser.Button;
        private exitButton: Phaser.Button;

        constructor(game: Phaser.Game) {

            super(game, null, "gui");

            let audioButton: AudioButton = new AudioButton(this.game, 400, 35);
            this.add(audioButton);

            this.resetButton = new Phaser.Button( this.game, 20, 520, "texture_atlas_1", this.onResetClicked, this);
            this.resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png");
            this.resetButton.scale.y = GameVars.scaleY;
            this.add(this.resetButton);

            this.exitButton = new Phaser.Button( this.game, 20, 570, "texture_atlas_1", this.onExitClicked, this);
            this.exitButton.setFrames("button-exit-on.png", "button-exit-off.png", "button-exit-on.png");
            this.exitButton.scale.y = GameVars.scaleY;
            this.add(this.exitButton);
        }

        private onResetClicked(): void {

            LevelManager.currentInstance.resetLevel();
        }

        private onExitClicked(): void {

            LevelManager.currentInstance.exit();
        }
    }
}
