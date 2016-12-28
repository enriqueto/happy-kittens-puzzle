namespace SquaresOut {

    export class Board extends Phaser.Group {

        public squares: Square[][];

        constructor(game: Phaser.Game) {

            super(game, null, "board");

            this.x = GameConstants.GAME_WIDTH / 2 - 2 * GameConstants.SQUARE_WIDTH;
            this.y = GameConstants.GAME_HEIGHT / 2 - 2 * GameConstants.SQUARE_WIDTH;

            this.squares = [];

            let square: Square;
            let color: string;

            for (let i: number = 0; i < 5; i++) {

                this.squares[i] = [];

                for (let j: number = 0; j < 5; j++) {

                    color = GameVars.colors[i][j];

                    square = new Square(this.game, color, i, j);
                    square.x = i * GameConstants.SQUARE_WIDTH;
                    square.y = j * GameConstants.SQUARE_WIDTH;
                    this.add(square);

                    this.squares[i].push(square);
                }
            }
        }
    }
}
