namespace SquaresOut {

    export class SplashState extends Phaser.State {

        public static currentInstance: SplashState;

        private audioButton: Phaser.Button;

        public init(): void {

            SplashState.currentInstance = this;
        }

        public create(): void {

            let backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);

            let gameTitle: Phaser.Text = this.add.text(GameConstants.GAME_WIDTH / 2, 100, "Red Squares Out!", { font: "40px Arial", fill: "#FF1493"});
            gameTitle.anchor.x = .5;

            let playButton: Phaser.Button = this.add.button( GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", this.onClickPlay, this);
            playButton.setFrames("button-play-on.png", "button-play-off.png", "button-play-on.png");
            playButton.anchor.set(.5);
            playButton.forceOut = true;

            this.audioButton = this.add.button(300, 35, "texture_atlas_1", this.onAudioButtonClicked, this);

            if (AudioManager.getInstance().isMuted) {
               this.audioButton.setFrames("button_audio_off_on.png", "button_audio_off_off.png", "button_audio_off_on.png");
            } else {
                this.audioButton.setFrames("button_audio_on_on.png", "button_audio_on_off.png", "button_audio_on_on.png");
            }

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            SplashState.currentInstance = null;

            super.shutdown();
        }

        private onClickPlay(): void {

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("LevelSelection", true, false);
            }, this);
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
    }
}
