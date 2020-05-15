import { Cell } from "./Cell";
import { HandIcon } from "./HandIcon";
import { GameVars } from "../GameVars";
import { GameConstants } from "../GameConstants";
import { AudioManager } from "../AudioManager";

export class Board extends Phaser.Group {

    public cells: Cell[][];
    public handIcon: HandIcon;

    private purringAudio: boolean;

    constructor(game: Phaser.Game) {

        super(game, null, "board");

        this.scale.y = GameVars.scaleY;

        this.x = GameConstants.GAME_WIDTH / 2;
        this.y = 538;

        this.cells = [];
        this.handIcon = null;

        this.purringAudio = false;

        let cell: Cell;
        let state: string;

        for (let col = 0; col < 5; col++) {

            this.cells[col] = [];

            for (let row = 0; row < 5; row++) {

                if (GameConstants.EDITING_LEVELS) {
                    state = GameConstants.HAPPY;
                } else {
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

        // desactivar todas las celdas menos las que conforman el tutorial
        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 5; row++) {
                this.cells[col][row].activated = false;
            }
        }

        let c: number;
        let r: number;

        if (GameVars.currentLevel === 0) {
            c = 2;
            r = 2;
        }

        if (GameVars.currentLevel === 1) {
            c = 1;
            r = 2;
        }

        this.cells[c][r].activated = true;

        const x = c * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH + 15;
        const y = r * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH + 15 * GameVars.scaleY;

        this.handIcon = new HandIcon(this.game, x, y);
        this.add(this.handIcon);
    }

    public onMove(): void {

        if (!GameVars.tutorialSeen && GameVars.currentLevel === 1) {
            // desactivar todas las celdas menos las que conforman el tutorial
            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    this.cells[col][row].activated = false;
                }
            }

            const c = 3;
            const r = 2;

            this.cells[c][r].activated = true;

            const x = c * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH + 15;
            const y = r * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH + 15 * GameVars.scaleY;
    
            this.handIcon.x = x;
            this.handIcon.y = y;
        }
    }

    public levelPassed(): void {

        if (this.handIcon) {
            this.handIcon.hide();
        }

        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 5; row++) {
                if (Math.random() > .7) {
                    this.cells[col][row].endAnimation();
                }
            }
        }
    }

    public makeOneKittenSleep(): void {

        // pillar un gato y hacerlo dormir
        const kittens: Cell[] = [];

        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 5; row++) {
                let kitten = this.cells[col][row];
                if (kitten.state === GameConstants.HAPPY && !kitten.sleeping) {
                    kittens.push(kitten);
                }
            }
        }

        if (kittens.length > 0) {
            let kitten = Phaser.ArrayUtils.getRandomItem(kittens);
            kitten.sleep();

            if (!this.purringAudio) {
                this.purringAudio = true;
                AudioManager.getInstance().playSound("cat_purring", false, .5);
            }
        }
    }

    public awakeSleepingKitten(): void {

        for (let col = 0; col < 5; col++) {
            for (let row = 0; row < 5; row++) {
                let kitten = this.cells[col][row];
                if (kitten.sleeping) {
                    kitten.awake();
                }
            }
        }

        if (this.purringAudio) {
            this.purringAudio = false;
            AudioManager.getInstance().stopSound("cat_purring");
        }
    }
}
