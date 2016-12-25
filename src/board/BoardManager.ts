namespace Xhungo {

    export class BoardManager  {

        public static currentInstance: BoardManager;

        private static neighbourSquares: number[][] = [
                                                        [-1, -1],
                                                        [0, -1],
                                                        [1, -1],
                                                        [-1, 0],
                                                        [1, 0],
                                                        [-1, 1],
                                                        [0, 1],
                                                        [1, 1]
                                                    ];
        private game: Phaser.Game;

        constructor(game: Phaser.Game) {

            BoardManager.currentInstance = this;

            this.game = game;

            GameVars.level = 1;
        }

        public squareFlipped(column: number, row: number): void {

            let squares: Square[][] = BoardState.currentInstance.board.squares;

            let c: number;
            let r: number;

            for (let i: number = 0; i < BoardManager.neighbourSquares.length; i++) {

                c = BoardManager.neighbourSquares[i][0] + column;
                r = BoardManager.neighbourSquares[i][1] + row;

                if (c >= 0 && r >= 0 && c < squares.length && r < squares.length) {
                    squares[c][r].flip();
                }
            }
        }
    }
}
