namespace HappyKittensPuzzle {

    export class BoardState extends Phaser.State {

        public static currentInstance: BoardState;
        public static funoStartWithoutAudio: boolean = false;

        public board: Board;
        public gui: GUI;
        public hud: HUD;

        private navManager: NavigationManager;

        public init(): void {

            BoardState.currentInstance = this;

            BoardManager.init(this.game);

            this.navManager = new NavigationManager(this.game);
        }

        public create(): void {

            const background = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board.png");
            background.anchor.set(.5);
            background.scale.y = GameVars.scaleY;

            this.board = new Board(this.game, this.navManager);
            this.add.existing(this.board);

            this.hud = new HUD(this.game);
            this.add.existing(this.hud);

            this.gui = new GUI(this.game);
            this.add.existing(this.gui);

            if (GameVars.currentLevel < 4 && GameVars.levelsBestResults[GameVars.currentLevel - 1] === 0) {
                this.activateTutorial();
            }

            this.setNavComponents();

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            BoardState.currentInstance = null;

            super.shutdown();
        }

        public render(): void {

            this.game.debug.text(this.game.time.fps + "" || '--', 2, 14, "#ff0000"); 
        }

        public update(): void {

            super.update();

            BoardManager.update();

            this.navManager.update();
        }

        public setNavComponents(): void {

            this.navManager.resetComponents();

            this.navManager.addComponent(this.gui.audioButton.button, this.gui.audioButton);
            this.navManager.addComponent(this.gui.exitButton, this.gui);
            this.navManager.addComponent(this.gui.resetButton, this.gui);

            this.navManager.setDownComponent("audio", "20");

            this.navManager.setRightComponent("exit", "reset");
            this.navManager.setLeftComponent("reset", "exit");

            this.navManager.setUpComponent("exit", "24");
            this.navManager.setUpComponent("reset", "24");

            this.board.setNavComponents();
        }

        public activateTutorial(): void {

            this.board.activateTutorial();
        }

        public move(): void {

            this.hud.updateMoves();
        }

        public levelPassed(): void {

            this.board.levelPassed();

            let passedLevelKittenAnimation: PassedLevelKittenAnimation = new PassedLevelKittenAnimation(this.game);
            passedLevelKittenAnimation.activate();
            this.add.existing(passedLevelKittenAnimation);

            this.game.time.events.add(1000, this.levelEnded, this);
        }

        public reset(): void {

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("BoardState", true, false);
            }, this);
        }

        public exit(): void {

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("LevelSelectionState", true, false);
            }, this);
        }
        
        private levelEnded(): void {

            if (GameVars.currentLevel === 60 && GameVars.congratulationsMessageShown) {
                return;
            }

            if (GameVars.gameFinished && GameVars.currentLevel === 60) {

                this.hud.showGameFinishedMessage();
                
            } else {

                this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

                this.game.camera.onFadeComplete.add(function(): void {
                    this.game.state.start("BoardState", true, false);
                }, this);
            }
        }
    }
}
