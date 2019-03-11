namespace HappyKittensPuzzle {

    export class Boot extends Phaser.State {

        public static currentInstance: Boot;
        
        public bootedInWrongOrientation: boolean;

        public static enterIncorrectOrientation(): void {            
            GameVars.wrongOrientation = true;
        }

        public static leaveIncorrectOrientation(): void {              
           
            document.getElementById("orientation").style.display = "none";
            document.getElementById("content").style.display = "block";
        }

        public init(): void {
            
            var jioConf = { "autoControl": ["volume", "exit"], "gameName": "happy-kittens", "gameVersion": "1.0.1" };
            window.jioSDK = new window.Jiogames(jioConf);
            window.jioSDK.screenOrientation("portrait");

            window.cacheAds = function() {
                VMAX.jioSDK_adId = "happy-kittens"; // <ins ads id in index.html
                VMAX.jioSDK_adReady = false;
                console.log("calling cache Jio Ad")
                VMAX.cacheAd(VMAX.jioSDK_adId);
                VMAX.onAdReady = function(AdPlacementId: any) {
                    VMAX.jioSDK_adReady = true;
                    console.log("VMAX: onAdReady");
                }
                VMAX.onAdError = function(AdPlacementId: any, errorCode: any) {
                    console.log("VMAX: onAdError: ", errorCode);
                    VMAX.jioSDK_adReady = false;
                }
                VMAX.onAdClose = function(AdPlacementId: any) {
                    console.log("onAdClose");
                    setTimeout(function() {
                        console.log("VMAX: onAdClose");
                        window.cacheAds(); // call cache on every ad close and get prepared for next ad
                    }, 3000);
                }
            }

            window.showAds = function() { // use this showAds func in your game levels/game over or maintain your ad frequency when to show ads
                VMAX.showAd(VMAX.jioSDK_adId);
                console.log("showing ads on id: ", VMAX.jioSDK_adId);
            }

            window.cacheAds(); 

            Boot.currentInstance = this;

            this.input.maxPointers = 1;

            this.game.stage.disableVisibilityChange = true;

            // por el problema del stock browser
            this.game.stage.backgroundColor =  "#000000";

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.scale.pageAlignHorizontally = true;

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            GameVars.scaleY = 1;

            GameVars.upperStripe_py = 6.25;
            GameVars.lowerStripe_py = 281.25;
            GameVars.stripesScale = 1;

            if (this.game.device.desktop) {

                this.game.scale.pageAlignHorizontally = true;

            } else {

                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.isPortrait = false;

                this.game.scale.forceOrientation(true, false);
                this.game.scale.onOrientationChange.add(this.onOrientationChange, this);

                this.bootedInWrongOrientation = window.innerWidth > window.innerHeight ? true : false;

                this.game.scale.forceOrientation(false, true);
                this.game.scale.enterIncorrectOrientation.add(Boot.enterIncorrectOrientation, Boot);
                // this.game.scale.leaveIncorrectOrientation.add(Boot.leaveIncorrectOrientation, Boot);

                this.game.sound.muteOnPause = true;
            }

            ifvisible.on("blur", function(): void {
                Game.currentInstance.sound.mute = true;
            });

            ifvisible.on("focus", function(): void {
                if (!AudioManager.getInstance().isMuted) {
                    Game.currentInstance.sound.mute = false;
                }
            });

            if ( GameConstants.DEVELOPMENT ) {
                // para poder medir las fps
                this.game.time.advancedTiming = true;
            }

            GameManager.init(this.game);
        }

        public preload(): void {

            this.load.crossOrigin = "anonymous";

            this.load.path = GameConstants.ASSETS_PATH;

            this.load.image("game-title", "/game-title.png");
        }

        public create(): void {

            this.game.plugins.add(Fabrique.Plugins.CacheBuster);
            this.game.load.cacheBuster = GameConstants.VERSION;

            if (!this.game.device.desktop && this.bootedInWrongOrientation) {
                return;
            }

            this.game.state.start("PreLoader", true, false);
        }

        public shutdown(): void {

            Boot.currentInstance = null;

            super.shutdown();
        }

        private onOrientationChange(): void {
         
            if (!Boot.currentInstance) {
                return;
            }

            this.game.time.events.add(300, function(): void {
                if (this.bootedInWrongOrientation && window.innerWidth < window.innerHeight) {
                    this.game.state.restart(true, false);
                }
            }, this);
        }
    }
}
