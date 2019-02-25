namespace HappyKittensPuzzle {

    export class TitleContainer extends Phaser.Group {

        constructor(game: Phaser.Game) {

            super(game, null, "title-container");

             const aspectRatio: number = window.innerHeight / window.innerWidth;

             let shadowHeight: number;
             let yellowStripeContainer_py: number;

             if (this.game.device.desktop) {

                 shadowHeight = 314;
                 yellowStripeContainer_py = 190;

             } else {

                if (aspectRatio >= 1.75) {
                    shadowHeight = 250;
                    yellowStripeContainer_py = 154;
                } else if (aspectRatio >= 1.5) {
                    shadowHeight = 294;
                    yellowStripeContainer_py = 180;
                } else {
                    shadowHeight = 304;
                    yellowStripeContainer_py = 200;
                }
             }

            const shadow = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.DARK_GREEN_SQUARE));
            shadow.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, shadowHeight / 64);
            shadow.alpha = .45;
            this.add(shadow);

            const gameTitle = new Phaser.Image(this.game, -12, -12, "texture_atlas_1", "title_bar.png");
            gameTitle.scale.y = GameVars.scaleY;
            this.add(gameTitle);

            const audioButton = new AudioButton(this.game, GameConstants.GAME_WIDTH - 85, 14);
            audioButton.scale.y = GameVars.scaleY;
            this.add(audioButton);

            const yellowStripeContainer = new Phaser.Group(this.game);
            yellowStripeContainer.x = GameConstants.GAME_WIDTH / 2;
            yellowStripeContainer.y = yellowStripeContainer_py;
            yellowStripeContainer.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
            this.add(yellowStripeContainer);

            let colorStripe = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 12 / 64);
            yellowStripeContainer.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.ORANGE_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 90 / 64);
            yellowStripeContainer.add(colorStripe);

            colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
            colorStripe.anchor.x = .5;
            colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 12 / 64);
            yellowStripeContainer.add(colorStripe);

            const stripeLabel = new Phaser.Text(this.game, 0, 18, "SELECT LEVEL", { font: "70px Concert One", fill: "#FFFFFF"});
            stripeLabel.anchor.x = .5;
            stripeLabel.setShadow(4, 4, "rgba(197, 97, 0, 1)", 0);
            yellowStripeContainer.add(stripeLabel);
        }
    }
}
