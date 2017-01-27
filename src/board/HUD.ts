namespace HappyKittensPuzzle {

    export class HUD extends Phaser.Group {

        public yellowStripe: YellowStripe;

        private moves: Phaser.Text;

        constructor(game: Phaser.Game) {

            super(game, null, "hud");

            this.yellowStripe  = new YellowStripe(this.game, "LEVEL " + GameVars.currentLevel);
            this.add(this.yellowStripe);

            const lowerContainer: Phaser.Group = new Phaser.Group(this.game);
            lowerContainer.scale.y = GameVars.scaleY;
            lowerContainer.y = 900;
            this.add(lowerContainer);

            const lowerStripe: Phaser.Sprite = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
            lowerStripe.scale.set(GameConstants.GAME_WIDTH / 64, 100 / 64);
            lowerStripe.alpha = .5;
            lowerContainer.add(lowerStripe);

            const movesLabel: Phaser.Text = new Phaser.Text(this.game, 650, 5, "MOVES:", { font: "40px Concert One", fill: "#FFFFFF"});
            movesLabel.anchor.x = 1;
            lowerContainer.add(movesLabel);

            this.moves = new Phaser.Text(this.game, 680, 5,  GameVars.moves.toString(), { font: "40px Concert One", fill: "#FFFFFF"});
            lowerContainer.add(this.moves);

            const levelBest: number = GameVars.levelsBestResults[GameVars.currentLevel - 1];

            if (levelBest > 0) {

                const bestLabel: Phaser.Text = new Phaser.Text(this.game, 650, 50, "LEVEL'S BEST:", { font: "40px Concert One", fill: "#FFFFFF"});
                bestLabel.anchor.x = 1;
                lowerContainer.add(bestLabel);

                const best: Phaser.Text = new Phaser.Text(this.game, 680, 50,  levelBest.toString(), { font: "40px Concert One", fill: "#FFFFFF"});
                lowerContainer.add(best);
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
