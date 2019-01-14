namespace HappyKittensPuzzle {

    export class Game extends Phaser.Game {

        public static currentInstance: Game;

        constructor() {

            super(GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT, Phaser.AUTO , "content", null, false, true);

            Game.currentInstance = this;

            this.state.add("PreLoader", PreLoader, false);
            this.state.add("LevelSelectionState", LevelSelectionState, false);
            this.state.add("LevelEditionState", LevelEditionState, false);
            this.state.add("BoardState", BoardState, false);

            this.state.add("Boot", Boot, true);

            console.log("HOLA");

            console.log(this);
        }
    }
}
