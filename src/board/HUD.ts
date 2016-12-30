namespace SquaresOut {

    export class HUD extends Phaser.Group {

        private levelLabel: Phaser.Text;
        private movements: Phaser.Text;
        private movementsRecord: Phaser.Text;

        constructor(game: Phaser.Game) {

            super(game, null, "hud");

            this.levelLabel  = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, 20, "level " + GameVars.currentLevel, { font: "40px Arial", fill: "#000000"});
            this.levelLabel.anchor.x = .5;
            this.add(this.levelLabel);

            this.movements = new Phaser.Text(this.game, 430, 530, "moves  " + GameVars.moves, { font: "30px Arial", fill: "#000000"});
            this.movements.anchor.x = 1;
            this.add(this.movements);

            this.movementsRecord  = new Phaser.Text(this.game, 430, 580, "level's best " + GameVars.levelBest, { font: "30px Arial", fill: "#000000"});
            this.movementsRecord.anchor.x = 1;
            this.add(this.movementsRecord);
        }

        public updateMoves(): void {

            this.movements.text = "moves " + GameVars.moves;
        }
    }
}
