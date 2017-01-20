module HappyKittensPuzzle {

    export class Cell extends Phaser.Group {

        private static FLIP_TIME: number = 175;

        public state: string;

        private flipping: boolean;
        private cellFront: Phaser.Sprite;
        private cellBack: Phaser.Sprite;
        private column: number;
        private row: number;

        constructor(game: Phaser.Game, state: string, column: number, row: number) {

            super(game, null, "cards", false);

            this.state = state;
            this.column = column;
            this.row = row;
            this.flipping = false;

            this.cellBack = this.create(0, 0, "texture_atlas_1", "happy_kitten_idle.png");
            this.cellBack.anchor.set(.5);
            this.cellBack.inputEnabled = true;
            this.cellBack.events.onInputDown.add(this.onClick, this);

            this.cellFront = this.create(0, 0, "texture_atlas_1", "grumpy_kitten_idle.png");
            this.cellFront.anchor.set(.5);
            this.cellFront.inputEnabled = true;
            this.cellFront.events.onInputDown.add(this.onClick, this);

            if (this.game.device.desktop) {
                this.cellBack.events.onInputOver.add(this.onOver, this);
                this.cellBack.events.onInputOut.add(this.onOut, this);
                this.cellFront.events.onInputOver.add(this.onOver, this);
                this.cellFront.events.onInputOut.add(this.onOut, this);
            }

            if (this.state === GameConstants.GRUMPY) {
                this.cellBack.scale.set(0);
                this.cellBack.visible = false;
            } else {
                this.cellFront.scale.set(0);
                this.cellFront.visible = false;
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
                    this.game.add.tween(this.cellFront.scale)
                        .to({x: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.cellFront.visible = false;
                            this.cellBack.scale.set(0, 1);
                            this.cellBack.visible = true;
                            this.game.add.tween(this.cellBack.scale)
                                .to({x: 1}, Cell.FLIP_TIME, Phaser.Easing.Cubic.Out, true)
                                .onComplete.add(function(): void{
                                    this.flipping = false;
                                }, this);
                        }, this);
                } else {
                    this.game.add.tween(this.cellFront.scale)
                        .to({y: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.cellFront.visible = false;
                            this.cellBack.scale.set(1, 0);
                            this.cellBack.visible = true;
                            this.game.add.tween(this.cellBack.scale)
                                .to({y: 1}, Cell.FLIP_TIME, Phaser.Easing.Cubic.Out, true)
                                .onComplete.add(function(): void{
                                    this.flipping = false;
                                }, this);
                        }, this);
                }

            } else {

                this.state = GameConstants.GRUMPY;

                if (verticalFlipAxis) {
                    this.game.add.tween(this.cellBack.scale)
                        .to({x: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.cellBack.visible = false;
                            this.cellFront.scale.set(0, 1);
                            this.cellFront.visible = true;
                            this.game.add.tween(this.cellFront.scale)
                                .to({x: 1}, Cell.FLIP_TIME, Phaser.Easing.Cubic.Out, true)
                                .onComplete.add(function(): void{
                                    this.flipping = false;
                                }, this);
                        }, this);
                } else {
                    this.game.add.tween(this.cellBack.scale)
                        .to({y: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true)
                        .onComplete.add(function(): void{
                            this.cellBack.visible = false;
                            this.cellFront.scale.set(1, 0);
                            this.cellFront.visible = true;
                            this.game.add.tween(this.cellFront.scale)
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
                 this.cellFront.frameName = "grumpy_kitten_idle_over.png";
             } else {
                 this.cellBack.frameName = "happy_kitten_idle_over.png";
             }
        }

         private onOut(): void {

             if (this.state === GameConstants.GRUMPY) {
                 this.cellFront.frameName =  "grumpy_kitten_idle.png";
             } else {
                 this.cellBack.frameName = "happy_kitten_idle.png";
             }
        }
    }
}
