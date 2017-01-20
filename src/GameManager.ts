namespace HappyKittensPuzzle {

    export class GameManager {

        private static game: Phaser.Game;

        public static init(game: Phaser.Game): void {

           GameManager.game = game;

           GameVars.currentLevel = null;

           // si no hubiese nada en el local storage
           let bestResultsStr: string = GameVars.getLocalStorageData(GameConstants.LEVEL_BEST_KEY);

           if (bestResultsStr !== "") {
                GameVars.levelsBestResults = JSON.parse(bestResultsStr);
           }else {

                GameVars.levelsBestResults = [];
                GameVars.levelsBestResults[0] = 0;

                for (let i: number = 1; i < GameConstants.TOTAL_LEVELS; i++) {
                    GameVars.levelsBestResults[i] = -1;
                }

                GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));
           }
        }

        public static levelSelected(level: number): void {

            GameVars.currentLevel = level;

            LevelSelection.currentInstance.goToBoardScene();
        }

        public static levelPassed(): void {

            // comprobar si se ha superado el record para este nivel y actualizar el array
            let record: number = GameVars.levelsBestResults[GameVars.currentLevel - 1];

            if (GameVars.levelsBestResults[GameVars.currentLevel - 1] === 0 || GameVars.moves < record) {
                GameVars.levelsBestResults[GameVars.currentLevel - 1] = GameVars.moves;
            }

            if (GameVars.currentLevel < GameConstants.TOTAL_LEVELS) {
                GameVars.currentLevel++;
            }

            GameVars.levelsBestResults[GameVars.currentLevel - 1] = 0;

            GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));
        }
    }
}
