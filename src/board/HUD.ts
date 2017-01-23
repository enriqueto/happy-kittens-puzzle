namespace HappyKittensPuzzle {

    export class HUD extends Phaser.Group {

        public yellowStripe: YellowStripe;

        private levelLabel: Phaser.Text;
        private movements: Phaser.Text;
        private movementsRecord: Phaser.Text;

        constructor(game: Phaser.Game) {

            super(game, null, "hud");

            this.yellowStripe  = new YellowStripe(this.game, "LEVEL " + GameVars.currentLevel);
            this.yellowStripe.y = 20;
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

            const bestLabel: Phaser.Text = new Phaser.Text(this.game, 650, 50, "LEVEL'S BEST:", { font: "40px Concert One", fill: "#FFFFFF"});
            bestLabel.anchor.x = 1;
            lowerContainer.add(bestLabel);

            // this.movements = new Phaser.Text(this.game, 700, 880, "MOVES:" + GameVars.moves, { font: "60px Concert One", fill: "#FFFFFF"});
            // this.movements.anchor.x = 1;
            // this.movements.scale.y = GameVars.scaleY;
            // this.add(this.movements);

            // let levelBest: number = GameVars.levelsBestResults[GameVars.currentLevel - 1];
            // let levelBestStr: string = levelBest > 0 ? "LEVEL"S BEST: " + levelBest : "LEVEL"S BEST:";

            // this.movementsRecord = new Phaser.Text(this.game, 700, 950, levelBestStr, { font: "60px Concert One", fill: "#FFFFFF"});
            // this.movementsRecord.anchor.x = 1;
            // this.movementsRecord.scale.y = GameVars.scaleY;
            // this.add(this.movementsRecord);
        }

        public updateMoves(): void {

            // this.movements.text = "moves " + GameVars.moves;
        }
    }
}
