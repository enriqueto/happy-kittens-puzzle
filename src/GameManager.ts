namespace SquaresOut {

    export class GameManager {

        private static game: Phaser.Game;

        public static init(game: Phaser.Game): void {

           GameManager.game = game;

           GameVars.currentLevel = 1;
        }

        public static levelSelected(level: number): void {

            GameVars.currentLevel = level;

            LevelSelection.currentInstance.goToBoardScene();
        }

        public static levelPassed(): void {

            if (GameVars.currentLevel < GameConstants.TOTAL_LEVELS) {
                GameVars.currentLevel++;
            }

            // comprobar si se ha superado el record para este nivel y actualizar el array
        }
    }
}
