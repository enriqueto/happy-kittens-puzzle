namespace SquaresOut {

    export class GameVars {

        public static scaleY: number;

        // en este array se guardan los mejores resultados del nivel, es 0 si está desbloqueado pero no superado y -1 si está bloqueado
        public static levelsBest: number [];
        public static currentLevel: number;
        public static achievedLevel: number;
        public static colors: string[][];
        public static levelPassed: boolean;
        public static moves: number;
        public static levelBest: number;

        public static getLocalStorageData(key: string): any {

            var value: string = localStorage.getItem(key);

            if (value !== null) {
                return value;
            }else {
                return "";
            }
        }

        public static setLocalStorageData(key: string, value: any): void {

            localStorage.setItem( key, value);
        }
    }
}
