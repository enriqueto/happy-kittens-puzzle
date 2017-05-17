namespace HappyKittensPuzzle {

    export class BoardManager {

        public static currentInstance: BoardManager;
        public static neighbourSquares: number[][] = [[0, -1], [-1, 0], [1, 0], [0, 1]];

        private game: Phaser.Game;
        private frameCounterSleep: number;
        private currentRow: number;
        private currentCol: number;
        private timerEvent: Phaser.TimerEvent;

        constructor(game: Phaser.Game) {

            BoardManager.currentInstance = this;

            this.game = game;
            this.frameCounterSleep = 0;
            this.currentRow = null;
            this.currentCol = null;

            this.timerEvent = null;

            GameVars.levelPassed = false;
            GameVars.moves = 0;
            GameVars.cellsFlipping = false;
            GameVars.cellStates = [];

            GameVars.currentLevel = GameVars.currentLevel || 1;

            const bmd: Phaser.BitmapData = new Phaser.BitmapData(this.game, "tmp-bitmapdata", 8, 8);
            const levelImage = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "level-" + GameVars.currentLevel + ".png");
            bmd.draw(levelImage, 0, 0);
            bmd.update(0, 0, 8, 8);

            for (let col: number = 0; col < 8; col++) {

                GameVars.cellStates[col] = [];

                for (let row: number = 0; row < 8; row++) {

                    let hex: number = bmd.getPixel32(col, row);

                    let r: number = ( hex       ) & 0xFF; // get the r
                    let g: number = ( hex >>  8 ) & 0xFF; // get the g
                    let b: number = ( hex >> 16 ) & 0xFF; // get the b

                    if (r === 0xff && g === 0x00 && b === 0x00) {
                        GameVars.cellStates[col].push(GameConstants.HAPPY);
                    }

                    if (r === 0xff && g === 0xff && b === 0xff) {
                        GameVars.cellStates[col].push(GameConstants.GRUMPY);
                    }
                }
            }
        }

        public destroy(): void {

            if (GameConstants.SPONSOR === GameConstants.COOLGAMES) {
                this.timerEvent.pendingDelete = true;
            }
        }

        public onSecondPassed(): void {

            GameVars.time ++;
            BoardState.currentInstance.hud.updateTime();
        }

        public update(): void {

            // hacer dormir a algun gato
            this.frameCounterSleep ++;

            if (this.frameCounterSleep > 600 && !GameVars.levelPassed) { // era 600
                this.frameCounterSleep = 0;

                let board: Board = BoardState.currentInstance.board;
                board.makeOneKittenSleep();
            }
        }

        public cellOver(column: number, row: number): void {

            const cells: Cell[][] = BoardState.currentInstance.board.cells;

            let c: number;
            let r: number;

            let t: any = [];

            for (let i = 0; i < BoardManager.neighbourSquares.length; i++) {

                c = BoardManager.neighbourSquares[i][0] + column;
                r = BoardManager.neighbourSquares[i][1] + row;

                t.push({c, r});

                if (c >= 0 && r >= 0 && c < 5 && r < 5) {
                   cells[c][r].over();
                }
            }
        }

        public cellOut(column: number, row: number): void {

            let c: number;
            let r: number;

            const cells = BoardState.currentInstance.board.cells;

            for (let i = 0; i < BoardManager.neighbourSquares.length; i++) {

                c = BoardManager.neighbourSquares[i][0] + column;
                r = BoardManager.neighbourSquares[i][1] + row;

                if (c >= 0 && r >= 0 && c < 5 && r < 5) {
                   cells[c][r].out();
                }
            }
        }

        public cellFlipped(col: number, row: number): void {

            this.frameCounterSleep = 0;

            const board = BoardState.currentInstance.board;
            board.awakeSleepingKitten();

            const cells = BoardState.currentInstance.board.cells;

            let c: number;
            let r: number;

            let cellsToFlip: Cell[] = [];
            let flipOrientation: boolean [] = [];

            for (let i = 0; i < BoardManager.neighbourSquares.length; i++) {

                c = BoardManager.neighbourSquares[i][0] + col;
                r = BoardManager.neighbourSquares[i][1] + row;

                if (c >= 0 && r >= 0 && c < 5 && r < 5) {

                    const verticalFlip: boolean = i === 1 || i === 2;

                    cellsToFlip.push(cells[c][r]);
                    flipOrientation.push(verticalFlip);
                }
            }

            this.game.time.events.add(275, function(args: any): void {

                let cells: Cell[] = args[0];
                let flipOrientation: boolean[] = args[1];

                for (let i = 0; i < cells.length; i++) {
                    cells[i].flip(flipOrientation[i]);
                }

                let levelPassed: boolean = this.checkBoard();

                if (levelPassed) {
                    this.levelPassed();
                }

            }, this, [cellsToFlip, flipOrientation]);

            if (this.currentRow === null || row !== this.currentRow || col !== this.currentCol) {
                GameVars.moves++;
                BoardState.currentInstance.move();
            }

            this.currentRow = row;
            this.currentCol = col;

            GameVars.cellsFlipping = true;

            // para coolgames empezamos a contar el tiempo desde aqui
            if (GameConstants.SPONSOR === GameConstants.COOLGAMES && this.timerEvent === null) {
                GameVars.time = 0;
                this.timerEvent = this.game.time.events.loop(Phaser.Timer.SECOND, this.onSecondPassed, this);
            }

            this.game.time.events.add(550, function(): void {
                 GameVars.cellsFlipping = false;
            }, this);
        }

        public checkBoard(): boolean {

            let passed: boolean = true;

            const cells = BoardState.currentInstance.board.cells;

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
