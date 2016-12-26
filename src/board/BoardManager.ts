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

            GameVars.colors = [];

            let bmd: Phaser.BitmapData = new Phaser.BitmapData(this.game, "tmp-bitmapdata", 8, 8);
            let levelImage: Phaser.Image = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "level-1.png");
            bmd.draw(levelImage, 0, 0);
            bmd.update(0, 0, 8, 8);

            for (let col: number = 0; col < 8; col++) {

                GameVars.colors[col] = [];

                for (let row: number = 0; row < 8; row++) {

                    let hex: number = bmd.getPixel32(col, row);

                    let r: number = ( hex       ) & 0xFF; // get the r
                    let g: number = ( hex >>  8 ) & 0xFF; // get the g
                    let b: number = ( hex >> 16 ) & 0xFF; // get the b
                    // let a: number = ( hex >> 24 ) & 0xFF; // get the alpha

                    if (r === 0xff && g === 0x00 && b === 0x00) {
                        GameVars.colors[col].push(GameConstants.RED_SQUARE);
                    }

                    if (r === 0xff && g === 0xff && b === 0xff) {
                        GameVars.colors[col].push(GameConstants.WHITE_SQUARE);
                    }
                }
            }
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
