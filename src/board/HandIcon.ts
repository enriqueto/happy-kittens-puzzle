module HappyKittensPuzzle {

    export class HandIcon extends Phaser.Image {

        private scaleTween: Phaser.Tween;

        constructor(game: Phaser.Game, x: number, y: number) {

            super(game, x + 15, y + 15 * GameVars.scaleY, "texture_atlas_1", "finger_cursor.png");

            this.scale.y = GameVars.scaleY;

            this.scaleTween = this.game.add.tween(this.scale)
                .to({ x: 1.065, y: 1.065 * GameVars.scaleY}, 380, Phaser.Easing.Cubic.Out, true, 0, -1, true);
        }

        public hide(): void {

            this.scaleTween.pendingDelete = true;

            this.game.add.tween(this)
                .to({ alpha: 0}, 250, Phaser.Easing.Cubic.Out, true);
        }
    }
}
