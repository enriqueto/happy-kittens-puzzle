namespace HappyKittensPuzzle {

    export class GameConstants {

        public static VERSION: string = "1.2";
        public static ASSETS_PATH: string = "assets";
        public static DEVELOPMENT: boolean = true;
        public static EDITING_LEVELS: boolean = false;

        public static GAME_WIDTH: number = 768;
        public static GAME_HEIGHT: number = 1024;

        public static GAMEPIX: string = "gamepix";
        public static LAGGED: string = "lagged";
        public static IZZYGAMES: string = "izzygames";
        public static COOLGAMES: string = "coolgames";
        public static NONE: string = "none";
        public static SPONSOR: string = GameConstants.COOLGAMES;

        public static HAPPY: string = "red square";
        public static GRUMPY: string = "white square";

        public static BLACK_SQUARE: string = "black square";
        public static BLUE_SQUARE: string = "blue square";
        public static WHITE_SQUARE: string = "white square";
        public static DARK_GREEN_SQUARE: string = "dark green square";
        public static GREEN_SQUARE: string = "green square";
        public static GRAY_SQUARE: string = "gray square";
        public static YELLOW_SQUARE: string = "yellow square";
        public static ORANGE_SQUARE: string = "orange square";
        public static DARK_CYAN_SQUARE: string = "dark cyan square";

        public static SQUARE_WIDTH: number = 135;

        public static TIME_FADE: number = 350;

        public static TOTAL_LEVELS: number = 60;

        public static LEVEL_BEST_KEY: string = "happy-kittens-levels-best-results";
        public static SCORE_KEY: string = "happy-kittens-score"; 
        public static AUDIO_STATE_KEY: string = "happy-kittens-audio";
    }
}
