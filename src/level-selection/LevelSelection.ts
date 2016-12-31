namespace SquaresOut {

    export class LevelSelection extends Phaser.State {

        public static currentInstance: LevelSelection;

        private static PREVIOUS: string = "previous";
        private static NEXT: string = "previous";

        private audioButton: Phaser.Button;
        private levelsRail: Phaser.Group;
        private nextButton: Phaser.Button;
        private previousButton: Phaser.Button;

        public init(): void {

            LevelSelection.currentInstance = this;
        }

        public create(): void {

            let backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);

            this.levelsRail = new Phaser.Group(this.game);
            this.add.existing(this.levelsRail);

            let levelsContainer: LevelsContainer;
            for (let i: number = 0; i < 5; i++) {
                levelsContainer = new LevelsContainer(this.game);
                this.levelsRail.add(levelsContainer);
            }

            this.previousButton = this.add.button(60, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", this.onArrowClick, this);
            this.previousButton.anchor.set(.5);
            this.previousButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-on.png");
            this.previousButton.scale.set(-1, GameVars.scaleY);
            this.previousButton.name = LevelSelection.PREVIOUS;

            this.nextButton = this.add.button(420, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", this.onArrowClick, this);
            this.nextButton.anchor.set(.5);
            this.nextButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-on.png");
            this.nextButton.scale.y = GameVars.scaleY;
            this.previousButton.name = LevelSelection.NEXT;

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

        private onArrowClick(b: Phaser.Button): void {

            if (b.name === LevelSelection.PREVIOUS){
                //
            } else {
                //
            }
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
