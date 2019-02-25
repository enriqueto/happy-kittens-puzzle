namespace HappyKittensPuzzle {

    export class AudioButton extends Phaser.Group {

        public static PX: number = 86;
        public static PY: number = 6.25;

        public button: Phaser.Button;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, null, "audio-button");

            this.button = new Phaser.Button(this.game, x, y, "texture_atlas_1", this.onClick, this);
            this.button.name = "audio";

            if (AudioManager.getInstance().isMuted) {
                this.button.setFrames("button-audio-off-on.png", "button-audio-off-off.png", "button-audio-off-on.png");
            } else {
                this.button.setFrames("button-audio-on-on.png", "button-audio-on-off.png", "button-audio-on-on.png");
            }

            this.button.forceOut = true;

            this.add(this.button);

            let mark = new Phaser.Image(this.game, -5, -5, "texture_atlas_1", "button-audio-mark.png");
            mark.visible = false;
            this.button.addChild(mark);
        }

        public onClick(b: Phaser.Button): void {

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
