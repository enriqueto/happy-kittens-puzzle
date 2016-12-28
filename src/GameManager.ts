namespace Xhungo {

    export class GameManager {

        private static game: Phaser.Game;

        public static init(game: Phaser.Game): void {

           GameManager.game = game;
        }

        public static setLocalStorageData(key: string, data: any): void {
            return null;
        }
    }
}