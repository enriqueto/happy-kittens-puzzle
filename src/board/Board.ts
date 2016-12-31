namespace SquaresOut {

    export class Board extends Phaser.Group {

        public squares: Square[][];

        constructor(game: Phaser.Game) {

            super(game, null, "board");

            this.scale.y = GameVars.scaleY;

            this.x = GameConstants.GAME_WIDTH / 2;
            this.y = GameConstants.GAME_HEIGHT / 2;

            this.squares = [];

            let square: Square;
            let color: string;

            for (let col: number = 0; col < 5; col++) {

                this.squares[col] = [];

                for (let row: number = 0; row < 5; row++) {

                    color = GameVars.colors[col][row];

                    square = new Square(this.game, color, col, row);
                    square.x = col * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
                    square.y = row * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
                    this.add(square);

                    this.squares[col].push(square);
                }
            }
        }
    }
}
