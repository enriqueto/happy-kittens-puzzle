namespace HappyKittensPuzzle {

    export class Square extends Phaser.Group {

        public color: string;
        public column: number;
        public row: number;

        private square: Phaser.Image;
        private flipping: boolean;
        private framesCounter: number;

        constructor(game: Phaser.Game, color: string, column: number, row: number) {

            super(game, null, "square");

            this.flipping = false;
            this.color = color;
            this.column = column;
            this.row = row;

            this.square = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "happy_kitten_idle.png");
            this.square.anchor.set(.5);
            this.square.inputEnabled = true;
            this.square.events.onInputDown.add(this.onClick, this);
            this.add(this.square);

            if (this.color === GameConstants.GRUMPY) {
                this.square.frameName = "grumpy_kitten_idle.png";
            }
        }

        public flip(): void {

            this.flipping = true;
            this.framesCounter = 0;

            this.color = this.color === GameConstants.HAPPY ? GameConstants.GRUMPY : GameConstants.HAPPY;

            this.square.frameName = this.color === GameConstants.GRUMPY ? "switch_on_off.png" : "switch_off_on.png";
        }

        private onClick(): void {

            if (GameVars.levelPassed && !GameConstants.EDITING_LEVELS) {
                return;
            }

            this.flip();

            if (GameConstants.EDITING_LEVELS) {
                LevelEditionState.currentInstance.move(this.column, this.row);
            } else {
                LevelManager.currentInstance.squareFlipped(this.column, this.row);
            }
        }
    }
}

