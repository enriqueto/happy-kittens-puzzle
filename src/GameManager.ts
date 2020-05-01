import { GameVars } from "./GameVars";
import { GameConstants } from "./GameConstants";
import { Game } from "./Game";

export class GameManager {

    public static init(): void {

        GameVars.level = 0;
        GameVars.minMoves = 2;
        GameVars.score = GameVars.minMoves * GameConstants.POINTS_MOVE;
        GameVars.scoreAtLevelStart = GameVars.score;
        GameVars.tutorialSeen = false;
        GameVars.levelReset = false;
    }

    public static reset(): void {

        GameVars.levelReset = true;

        Game.currentInstance.state.start("BoardState", true, false);  
    }

    public static levelPassed(): void {

        // la gestion de la complejidad
        const rnd = Math.random();

        if (rnd < .7) {
            GameVars.minMoves ++;
        } else if (rnd > .9) {
            GameVars.minMoves --;
        }

        if (GameVars.minMoves > 12) {
            GameVars.minMoves = 12;
        }

        if (GameVars.minMoves < 2) {
            GameVars.minMoves = 2;
        }

        GameVars.level ++;
        GameVars.score += GameVars.minMoves * GameConstants.POINTS_MOVE;
        GameVars.scoreAtLevelStart = GameVars.score;
        GameVars.levelReset = false;

        Game.currentInstance.state.start("BoardState", true, false);  
    }
}
