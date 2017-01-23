module HappyKittensPuzzle {

    export class Cell extends Phaser.Group {

        private static FLIP_TIME: number = 175;

        public state: string;

        private flipping: boolean;
        private grumpyKitten: Phaser.Sprite;
        private happyKitten: Phaser.Sprite;
        private column: number;
        private row: number;

        constructor(game: Phaser.Game, state: string, column: number, row: number) {

            super(game, null, "cards", false);

            this.state = state;
            this.column = column;
            this.row = row;
            this.flipping = false;

            this.happyKitten = this.create(0, 0, "texture_atlas_1", "happy_kitten_idle.png");
            this.happyKitten.anchor.set(.5);
            this.happyKitten.inputEnabled = true;
            this.happyKitten.events.onInputDown.add(this.onClick, this);
            this.happyKitten.animations.add("meow", Phaser.Animation.generateFrameNames("happy_kitten_meow_", 1, 9, ".png", 4));
            this.happyKitten.play("meow", 24, true);

            this.grumpyKitten = this.create(0, 0, "texture_atlas_1", "grumpy_kitten_idle.png");
            this.grumpyKitten.anchor.set(.5);
            this.grumpyKitten.inputEnabled = true;
            this.grumpyKitten.events.onInputDown.add(this.onClick, this);
            this.grumpyKitten.animations.add("meow", Phaser.Animation.generateFrameNames("grumpy_kitten_meow_", 1, 11, ".png", 4));
            this.grumpyKitten.play("meow", 24, true);

            if (this.game.device.desktop) {
                this.happyKitten.events.onInputOver.add(this.onOver, this);
                this.happyKitten.events.onInputOut.add(this.onOut, this);
                this.grumpyKitten.events.onInputOver.add(this.onOver, this);
                this.grumpyKitten.events.onInputOut.add(this.onOut, this);
            }

            if (this.state === GameConstants.GRUMPY) {
                this.happyKitten.scale.set(0);
                this.happyKitten.visible = false;
            } else {
                this.grumpyKitten.scale.set(0);
                this.grumpyKitten.visible = false;
            }
        }

        // TODO refactorizar todo esto
        public flip(verticalFlipAxis: boolean): void {

            if (this.flipping) {
                return;
            }

            this.flipping = true;

            if (this.state === GameConstants.GRUMPY) {

                this.state = GameConstants.HAPPY;

                if (verticalFlipAxis) {
                    this.game.add.tween(this.grumpyKitten.scale)
                        .to({x: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.grumpyKitten.visible = false;
                            this.happyKitten.scale.set(0, 1);
                            this.happyKitten.visible = true;
                            this.game.add.tween(this.happyKitten.scale)
                                .to({x: 1}, Cell.FLIP_TIME, Phaser.Easing.Cubic.Out, true)
                                .onComplete.add(function(): void{
                                    this.flipping = false;
                                }, this);
                        }, this);
                } else {
                    this.game.add.tween(this.grumpyKitten.scale)
                        .to({y: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.grumpyKitten.visible = false;
                            this.happyKitten.scale.set(1, 0);
                            this.happyKitten.visible = true;
                            this.game.add.tween(this.happyKitten.scale)
                                .to({y: 1}, Cell.FLIP_TIME, Phaser.Easing.Cubic.Out, true)
                                .onComplete.add(function(): void{
                                    this.flipping = false;
                                }, this);
                        }, this);
                }

            } else {

                this.state = GameConstants.GRUMPY;

                if (verticalFlipAxis) {
                    this.game.add.tween(this.happyKitten.scale)
                        .to({x: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.happyKitten.visible = false;
                            this.grumpyKitten.scale.set(0, 1);
                            this.grumpyKitten.visible = true;
                            this.game.add.tween(this.grumpyKitten.scale)
                                .to({x: 1}, Cell.FLIP_TIME, Phaser.Easing.Cubic.Out, true)
                                .onComplete.add(function(): void{
                                    this.flipping = false;
                                }, this);
                        }, this);
                } else {
                    this.game.add.tween(this.happyKitten.scale)
                        .to({y: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.happyKitten.visible = false;
                            this.grumpyKitten.scale.set(1, 0);
                            this.grumpyKitten.visible = true;
                            this.game.add.tween(this.grumpyKitten.scale)
                                .to({y: 1}, Cell.FLIP_TIME, Phaser.Easing.Cubic.Out, true)
                                .onComplete.add(function(): void{
                                    this.flipping = false;
                                }, this);
                        }, this);
                }
            }
        }

        private onClick(): void {

            if (GameVars.levelPassed && !GameConstants.EDITING_LEVELS) {
                return;
            }

            this.flip(true);

            if (GameConstants.EDITING_LEVELS) {
                LevelEditionState.currentInstance.move(this.column, this.row);
            } else {
                LevelManager.currentInstance.squareFlipped(this.column, this.row);
            }
        }

         private onOver(): void {

             if (this.state === GameConstants.GRUMPY) {
                 this.grumpyKitten.frameName = "grumpy_kitten_idle_over.png";
             } else {
                 this.happyKitten.frameName = "happy_kitten_idle_over.png";
             }
        }

         private onOut(): void {

             if (this.state === GameConstants.GRUMPY) {
                 this.grumpyKitten.frameName =  "grumpy_kitten_idle.png";
             } else {
                 this.happyKitten.frameName = "happy_kitten_idle.png";
             }
        }
    }
}
