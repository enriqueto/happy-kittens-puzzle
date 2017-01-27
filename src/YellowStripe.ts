namespace HappyKittensPuzzle {

    export class YellowStripe extends Phaser.Group {

        constructor(game: Phaser.Game, text: string) {

            super(game, null, "yellow-stripe");

            this.x = GameConstants.GAME_WIDTH / 2;
            this.y = GameVars.upperStripe_py;
            this.scale.set(GameVars.upperStripeScale, GameVars.upperStripeScale * GameVars.scaleY);

            let colorStripe: Phaser.Sprite = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 12 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.ORANGE_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 90 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 12 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 16 / 64);
            colorStripe.alpha = .5;
            this.add(colorStripe);

            const stripeLabel: Phaser.Text = new Phaser.Text(this.game, 0, 18, text, { font: "70px Concert One", fill: "#FFFFFF"});
            stripeLabel.anchor.x = .5;
            stripeLabel.setShadow(4, 4, "rgba(197, 97, 0, 1)", 0);
            this.add(stripeLabel);
        }
    }
}
