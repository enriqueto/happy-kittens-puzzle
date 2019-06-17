namespace HappyKittensPuzzle {

    export class GameManager {

        private static game: Phaser.Game;

        private static passedLevels = 0;
        private static newScore: boolean;

        public static init(game: Phaser.Game): void {

            GameManager.game = game;

            // si no hubiese nada en el local storage
            let bestResultsStr: string = GameVars.getLocalStorageData(GameConstants.LEVEL_BEST_KEY);

            if (bestResultsStr !== "") {
                GameVars.levelsBestResults = JSON.parse(bestResultsStr);
            } else {

                GameVars.levelsBestResults = [];
                GameVars.levelsBestResults[0] = 0;

                for (let i = 1; i < GameConstants.TOTAL_LEVELS; i++) {
                    GameVars.levelsBestResults[i] = -1;
                }

                GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));
            }

            // determinar el nivel actual
            GameVars.currentLevel = GameConstants.TOTAL_LEVELS;

            for (let i = 0; i < GameConstants.TOTAL_LEVELS; i++) {
                if (GameVars.levelsBestResults[i] === 0) {
                    GameVars.currentLevel = i + 1;
                    break;
                }
            }

            GameVars.achievedLevel = GameVars.currentLevel;


            // leer el score del localstorage
            let scoreStr = GameVars.getLocalStorageData(GameConstants.SCORE_KEY);

            if (scoreStr !== "") {
                GameVars.score = JSON.parse(scoreStr);
            } else {
                GameVars.score = 0;
            }

            GameVars.gameFinished = false;
            GameVars.congratulationsMessageShown = false;
        }

        public static levelSelected(level: number): void {

            GameVars.currentLevel = level;

            LevelSelectionState.currentInstance.goToBoardScene();
        }

        public static levelPassed(): void {

            // sacar cual es el ultimo nivel alcanzado
            GameVars.achievedLevel = 1;

            for (let i = 0; i < GameVars.levelsBestResults.length; i++) {
                if (GameVars.levelsBestResults[i] === 0) {
                    GameVars.achievedLevel = i + 1;
                    break;
                }
            }

            // comprobar si se ha superado el record para este nivel y actualizar el array
            const record = GameVars.levelsBestResults[GameVars.currentLevel - 1];

            if (record === 0 || GameVars.moves <= record) {
                GameVars.levelsBestResults[GameVars.currentLevel - 1] = GameVars.moves;
            }

            if (GameVars.currentLevel === GameVars.achievedLevel) {
                GameVars.achievedLevel++;
                GameVars.levelsBestResults[GameVars.achievedLevel - 1] = 0;
            }

            if (GameVars.currentLevel < GameConstants.TOTAL_LEVELS ) {
                GameVars.currentLevel++;
            } else {
                GameVars.gameFinished = true;
                GameVars.achievedLevel = GameConstants.TOTAL_LEVELS;
            }

            GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));
        }

        public static congratulationsMessageShown(): void {

            GameVars.congratulationsMessageShown = true;
        }

        private static getLevelScore(): number {
            
            let score = 0;

            // por el nivel
            if (GameVars.currentLevel < 10) {
                score += 100;
            } else if (GameVars.currentLevel < 20) {
                score += 500;
            } else if (GameVars.currentLevel < 45) {
                score += 1000;
            } else {
                score += 2000;
            } 

            // por el numero de movimientos
            // esto no es correcto. Lo que se deberia hacer es puntuar segun la diferencia entre los movimientos
            // usados y el minimo necesario para solucionar el nivel
            if (GameVars.moves < 4) {
                score += 10;
            } else if (GameVars.moves < 10) {
                score += 20;
            } else if (GameVars.moves < 15) {
                score += 25;
            } 

            // por el tiempo
            if (GameVars.time < 5) {
                score += 100;
            } else if (GameVars.time < 10) {
                score += 50;
            } else if (GameVars.time < 20) {
                score += 25;
            } else if (GameVars.time < 30) {
                score += 10;
            }

            return score;
        }
    }
}
