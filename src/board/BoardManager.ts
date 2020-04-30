import { GameVars } from "../GameVars";
import { GameConstants } from "../GameConstants";
import { BoardState } from "./BoardState";
import { Board } from "./Board";
import { Cell } from "./Cell";
import { GameManager } from "../GameManager";

export class BoardManager {

    public static neighbourSquares: number[][] = [[0, -1], [-1, 0], [1, 0], [0, 1]];

    private static game: Phaser.Game;
    private static frameCounterSleep: number;
    private static currentRow: number;
    private static currentCol: number; 

    public static init(game: Phaser.Game): void {
        
        BoardManager.game = game;
        
        BoardManager.frameCounterSleep = 0;
        BoardManager.currentRow = null;
        BoardManager.currentCol = null;

        GameVars.levelPassed = false;
        GameVars.moves = 0;
        GameVars.cellsFlipping = false;
        GameVars.cellStates = [];

        GameVars.currentLevel = GameVars.currentLevel || 1;

        const bmd = new Phaser.BitmapData(BoardManager.game, "tmp-bitmapdata", 5, 5);
        const levelImage = new Phaser.Image(BoardManager.game, 0, 0, "texture_atlas_1", "level-" + GameVars.currentLevel + ".png");
        bmd.draw(levelImage, 0, 0);
        bmd.update(0, 0, 5, 5);

        for (let col = 0; col < 5; col++) {

            GameVars.cellStates[col] = [];

            for (let row = 0; row < 5; row++) {

                let hex = bmd.getPixel32(col, row);

                let r = (hex) & 0xFF; // get the r
                let g = (hex >> 8) & 0xFF; // get the g
                let b = (hex >> 16) & 0xFF; // get the b

                // if (r === 0xff && g === 0x00 && b === 0x00) {
                //     GameVars.cellStates[col].push(GameConstants.HAPPY);
                // }

                // if (r === 0xff && g === 0xff && b === 0xff) {
                //     GameVars.cellStates[col].push(GameConstants.GRUMPY);
                // }

                let tmp = hex.toString();
                // console.log(tmp, r, g, b);
                tmp = tmp.substr(0, 3);

                if (tmp.indexOf("429") !== -1 ) {
                    GameVars.cellStates[col].push(GameConstants.GRUMPY);
                } else {
                    GameVars.cellStates[col].push(GameConstants.HAPPY);
                }
            }
        }
    }

    public static update(): void {

        // hacer dormir a algun gato
        BoardManager.frameCounterSleep ++;

        if (BoardManager.frameCounterSleep > 600 && !GameVars.levelPassed) { // era 600
            BoardManager.frameCounterSleep = 0;

            let board: Board = BoardState.currentInstance.board;
            board.makeOneKittenSleep();
        }
    }

    public static cellOver(column: number, row: number): void {

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

    public static cellOut(column: number, row: number): void {

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

    public static cellFlipped(col: number, row: number): void {

        BoardManager.frameCounterSleep = 0;

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

        BoardManager.game.time.events.add(275, function(args: any): void {

            let cells: Cell[] = args[0];
            let flipOrientation: boolean[] = args[1];

            for (let i = 0; i < cells.length; i++) {
                cells[i].flip(flipOrientation[i]);
            }

            let levelPassed: boolean = this.checkBoard();

            if (levelPassed) {
                BoardManager.levelPassed();
            }

        }, this, [cellsToFlip, flipOrientation]);

        if (BoardManager.currentRow === null || row !== BoardManager.currentRow || col !== BoardManager.currentCol) {
            GameVars.moves++;
            BoardState.currentInstance.move();
        }

        BoardManager.currentRow = row;
        BoardManager.currentCol = col;

        GameVars.cellsFlipping = true;

        BoardManager.game.time.events.add(550, function(): void {
                GameVars.cellsFlipping = false;
        }, this);
    }

    public static checkBoard(): boolean {

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

    public static resetLevel(): void {

        BoardState.currentInstance.reset();
    }

    public static exit(): void {

        BoardState.currentInstance.exit();
    }

    private static levelPassed(): void {

        GameVars.levelPassed = true;
        GameManager.levelPassed();
        BoardState.currentInstance.levelPassed();
    }
}
