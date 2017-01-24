namespace HappyKittensPuzzle {

    export class LevelSelectionState extends Phaser.State {

        public static currentInstance: LevelSelectionState;

        private static PREVIOUS: string = "previous";
        private static NEXT: string = "previous";
        private static LEVEL_PAGES: number = 5;

        private levelsRail: Phaser.Group;
        private nextButton: Phaser.Button;
        private previousButton: Phaser.Button;
        private indexLevelsPage: number;
        private tweening: boolean;

        public init(): void {

            LevelSelectionState.currentInstance = this;

            this.tweening = false;
        }

        public create(): void {

            let backgroundImage: Phaser.Image = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board_menu.png");
            backgroundImage.anchor.set(.5);
            backgroundImage.scale.y = GameVars.scaleY;

            const yellowStripe: YellowStripe = new YellowStripe(this.game, "SELECT STAGE");
            yellowStripe.y = 50;
            this.add.existing(yellowStripe);

            this.levelsRail = new Phaser.Group(this.game);
            this.add.existing(this.levelsRail);

            let levelsContainer: LevelsContainer;
            for (let i: number = 0; i < LevelSelectionState.LEVEL_PAGES; i++) {
                levelsContainer = new LevelsContainer(this.game, i);

                levelsContainer.x = GameConstants.GAME_WIDTH * (.5 + i);
                levelsContainer.y = GameConstants.GAME_HEIGHT / 2;

                this.levelsRail.add(levelsContainer);
            }

            this.previousButton = this.add.button(60, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", this.onArrowClick, this);
            this.previousButton.anchor.set(.5);
            this.previousButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-on.png");
            this.previousButton.scale.set(-1, GameVars.scaleY);
            this.previousButton.name = LevelSelectionState.PREVIOUS;

            this.nextButton = this.add.button(700, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", this.onArrowClick, this);
            this.nextButton.anchor.set(.5);
            this.nextButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-on.png");
            this.nextButton.scale.y = GameVars.scaleY;
            this.previousButton.name = LevelSelectionState.NEXT;

            let audioButton: AudioButton = new AudioButton(this.game, AudioButton.PX, AudioButton.PY);
            yellowStripe.add(audioButton);

            this.setCurrentLevelPage();

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            LevelSelectionState.currentInstance = null;

            super.shutdown();
        }

        public goToBoardScene(): void {

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("BoardState", true, false);
            }, this);
        }

        private setCurrentLevelPage(): void {

            // sacar cual es el ultimo nivel alcanzado
            let achievedLevel: number = 1;

            for (let i: number = 0; i < GameVars.levelsBestResults.length; i++) {
                if (GameVars.levelsBestResults[i] === 0) {
                    achievedLevel = i + 1;
                    break;
                }
            }

            this.indexLevelsPage = Math.floor ((achievedLevel - 1) / 12);

            if (this.indexLevelsPage === 0 ) {
                this.previousButton.visible = false;
            } else if (this.indexLevelsPage > 3) {
                this.nextButton.visible = false;
            }

            this.levelsRail.x = - GameConstants.GAME_WIDTH * this.indexLevelsPage;
        }

        private onArrowClick(b: Phaser.Button): void {

            if (this.tweening) {
                return;
            }

            this.tweening = true;

            this.setCorrespondingContainersVisible(true);

            let px: number = this.levelsRail.x;

            if (b.name === LevelSelectionState.PREVIOUS) {
                px += GameConstants.GAME_WIDTH;
                this.indexLevelsPage--;
            } else {
                px -= GameConstants.GAME_WIDTH;
                this.indexLevelsPage++;
            }

            if (this.indexLevelsPage === 0) {
                this.previousButton.visible = false;
            }else if (this.indexLevelsPage === LevelSelectionState.LEVEL_PAGES - 1) {
                this.nextButton.visible = false;
            }else {
                this.previousButton.visible = true;
                this.nextButton.visible = true;
            }

            this.game.add.tween(this.levelsRail)
                .to({ x: px}, 350, Phaser.Easing.Quadratic.Out, true)
                .onComplete.add(function(): void {
                    this.tweening = false;
                    this.setCorrespondingContainersVisible(false);
                }, this);
        }

        private setCorrespondingContainersVisible(tweenStarted: boolean): void {
            //
        }
    }
}
