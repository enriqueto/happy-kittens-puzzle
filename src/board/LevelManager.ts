namespace HappyKittensPuzzle {

    export class LevelManager {

        public static currentInstance: LevelManager;
        public static neighbourSquares: number[][] = [[0, -1], [-1, 0], [1, 0], [0, 1]];

        private game: Phaser.Game;

        constructor(game: Phaser.Game) {

            LevelManager.currentInstance = this;

            this.game = game;

            GameVars.levelPassed = false;
            GameVars.moves = 0;

            GameVars.cellStates = [];

            GameVars.currentLevel = GameVars.currentLevel || 1;

            let bmd: Phaser.BitmapData = new Phaser.BitmapData(this.game, "tmp-bitmapdata", 8, 8);
            let levelImage: Phaser.Image = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "level-" + GameVars.currentLevel + ".png");
            bmd.draw(levelImage, 0, 0);
            bmd.update(0, 0, 8, 8);

            for (let col: number = 0; col < 8; col++) {

                GameVars.cellStates[col] = [];

                for (let row: number = 0; row < 8; row++) {

                    let hex: number = bmd.getPixel32(col, row);

                    let r: number = ( hex       ) & 0xFF; // get the r
                    let g: number = ( hex >>  8 ) & 0xFF; // get the g
                    let b: number = ( hex >> 16 ) & 0xFF; // get the b
                    // let a: number = ( hex >> 24 ) & 0xFF; // get the alpha

                    if (r === 0xff && g === 0x00 && b === 0x00) {
                        GameVars.cellStates[col].push(GameConstants.HAPPY);
                    }

                    if (r === 0xff && g === 0xff && b === 0xff) {
                        GameVars.cellStates[col].push(GameConstants.GRUMPY);
                    }
                }
            }
        }

        public squareFlipped(column: number, row: number): void {

            GameVars.moves++;

            let cells: Cell[][] = BoardState.currentInstance.board.cells;

            let c: number;
            let r: number;

            let cellsToFlip: Cell[] = [];
            let flipOrientation: boolean [] = [];

            for (let i: number = 0; i < LevelManager.neighbourSquares.length; i++) {

                c = LevelManager.neighbourSquares[i][0] + column;
                r = LevelManager.neighbourSquares[i][1] + row;

                if (c >= 0 && r >= 0 && c < cells.length && r < cells.length) {
                    const verticalFlip: boolean = i === 1 || i === 2;

                    cellsToFlip.push(cells[c][r]);
                    flipOrientation.push(verticalFlip);
                }
            }

            this.game.time.events.add(275, function(args: any): void {

                let cells: Cell[] = args[0];
                let flipOrientation: boolean[] = args[1];

                for (let i: number = 0; i < cells.length; i++) {
                    cells[i].flip(flipOrientation[i]);
                }

                let levelPassed: boolean = this.checkBoard();

                if (levelPassed) {
                    this.levelPassed();
                }

            }, this, [cellsToFlip, flipOrientation]);

            BoardState.currentInstance.move();
        }

        public checkBoard(): boolean {

            let passed: boolean = true;

            let cells: Cell[][] = BoardState.currentInstance.board.cells;

            for (let col: number = 0; col < 5 && passed; col++) {
                for (let row: number = 0; row < 5 && passed; row++) {
                    if (cells[col][row].state === GameConstants.GRUMPY) {
                        passed = false;
                        break;
                    }
                }
            }

            return passed;
        }

        public resetLevel(): void {

            BoardState.currentInstance.reset();
        }

        public exit(): void {

            BoardState.currentInstance.exit();
        }

        private levelPassed(): void {

            // bloquear los botones
            GameVars.levelPassed = true;
            GameManager.levelPassed();

            BoardState.currentInstance.levelPassed();
        }
    }
}
