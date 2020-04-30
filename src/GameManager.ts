import { GameVars } from "./GameVars";
import { GameConstants } from "./GameConstants";
import { Game } from "./Game";

export class GameManager {

    public static init(): void {

        GameVars.score = 0;
        GameVars.level = 0;
        GameVars.minMoves = 2;
        GameVars.levelReset = false;
    }

    public static reset(): void {

        GameVars.levelReset = true;

        Game.currentInstance.state.start("BoardState", true, false);  
    }

    public static levelPassed(): void {

        console.log("Game Manager NIVEL SUPERADO");
        console.log("nivel:", GameVars.level, "movimientos:", GameVars.minMoves);
       
        GameVars.level ++;
        GameVars.minMoves ++;
        GameVars.levelReset = false;

        Game.currentInstance.state.start("BoardState", true, false);  
    }
}
