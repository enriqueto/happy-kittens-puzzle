namespace SquaresOut {

    export class GameManager {

        private static game: Phaser.Game;

        public static init(game: Phaser.Game): void {

           GameManager.game = game;

           GameVars.currentLevel = null;
           GameVars.achievedLevel = 0;

           // si no hubiese nada en el local storage

           GameVars.achievedLevel = 1;

           GameVars.levelsBest = [];

           GameVars.levelsBest[0] = 0;

           for (let i: number = 1; i < GameConstants.TOTAL_LEVELS; i++) {
               GameVars.levelsBest[i] = -1;
           }
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
