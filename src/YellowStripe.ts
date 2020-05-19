import { GameConstants } from "./GameConstants";
import { GameVars } from "./GameVars";

export class YellowStripe extends Phaser.Group {

    constructor(game: Phaser.Game) {

        super(game, null, "yellow-stripe");

        this.x = GameConstants.GAME_WIDTH / 2;
        this.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);

        let colorStripe = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.YELLOW_SQUARE));
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

        colorStripe = new Phaser.Sprite(this.game, 0 , colorStripe.y + colorStripe.height, this.game.cache.getBitmapData(GameConstants.DARK_GREEN_SQUARE));
        colorStripe.anchor.x = .5;
        colorStripe.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 16 / 64);
        colorStripe.alpha = .45;
        this.add(colorStripe);

        if ((GameVars.currentLevel === 0 || GameVars.currentLevel === 1) && !GameVars.tutorialSeen) {

            let tutorialStr: string;
            let size: number;

            if (GameVars.currentLevel === 0) {
                tutorialStr = "make all cats happy";
                size = 70;
            } else {
                tutorialStr = "tap to flip the cats around";
                size = 60;
            }

            const stripeLabel = new Phaser.Text(this.game, 0, 54, tutorialStr, {font: size + "px Concert One", fill: "#FFFFFF"});
            stripeLabel.anchor.set(.5);
            stripeLabel.setShadow(4, 4, "rgba(197, 97, 0, 1)", 0);
            this.add(stripeLabel);

            this.game.add.tween(stripeLabel.scale)
                .to({y: 1.1}, 600, Phaser.Easing.Cubic.Out, true, 0, -1, true);

        } else {

            const gameLogo = new Phaser.Image(this.game, 0, 50, "texture_atlas_1", "title_bar.png");
            gameLogo.anchor.set(.5);
            gameLogo.scale.set(.5);
            this.add(gameLogo);
        }
    }
}

