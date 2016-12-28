namespace SquaresOut {

    export class PreLoader extends Phaser.State {

        public static currentInstance: PreLoader;

        public init(): void {

            PreLoader.currentInstance = this;

            this.load.path = GameConstants.ASSETS_PATH;
        }

        public preload(): void {

            this.generateBitmapData();

            this.load.atlas("texture_atlas_1", "/texture_atlas_1.png", "/texture_atlas_1.json");
        }

        public create(): void {

           // this.game.state.start("SplashState", true, false);
           this.game.state.start("BoardState", true, false);
        }

        private generateBitmapData(): void {

            // generar bitmapdatas
            let bmd: Phaser.BitmapData =  this.game.add.bitmapData( 16 , 128, "intro_background", true);
            let grd: CanvasGradient = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#11c0e9"); // sets the first color
            grd.addColorStop(1, "#6fbe4d"); // sets the second color

            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);

            bmd = this.game.add.bitmapData( 16 , 128, "yellow-gradient", true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 128);
            grd.addColorStop(0, "#FFDC42");
            grd.addColorStop(1, "#FFB400");

            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 128);

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.RED_SQUARE, true);
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

            bmd = this.game.add.bitmapData( 16 , 64, "dark_gradient", true);
            grd = bmd.ctx.createLinearGradient(0, 0, 0, 64);
            grd.addColorStop(0, "#283939"); // sets the first color
            grd.addColorStop(1, "#000000"); // sets the second color
            bmd.ctx.fillStyle = grd;
            bmd.ctx.fillRect(0, 0, 16, 64);

            bmd = this.game.add.bitmapData( 16 , 16, "preload-bar", true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 16, 16);
            bmd.ctx.fillStyle = "#fc8e00";
            bmd.ctx.fill();

            bmd = this.game.add.bitmapData(16, 128, "black_gradient", true);
            for ( let i: number = 0; i < 16; i++) {
                for ( let j: number = 0; j < 128; j++) {
                    bmd.setPixel32(i, j, 0, 0, 0, 255 * j / 127);
                }
            }
        }
    }
}
