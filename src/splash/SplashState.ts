namespace Xhungo {

    export class SplashState extends Phaser.State {

        public static currentInstance: SplashState;

        public init(): void {

            SplashState.currentInstance = this;
        }

        public create(): void {

            let backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData("yellow-gradient"));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 16, GameConstants.GAME_HEIGHT / 128);

            let gameTitle: Phaser.Text = this.add.text(GameConstants.GAME_WIDTH / 2, 100, "Xhungo", { font: "80px Arial", fill: "#FF1493"});
            gameTitle.anchor.x = .5;
        }

        public shutdown(): void {

            SplashState.currentInstance = null;

            super.shutdown();
        }
    }
}
