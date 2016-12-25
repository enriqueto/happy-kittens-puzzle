namespace Xhungo {

    export class Square extends Phaser.Group {

        public color: string;
        public column: number;
        public row: number;

        private redSquare: Phaser.Sprite;
        private whiteSquare: Phaser.Sprite;
        private overSprite: Phaser.Sprite;

        constructor(game: Phaser.Game, color: string, column: number, row: number) {

            super(game, null, "square");

            this.color = color;
            this.column = column;
            this.row = row;

            this.redSquare = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.RED_SQUARE));
            this.redSquare.scale.set( GameConstants.SQUARE_WIDTH / 64);
            this.redSquare.anchor.set(.5);
            this.redSquare.inputEnabled = true;
            this.redSquare.events.onInputDown.add(this.onClick, this);
            this.redSquare.events.onInputOver.add(this.onOver, this);
            this.redSquare.events.onInputOut.add(this.onOut, this);
            this.add(this.redSquare);

            this.whiteSquare = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            this.whiteSquare.scale.set( GameConstants.SQUARE_WIDTH / 64);
            this.whiteSquare.anchor.set(.5);
            this.whiteSquare.inputEnabled = true;
            this.whiteSquare.events.onInputDown.add(this.onClick, this);
            this.whiteSquare.events.onInputOver.add(this.onOver, this);
            this.whiteSquare.events.onInputOut.add(this.onOut, this);
            this.add(this.whiteSquare);

            if (this.color === GameConstants.RED_SQUARE) {
                this.whiteSquare.visible = false;
            }else {
                this.redSquare.visible = false;
            }

            this.overSprite = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            this.overSprite.scale.set( GameConstants.SQUARE_WIDTH / 64);
            this.overSprite.anchor.set(.5);
            this.overSprite.visible = false;
            this.overSprite.alpha = .25;
            this.add(this.overSprite);
        }

        public flip(): void {

            this.redSquare.visible = !this.redSquare.visible;
            this.whiteSquare.visible = !this.whiteSquare.visible;
        }

        private onClick(): void {

            this.flip();

            BoardManager.currentInstance.squareFlipped(this.column, this.row);
        }

        private onOver(): void {

            this.overSprite.visible = true;
        }

        private onOut(): void {

            this.overSprite.visible = false;
        }
    }
}

