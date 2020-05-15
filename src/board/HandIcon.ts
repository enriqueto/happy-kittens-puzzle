import { GameVars } from "../GameVars";

export class HandIcon extends Phaser.Group {

    private tapImg: Phaser.Image;
    private f: number;

    constructor(game: Phaser.Game, x: number, y: number) {

        super(game);

        this.x = x;
        this.y = y;

        this.f = 0;

        const handImg = new Phaser.Image(this.game, 25, 25, "texture_atlas_1", "finger_cursor.png");
        handImg.anchor.set(.12);
        this.add(handImg);

        this.game.add.tween(handImg.scale)
            .to({ x: 1.2, y: 1.2}, 380, Phaser.Easing.Cubic.Out, true, 0, -1, true);

        if (GameVars.currentLevel === 0) {

            this.tapImg = new Phaser.Image(this.game, 85, 195, "texture_atlas_1", "tap.png");
            this.tapImg.anchor.set(.5);
            this.add(this.tapImg);
        } else {
            this.tapImg = null;
        }
    }

    public update(): void {

        if (!this.tapImg) {
            return;
        }

        this.f ++;

        if (this.f === 50) {

            this.f = 0;

            let s = this.tapImg.scale.x === 1 ? .875 : 1;
            this.tapImg.scale.set(s);
        }
    }

    public hide(): void {

        this.game.add.tween(this)
            .to({ alpha: 0}, 250, Phaser.Easing.Cubic.Out, true);
    }
}
