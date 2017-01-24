namespace HappyKittensPuzzle {

    export class LevelEditionState extends Phaser.State {

        public static currentInstance: LevelEditionState;

        private board: Board;
        private movementsLabel: Phaser.Text;

        public init(): void {

            LevelEditionState.currentInstance = this;

            GameVars.moves = 0;
        }

        public create(): void {

            this.board = new Board(this.game);
            this.add.existing(this.board);

            this.movementsLabel = this.add.text(430, 530, "moves  " + GameVars.moves, { font: "30px Arial", fill: "#000000"});
            this.movementsLabel.anchor.x = 1;
            this.movementsLabel.scale.y = GameVars.scaleY;

            let resetButton: Phaser.Button = this.add.button( 20, 520, "texture_atlas_1", this.onResetClicked, this);
            resetButton.setFrames("button-reset-on.png", "button-reset-off.png", "button-reset-on.png");
            resetButton.scale.y = GameVars.scaleY;
            this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
        }

        public shutdown(): void {

            SplashState.currentInstance = null;

            super.shutdown();
        }

        public move(column: number, row: number): void {

            GameVars.moves++;

            this.movementsLabel.text = "moves " + GameVars.moves;

            let squares: Square[][] = this.board.cells;

            let c: number;
            let r: number;

            for (let i: number = 0; i < LevelManager.neighbourSquares.length; i++) {

                c = LevelManager.neighbourSquares[i][0] + column;
                r = LevelManager.neighbourSquares[i][1] + row;

                if (c >= 0 && r >= 0 && c < squares.length && r < squares.length) {
                    squares[c][r].flip();
                }
            }
        }

        public onResetClicked(): void {

            this.game.state.start("LevelEditionState", true, false);
        }
    }
}
