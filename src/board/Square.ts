namespace Xhungo {

    export class Square extends Phaser.Group {

        public color: string;
        public column: number;
        public row: number;

        private squareSprite: Phaser.Sprite;
        private overSprite: Phaser.Sprite;

        constructor(game: Phaser.Game, color: string, column: number, row: number) {

            super(game, null, "square");

            this.color = color;
            this.column = column;
            this.row = row;

            this.squareSprite = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(this.color));
            this.squareSprite.scale.set( GameConstants.SQUARE_WIDTH / 64);
            this.squareSprite.anchor.set(.5);
            this.squareSprite.inputEnabled = true;
            this.squareSprite.events.onInputDown.add(this.onClick, this);
            this.squareSprite.events.onInputOver.add(this.onOver, this);
            this.squareSprite.events.onInputOut.add(this.onOut, this);
            this.add(this.squareSprite);

            this.overSprite = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            this.overSprite.scale.set( GameConstants.SQUARE_WIDTH / 64);
            this.overSprite.anchor.set(.5);
            this.overSprite.visible = false;
            this.overSprite.alpha = .25;
            this.add(this.overSprite);
        }

        private onClick(): void {

            console.log(this.column, this.row);
        }

        private onOver(): void {

            this.overSprite.visible = true;
        }

        private onOut(): void {

            this.overSprite.visible = false;
        }
    }
}

