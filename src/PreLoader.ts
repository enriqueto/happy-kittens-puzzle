namespace HappyKittensPuzzle {

    export class PreLoader extends Phaser.State {

        public static currentInstance: PreLoader;

        private loadingLabel: Phaser.Text;
        private preloadBar: Phaser.Sprite;

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
                // this.game.state.start("SplashState", true, false);
                // this.game.state.start("LevelSelectionState", true, false);
                // this.game.state.start("BoardState", true, false);
                this.game.state.start("CreditsState", true, false);
            }
        }

        public composeScene(): void {

            const preloadBarContainer: Phaser.Group = this.add.group();
            preloadBarContainer.scale.y = GameVars.scaleY;

            let preloadBarCapsuleShadow: Phaser.Sprite = new Phaser.Sprite(this.game, GameConstants.GAME_WIDTH / 2 + 2, 200 + 2, this.game.cache.getBitmapData(GameConstants.BLUE_SQUARE));
            preloadBarCapsuleShadow.scale.set(14.65, .85);
            preloadBarCapsuleShadow.anchor.set(.5);
            preloadBarCapsuleShadow.alpha = .45;
            preloadBarContainer.add(preloadBarCapsuleShadow);

            let preloadBarCapsule: Phaser.Sprite = new Phaser.Sprite( this.game, GameConstants.GAME_WIDTH / 2, 200, this.game.cache.getBitmapData(GameConstants.GREEN_SQUARE));
            preloadBarCapsule.scale.setTo(14.65, .85);
            preloadBarCapsule.anchor.set(.5);
            preloadBarContainer.add(preloadBarCapsule);

            this.preloadBar = new Phaser.Sprite(this.game, GameConstants.GAME_WIDTH / 2 - 116, 200, this.game.cache.getBitmapData(GameConstants.WHITE_SQUARE));
            this.preloadBar.scale.setTo(0, .6);
            this.preloadBar.anchor.set(0, .5);
            preloadBarContainer.add(this.preloadBar);

            this.loadingLabel = this.add.text(GameConstants.GAME_WIDTH / 2, 190, "Loading", { font: "60px Concert One", fill: "#FF1493"});
            this.loadingLabel.anchor.x = .5;
            this.loadingLabel.scale.y = GameVars.scaleY;
        }

        public loadAssets(): void {

            this.load.atlas("texture_atlas_1", "/texture_atlas_1.png", "/texture_atlas_1.json");

            this.load.audiosprite("audio-sprite", ["/audio/audiosprite.mp3", "/audio/audiosprite.ogg"], "/audio/audiosprite.json");
            this.load.onFileComplete.add( this.updateLoadedPercentage, this);
        }

        private updateLoadedPercentage(): void {

           this.preloadBar.scale.x = this.load.progress / 100 * 14.45;

           if (GameConstants.SPONSOR === GameConstants.GAMEPIX) {
                GamePix.game.gameLoading(this.load.progress);
           }
        }

        private generateBitmapData(): void {

            let bmd: Phaser.BitmapData  =  this.game.add.bitmapData( 64 , 64, GameConstants.HAPPY, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FF0000";
            bmd.ctx.fill();

            bmd = this.game.add.bitmapData( 64 , 64, GameConstants.BLACK_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#000000";
            bmd.ctx.fill();

            bmd = this.game.add.bitmapData( 64 , 64, GameConstants.WHITE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FFFFFF";
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

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.GRUMPY, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FFFFFF";
            bmd.ctx.fill();

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.GRAY_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#999999";
            bmd.ctx.fill();

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.YELLOW_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FFB74F";
            bmd.ctx.fill();

            bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.ORANGE_SQUARE, true);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, 64, 64);
            bmd.ctx.fillStyle = "#FF8E00";
            bmd.ctx.fill();
        }
    }
}
