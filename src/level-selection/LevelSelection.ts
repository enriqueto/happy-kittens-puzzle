namespace SquaresOut {

    export class LevelSelection extends Phaser.State {

        public static currentInstance: LevelSelection;

        public init(): void {

            LevelSelection.currentInstance = this;
        }

        public create(): void {

            let backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);

            let levelsContainer: LevelsContainer = new LevelsContainer(this.game);
            this.add.existing(levelsContainer);

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
    }
}
