namespace HappyKittensPuzzle {

    export class GUI extends Phaser.Group {

        private resetButton: Phaser.Button;
        private exitButton: Phaser.Button;

        constructor(game: Phaser.Game) {

            super(game, null, "gui");

            const audioButton = new AudioButton(this.game, AudioButton.PX / GameVars.stripesScale, AudioButton.PY);
            
            let yellowStripe = BoardState.currentInstance.hud.yellowStripe;
            yellowStripe.add(audioButton);

            let lowerStripe = BoardState.currentInstance.hud.lowerStripe;

            this.exitButton = new Phaser.Button(this.game, 60 / GameVars.stripesScale, 5, "texture_atlas_1", this.onExitClicked, this);
            this.exitButton.setFrames("button-exit-on.png", "button-exit-off.png", "button-exit-on.png", "button-exit-off.png");
            lowerStripe.add(this.exitButton);

            this.resetButton = new Phaser.Button(this.game, 84.375 / GameVars.stripesScale, 5, "texture_atlas_1", this.onResetClicked, this);
            this.resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png", "button-reset-off.png");
            lowerStripe.add(this.resetButton);
        }

        private onResetClicked(): void {

            AudioManager.getInstance().playSound("click");

            BoardManager.resetLevel();
        }

        private onExitClicked(): void {

            AudioManager.getInstance().playSound("click");

            BoardManager.exit();
        }
    }
}
