namespace HappyKittensPuzzle {

    export class PassedLevelKittenAnimation extends Phaser.Group {

        private kittenImage: Phaser.Image;
        private kittenContainer: Phaser.Group;

        constructor(game: Phaser.Game) {

            super(game, null, "passed-level-animation");

            this.kittenContainer = new Phaser.Group(this.game);
            this.kittenContainer.x = -100;
            this.kittenContainer.y = GameConstants.GAME_HEIGHT / 2;
            this.kittenContainer.scale.y = GameVars.scaleY;
            this.add(this.kittenContainer);

            let kittenTextureName: string = Math.random() > .5 ? "happy_kitten_idle.png" : "grumpy_kitten_idle.png";

            this.kittenImage = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", kittenTextureName);
            this.kittenImage.scale.set(1.15);
            this.kittenImage.anchor.set(.5);
            this.kittenContainer.add(this.kittenImage);
        }

        public activate(): void {

            this.game.add.tween(this.kittenImage)
                .to({ angle: 360}, 850, Phaser.Easing.Linear.None, true, 150);

            this.game.add.tween(this.kittenContainer)
                .to({ x: GameConstants.GAME_WIDTH + 100}, 850, Phaser.Easing.Linear.None, true, 150);
        }
    }
}
