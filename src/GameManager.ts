import { GameVars } from "./GameVars";
import { GameConstants } from "./GameConstants";

export class GameManager {

    public static init(): void {

        GameVars.score = 0;

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

        GameVars.gameFinished = false;
        GameVars.congratulationsMessageShown = false;
    }

    public static levelPassed(): void {

        // comprobar si se ha superado el record para este nivel y actualizar el array
        const record = GameVars.levelsBestResults[GameVars.currentLevel - 1];

        if (record === 0 || GameVars.moves <= record) {
            GameVars.levelsBestResults[GameVars.currentLevel - 1] = GameVars.moves;
        }

      
        if (GameVars.currentLevel < GameConstants.TOTAL_LEVELS ) {
            GameVars.currentLevel++;
        } else {
            GameVars.gameFinished = true;
        }

        GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));
    }

    public static congratulationsMessageShown(): void {

        GameVars.congratulationsMessageShown = true;
    }
}
