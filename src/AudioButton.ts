namespace HappyKittensPuzzle {

    export class AudioButton extends Phaser.Group {

        public static PX: number = 275;
        public static PY: number = 20;

        private button: Phaser.Button;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, null, "audio-button");

            this.button = new Phaser.Button(this.game, x, y, "texture_atlas_1", this.onAudioButtonClicked, this);

            if (AudioManager.getInstance().isMuted) {
                this.button.setFrames("button-audio-off-on.png", "button-audio-off-off.png", "button-audio-off-on.png");
            } else {
                this.button.setFrames("button-audio-on-on.png", "button-audio-on-off.png", "button-audio-on-on.png");
            }

            this.button.forceOut = true;

            this.add(this.button);
        }

        private onAudioButtonClicked(b: Phaser.Button): void {

            b.clearFrames();

            if (AudioManager.getInstance().isMuted) {
                AudioManager.getInstance().unmute();
                this.button.setFrames("button-audio-on-on.png", "button-audio-on-off.png", "button-audio-on-on.png");
            } else {
                AudioManager.getInstance().mute();
                this.button.setFrames("button-audio-off-on.png", "button-audio-off-off.png", "button-audio-off-on.png");
            }
        }
    }
}
