namespace HappyKittensPuzzle {

    export class LevelSelectionButton extends Phaser.Group {

        private level: number;

        public button: Phaser.Button;

        constructor(game: Phaser.Game, level: number) {

            super(game, null, "level-selection-button");

            this.level = level;

            const isBlocked = this.level > GameVars.achievedLevel;

            this.button = new Phaser.Button( this.game, 0, 0, "texture_atlas_1", this.onClick, this);
            this.button.setFrames("button-level-selection-on-on.png", "button-level-selection-on-off.png", "button-level-selection-on-on.png");
            this.button.anchor.set(.5);
            this.button.name = level.toString();
            this.add(this.button);

            if (isBlocked) {
                this.button.setFrames("button-level-selection-blocked.png", "button-level-selection-blocked.png", "button-level-selection-blocked.png");
                this.button.inputEnabled = false;
            } else {
                let mark = new Phaser.Image(this.game, 0, 0, "texture_atlas_1", "button-level-selection-mark.png");
                mark.anchor.set(.5);
                mark.visible = false;
                this.button.addChild(mark);
            }

            const levelLabel = new Phaser.Text(this.game, 0, -2.2, this.level.toString(), { font: "19px Concert One", fill: "#FFFFFF"});
            levelLabel.anchor.set(.5);
            this.add(levelLabel);
        }

        private onClick(): void {

            if (LevelSelectionState.leavingScene) {
                return;
            }

            LevelSelectionState.leavingScene = true;

            this.game.time.events.add(150, function(): void {
                GameManager.levelSelected(this.level);
            }, this);

            AudioManager.getInstance().playSound("click");
        }
    }
}
