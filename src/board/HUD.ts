namespace HappyKittensPuzzle {

    export class HUD extends Phaser.Group {

        public yellowStripe: YellowStripe;
        public lowerStripe: Phaser.Group;

        private moves: Phaser.Text;

        constructor(game: Phaser.Game) {

            super(game, null, "hud");

            this.yellowStripe = new YellowStripe(this.game, "LEVEL " + GameVars.currentLevel);
            this.yellowStripe.y = GameVars.upperStripe_py;
            this.add(this.yellowStripe);

            this.lowerStripe = new Phaser.Group(this.game);
            this.lowerStripe.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
            this.lowerStripe.x = GameConstants.GAME_WIDTH / 2;
            this.lowerStripe.y = GameVars.lowerStripe_py;
            this.lowerStripe.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
            this.add(this.lowerStripe);

            const stripeBackground: Phaser.Sprite = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
            stripeBackground.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 100 / 64);
            stripeBackground.anchor.x = .5;
            stripeBackground.alpha = .5;
            this.lowerStripe.add(stripeBackground);

            const movesLabel: Phaser.Text = new Phaser.Text(this.game, 280 / GameVars.stripesScale, 5, "MOVES:", { font: "40px Concert One", fill: "#FFFFFF"});
            movesLabel.anchor.x = 1;
            this.lowerStripe.add(movesLabel);

            this.moves = new Phaser.Text(this.game, 310 / GameVars.stripesScale, 5, GameVars.moves.toString(), { font: "40px Concert One", fill: "#FFFFFF"});
            this.lowerStripe.add(this.moves);

            const levelBest: number = GameVars.levelsBestResults[GameVars.currentLevel - 1];

            if (levelBest > 0) {

                const bestLabel: Phaser.Text = new Phaser.Text(this.game, 280 / GameVars.stripesScale, 50, "LEVEL'S BEST:", { font: "40px Concert One", fill: "#FFFFFF"});
                bestLabel.anchor.x = 1;
                this.lowerStripe.add(bestLabel);

                const best: Phaser.Text = new Phaser.Text(this.game, 310 / GameVars.stripesScale, 50,  levelBest.toString(), { font: "40px Concert One", fill: "#FFFFFF"});
                this.lowerStripe.add(best);

            } else {

                movesLabel.y = 15;
                movesLabel.fontSize = "62px";

                this.moves.y = 15;
                this.moves.fontSize = "62px";
            }
        }

        public updateMoves(): void {

            this.moves.text = GameVars.moves.toString();
        }
    }
}
