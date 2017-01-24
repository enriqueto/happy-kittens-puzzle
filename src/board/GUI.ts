namespace HappyKittensPuzzle {

    export class GUI extends Phaser.Group {

        private resetButton: Phaser.Button;
        private exitButton: Phaser.Button;

        constructor(game: Phaser.Game) {

            super(game, null, "gui");

            let audioButton: AudioButton = new AudioButton(this.game, 640, 20);
            let yellowStripe: YellowStripe = BoardState.currentInstance.hud.yellowStripe;
            yellowStripe.add(audioButton);

            this.exitButton = new Phaser.Button( this.game, 40, 914, "texture_atlas_1", this.onExitClicked, this);
            this.exitButton.setFrames("button-exit-on.png", "button-exit-off.png", "button-exit-on.png");
            this.exitButton.scale.y = GameVars.scaleY;
            this.add(this.exitButton);

            this.resetButton = new Phaser.Button( this.game, 140, 914, "texture_atlas_1", this.onResetClicked, this);
            this.resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png");
            this.resetButton.scale.y = GameVars.scaleY;
            this.add(this.resetButton);
        }

        private onResetClicked(): void {

            LevelManager.currentInstance.resetLevel();
        }

        private onExitClicked(): void {

            LevelManager.currentInstance.exit();
        }
    }
}
