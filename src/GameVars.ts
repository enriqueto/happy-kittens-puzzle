namespace HappyKittensPuzzle {

    export class GameVars {

        public static scaleY: number;

        // en este array se guardan los mejores resultados del nivel, es 0 si está desbloqueado pero no superado y -1 si está bloqueado
        public static levelsBestResults: number [];
        public static currentLevel: number;
        public static achievedLevel: number;
        public static cellStates: string[][];
        public static levelPassed: boolean;
        public static moves: number;
        public static upperStripe_py: number;
        public static lowerStripe_py: number;
        public static stripesScale: number;
        public static lastFlipTime: number;
        public static gameFinished: boolean;
        public static cellsFlipping: boolean;

        public static getLocalStorageData(key: string): string {

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
