namespace HappyKittensPuzzle {

    export class GUI extends Phaser.Group {

        private resetButton: Phaser.Button;
        private exitButton: Phaser.Button;

        constructor(game: Phaser.Game) {

            super(game, null, "gui");

            let audioButton: AudioButton = new AudioButton(this.game, AudioButton.PX / GameVars.stripesScale, AudioButton.PY);
            let yellowStripe: YellowStripe = BoardState.currentInstance.hud.yellowStripe;
            yellowStripe.add(audioButton);

            let lowerStripe: YellowStripe = BoardState.currentInstance.hud.lowerStripe;

            this.exitButton = new Phaser.Button(this.game, -340 / GameVars.stripesScale, 16, "texture_atlas_1", this.onExitClicked, this);
            this.exitButton.setFrames("button-exit-on.png", "button-exit-off.png", "button-exit-on.png");
            lowerStripe.add(this.exitButton);

            this.resetButton = new Phaser.Button(this.game, -260 / GameVars.stripesScale, 16, "texture_atlas_1", this.onResetClicked, this);
            this.resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png");
            lowerStripe.add(this.resetButton);
        }

        private onResetClicked(): void {

            BoardManager.currentInstance.resetLevel();
        }

        private onExitClicked(): void {

            BoardManager.currentInstance.exit();
        }
    }
}
