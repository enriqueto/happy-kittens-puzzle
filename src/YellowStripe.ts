namespace HappyKittensPuzzle {

    export class YellowStripe extends Phaser.Group {

        constructor(game: Phaser.Game, text: string) {

            super(game, null, "yellow-stripe");

            this.x = GameConstants.GAME_WIDTH / 2;
            this.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);

            let colorStripe = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 3.75 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.ORANGE_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 28.125 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 3.75 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.DARK_GREEN_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 5 / 64);
            colorStripe.alpha = .45;
            this.add(colorStripe);

            const stripeLabel = new Phaser.Text(this.game, 0, 5.625, text, { font: "22px Concert One", fill: "#FFFFFF"});
            stripeLabel.anchor.x = .5;
            stripeLabel.setShadow(4, 4, "rgba(197, 97, 0, 1)", 0);
            this.add(stripeLabel);
        }
    }
}
