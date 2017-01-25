namespace HappyKittensPuzzle {

    export class PassedLevelKittenAnimation extends Phaser.Group {

        private kittenImage: Phaser.Image;

        constructor(game: Phaser.Game) {

            super(game, null, "passed-level-animation");

            let kittenTextureName: string = Math.random() > .5 ? "happy_kitten_idle.png" : "grumpy_kitten_idle.png";

            this.kittenImage = new Phaser.Image(this.game, -100, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", kittenTextureName);
            this.kittenImage.scale.set(1.15, 1.15 * GameVars.scaleY);
            this.kittenImage.anchor.set(.5);
            this.add(this.kittenImage);
        }

        public activate(): void {

            this.game.add.tween(this.kittenImage)
                .to({ angle: 360, x: GameConstants.GAME_WIDTH + 100}, 850, Phaser.Easing.Linear.None, true, 150);
        }
    }
}
