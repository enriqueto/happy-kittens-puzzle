namespace HappyKittensPuzzle {

    export class Boot extends Phaser.State {

        public static currentInstance: Boot;

        public init(): void {

            Boot.currentInstance = this;

            this.input.maxPointers = 1;

            this.game.stage.disableVisibilityChange = true;

            // por el problema del stock browser
            this.game.stage.backgroundColor =  "#cccccc";

            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

            this.game.scale.pageAlignHorizontally = true;

            if (this.game.device.desktop) {

                GameVars.scaleY = 1;

                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;

            } else {

                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

                GameVars.scaleY = (4 / 3) / (window.innerHeight / window.innerWidth);

                this.game.scale.pageAlignHorizontally = true;
                this.game.scale.isPortrait = false;

                this.game.scale.forceOrientation(true, false);
            }

            if ( GameConstants.DEVELOPMENT ) {
                // para poder medir las fps
                this.game.time.advancedTiming = true;
            }

            GameManager.init(this.game);
        }

        public preload(): void {

            //  load the Google WebFont Loader script
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

            this.game.state.start("PreLoader", true, false);
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
