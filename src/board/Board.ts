namespace HappyKittensPuzzle {

    export class Board extends Phaser.Group {

        public cells: Cell[][];

        constructor(game: Phaser.Game) {

            super(game, null, "board");

            this.scale.y = GameVars.scaleY;

            this.x = GameConstants.GAME_WIDTH / 2;
            this.y = 532;

            this.cells = [];

            let cell: Cell;
            let state: string;

            for (let col: number = 0; col < 5; col++) {

                this.cells[col] = [];

                for (let row: number = 0; row < 5; row++) {

                    if (GameConstants.EDITING_LEVELS) {
                        state = GameConstants.GRUMPY;
                    }else {
                        state = GameVars.cellStates[col][row];
                    }

                    cell = new Cell(this.game, state, col, row);
                    cell.x = col * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
                    cell.y = row * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
                    this.add(cell);

                    this.cells[col].push(cell);
                }
            }
        }

        public levelPassed(): void {

             for (let col: number = 0; col < 5; col++) {

                for (let row: number = 0; row < 5; row++) {
                    if (Math.random() > .7) {
                          this.cells[col][row].endAnimation();
                    }
                }
            }
        }
    }
}
