module HappyKittensPuzzle {

    export class Cell extends Phaser.Group {

        public static TARGET_DELAY: number = 70;

        private canBeFlipped: boolean;
        private cellFront: Phaser.Sprite;
        private cellBack: Phaser.Sprite;
        private color: string;
        private column: number;
        private row: number;

        constructor(game: Phaser.Game, color: string, column: number, row: number) {

            super(game, null, "cards", false);

            this.color = color;
            this.column = column;
            this.row = row;

            this.canBeFlipped = true;

            this.cellBack = this.create(0, 0, "texture_atlas_1", "happy_kitten_idle.png");
            this.cellBack.anchor.set(.5);

            this.cellFront = this.create(0, 0, "texture_atlas_1", "grumpy_kitten_idle.png");
            this.cellFront.anchor.set(.5);

            if (this.color === GameConstants.GRUMPY) {
                this.cellBack.scale.set(0);
                this.cellBack.visible = false;
            } else {
                this.cellFront.scale.set(0);
                this.cellFront.visible = false;
            }
        }

        public flip(): void {

            this.game.add.tween(this.cellBack.scale)
                .to({x: 0}, 350, Phaser.Easing.Cubic.In, true)
                .onComplete.add(function(): void{

                    this.cardBack.visible = false;

                    this.cardFront.scale.set(0, 1);
                    this.cardFront.visible = true;

                    this.game.add.tween(this.cardFront.scale)
                        .to({x: 1}, 350, Phaser.Easing.Bounce.Out, true);
                }, this);

            // audio
            // AudioManager.getInstance().playEffect("botones_rosas");
        }

        public unflip(): void {

            this.game.add.tween(this.cellFront.scale)
                .to({x: 0}, 200, Phaser.Easing.Cubic.In, true)
                .onComplete.add(function(): void{

                    this.cardFront.visible = false;
                    this.cardBack.visible = true;
                    this.game.add.tween(this.cardBack.scale)
                        .to({x: 1}, 200, Phaser.Easing.Cubic.Out, true);
                }, this);
        }
    }
}
