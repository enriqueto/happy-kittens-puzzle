namespace Xhungo {

    export class Board extends Phaser.Group {

        public squares: Square[][];

        constructor(game: Phaser.Game) {

            super(game, null, "board");

            this.x = GameConstants.GAME_WIDTH / 2 - 3.5 * GameConstants.SQUARE_WIDTH;
            this.y = GameConstants.GAME_HEIGHT / 2 - 3.5 * GameConstants.SQUARE_WIDTH;

            this.squares = [];

            let square: Square;
            let color: string;

            for (let i: number = 0; i < 8; i++) {

                this.squares[i] = [];

                for (let j: number = 0; j < 8; j++) {

                    color = GameVars.colors[i][j];

                    square = new Square(this.game, color, i, j);
                    square.x = i * GameConstants.SQUARE_WIDTH;
                    square.y = j * GameConstants.SQUARE_WIDTH;
                    this.add(square);

                    this.squares[i].push(square);
                }
            }

            // las lineas
            let graphics: Phaser.Graphics = new Phaser.Graphics(this.game, 0, 0);
            this.add(graphics);

            graphics.lineStyle(1, 0xffd900, 1);

            for (let i: number = 0; i < 8; i++) {
                // horizontales
                graphics.moveTo( -GameConstants.SQUARE_WIDTH / 2,  (i - .5) * GameConstants.SQUARE_WIDTH);
                graphics.lineTo( GameConstants.SQUARE_WIDTH * 7.5, (i - .5) * GameConstants.SQUARE_WIDTH);

                // verticales
                graphics.moveTo( (i - .5) * GameConstants.SQUARE_WIDTH, -GameConstants.SQUARE_WIDTH / 2);
                graphics.lineTo(  (i - .5) * GameConstants.SQUARE_WIDTH, GameConstants.SQUARE_WIDTH * 7.5);
            }
        }
    }
}

