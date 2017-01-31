namespace HappyKittensPuzzle {

    export class LevelSelectionState extends Phaser.State {

        public static currentInstance: LevelSelectionState;
        public static leavingScene: boolean;

        private static PREVIOUS: string = "previous";
        private static NEXT: string = "next";
        private static LEVEL_PAGES: number = 5;

        private levelsRail: Phaser.Group;
        private nextButton: Phaser.Button;
        private previousButton: Phaser.Button;
        private indexLevelsPage: number;
        private tweening: boolean;

        public init(): void {

            LevelSelectionState.currentInstance = this;
            LevelSelectionState.leavingScene = false;

            this.tweening = false;
        }

        public create(): void {

            let backgroundImage: Phaser.Image = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board_menu.png");
            backgroundImage.anchor.set(.5);
            backgroundImage.scale.y = GameVars.scaleY;

            let titleContainer: TitleContainer = new TitleContainer(this.game);
            this.add.existing(titleContainer);

            this.levelsRail = new Phaser.Group(this.game);
            this.add.existing(this.levelsRail);

            const aspectRatio: number = window.innerHeight / window.innerWidth;
            let levelsContainer_py: number;

            if (this.game.device.desktop) {

                 levelsContainer_py = 650;

             } else {

                if (aspectRatio >= 1.75) {
                   levelsContainer_py = 620;
                }else if (aspectRatio >= 1.5) {
                    levelsContainer_py = 640;
                }else {
                    levelsContainer_py = 662;
                }
             }

            let levelsContainer: LevelsContainer;
            for (let i: number = 0; i < LevelSelectionState.LEVEL_PAGES; i++) {
                levelsContainer = new LevelsContainer(this.game, i);

                levelsContainer.x = GameConstants.GAME_WIDTH * (.5 + i);
                levelsContainer.y = levelsContainer_py;

                this.levelsRail.add(levelsContainer);
            }

            this.previousButton = this.add.button(60, levelsContainer_py, "texture_atlas_1", this.onArrowClick, this);
            this.previousButton.anchor.set(.5);
            this.previousButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-on.png");
            this.previousButton.scale.set(-1, GameVars.scaleY);
            this.previousButton.name = LevelSelectionState.PREVIOUS;

            this.nextButton = this.add.button(700, levelsContainer_py, "texture_atlas_1", this.onArrowClick, this);
            this.nextButton.anchor.set(.5);
            this.nextButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-on.png");
            this.nextButton.scale.y = GameVars.scaleY;
            this.nextButton.name = LevelSelectionState.NEXT;

            const creditsLabel: Phaser.Text = this.add.text( GameConstants.GAME_WIDTH / 2 , GameConstants.GAME_HEIGHT - 38, "made by ravalmatic, licensed to " + GameConstants.SPONSOR, { font: "30px Arial", fill: "#FFFFFF"});
            creditsLabel.anchor.x = .5;
            creditsLabel.scale.y = GameVars.scaleY;
            creditsLabel.alpha = .6;

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

            b.clearFrames();

            this.tweening = true;

            this.setCorrespondingContainersVisible(true, b.name);

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

        private setCorrespondingContainersVisible(beforeTweening: boolean, pressedButtonName?: string): void {

            if (beforeTweening) {

                if (pressedButtonName === LevelSelectionState.NEXT) {
                    this.levelsRail.forEach(function(levelsContainer: LevelsContainer): void {
                        if (levelsContainer.i === this.indexLevelsPage || levelsContainer.i === this.indexLevelsPage + 1) {
                            levelsContainer.visible = true;
                        }else {
                            levelsContainer.visible = false;
                        }
                    }, this);
                } else {
                    this.levelsRail.forEach(function(levelsContainer: LevelsContainer): void {
                        if (levelsContainer.i === this.indexLevelsPage || levelsContainer.i === this.indexLevelsPage - 1 ) {
                            levelsContainer.visible = true;
                        }else {
                            levelsContainer.visible = false;
                        }
                    }, this);
                }
            } else {
                this.levelsRail.forEach(function(levelsContainer: LevelsContainer): void {
                        if (levelsContainer.i === this.indexLevelsPage ) {
                            levelsContainer.visible = true;
                        }else {
                            levelsContainer.visible = false;
                        }
                    }, this);
            }
        }
    }
}
