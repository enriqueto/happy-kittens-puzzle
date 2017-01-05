namespace SquaresOut {

    export class PreLoader extends Phaser.State {

        public static currentInstance: PreLoader;

        public init(): void {

            PreLoader.currentInstance = this;

            this.load.path = GameConstants.ASSETS_PATH;
        }

        public preload(): void {

            this.generateBitmapData();

            this.composeScene();

            this.loadAssets();
        }

        public create(): void {

            AudioManager.getInstance().init(this.game);

            if (GameConstants.EDITING_LEVELS) {
                this.game.state.start("LevelEditionState", true, false);
            } else {
                this.game.state.start("SplashState", true, false);
               // this.game.state.start("LevelSelection", true, false);
                 // this.game.state.start("BoardState", true, false);
            }
        }

        public composeScene(): void {
            //
        }

        public loadAssets(): void {

            this.load.atlas("texture_atlas_1", "/texture_atlas_1.png", "/texture_atlas_1.json");

            this.load.audiosprite("audio-sprite", ["/audio/audiosprite.mp3", "/audio/audiosprite.ogg"], "/audio/audiosprite.json");
        }

        private generateBitmapData(): void {

            let bmd: Phaser.BitmapData  =  this.game.add.bitmapData( 64 , 64, GameConstants.RED_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FF0000";
            bmd.ctx.fill();

            bmd = this.game.add.bitmapData( 64 , 64, GameConstants.GREEN_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#00FF00";
            bmd.ctx.fill();

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.BLUE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#0000FF";
            bmd.ctx.fill();

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.WHITE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FFFFFF";
            bmd.ctx.fill();

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.GRAY_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#999999";
            bmd.ctx.fill();
        }
    }
}
