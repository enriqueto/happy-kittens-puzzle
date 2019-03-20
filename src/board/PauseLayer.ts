namespace HappyKittensPuzzle {

    export class PauseLayer extends Phaser.Group {

        constructor(game: Phaser.Game) {

            super(game, null, "pause");

            const background = new Phaser.Sprite(this.game, 0, 0, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
            background.scale.set(GameConstants.GAME_WIDTH / 64, GameConstants.GAME_HEIGHT / 64);
            background.alpha = .85;
            background.inputEnabled = true;
            background.events.onInputDown.add(function(): void {
                //
            }, this);
            this.add(background);

            const pauseLabel = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, 120, "GAME PAUSED", { font: "32px Concert One", fill: "#FFFFFF", align: "center"});
            pauseLabel.anchor.set(.5);
            pauseLabel.setShadow(2, 2, "rgba(0, 0, 0, 1)", 0);
            this.add(pauseLabel);
        }
    }
}
