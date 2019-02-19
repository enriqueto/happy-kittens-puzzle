namespace HappyKittensPuzzle {

    export class TitleContainer extends Phaser.Group {

        constructor(game: Phaser.Game) {

            super(game, null, "title-container");

            const shadowHeight = 98;
            const yellowStripeContainer_py = 60;

            const shadow = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.DARK_GREEN_SQUARE));
            shadow.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, shadowHeight / 64);
            shadow.alpha = .45;
            this.add(shadow);

            const gameTitle = new Phaser.Image(this.game, -4, -4, "texture_atlas_1", "title_bar.png");
            gameTitle.scale.y = GameVars.scaleY;
            this.add(gameTitle);

            const audioButton = new AudioButton(this.game, GameConstants.GAME_WIDTH - 27, 4);
            audioButton.scale.y = GameVars.scaleY;
            this.add(audioButton);

            const yellowStripeContainer = new Phaser.Group(this.game);
            yellowStripeContainer.x = GameConstants.GAME_WIDTH / 2;
            yellowStripeContainer.y = yellowStripeContainer_py;
            yellowStripeContainer.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
            this.add(yellowStripeContainer);

            let colorStripe = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 4 / 64);
            yellowStripeContainer.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.ORANGE_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 28 / 64);
            yellowStripeContainer.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 4 / 64);
            yellowStripeContainer.add(colorStripe);

            const stripeLabel = new Phaser.Text(this.game, 0, 6, "SELECT LEVEL", { font: "22px Concert One", fill: "#FFFFFF"});
            stripeLabel.anchor.x = .5;
            stripeLabel.setShadow(1.25, 1.25, "rgba(197, 97, 0, 1)", 0);
            yellowStripeContainer.add(stripeLabel);
        }
    }
}
