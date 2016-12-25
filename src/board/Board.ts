namespace Xhungo {

    export class Board extends Phaser.Group {

        public squares: Square[][];

        constructor(game: Phaser.Game) {

            super(game, null, "board");

            this.x = GameConstants.GAME_WIDTH / 2 - 3.5 * GameConstants.SQUARE_WIDTH;
            this.y = GameConstants.GAME_HEIGHT / 2 - 3.5 * GameConstants.SQUARE_WIDTH;

            this.squares = [];

            let square: Square;

            for (let i: number = 0; i < 8; i++) {

                this.squares[i] = [];

                for (let j: number = 0; j < 8; j++) {

                    square = new Square(this.game, GameConstants.RED_SQUARE, i, j);
                    square.x = i * GameConstants.SQUARE_WIDTH;
                    square.y = j * GameConstants.SQUARE_WIDTH;
                    this.add(square);

                    this.squares[i].push(square);
                }
            }
        }
    }
}

