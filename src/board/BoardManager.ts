namespace Xhungo {

    export class BoardManager  {

        public static currentInstance: BoardManager;

        private game: Phaser.Game;

        constructor(game: Phaser.Game) {

            BoardManager.currentInstance = this;

            this.game = game;

            GameVars.level = 1;
        }
    }
}
