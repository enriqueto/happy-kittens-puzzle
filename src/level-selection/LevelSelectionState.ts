namespace HappyKittensPuzzle {

    export class LevelSelectionState extends Phaser.State {

        public static currentInstance: LevelSelectionState;
        public static leavingScene: boolean;

        public static PREVIOUS: string = "previous";
        public static NEXT: string = "next";
        public static LEVEL_PAGES: number = 5;

        private levelsRail: Phaser.Group;
        private levelsContainers: LevelsContainer[];
        private nextButton: Phaser.Button;
        private previousButton: Phaser.Button;
        private indexLevelsPage: number;
        private tweening: boolean;

        private audioButton: AudioButton;

        private navManager: NavigationManager;

        public init(): void {

            LevelSelectionState.currentInstance = this;
            LevelSelectionState.leavingScene = false;

            this.tweening = false;

            this.navManager = new NavigationManager(this.game);

            AudioManager.getInstance().playSound("soundtrack", true);
        }

        public create(): void {

            let backgroundImage: Phaser.Image = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board_menu.png");
            backgroundImage.anchor.set(.5);
            backgroundImage.scale.y = GameVars.scaleY;

            let titleContainer = new TitleContainer(this.game);
            this.add.existing(titleContainer);

            this.audioButton = new AudioButton(this.game, GameConstants.GAME_WIDTH - 27, 4);
            this.audioButton.scale.y = GameVars.scaleY;
            this.add.existing(this.audioButton);

            this.levelsRail = new Phaser.Group(this.game);
            this.add.existing(this.levelsRail);

            const levelsContainer_py = 205; // coordenada modificada
            let levelsContainerScale = 1;

            this.levelsContainers = [];
            let levelsContainer: LevelsContainer;

            for (let i = 0; i < LevelSelectionState.LEVEL_PAGES; i++) {

                levelsContainer = new LevelsContainer(this.game, i, this.navManager);

                levelsContainer.x = GameConstants.GAME_WIDTH * (.5 + i);
                levelsContainer.y = levelsContainer_py;
                
                levelsContainer.scale.setTo(levelsContainerScale, GameVars.scaleY);

                this.levelsRail.add(levelsContainer);
                this.levelsContainers.push(levelsContainer);
            }

            this.previousButton = this.add.button(18.75, levelsContainer_py, "texture_atlas_1", this.onClick, this);
            this.previousButton.anchor.set(.5);
            this.previousButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-off.png");
            this.previousButton.scale.set(-1, GameVars.scaleY);

            this.previousButton.name = LevelSelectionState.PREVIOUS;
            
            let mark = this.add.image(0, 0, "texture_atlas_1", "button-next-mark.png");
            mark.anchor.set(.5);
            mark.visible = false;
            this.previousButton.addChild(mark);

            this.nextButton = this.add.button(218.75, levelsContainer_py, "texture_atlas_1", this.onClick, this);
            this.nextButton.anchor.set(.5);
            this.nextButton.setFrames("button-next-on.png", "button-next-off.png", "button-next-off.png");
            this.nextButton.scale.y = GameVars.scaleY;
            this.nextButton.name = LevelSelectionState.NEXT;

            mark = this.add.image(0, 0, "texture_atlas_1", "button-next-mark.png");
            mark.anchor.set(.5);
            mark.visible = false;
            this.nextButton.addChild(mark);

            this.setCurrentLevelPage();

            this.setNavComponents(null);

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public update(): void {

            this.navManager.update();
        }

        public shutdown(): void {

            LevelSelectionState.currentInstance = null;

            super.shutdown();
        }

        public setNavComponents(defaultButton: any): void {

            // rehacer esto cada vez que se cambia de pagina

            let first = true;

            if (defaultButton) {
                first = false;
            }

            this.navManager.resetComponents();

            this.navManager.addComponent(this.audioButton.button, this.audioButton);
            this.navManager.addComponent(this.previousButton, this);
            this.navManager.addComponent(this.nextButton, this);

            if (defaultButton === LevelSelectionState.NEXT) {
                if (this.indexLevelsPage === LevelSelectionState.LEVEL_PAGES - 1) {
                    this.navManager.setDefaultComponent(this.previousButton);
                } else {
                    this.navManager.setDefaultComponent(this.nextButton);
                }
            } else if (defaultButton === LevelSelectionState.PREVIOUS) {
                if (this.indexLevelsPage === 0) {
                    first = true;
                } else {
                    this.navManager.setDefaultComponent(this.previousButton);
                }
            }

            if (GameVars.achievedLevel >= (this.indexLevelsPage * 12 + 1)) {
                this.navManager.setDownComponent("audio", (this.indexLevelsPage * 12 + 1).toString());
            } else if (this.indexLevelsPage !== LevelSelectionState.LEVEL_PAGES - 1) {
                this.navManager.setDownComponent("audio", LevelSelectionState.NEXT);
            } else {
                this.navManager.setDownComponent("audio", LevelSelectionState.PREVIOUS);
            }


            this.navManager.setUpComponent(LevelSelectionState.NEXT, "audio");
            this.navManager.setUpComponent(LevelSelectionState.PREVIOUS, "audio");

            if (GameVars.achievedLevel >= (this.indexLevelsPage * 12 + 1) && GameVars.achievedLevel <= (this.indexLevelsPage + 1) * 12) {
                this.navManager.setLeftComponent(LevelSelectionState.NEXT, GameVars.achievedLevel.toString());
            } else if (GameVars.achievedLevel > (this.indexLevelsPage + 1) * 12) {
                this.navManager.setLeftComponent(LevelSelectionState.NEXT, ((this.indexLevelsPage + 1) * 12).toString());
            } else {
                this.navManager.setLeftComponent(LevelSelectionState.NEXT, LevelSelectionState.PREVIOUS);
            }

            if (GameVars.achievedLevel >= (this.indexLevelsPage * 12 + 1) && GameVars.achievedLevel <= (this.indexLevelsPage + 1) * 12) {
                this.navManager.setRightComponent(LevelSelectionState.PREVIOUS, GameVars.achievedLevel.toString());
            } else if (GameVars.achievedLevel > (this.indexLevelsPage + 1) * 12) {
                this.navManager.setRightComponent(LevelSelectionState.PREVIOUS, ((this.indexLevelsPage) * 12 + 1).toString());
            } else if (this.indexLevelsPage !== LevelSelectionState.LEVEL_PAGES - 1) {
                this.navManager.setRightComponent(LevelSelectionState.PREVIOUS, LevelSelectionState.NEXT);
            }

            this.levelsContainers[this.indexLevelsPage].setNavComponents(first);
        }

        public goToBoardScene(): void {

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("BoardState", true, false);
            }, this);
        }

        public onClick(b: Phaser.Button): void {
            
            b.clearFrames();
            b.setFrames("button-next-on.png", "button-next-off.png", "button-next-off.png");

            if (this.tweening) {
                return;
            } 

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
            } else if (this.indexLevelsPage === LevelSelectionState.LEVEL_PAGES - 1) {
                this.nextButton.visible = false;
            } else {
                this.previousButton.visible = true;
                this.nextButton.visible = true;
            }

            this.game.add.tween(this.levelsRail)
                .to({ x: px}, 350, Phaser.Easing.Quadratic.Out, true)
                .onComplete.add(function(): void {
                    this.tweening = false;
                    this.setCorrespondingContainersVisible(false);
                }, this);

            AudioManager.getInstance().playSound("slide_level_container");

            this.setNavComponents(b.name);
        }

        private setCurrentLevelPage(): void {

            this.indexLevelsPage = Math.floor ((GameVars.currentLevel - 1) / 12);

            if (this.indexLevelsPage === 0 ) {
                this.previousButton.visible = false;
            } else if (this.indexLevelsPage > 3) {
                this.nextButton.visible = false;
            }

            this.levelsRail.x = - GameConstants.GAME_WIDTH * this.indexLevelsPage;
        }

        private setCorrespondingContainersVisible(beforeTweening: boolean, pressedButtonName?: string): void {

            if (beforeTweening) {

                if (pressedButtonName === LevelSelectionState.NEXT) {
                    this.levelsRail.forEach(function(levelsContainer: LevelsContainer): void {
                        if (levelsContainer.i === this.indexLevelsPage || levelsContainer.i === this.indexLevelsPage + 1) {
                            levelsContainer.visible = true;
                        } else {
                            levelsContainer.visible = false;
                        }
                    }, this);
                } else {
                    this.levelsRail.forEach(function(levelsContainer: LevelsContainer): void {
                        if (levelsContainer.i === this.indexLevelsPage || levelsContainer.i === this.indexLevelsPage - 1 ) {
                            levelsContainer.visible = true;
                        } else {
                            levelsContainer.visible = false;
                        }
                    }, this);
                }
            } else {
                this.levelsRail.forEach(function(levelsContainer: LevelsContainer): void {
                        if (levelsContainer.i === this.indexLevelsPage ) {
                            levelsContainer.visible = true;
                        } else {
                            levelsContainer.visible = false;
                        }
                    }, this);
            }
        }

        private onClickMoreGames(): void {

            if (typeof moregames !== "undefined") {
                moregames.redirect();
            }
        }
    }
}
