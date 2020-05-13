import { GameVars } from "./GameVars";
import { GameConstants } from "./GameConstants";
import { GameManager } from "./GameManager";
import { Game } from "./Game";

export class Boot extends Phaser.State {

    public static currentInstance: Boot;
    
    public bootedInWrongOrientation: boolean;

    public static onBlur(): void {
            
        Game.currentInstance.sound.mute = true;
    }

    public static onFocus(): void {

        Game.currentInstance.sound.mute = false;
    }

    public static enterIncorrectOrientation(): void {     

        Game.currentInstance.sound.mute = true;
    
        document.getElementById("orientation").style.display = "block";
        document.getElementById("content").style.display = "none";
    }

    public static leaveIncorrectOrientation(): void { 

        Game.currentInstance.sound.mute = false;
        
        if (Boot.currentInstance && Boot.currentInstance.bootedInWrongOrientation) {

            Boot.currentInstance.bootedInWrongOrientation = false;

            setTimeout(function(): void {

                const aspectRatio = window.innerHeight / window.innerWidth;
                
                GameVars.scaleY = (4 / 3) / aspectRatio;
            
                GameVars.stripesScale = 1;

                if (aspectRatio === 4 / 3) {
                    GameVars.upperStripe_py = 20;
                    GameVars.lowerStripe_py = 900;
                } else if (aspectRatio >= 1.75) {
                    GameVars.upperStripe_py = 65;
                    GameVars.lowerStripe_py = 905;
                } else if (aspectRatio >= 1.5) {
                    GameVars.upperStripe_py = 35;
                    GameVars.lowerStripe_py = 910;
                } else {
                    GameVars.upperStripe_py = 30;
                    GameVars.lowerStripe_py = 920;
                    GameVars.stripesScale = .78;
                }

                Game.currentInstance.state.start("PreLoader", true, false);

            }, 300);
        }
        
        document.getElementById("orientation").style.display = "none";
        document.getElementById("content").style.display = "block";
    }


    public init(): void {

        Boot.currentInstance = this;

        this.input.maxPointers = 1;

        this.game.stage.disableVisibilityChange = true;

        // por el problema del stock browser
        this.game.stage.backgroundColor =  "#000000";

        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.game.scale.pageAlignHorizontally = true;

        this.game.onBlur.add(Boot.onBlur, Boot);
        this.game.onFocus.add(Boot.onFocus, Boot);

        if (this.game.device.desktop) {

            GameVars.scaleY = 1;

            GameVars.upperStripe_py = 20;
            GameVars.lowerStripe_py = 900;
            GameVars.stripesScale = 1;

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        
        } else {

            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

            const aspectRatio = window.innerHeight / window.innerWidth;

            GameVars.scaleY = (4 / 3) / aspectRatio;
            
            GameVars.stripesScale = 1;

            if (aspectRatio === 4 / 3) {
                GameVars.upperStripe_py = 20;
                GameVars.lowerStripe_py = 900;
            } else if (aspectRatio >= 1.75) {
                GameVars.upperStripe_py = 65;
                GameVars.lowerStripe_py = 905;
            } else if (aspectRatio >= 1.5) {
                GameVars.upperStripe_py = 35;
                GameVars.lowerStripe_py = 910;
            } else {
                GameVars.upperStripe_py = 30;
                GameVars.lowerStripe_py = 920;
                GameVars.stripesScale = .78;
            }

            this.game.scale.forceOrientation(true, false);
         
            this.bootedInWrongOrientation = window.innerWidth > window.innerHeight ? true : false;

            this.game.scale.forceOrientation(false, true);
            this.game.scale.enterIncorrectOrientation.add(Boot.enterIncorrectOrientation, Boot);
            this.game.scale.leaveIncorrectOrientation.add(Boot.leaveIncorrectOrientation, Boot);

            this.game.sound.muteOnPause = true;
        }

        if ( GameConstants.DEVELOPMENT ) {
            // para poder medir las fps
            this.game.time.advancedTiming = true;
        }

        GameManager.init();
    }

    public preload(): void {

        this.load.crossOrigin = "anonymous";

        this.load.path = GameConstants.ASSETS_PATH;

        this.load.image("game-title", "/game-title.png");
    }

    public create(): void {

        if (!this.game.device.desktop && this.bootedInWrongOrientation) {
            return;
        }

        this.game.state.start("PreLoader", true, false);
    }

    public shutdown(): void {

        Boot.currentInstance = null;

        super.shutdown();
    }
}
