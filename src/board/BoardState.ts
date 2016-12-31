namespace SquaresOut {

    export class BoardState extends Phaser.State {

        public static currentInstance: BoardState;

        public board: Board;
        public gui: GUI;
        public hud: HUD;

        private boardManager: LevelManager;

        public init(): void {

            BoardState.currentInstance = this;

            this.boardManager = new LevelManager(this.game);
        }

        public create(): void {

            this.board = new Board(this.game);
            this.add.existing(this.board);

            this.hud = new HUD(this.game);
            this.add.existing(this.hud);

            this.gui = new GUI(this.game);
            this.add.existing(this.gui);

            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            SplashState.currentInstance = null;

            super.shutdown();
        }

        public move(): void {

            this.hud.updateMoves();
        }

        // TODO esto se podria refactorizar en 1 sola funcion
        public levelPassed(): void {

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("BoardState", true, false);
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
                this.game.state.start("LevelSelection", true, false);
            }, this)
        }
    }
}
