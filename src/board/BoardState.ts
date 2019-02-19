namespace HappyKittensPuzzle {

    export class BoardState extends Phaser.State {

        public static currentInstance: BoardState;
        public static funoStartWithoutAudio: boolean = false;

        public board: Board;
        public gui: GUI;
        public hud: HUD;

        private boardManager: BoardManager;

        public init(): void {

            BoardState.currentInstance = this;

            BoardManager.init(this.game);
        }

        public create(): void {

            const background = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board.png");
            background.anchor.set(.5);
            background.scale.y = GameVars.scaleY;

            this.board = new Board(this.game);
            this.add.existing(this.board);

            this.hud = new HUD(this.game);
            this.add.existing(this.hud);

            this.gui = new GUI(this.game);
            this.add.existing(this.gui);

            if (GameVars.currentLevel < 4 && GameVars.levelsBestResults[GameVars.currentLevel - 1] === 0) {
                this.activateTutorial();
            }

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            BoardState.currentInstance = null;

            super.shutdown();
        }

        public update(): void {

            super.update();

            BoardManager.update();
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
