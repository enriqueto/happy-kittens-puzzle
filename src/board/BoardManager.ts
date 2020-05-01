import { GameVars } from "../GameVars";
import { GameConstants } from "../GameConstants";
import { BoardState } from "./BoardState";
import { Board } from "./Board";
import { Cell } from "./Cell";

export class BoardManager {

    public static readonly NEIGHBOURING_CELLS = [[0, -1], [-1, 0], [1, 0], [0, 1]];
    public static readonly INFLUENCE_CELLS = [
        [0 , -2],
        [-1, -1], [0, -1], [1, -1],
        [-2, 0], [-1, 0], [1, 0], [2, 0],
        [-1, 1], [0, 1], [1, 1],
        [0, 2]
    ];
    
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

        if (!GameVars.tutorialSeen) {
            BoardManager.getTutorialBoard();
        } else {
            if (!GameVars.levelReset) {
                BoardManager.getBoard(GameVars.minMoves);
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

        for (let i = 0; i < BoardManager.NEIGHBOURING_CELLS.length; i++) {

            c = BoardManager.NEIGHBOURING_CELLS[i][0] + column;
            r = BoardManager.NEIGHBOURING_CELLS[i][1] + row;

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

        for (let i = 0; i < BoardManager.NEIGHBOURING_CELLS.length; i++) {

            c = BoardManager.NEIGHBOURING_CELLS[i][0] + column;
            r = BoardManager.NEIGHBOURING_CELLS[i][1] + row;

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

        for (let i = 0; i < BoardManager.NEIGHBOURING_CELLS.length; i++) {

            c = BoardManager.NEIGHBOURING_CELLS[i][0] + col;
            r = BoardManager.NEIGHBOURING_CELLS[i][1] + row;

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

            if (GameVars.moves > GameVars.minMoves && GameVars.score > GameVars.scoreAtLevelStart / 2) {

                // DESCONTAR PUNTOS HASTA EL 50% DE LA PUNTUACION TOTAL
                GameVars.score -= GameConstants.POINTS_MOVE / 2;
            }

            BoardState.currentInstance.onMove();
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

    private static levelPassed(): void {

        GameVars.levelPassed = true;
       
        BoardState.currentInstance.levelPassed();
    }

    private static getBoard(moves: number): void {

        GameVars.cellStates = [];

        BoardManager.generateBoard(moves);

        let minCellsOn: number;

        if (moves < 3) {
            minCellsOn = 4;
        } else if (moves < 5) {
            minCellsOn = 5;
        } else {
            minCellsOn = 6;
        }

        let i = 1;

        while (BoardManager.getNumberCellsOn() < minCellsOn && i < 1e3) {
            BoardManager.generateBoard(moves);
            i ++;
        }
    }

    private static generateBoard(moves: number): void {

        GameVars.cellStates = [];

        for (let c = 0; c < 5; c++) {
            GameVars.cellStates[c] = [];
            for (let r = 0; r < 5; r ++) {
                GameVars.cellStates[c].push(GameConstants.HAPPY);
            }
        }

        // SELECCIONAR 1 CELDA AL AZAR
        let nextCell = {c: Math.floor(Math.random() * 5), r: Math.floor(Math.random() * 5)};

        BoardManager.switchCell(nextCell);

        for (let i = 0; i < moves - 1; i ++) {
            nextCell = BoardManager.getNextCell(nextCell);
            BoardManager.switchCell(nextCell);
        }
    }

    private static switchCell(cell: {c: number, r: number}): void {

        GameVars.cellStates[cell.c][cell.r] = GameVars.cellStates[cell.c][cell.r] === GameConstants.HAPPY ? GameConstants.GRUMPY : GameConstants.HAPPY;
         
        for (let i = 0; i < BoardManager.NEIGHBOURING_CELLS.length; i++) {

            const col = BoardManager.NEIGHBOURING_CELLS[i][0] + cell.c;
            const row = BoardManager.NEIGHBOURING_CELLS[i][1] + cell.r;

            if (col >= 0 && col < 5 && row >= 0 && row < 5) {
                GameVars.cellStates[col][row] = GameVars.cellStates[col][row] === GameConstants.HAPPY ? GameConstants.GRUMPY : GameConstants.HAPPY;
            }
        }
    }

    private static getNextCell(cell: {c: number, r: number}): {c: number, r: number} {

        let influenceCells = BoardManager.INFLUENCE_CELLS.slice(0);
        let col: number;
        let row: number;

        influenceCells = BoardManager.shuffle(influenceCells);

        for (let i = 0; i < influenceCells.length; i ++) {

            col = cell.c + influenceCells[i][0];
            row = cell.r + influenceCells[i][1];

            if (col >= 0 && col < 5 && row >= 0 && row < 5) {
                break;
            }
        }

        return {c: col, r: row};
    }

    private static shuffle(array: any): any {

        let currentIndex = array.length;
        let temporaryValue: number;
        let randomIndex: number;

        while (0 !== currentIndex) {
      
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
        
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
      
        return array;
    }

    private static getNumberCellsOn(): number {

        let counter = 0;

        for (let c = 0; c < 5; c ++) {
            for (let r = 0; r < 5; r ++) {
                if (GameVars.cellStates[c][r] === GameConstants.GRUMPY) {
                    counter++;
                }
            }
        }

        return counter;
    }

    private static getTutorialBoard(): void {

        GameVars.cellStates = [];

        for (let c = 0; c < 5; c++) {
            GameVars.cellStates[c] = [];
            for (let r = 0; r < 5; r ++) {
                GameVars.cellStates[c].push(GameConstants.HAPPY);
            }
        }

        if (GameVars.level === 0) {
            
            GameVars.cellStates[1][2] = GameConstants.GRUMPY;
            GameVars.cellStates[2][1] = GameConstants.GRUMPY;
            GameVars.cellStates[2][2] = GameConstants.GRUMPY;
            GameVars.cellStates[2][3] = GameConstants.GRUMPY;
            GameVars.cellStates[3][2] = GameConstants.GRUMPY;
        }

        if (GameVars.level === 1) {
            GameVars.cellStates[0][2] = GameConstants.GRUMPY;
            GameVars.cellStates[1][1] = GameConstants.GRUMPY;
            GameVars.cellStates[1][2] = GameConstants.GRUMPY;
            GameVars.cellStates[1][3] = GameConstants.GRUMPY;
            GameVars.cellStates[3][1] = GameConstants.GRUMPY;
            GameVars.cellStates[3][2] = GameConstants.GRUMPY;
            GameVars.cellStates[3][3] = GameConstants.GRUMPY;
            GameVars.cellStates[4][2] = GameConstants.GRUMPY;
        }
    }
}
