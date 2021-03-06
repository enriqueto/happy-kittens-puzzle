namespace HappyKittensPuzzle {

    export class Boot extends Phaser.State {

        public static currentInstance: Boot;
        public bootedInWrongOrientation: boolean;

        public init(): void {

            Boot.currentInstance = this;

            this.input.maxPointers = 1;

            this.game.stage.disableVisibilityChange = true;

            // por el problema del stock browser
            this.game.stage.backgroundColor =  "#000000";

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.scale.pageAlignHorizontally = true;

            if (this.game.device.desktop) {

                GameVars.scaleY = 1;

                GameVars.upperStripe_py = 20;
                GameVars.lowerStripe_py = 900;
                GameVars.stripesScale = 1;

                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;

            } else {

                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

                const aspectRatio: number = window.innerHeight / window.innerWidth;

                GameVars.scaleY = (4 / 3) / aspectRatio;

                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.isPortrait = false;

                GameVars.stripesScale = 1;

                if (aspectRatio === 4 / 3) {
                    GameVars.upperStripe_py = 20;
                    GameVars.lowerStripe_py = 900;
                } else if (aspectRatio >= 1.75) {
                    GameVars.upperStripe_py = 65;
                    GameVars.lowerStripe_py = 905;
                }else if (aspectRatio >= 1.5) {
                    GameVars.upperStripe_py = 35;
                    GameVars.lowerStripe_py = 910;
                }else {
                    GameVars.upperStripe_py = 30;
                    GameVars.lowerStripe_py = 920;
                    GameVars.stripesScale = .78;
                }

                this.game.scale.forceOrientation(true, false);
                this.game.scale.onOrientationChange.add(this.onOrientationChange, this);

                this.bootedInWrongOrientation = window.innerWidth > window.innerHeight ? true : false;

                this.game.sound.muteOnPause = true;
            }

            ifvisible.on("blur", function(): void{
                Game.currentInstance.sound.mute = true;
            });

            ifvisible.on("focus", function(): void{
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

            // load the Google WebFont Loader script
            this.load.script("webfont", "//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js");

            WebFontConfig = {

                // 'active' means all requested fonts have finished loading
                //  We set a 1 second delay before calling 'createText'.
                //  For some reason if we don't the browser cannot render the text the first time it's created.
                active: function(): void {
                    Boot.currentInstance.game.time.events.add(Phaser.Timer.SECOND, Boot.currentInstance.startPreloader, Boot.currentInstance);
                },

                google: {
                    families: ["Concert+One"]
                }
            };

        }

        public create(): void {

            this.game.plugins.add(Fabrique.Plugins.CacheBuster);
            this.game.load.cacheBuster = GameConstants.VERSION;
        }

        public shutdown(): void {

            Boot.currentInstance = null;

            super.shutdown();
        }

        public startPreloader(): void {

            if (!this.game.device.desktop && this.bootedInWrongOrientation) {
                return;
            }

            if (GameConstants.SPONSOR === GameConstants.LAGGED) {
                if ( top.location.href.indexOf("lagged.com") || top.location.href.indexOf("footchinko.com") > -1 || top.location.href.indexOf("localhost") > -1) {
                    this.game.state.start("PreLoader", true, false);
                }
            } else if (GameConstants.SPONSOR === GameConstants.IZZYGAMES) {
                if ( top.location.href.indexOf("spiele-umsonst.de") || top.location.href.indexOf("izzygames.com") > -1 || top.location.href.indexOf("footchinko.com") || top.location.href.indexOf("localhost") > -1) {
                    this.game.state.start("PreLoader", true, false);
                }
            } else {
                this.game.state.start("PreLoader", true, false);
            }
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
