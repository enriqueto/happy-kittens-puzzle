namespace SquaresOut {

    export class LevelSelection extends Phaser.State {

        public static currentInstance: LevelSelection;

        private static PREVIOUS: string = "previous";
        private static NEXT: string = "previous";
        private static LEVEL_PAGES: number = 5;

        private levelsRail: Phaser.Group;
        private nextButton: Phaser.Button;
        private previousButton: Phaser.Button;
        private indexLevelsPage: number;
        private tweening: boolean;

        public init(): void {

            LevelSelection.currentInstance = this;

            this.tweening = false;

            // TODO sacar esto del ultimo nivel abierto
            this.indexLevelsPage = 0;
        }

        public create(): void {

            let backgroundSprite: Phaser.Sprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);

            this.levelsRail = new Phaser.Group(this.game);
            this.add.existing(this.levelsRail);

            let levelsContainer: LevelsContainer;
            for (let i: number = 0; i < LevelSelection.LEVEL_PAGES; i++) {
                levelsContainer = new LevelsContainer(this.game, i);

                levelsContainer.x = GameConstants.GAME_WIDTH * (.5 + i);
                levelsContainer.y = GameConstants.GAME_HEIGHT / 2;

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

            let audioButton: AudioButton = new AudioButton(this.game, 400, 35);
            this.add.existing(audioButton);

            this.setCurrentLevelPage();

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

        private setCurrentLevelPage(): void {

            this.previousButton.visible = false;
        }

        private onArrowClick(b: Phaser.Button): void {

            if (this.tweening) {
                return;
            }

            this.tweening = true;

            let px: number = this.levelsRail.x;

            if (b.name === LevelSelection.PREVIOUS) {
                px += GameConstants.GAME_WIDTH;
                this.indexLevelsPage--;
            } else {
                px -= GameConstants.GAME_WIDTH;
                this.indexLevelsPage++;
            }

            if (this.indexLevelsPage === 0) {
                this.previousButton.visible = false;
            }else if (this.indexLevelsPage === LevelSelection.LEVEL_PAGES - 1) {
                this.nextButton.visible = false;
            }else {
                this.previousButton.visible = true;
                this.nextButton.visible = true;
            }

            this.game.add.tween(this.levelsRail)
                .to({ x: px}, 350, Phaser.Easing.Quadratic.Out, true)
                .onComplete.add(function(): void {
                    this.tweening = false;
                }, this);
        }
    }
}
