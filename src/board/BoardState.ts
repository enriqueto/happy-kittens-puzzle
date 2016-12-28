namespace SquaresOut {

    export class BoardState extends Phaser.State {

        public static currentInstance: BoardState;

        public board: Board;

        private boardManager: LevelManager;

        public init(): void {

            BoardState.currentInstance = this;

            this.boardManager = new LevelManager(this.game);

            this.board = new Board(this.game);
            this.add.existing(this.board);
        }

        public create(): void {
            //
        }

        public shutdown(): void {

            SplashState.currentInstance = null;

            super.shutdown();
        }
    }
}
