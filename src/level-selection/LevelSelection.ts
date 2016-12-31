namespace SquaresOut {

    export class LevelSelection extends Phaser.State {

        public static currentInstance: LevelSelection;

        private audioButton: Phaser.Button;

        public init(): void {

            LevelSelection.currentInstance = this;
        }

        public create(): void {

            let backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);

            let levelsContainer: LevelsContainer = new LevelsContainer(this.game);
            this.add.existing(levelsContainer);

            this.audioButton = this.add.button(400, 35, "texture_atlas_1", this.onAudioButtonClicked, this);
            this.audioButton.scale.y = GameVars.scaleY;

            if (AudioManager.getInstance().isMuted) {
               this.audioButton.setFrames("button_audio_off_on.png", "button_audio_off_off.png", "button_audio_off_on.png");
            } else {
                this.audioButton.setFrames("button_audio_on_on.png", "button_audio_on_off.png", "button_audio_on_on.png");
            }

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            LevelSelection.currentInstance = null;

            super.shutdown();
        }

        public goToBoardScene(): void {

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("BoardState", true, false);
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
