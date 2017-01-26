namespace HappyKittensPuzzle {

    export class CreditsState extends Phaser.State {

        public static currentInstance: CreditsState;

        private leavingScene: boolean;

        public init(): void {

            CreditsState.currentInstance = this;

            this.leavingScene = false;
        }

        public create(): void {

            const backgroundImage: Phaser.Image = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board_menu.png");
            backgroundImage.anchor.set(.5);
            backgroundImage.scale.y = GameVars.scaleY;

            const yellowStripe: YellowStripe = new YellowStripe(this.game, "CREDITS");
            yellowStripe.y = 50;
            this.add.existing(yellowStripe);

            const backButton: Phaser.Button = new Phaser.Button( this.game, 640, 20, "texture_atlas_1", this.onBackClicked, this);
            backButton.setFrames("button-exit-on.png", "button-exit-off.png", "button-exit-on.png");
            yellowStripe.add(backButton);

            const itemsContainer: Phaser.Group = new Phaser.Group(this.game);
            itemsContainer.position.set(GameConstants.GAME_WIDTH / 2, 430);
            itemsContainer.scale.y = GameVars.scaleY;
            this.add.existing(itemsContainer);

            let label: Phaser.Text = new Phaser.Text(this.game, 0, -200, "a game by:", { font: "70px Concert One", fill: "#FFFFFF"});
            label.anchor.x = .5;
            label.setShadow(4, 4, "rgba(0, 0, 0, .6)", 0);
            itemsContainer.add(label);

            const ravalmaticLogo: Phaser.Image = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "logo-ravalmatic.png");
            ravalmaticLogo.anchor.set(.5);
            itemsContainer.add(ravalmaticLogo);

            label = new Phaser.Text(this.game, 0, 100, "art: ahtan", { font: "50px Concert One", fill: "#FFFFFF"});
            label.anchor.x = .5;
            label.setShadow(4, 4, "rgba(0, 0, 0, .6)", 0);
            itemsContainer.add(label);

            label = new Phaser.Text(this.game, 0, 160, "lead artist: javi sanz", { font: "50px Concert One", fill: "#FFFFFF"});
            label.anchor.x = .5;
            label.setShadow(4, 4, "rgba(0, 0, 0, .6)", 0);
            itemsContainer.add(label);

            label = new Phaser.Text(this.game, 0, 220, "code: lucas grijander", { font: "50px Concert One", fill: "#FFFFFF"});
            label.anchor.x = .5;
            label.setShadow(4, 4, "rgba(0, 0, 0, .6)", 0);
            itemsContainer.add(label);

            label = new Phaser.Text(this.game, 0, 280, "game cloning: enriqueto", { font: "50px Concert One", fill: "#FFFFFF"});
            label.anchor.x = .5;
            label.setShadow(4, 4, "rgba(0, 0, 0, .6)", 0);
            itemsContainer.add(label);

            const banana: Phaser.Image = new Phaser.Image(this.game, 305, 308, "texture_atlas_1", "banana.png");
            banana.anchor.set(.5);
            itemsContainer.add(banana);

            const pulseTween: Phaser.Tween = this.game.add.tween(banana.scale);
            pulseTween.to ({x:  1.05, y: 0.95}, 300,  Phaser.Easing.Linear.None, false);
            pulseTween.delay (250);
            pulseTween.to ({x:  0.95, y: 1.05}, 700,  Phaser.Easing.Elastic.Out);
            pulseTween.loop();
            pulseTween.start();

            const lowerItemsContainer: Phaser.Group = new Phaser.Group(this.game);
            lowerItemsContainer.position.set(0, GameConstants.GAME_HEIGHT - 80);
            lowerItemsContainer.scale.y = GameVars.scaleY;
            this.add.existing(lowerItemsContainer);

            label = new Phaser.Text(this.game, 20, 0, "made with phaser", { font: "32px Concert One", fill: "#333333"});
            lowerItemsContainer.add(label);

            label = new Phaser.Text(this.game, 20, 30, "based on Lights Out by Tiger Electronics (1995)", { font: "32px Concert One", fill: "#333333"});
            lowerItemsContainer.add(label);
        }

        public shutdown(): void {

            CreditsState.currentInstance = null;

            super.shutdown();
        }

        private onBackClicked(): void {

            if (this.leavingScene) {
                return;
            }

            this.leavingScene = true;

            this.game.camera.fade(0x000000, GameConstants.TIME_FADE, true);

            this.game.camera.onFadeComplete.add(function(): void {
                this.game.state.start("SplashState", true, false);
            }, this);
        }
    }
}
