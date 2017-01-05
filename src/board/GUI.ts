namespace SquaresOut {

    export class GUI extends Phaser.Group {

        private audioButton: Phaser.Button;
        private resetButton: Phaser.Button;
        private exitButton: Phaser.Button;

        constructor(game: Phaser.Game) {

            super(game, null, "gui");

            this.audioButton = new Phaser.Button( this.game, 400, 35, "texture_atlas_1", this.onAudioButtonClicked, this);
            this.audioButton.scale.y = GameVars.scaleY;
            this.add(this.audioButton);

            if (AudioManager.getInstance().isMuted) {
               this.audioButton.setFrames("button_audio_off_on.png", "button_audio_off_off.png", "button_audio_off_on.png");
            } else {
                this.audioButton.setFrames("button_audio_on_on.png", "button_audio_on_off.png", "button_audio_on_on.png");
            }

            this.resetButton = new Phaser.Button( this.game, 20, 520, "texture_atlas_1", this.onResetClicked, this);
            this.resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png");
            this.resetButton.scale.y = GameVars.scaleY;
            this.add(this.resetButton);

            this.exitButton = new Phaser.Button( this.game, 20, 570, "texture_atlas_1", this.onExitClicked, this);
            this.exitButton.setFrames("button-exit-on.png", "button-exit-off.png", "button-exit-on.png");
            this.exitButton.scale.y = GameVars.scaleY;
            this.add(this.exitButton);
        }

        private onAudioButtonClicked(): void {

             if (AudioManager.getInstance().isMuted) {
                AudioManager.getInstance().unmute();
                this.audioButton.setFrames("button_audio_on_on.png", "button_audio_on_off.png", "button_audio_on_on.png");
             } else {
                AudioManager.getInstance().mute();
                this.audioButton.setFrames("button_audio_off_on.png", "button_audio_off_off.png", "button_audio_off_on.png");
            }
        }

        private onResetClicked(): void {

            LevelManager.currentInstance.resetLevel();
        }

        private onExitClicked(): void {

            LevelManager.currentInstance.exit();
        }
    }
}
