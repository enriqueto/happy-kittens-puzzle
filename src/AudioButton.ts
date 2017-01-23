namespace HappyKittensPuzzle {

    export class AudioButton extends Phaser.Group {

        private button: Phaser.Button;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, null, "audio-button");

            this.button = new Phaser.Button(this.game, x, y, "texture_atlas_1", this.onAudioButtonClicked, this);

            if (AudioManager.getInstance().isMuted) {
               this.button.setFrames("button_audio_off_on.png", "button_audio_off_off.png", "button_audio_off_on.png");
            } else {
                this.button.setFrames("button_audio_on_on.png", "button_audio_on_off.png", "button_audio_on_on.png");
            }

            this.add(this.button);
        }

        private onAudioButtonClicked(): void {

             if (AudioManager.getInstance().isMuted) {
                AudioManager.getInstance().unmute();
                this.button.setFrames("button_audio_on_on.png", "button_audio_on_off.png", "button_audio_on_on.png");
             } else {
                AudioManager.getInstance().mute();
                this.button.setFrames("button_audio_off_on.png", "button_audio_off_off.png", "button_audio_off_on.png");
            }
        }
    }
}
