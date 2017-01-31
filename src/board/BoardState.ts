namespace HappyKittensPuzzle {

    export class BoardState extends Phaser.State {

        public static currentInstance: BoardState;

        public board: Board;
        public gui: GUI;
        public hud: HUD;

        private boardManager: BoardManager;

        public init(): void {

            BoardState.currentInstance = this;

            this.boardManager = new BoardManager(this.game);
        }

        public create(): void {

            const background: Phaser.Image = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board.png");
            background.anchor.set(.5);
            background.scale.y = GameVars.scaleY;

            this.hud = new HUD(this.game);
            this.add.existing(this.hud);

            this.gui = new GUI(this.game);
            this.add.existing(this.gui);

            this.board = new Board(this.game);
            this.add.existing(this.board);

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

            this.boardManager.update();
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

            this.game.time.events.add(1000, function(): void {

                this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

                this.game.camera.onFadeComplete.add(function(): void {
                    this.game.state.start("BoardState", true, false);
                }, this);

            }, this);
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
    }
}
