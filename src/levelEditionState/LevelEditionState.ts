import { Board } from "../board/Board";
import { GameVars } from "../GameVars";
import { GameConstants } from "../GameConstants";
import { Cell } from "../board/Cell";
import { BoardManager } from "../board/BoardManager";

export class LevelEditionState extends Phaser.State {

    public static currentInstance: LevelEditionState;

    private board: Board;
    private movementsLabel: Phaser.Text;

    public init(): void {

        LevelEditionState.currentInstance = this;

        GameVars.moves = 0;
    }

    public create(): void {

        const background: Phaser.Sprite = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.DARK_GREEN_SQUARE));
        background.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);
        this.add.existing(background);

        this.board = new Board(this.game);
        this.add.existing(this.board);

        this.movementsLabel = this.add.text(600, 900, "moves  " + GameVars.moves, { font: "30px Arial", fill: "#000000"});
        this.movementsLabel.anchor.x = 1;
        this.movementsLabel.scale.y = GameVars.scaleY;

        const resetButton = this.add.button( 20, 900, "texture_atlas_1", this.onResetClicked, this);
        resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png");
        resetButton.scale.y = GameVars.scaleY;
        this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
    }

    public shutdown(): void {

        LevelEditionState.currentInstance = null;

        super.shutdown();
    }

    public move(column: number, row: number): void {

        GameVars.moves++;

        this.movementsLabel.text = "moves " + GameVars.moves;

        let cells: Cell[][] = this.board.cells;

        let c: number;
        let r: number;

        for (let i: number = 0; i < BoardManager.neighbourSquares.length; i++) {

            c = BoardManager.neighbourSquares[i][0] + column;
            r = BoardManager.neighbourSquares[i][1] + row;

            if (c >= 0 && r >= 0 && c < cells.length && r < cells.length) {
                cells[c][r].flip(true);
            }
        }
    }

    public onResetClicked(): void {

        this.game.state.start("LevelEditionState", true, false);
    }
}
