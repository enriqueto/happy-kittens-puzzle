namespace SquaresOut {

    export class HUD extends Phaser.Group {

        private levelLabel: Phaser.Text;
        private movements: Phaser.Text;
        private movementsRecord: Phaser.Text;

        constructor(game: Phaser.Game) {

            super(game, null, "hud");
        }
    }
}
