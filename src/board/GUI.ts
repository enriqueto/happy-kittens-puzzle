namespace HappyKittensPuzzle {

    export class GUI extends Phaser.Group {

        public resetButton: Phaser.Button;
        public exitButton: Phaser.Button;
        public audioButton: AudioButton;

        constructor(game: Phaser.Game) {

            super(game, null, "gui");

            this.audioButton = new AudioButton(this.game, AudioButton.PX / GameVars.stripesScale, AudioButton.PY);
            
            let yellowStripe = BoardState.currentInstance.hud.yellowStripe;
            yellowStripe.add(this.audioButton);

            let lowerStripe = BoardState.currentInstance.hud.lowerStripe;

            this.exitButton = new Phaser.Button(this.game, 50 / GameVars.stripesScale, 5, "texture_atlas_1", this.onClick, this);
            this.exitButton.setFrames("button-exit-on.png", "button-exit-off.png", "button-exit-on.png", "button-exit-off.png");
            this.exitButton.name = "exit";
            lowerStripe.add(this.exitButton);

            let mark = new Phaser.Image(this.game, -5, -5, "texture_atlas_1", "button-audio-mark.png");
            mark.visible = false;
            this.exitButton.addChild(mark);

            this.resetButton = new Phaser.Button(this.game, 84.375 / GameVars.stripesScale, 5, "texture_atlas_1", this.onClick, this);
            this.resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png", "button-reset-off.png");
            this.resetButton.name = "reset";
            lowerStripe.add(this.resetButton);

            mark = new Phaser.Image(this.game, -5, -5, "texture_atlas_1", "button-audio-mark.png");
            mark.visible = false;
            this.resetButton.addChild(mark);
        }

        private onClick(b: Phaser.Button): void {

            if (b.name === "exit") {
                BoardManager.exit();
            } else {
                BoardManager.resetLevel();
            }

            AudioManager.getInstance().playSound("click");
        }
    }
}
