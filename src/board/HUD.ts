import { YellowStripe } from "../YellowStripe";
import { GameVars } from "../GameVars";
import { GameConstants } from "../GameConstants";

export class HUD extends Phaser.Group {

    public yellowStripe: YellowStripe;
    public lowerStripe: Phaser.Group;

    private moves: Phaser.Text; 
    private score: Phaser.Text;

    constructor(game: Phaser.Game) {

        super(game, null, "hud");

        this.yellowStripe = new YellowStripe(this.game);
        this.yellowStripe.y = GameVars.upperStripe_py;
        this.add(this.yellowStripe);

        this.lowerStripe = new Phaser.Group(this.game);
        this.lowerStripe.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
        this.lowerStripe.x = GameConstants.GAME_WIDTH / 2;
        this.lowerStripe.y = GameVars.lowerStripe_py;
        this.lowerStripe.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
        this.add(this.lowerStripe);

        const stripeBackground = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
        stripeBackground.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 100 / 64);
        stripeBackground.anchor.x = .5;
        stripeBackground.alpha = .5;
        this.lowerStripe.add(stripeBackground);

        const movesLabel = new Phaser.Text(this.game, -360 / GameVars.stripesScale, 23, "MOVES:", { font: "52px Concert One", fill: "#FFFFFF"});
        this.lowerStripe.add(movesLabel);

        this.moves = new Phaser.Text(this.game, -190 / GameVars.stripesScale, 23, GameVars.moves.toString(), { font: "52px Concert One", fill: "#FFFFFF"});
        this.lowerStripe.add(this.moves);

        const scoreLabel = new Phaser.Text(this.game, -100 / GameVars.stripesScale, 23, "SCORE:", { font: "52px Concert One", fill: "#FFFFFF"});
        this.lowerStripe.add(scoreLabel);

        this.score = new Phaser.Text(this.game, 60 / GameVars.stripesScale, 23, GameVars.score.toString(), { font: "52px Concert One", fill: "#FFFFFF"});
        this.lowerStripe.add(this.score);
    }

    public updateMoves(): void {

        this.moves.text = GameVars.moves.toString();
    }

    public updateScore(): void {

        this.score.text = GameVars.score.toString();
    }
}