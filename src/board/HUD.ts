namespace HappyKittensPuzzle {

    export class HUD extends Phaser.Group {

        private levelLabel: Phaser.Text;
        private movements: Phaser.Text;
        private movementsRecord: Phaser.Text;

        constructor(game: Phaser.Game) {

            super(game, null, "hud");

            this.levelLabel = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, 20, "level " + GameVars.currentLevel, { font: "80px Arial", fill: "#ff0000"});
            this.levelLabel.anchor.x = .5;
            this.levelLabel.scale.y = GameVars.scaleY;
            this.add(this.levelLabel);

            this.movements = new Phaser.Text(this.game, 700, 880, "moves  " + GameVars.moves, { font: "60px Arial", fill: "#000000"});
            this.movements.anchor.x = 1;
            this.movements.scale.y = GameVars.scaleY;
            this.add(this.movements);

            let levelBest: number = GameVars.levelsBestResults[GameVars.currentLevel - 1];
            let levelBestStr: string = levelBest > 0 ? "level's best " + levelBest : "level's best -";

            this.movementsRecord  = new Phaser.Text(this.game, 700, 950, levelBestStr, { font: "60px Arial", fill: "#000000"});
            this.movementsRecord.anchor.x = 1;
            this.movementsRecord.scale.y = GameVars.scaleY;
            this.add(this.movementsRecord);
        }

        public updateMoves(): void {

            this.movements.text = "moves " + GameVars.moves;
        }
    }
}
