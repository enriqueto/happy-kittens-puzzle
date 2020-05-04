import { GameVars } from "./GameVars";
import { GameConstants } from "./GameConstants";
import { Game } from "./Game";

export class GameManager {

    public static init(): void {

        GameVars.level = 0;
        GameVars.minMoves = 1;
        GameVars.score = GameVars.minMoves * GameConstants.POINTS_MOVE;
        GameVars.scoreAtLevelStart = GameVars.score;
        GameVars.tutorialSeen = false;
        GameVars.levelReset = false;
    }

    public static reset(): void {

        GameVars.levelReset = true;

        if (GameVars.score > GameVars.scoreAtLevelStart / 2) {

            // DESCONTAR PUNTOS HASTA EL 50% DE LA PUNTUACION TOTAL
            GameVars.score -= GameConstants.POINTS_MOVE / 2;

            GAMESNACKS.sendScore(GameVars.score);
        }

        Game.currentInstance.state.start("BoardState", true, false);  
    }

    public static levelPassed(): void {

        GameVars.level ++;

        if (GameVars.level > 1) {
            GameVars.tutorialSeen = true;
        }

        if (!GameVars.tutorialSeen) {

            GameVars.minMoves ++;

        } else {

            if (GameVars.level === 2) {
                GameVars.minMoves = 2;
            } else {
                // la gestion de la complejidad
                const rnd = Math.random();

                if (rnd < .7) {
                    GameVars.minMoves ++;
                } else if (rnd > .9) {
                    GameVars.minMoves --;
                }

                if (GameVars.minMoves > 6) {
                    GameVars.minMoves = 6;
                }

                if (GameVars.minMoves < 2) {
                    GameVars.minMoves = 2;
                }
            }
        }

        // console.log("nivel de movimientos:", GameVars.minMoves);

        GameVars.score += GameVars.minMoves * GameConstants.POINTS_MOVE;
        GameVars.scoreAtLevelStart = GameVars.score;

        GameVars.levelReset = false;

        GAMESNACKS.sendScore(GameVars.score);

        Game.currentInstance.state.start("BoardState", true, false);  
    }
}
