namespace SquaresOut {

    export class GameConstants {

        public static VERSION: string = "0.0";
        public static ASSETS_PATH: string = "assets";
        public static DEVELOPMENT: boolean = true;
        public static EDITING_LEVELS: boolean = false;

        public static GAME_WIDTH: number = 480;
        public static GAME_HEIGHT: number = 640;

        public static RED_SQUARE: string = "red square";
        public static BLUE_SQUARE: string = "blue square";
        public static GREEN_SQUARE: string = "green square";
        public static WHITE_SQUARE: string = "white square";
        public static GRAY_SQUARE: string = "gray square";

        public static SQUARE_WIDTH: number = 75;

        public static TIME_FADE: number = 350;

        public static TOTAL_LEVELS: number = 60;

        public static LEVEL_STATE_KEY: string = "squares-level-state";
        public static AUDIO_STATE_KEY: string = "squares-out-audio";
    }
}
