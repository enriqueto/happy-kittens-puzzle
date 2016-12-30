namespace SquaresOut {

    export class GameManager {

        private static game: Phaser.Game;

        public static init(game: Phaser.Game): void {

           GameManager.game = game;
        }

        public static levelSelected(level: number): void {

            GameVars.currentLevel = level;

            LevelSelection.currentInstance.goToBoardScene();
        }

        public static setLocalStorageData(key: string, data: any): void {
            return null;
        }
    }
}