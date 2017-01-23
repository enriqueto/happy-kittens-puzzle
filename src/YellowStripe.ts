namespace HappyKittensPuzzle {

    export class YellowStripe extends Phaser.Group {

        constructor(game: Phaser.Game, text: string) {

            super(game, null, "yellow-stripe");

            this.scale.y = GameVars.scaleY;

            let colorStripe: Phaser.Sprite = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.scale.set(GameConstants.GAME_WIDTH / 64, 12 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.ORANGE_SQUARE));
            colorStripe.scale.set(GameConstants.GAME_WIDTH / 64, 90 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.scale.set(GameConstants.GAME_WIDTH / 64, 12 / 64);
            this.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
            colorStripe.scale.set(GameConstants.GAME_WIDTH / 64, 16 / 64);
            colorStripe.alpha = .5;
            this.add(colorStripe);

            const levelLabel: Phaser.Text = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, 16, text, { font: "70px Concert One", fill: "#FFFFFF"});
            levelLabel.anchor.x = .5;
            levelLabel.scale.y = GameVars.scaleY;
            levelLabel.setShadow(4, 4, "rgba(197, 97, 0, 1)", 0);
            this.add(levelLabel);
        }
    }
}
