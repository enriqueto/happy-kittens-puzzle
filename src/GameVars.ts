namespace SquaresOut {

    export class GameVars {

        public static scaleY: number;
        public static levelData: LevelData;
        public static currentLevel: number;
        public static achievedLevel: number;
        public static colors: string[][];
        public static levelPassed: boolean;
        public static moves: number;
        public static levelBest: number;

        public static getLocalStorageData(key: string): any {
            return null;
        }

        public static setLocalStorageData(key: string, data: any): void {
            return null;
        }
    }
}
