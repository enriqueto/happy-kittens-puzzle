namespace HappyKittensPuzzle {

    export class Board extends Phaser.Group {

        private static TUTORIAL_CELLS: number[][] = [[2, 2], [0, 0], [4, 4]];

        public cells: Cell[][];
        public handIcon: HandIcon;

        constructor(game: Phaser.Game) {

            super(game, null, "board");

            this.scale.y = GameVars.scaleY;

            this.x = GameConstants.GAME_WIDTH / 2;
            this.y = 538;

            this.cells = [];
            this.handIcon = null;

            let cell: Cell;
            let state: string;

            for (let col: number = 0; col < 5; col++) {

                this.cells[col] = [];

                for (let row: number = 0; row < 5; row++) {

                    if (GameConstants.EDITING_LEVELS) {
                        state = GameConstants.HAPPY;
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

        public activateTutorial(): void {

            const c: number = Board.TUTORIAL_CELLS[GameVars.currentLevel - 1][0];
            const r: number = Board.TUTORIAL_CELLS[GameVars.currentLevel - 1][1];

            // desactivar todas las celdas menos las que conforman el tutorial
            for (let col: number = 0; col < 5; col++) {
                for (let row: number = 0; row < 5; row++) {
                    this.cells[col][row].activated = false;
                }
            }

            this.cells[c][r].activated = true;

            const x: number = c * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
            const y: number = r * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;

            this.handIcon = new HandIcon(this.game, x, y);
            this.add(this.handIcon);
        }

        public levelPassed(): void {

            if (this.handIcon) {
                this.handIcon.hide();
            }

            for (let col: number = 0; col < 5; col++) {

                for (let row: number = 0; row < 5; row++) {
                    if (Math.random() > .7) {
                          this.cells[col][row].endAnimation();
                    }
                }
            }
        }

        public makeOneKittenSleep(): void {

            // pillar un gato y hacerlo dormir
            let kittens: Cell[] = [];

             for (let col: number = 0; col < 5; col++) {
                for (let row: number = 0; row < 5; row++) {
                    let kitten: Cell = this.cells[col][row];
                    if (kitten.state === GameConstants.HAPPY && !kitten.sleeping) {
                          kittens.push(kitten);
                    }
                }
            }

            if (kittens.length > 0) {
                let kitten: Cell = Phaser.ArrayUtils.getRandomItem(kittens);
                kitten.sleep();
            }
        }

        public awakeSleepingKitten(): void {

            for (let col: number = 0; col < 5; col++) {
                for (let row: number = 0; row < 5; row++) {
                    let kitten: Cell = this.cells[col][row];
                    if (kitten.sleeping) {
                          kitten.awake();
                    }
                }
            }
        }
    }
}
