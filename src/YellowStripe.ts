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

        const gameLogo = new Phaser.Image(this.game, 0, 50, "texture_atlas_1", "title_bar.png");
        gameLogo.anchor.set(.5);
        gameLogo.scale.set(.5);
        this.add(gameLogo);
    }
}

