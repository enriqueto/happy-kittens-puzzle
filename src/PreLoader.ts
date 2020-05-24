import { GameConstants } from "./GameConstants";
import { AudioManager } from "./AudioManager";
import { GameVars } from "./GameVars";

export class PreLoader extends Phaser.State {

    public static currentInstance: PreLoader;

    private loadingLabel: Phaser.Text;
    private preloadBar: Phaser.Sprite;
    private f: number;
    private gameLogo: Phaser.Image;
    private preloadBarContainer: Phaser.Group;
    private assetsLoaded: boolean;

    public init(): void {

        PreLoader.currentInstance = this;

        this.load.path = GameConstants.ASSETS_PATH;
    }

    public preload(): void {

        this.f = 0;
        this.assetsLoaded = false;

        this.generateBitmapData();
        this.composeScene();
        this.loadAssets();
    }

    public create(): void {

        this.assetsLoaded = true;

        if (this.assetsLoaded && this.f > 20) {

            AudioManager.getInstance().init(this.game);

            AudioManager.getInstance().playSound("soundtrack", true);
    
            if (GameConstants.EDITING_LEVELS) {
                this.game.state.start("LevelEditionState", true, false);
            } else {
                this.game.state.start("BoardState", true, false);
            }
        }
    }

    public update(): void {

        this.f ++;

        if (this.f === 5) {
            this.gameLogo.visible = true;
            this.preloadBarContainer.visible = true;
            this.loadingLabel.visible = true;
        }

        if (this.assetsLoaded && this.f > 20) {
            AudioManager.getInstance().init(this.game);

            AudioManager.getInstance().playSound("soundtrack", true);
    
            if (GameConstants.EDITING_LEVELS) {
                this.game.state.start("LevelEditionState", true, false);
            } else {
                this.game.state.start("BoardState", true, false);
            }
        }
    }

    public composeScene(): void {

        // un texto cualquiera pq la primera vez q se usa la google font no sale nada
        const tmpLabel = this.add.text(GameConstants.GAME_WIDTH / 2, 190, "abc", { font: "60px Concert One", fill: "#FF1493"});
        tmpLabel.anchor.x = .5;

        const backgroundSprite = this.add.sprite(0, 0, this.game.cache.getBitmapData(GameConstants.DARK_CYAN_SQUARE));
        backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);

        this.gameLogo = this.add.image(GameConstants.GAME_WIDTH / 2, 190, "game-title");
        this.gameLogo.anchor.set(.5);
        this.gameLogo.scale.y = GameVars.scaleY;

        this.loadingLabel = this.add.text(GameConstants.GAME_WIDTH / 2, 475, "loading...", { font: "66px Concert One", fill: "#FFFFFF"});
        this.loadingLabel.anchor.x = .5;
        this.loadingLabel.scale.y = GameVars.scaleY;

        this.preloadBarContainer = this.add.group();
        this.preloadBarContainer.y = 615;
        this.preloadBarContainer.scale.y = GameVars.scaleY;

        let preloadBarCapsuleShadow: Phaser.Sprite = new Phaser.Sprite(this.game, GameConstants.GAME_WIDTH / 2 + 5, 4, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
        preloadBarCapsuleShadow.scale.set(10, .85);
        preloadBarCapsuleShadow.anchor.set(.5);
        preloadBarCapsuleShadow.alpha = .35;
        this.preloadBarContainer.add(preloadBarCapsuleShadow);

        let preloadBarCapsule: Phaser.Sprite = new Phaser.Sprite( this.game, GameConstants.GAME_WIDTH / 2, 0, this.game.cache.getBitmapData(GameConstants.DARK_GREEN_SQUARE));
        preloadBarCapsule.scale.setTo(10, .78);
        preloadBarCapsule.anchor.set(.5);
        this.preloadBarContainer.add(preloadBarCapsule);

        this.preloadBar = new Phaser.Sprite(this.game, GameConstants.GAME_WIDTH / 2 - 315, 0, this.game.cache.getBitmapData(GameConstants.ORANGE_SQUARE));
        this.preloadBar.scale.setTo(0, .6);
        this.preloadBar.anchor.set(0, .5);
        this.preloadBarContainer.add(this.preloadBar);

        this.gameLogo.visible = false;
        this.preloadBarContainer.visible = false;
        this.loadingLabel.visible = false;
    }

    public loadAssets(): void {

        this.load.atlas("texture_atlas_1", "/texture_atlas_1.png", "/texture_atlas_1.json");

        this.load.audiosprite("audio-sprite", ["/audio/audiosprite.mp3", "/audio/audiosprite.ogg"], "/audio/audiosprite.json");
        this.load.onFileComplete.add( this.updateLoadedPercentage, this);
    }

    private updateLoadedPercentage(): void {

        this.preloadBar.scale.x = this.load.progress / 100 * 9.844;
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

        bmd = this.game.add.bitmapData( 64 , 64, GameConstants.DARK_CYAN_SQUARE, true);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 64, 64);
        bmd.ctx.fillStyle = "#0380DC";
        bmd.ctx.fill();

        bmd = this.game.add.bitmapData( 64 , 64, GameConstants.GREEN_SQUARE, true);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 64, 64);
        bmd.ctx.fillStyle = "#00FF00";
        bmd.ctx.fill();

        bmd = this.game.add.bitmapData( 64 , 64, GameConstants.BLUE_SQUARE, true);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 64, 64);
        bmd.ctx.fillStyle = "#0000FF";
        bmd.ctx.fill();

        bmd =  this.game.add.bitmapData( 64 , 64, GameConstants.DARK_GREEN_SQUARE, true);
        bmd.ctx.beginPath();
        bmd.ctx.rect(0, 0, 64, 64);
        bmd.ctx.fillStyle = "#2B7638";
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

