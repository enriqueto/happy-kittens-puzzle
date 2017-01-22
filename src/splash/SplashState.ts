namespace HappyKittensPuzzle {

    export class SplashState extends Phaser.State {

        public static currentInstance: SplashState;

        private leavingScene: boolean;

        public init(): void {

            SplashState.currentInstance = this;

            this.leavingScene = false;
        }

        public create(): void {

            const backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.GRUMPY));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);

            const gameTitle: Phaser.Text = this.add.text(GameConstants.GAME_WIDTH / 2, 190, "Happy Kittens Puzzle", { font: "60px Arial", fill: "#FF1493"});
            gameTitle.anchor.x = .5;

            const playButton: Phaser.Button = this.add.button( GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", this.onClickPlay, this);
            playButton.setFrames("button-play-on.png", "button-play-off.png", "button-play-on.png");
            playButton.anchor.set(.5);
            playButton.scale.y = GameVars.scaleY;
            playButton.forceOut = true;

            let audioButton: AudioButton = new AudioButton(this.game, 600, 35);
            this.add.existing(audioButton);

            const copyrightLabel: Phaser.Text = this.add.text(6, GameConstants.GAME_HEIGHT - 8, "made by ravalmatic, licensed to: " + GameConstants.SPONSOR, { font: "20px Arial", fill: "#000000"});
            copyrightLabel.angle = -90;
            copyrightLabel.alpha = .3;

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            SplashState.currentInstance = null;

            super.shutdown();
        }

        private onClickPlay(): void {

            if (this.leavingScene) {
                return;
            }

            this.leavingScene = true;

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("LevelSelection", true, false);
            }, this);
        }
    }
}
