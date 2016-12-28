namespace SquaresOut {

    export class Game extends Phaser.Game {

        constructor() {

            super( GameConstants.GAME_WIDTH, GameConstants.GAME_HEIGHT, Phaser.AUTO , "content", null, false, true );

            this.state.add("PreLoader", PreLoader, false);
            this.state.add("SplashState", SplashState, false);
            this.state.add("BoardState", BoardState, false);

            this.state.add("Boot", Boot, true);
        }
    }
}
