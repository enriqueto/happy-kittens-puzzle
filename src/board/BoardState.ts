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
        }

        public shutdown(): void {

            SplashState.currentInstance = null;

            super.shutdown();
        }

        public move(): void {

            this.hud.updateMoves();
        }

        public levelPassed(): void {
            //
        }

        public reset(): void {
            //
        }
    }
}
