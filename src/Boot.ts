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

                console.log("es un escritorio con variable de escalaje " + GameVars.scaleY);

                GameVars.upperStripe_py = 20;
                GameVars.lowerStripe_py = 900;
                GameVars.stripesScale = 1;

                this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
                this.game.scale.pageAlignHorizontally = true;

            } else {

                this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

                const aspectRatio: number = window.innerHeight / window.innerWidth;

                GameVars.scaleY = (4 / 3) / aspectRatio;
                console.log("es un disositivo con variable de escalaje " + GameVars.scaleY);

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

            console.log("hola");

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
