namespace SquaresOut {

    export class LevelSelection extends Phaser.State {

        public static currentInstance: LevelSelection;

        public init(): void {

            LevelSelection.currentInstance = this;
        }

        public create(): void {

            let backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);
        }

        public shutdown(): void {

            LevelSelection.currentInstance = null;

            super.shutdown();
        }
    }
}
