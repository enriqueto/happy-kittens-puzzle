export class ArrowsEffect extends Phaser.Group {

    private static readonly DELTA_POS = 50;

    private arrowLeft: Phaser.Image;
    private arrowRight: Phaser.Image;
    private arrowUp: Phaser.Image;
    private arrowDown: Phaser.Image;
    

    constructor(game: Phaser.Game, c: number, r: number) {

        super(game, null, "arrows-effect", false);

        this.visible = false;

        if (r < 4 ) {
            this.arrowDown = new Phaser.Image(this.game, 0, ArrowsEffect.DELTA_POS, "texture_atlas_1", "arrow.png");
            this.arrowDown.anchor.set(.5, 1);
            this.arrowDown.angle = 180;
            this.add(this.arrowDown);
        } else {
            this.arrowDown = null;
        }

        if (r > 0) {
            this.arrowUp = new Phaser.Image(this.game, 0, -ArrowsEffect.DELTA_POS, "texture_atlas_1", "arrow.png");
            this.arrowUp.anchor.set(.5, 1);
            this.add(this.arrowUp);
        } else {
            this.arrowUp = null;
        }
        
        if (c > 0) {
            this.arrowLeft = new Phaser.Image(this.game, -ArrowsEffect.DELTA_POS, 0, "texture_atlas_1", "arrow.png");
            this.arrowLeft.anchor.set(.5, 1);
            this.arrowLeft.angle = 270;
            this.add(this.arrowLeft);
        } else {
            this.arrowLeft = null;
        }

        if (c < 4) {
            this.arrowRight = new Phaser.Image(this.game, ArrowsEffect.DELTA_POS, 0, "texture_atlas_1", "arrow.png");
            this.arrowRight.anchor.set(.5, 1);
            this.arrowRight.angle = 90;
            this.add(this.arrowRight);
        } else {
            this.arrowRight = null;
        }
    }

    public activate(): void {

        const t = 1250;
        const deltaPos = 80;

        this.visible = true;

        if (this.arrowLeft) {

            this.arrowLeft.x = -ArrowsEffect.DELTA_POS;
            this.arrowLeft.alpha = 1;
           
            this.game.add.tween(this.arrowLeft)
                .to({ x: this.arrowLeft.x - deltaPos}, t, Phaser.Easing.Cubic.Out, true);
    
            this.game.add.tween(this.arrowLeft)
                .to({ alpha: 0}, t, Phaser.Easing.Cubic.Out, true);
        }

        if (this.arrowRight) {

            this.arrowRight.x = ArrowsEffect.DELTA_POS;
            this.arrowRight.alpha = 1;
       
            this.game.add.tween(this.arrowRight)
                .to({ x: this.arrowRight.x + deltaPos}, t, Phaser.Easing.Cubic.Out, true);

            this.game.add.tween(this.arrowRight)
                .to({ alpha: 0}, t, Phaser.Easing.Cubic.Out, true);
        }

        
        if (this.arrowUp) {

            this.arrowUp.y = -ArrowsEffect.DELTA_POS;
            this.arrowUp.alpha = 1;

            this.game.add.tween(this.arrowUp)
                .to({ y: this.arrowUp.y - deltaPos}, t, Phaser.Easing.Cubic.Out, true);

            this.game.add.tween(this.arrowUp)
                .to({ alpha: 0}, t, Phaser.Easing.Cubic.Out, true);
        }
        
        if (this.arrowDown) {

            this.arrowDown.y = ArrowsEffect.DELTA_POS;
            this.arrowDown.alpha = 1;

            this.game.add.tween(this.arrowDown)
                .to({ y: this.arrowDown.y + deltaPos}, t, Phaser.Easing.Cubic.Out, true);

            this.game.add.tween(this.arrowDown)
                .to({ alpha: 0}, t, Phaser.Easing.Cubic.Out, true);
        }
       
        this.game.time.events.add(t, function(): void {
            this.visible = false;
        }, this);
    }
}
