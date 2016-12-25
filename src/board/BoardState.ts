namespace Xhungo {

    export class BoardState extends Phaser.State {

        public static currentInstance: BoardState;

        private boardManager: BoardManager;
        private board: Board;

        public init(): void {

            BoardState.currentInstance = this;

            this.boardManager = new BoardManager(this.game);

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
