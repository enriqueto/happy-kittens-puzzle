import { GameConstants } from "../GameConstants";
import { GameVars } from "../GameVars";
import { LevelEditionState } from "../levelEditionState/LevelEditionState";
import { BoardManager } from "./BoardManager";
import { AudioManager } from "../AudioManager";
import { Board } from "./Board";
import { BoardState } from "./BoardState";
import { ArrowsEffect } from "./ArrowsEffect";

export class Cell extends Phaser.Group {

    private static FLIP_TIME = 175;

    private static MEOW_ANIMATION = "meow";
    private static BLINK_ANIMATION = "blink";
    private static SLEEP_ANIMATION = "sleep";
    private static TIC1_ANIMATION = "tic1";
    private static TIC2_ANIMATION = "tic2";
    private static TIC3_ANIMATION = "tic3";

    public state: string;
    public sleeping: boolean;
    public activated: boolean;

    private flipping: boolean;
    private grumpyKitten: Phaser.Sprite;
    private happyKitten: Phaser.Sprite;
    private column: number;
    private row: number;
    private rotationTween: boolean;
    private flipTween: Phaser.Tween;
    private overImage: Phaser.Image;
    private arrowsEffect: ArrowsEffect;

    constructor(game: Phaser.Game, state: string, column: number, row: number) {

        super(game, null, "cell", false);

        this.state = state;
        this.column = column;
        this.row = row;
        this.flipping = false;
        this.rotationTween = false;
        this.sleeping = false;
        this.activated = true;
        this.flipTween = null;

        this.arrowsEffect = new ArrowsEffect(this.game, this.column, this.row);
        this.add(this.arrowsEffect);

        this.happyKitten = this.create(0, 0, "texture_atlas_1", "happy_kitten_idle.png");
        this.happyKitten.anchor.set(.5);
        this.happyKitten.inputEnabled = true;
        this.happyKitten.events.onInputDown.add(this.onClick, this);
        this.happyKitten.animations.add(Cell.MEOW_ANIMATION, Phaser.Animation.generateFrameNames("happy_kitten_meow_", 1, 9, ".png", 4));
        this.happyKitten.animations.add(Cell.BLINK_ANIMATION, Phaser.Animation.generateFrameNames("happy_kitten_blink_", 1, 7, ".png", 4));
        this.happyKitten.animations.add(Cell.SLEEP_ANIMATION, Phaser.Animation.generateFrameNames("happy_kitten_sleep_", 1, 3, ".png", 4));

        this.grumpyKitten = this.create(0, 0, "texture_atlas_1", "grumpy_kitten_idle.png");
        this.grumpyKitten.anchor.set(.5);
        this.grumpyKitten.inputEnabled = true;
        this.grumpyKitten.events.onInputDown.add(this.onClick, this);
        this.grumpyKitten.animations.add(Cell.MEOW_ANIMATION, Phaser.Animation.generateFrameNames("grumpy_kitten_meow_", 1, 11, ".png", 4));
        this.grumpyKitten.animations.add(Cell.TIC1_ANIMATION, Phaser.Animation.generateFrameNames("grumpy_kitten_tic1_", 1, 13, ".png", 4));
        this.grumpyKitten.animations.add(Cell.TIC2_ANIMATION, Phaser.Animation.generateFrameNames("grumpy_kitten_tic2_", 1, 7, ".png", 4));
        this.grumpyKitten.animations.add(Cell.TIC3_ANIMATION, Phaser.Animation.generateFrameNames("grumpy_kitten_tic2_", 1, 10, ".png", 4));

        if (this.game.device.desktop) {

            this.overImage = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "rollover_cat.png");
            this.overImage.anchor.set(.5);
            this.overImage.visible = false;
            this.overImage.alpha = .65;
            this.addAt(this.overImage, 0);

            this.happyKitten.events.onInputOver.add(this.onOver, this);
            this.happyKitten.events.onInputOut.add(this.onOut, this);
            this.grumpyKitten.events.onInputOver.add(this.onOver, this);
            this.grumpyKitten.events.onInputOut.add(this.onOut, this);
        } else {
            this.overImage = null;
        }

        if (this.state === GameConstants.GRUMPY) {
            this.happyKitten.scale.set(0);
            this.happyKitten.visible = false;
        } else {
            this.grumpyKitten.scale.set(0);
            this.grumpyKitten.visible = false;
        }
    }

    public update(): void {

        super.update();

        let rnd = Math.random();

        if (rnd > .9995) { // era .9995

            if (this.state === GameConstants.GRUMPY) {

                let ticAnimation: string;
                rnd = Math.random();

                if (rnd < .33) {
                    ticAnimation = Cell.TIC1_ANIMATION;
                } else if (rnd < .66) {
                    ticAnimation = Cell.TIC2_ANIMATION;
                } else {
                    ticAnimation = Cell.TIC3_ANIMATION;
                }

                this.grumpyKitten.play(ticAnimation, 24, false);

            } else if (!this.sleeping) {

                rnd = Math.random();

                if (rnd > .5) {
                    this.happyKitten.animations.play(Cell.BLINK_ANIMATION, 24, false);
                } else if (!this.rotationTween ) {
                    // le damos un tween
                    this.rotationTween = true;
                    this.game.add.tween(this.happyKitten)
                        .to({ angle: Math.random() > .5 ? -4.5 : 4.5}, 400, Phaser.Easing.Cubic.Out, true, 0, 0, true)
                        .onComplete.add(function(): void {
                                this.rotationTween = false;
                        }, this);
                }
            }
        }
    }

    public sleep(): void {

        this.sleeping = true;

        this.happyKitten.animations.play(Cell.SLEEP_ANIMATION, 2);
    }

    public awake(): void {

        this.sleeping = false;

        if (this.state === GameConstants.HAPPY) {
            this.happyKitten.frameName = "happy_kitten_idle.png";
        }
    }

    // TODO: refactorizar todo esto
    public flip(verticalFlipAxis: boolean): void {

        if (this.flipping) {
            return;
        }

        this.flipping = true;

        if (this.game.device.desktop) {
            this.overImage.visible = false;
        }

        if (this.state === GameConstants.GRUMPY) {

            this.state = GameConstants.HAPPY;

            if (verticalFlipAxis) {
                this.flipTween = this.game.add.tween(this.grumpyKitten.scale)
                    .to({x: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true);
                this.flipTween.onComplete.add(function(): void{
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
                this.flipTween = this.game.add.tween(this.grumpyKitten.scale)
                    .to({y: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true);
                this.flipTween.onComplete.add(function(): void{
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
                this.flipTween = this.game.add.tween(this.happyKitten.scale)
                    .to({x: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true);
                this.flipTween.onComplete.add(function(): void{
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
                this.flipTween = this.game.add.tween(this.happyKitten.scale)
                    .to({y: 0}, Cell.FLIP_TIME, Phaser.Easing.Cubic.In, true);
                this.flipTween.onComplete.add(function(): void{
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

    public endAnimation(): void {

        if (this.flipping) {
            return;
        }

        this.game.add.tween(this.happyKitten.scale)
            .to({ x: 1.075, y: 1.075}, 125, Phaser.Easing.Cubic.Out, true, 300, 0, true);
    }

    public over(): void {

        if (this.flipping) {
            return;
        }

        this.overImage.visible = true;
    }

    public out(): void {

        this.overImage.visible = false;
    }

    private onClick(): void {

        if (GameVars.cellsFlipping || (GameVars.levelPassed && !GameConstants.EDITING_LEVELS) || !this.activated) {
            return;
        }

        this.arrowsEffect.activate();

        this.flip(true);

        this.game.time.events.add(450, function(): void {
            if (this.state === GameConstants.GRUMPY) {
                this.grumpyKitten.animations.play(Cell.MEOW_ANIMATION, 24, false);
            } else {
                this.happyKitten.animations.play(Cell.MEOW_ANIMATION, 24, false);
            }
        }, this);

        if (GameConstants.EDITING_LEVELS) {
            LevelEditionState.currentInstance.move(this.column, this.row);
        } else {
            BoardManager.cellFlipped(this.column, this.row);
        }

        this.game.time.events.add(250, function(): void{

            const rnd: number = Math.random();

            if (rnd < .33) {
                AudioManager.getInstance().playSound(this.state === GameConstants.GRUMPY ? "grumpy_cat_01" : "happy_cat_01", false, .2);
            } else if (rnd < .66) {
                AudioManager.getInstance().playSound(this.state === GameConstants.GRUMPY ? "grumpy_cat_02" : "happy_cat_02", false, .2);
            } else {
                AudioManager.getInstance().playSound(this.state === GameConstants.GRUMPY ? "grumpy_cat_03" : "happy_cat_03", false, .2);
            }

        }, this);
    }

    private onOver(): void {

        if (GameVars.levelPassed || !this.activated || this.flipping) {
            return;
        }

        // poner a la celda por encima del resto
        if (!GameConstants.EDITING_LEVELS) {
            const board: Board = BoardState.currentInstance.board;
            board.bringToTop(this);
            if (board.handIcon) {
                board.bringToTop(board.handIcon);
            }
        }

        this.overImage.visible = true;

        if (this.state === GameConstants.GRUMPY) {
            this.grumpyKitten.scale.set(1.15);
        } else {
            this.happyKitten.scale.set(1.15);
        }

        if (!GameConstants.EDITING_LEVELS) {
            BoardManager.cellOver(this.column, this.row);
        }

        AudioManager.getInstance().playSound("rollover_cat");
    }

    private onOut(): void {

        this.overImage.visible = false;

        if (this.state === GameConstants.GRUMPY) {
            this.grumpyKitten.frameName =  "grumpy_kitten_idle.png";
            this.grumpyKitten.scale.set(1);
        } else {
            if (!this.sleeping) {
                this.happyKitten.frameName = "happy_kitten_idle.png";
            }
            this.happyKitten.scale.set(1);
        }

        if (!GameConstants.EDITING_LEVELS) {
            BoardManager.cellOut(this.column, this.row);
        }
    }
}

