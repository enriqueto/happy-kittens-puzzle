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

            this.square = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "switch_on.png");
            this.square.scale.set( (GameConstants.SQUARE_WIDTH - 9) / 64);
            this.square.anchor.set(.5);
            this.square.inputEnabled = true;
            this.square.events.onInputDown.add(this.onClick, this);

            // this.square.events.onInputOver.add(this.onOver, this);
            // this.square.events.onInputOut.add(this.onOut, this);

            this.add(this.square);


            if (this.color === GameConstants.WHITE_SQUARE) {
                this.square.frameName = "switch_off.png";
            }

            // this.overSprite = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.GRAY_SQUARE));
            // this.overSprite.scale.set( (GameConstants.SQUARE_WIDTH - 9) / 64);
            // this.overSprite.anchor.set(.5);
            // this.overSprite.visible = false;
            // this.overSprite.alpha = .25;
            // this.add(this.overSprite);
        }

        public update(): void {

            super.update();
        }

        public flip(): void {

            this.flipping = true;
            this.framesCounter = 0;

            this.color = this.color === GameConstants.RED_SQUARE ? GameConstants.WHITE_SQUARE : GameConstants.RED_SQUARE;

            this.square.frameName = this.color === GameConstants.WHITE_SQUARE ? "switch_on_off.png" : "switch_off_on.png";
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

        // private onOver(): void {

        //     this.overSprite.visible = true;
        // }

        // private onOut(): void {

        //     this.overSprite.visible = false;
        // }
    }
}

