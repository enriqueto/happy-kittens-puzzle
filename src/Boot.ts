namespace HappyKittensPuzzle {

    export class Boot extends Phaser.State {

        public static currentInstance: Boot;

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
                    GameVars.stripesScale = .8;
                }

                this.game.scale.forceOrientation(true, false);
            }

            if ( GameConstants.DEVELOPMENT ) {
                // para poder medir las fps
                this.game.time.advancedTiming = true;
            }

            GameManager.init(this.game);
        }

        public preload(): void {

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

            this.load.crossOrigin = "anonymous";
        }

        public create(): void {
            // no hacemos nada
        }

        public shutdown(): void {

            Boot.currentInstance = null;

            super.shutdown();
        }

        public startPreloader(): void {

            this.game.state.start("PreLoader", true, false);
        }
    }
}
