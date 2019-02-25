namespace HappyKittensPuzzle {

    export class LevelsContainer extends Phaser.Group {

        public i: number;

        public levelSelectionButtons: LevelSelectionButton[][];
        public navManager: NavigationManager;

        constructor(game: Phaser.Game, i: number, navManager: NavigationManager) {

            super(game, null, "level-container");

            this.i = i;
            this.scale.y = GameVars.scaleY;

            this.navManager = navManager;

            this.levelSelectionButtons = [];

            let levelSelectionButton: LevelSelectionButton;

            for (let col = 0; col < 3; col++) {

                this.levelSelectionButtons[col] = [];

                for (let row = 0; row < 4; row++) {

                    const level = this.i * 12 + (col + 1 ) + 3 * row;

                    levelSelectionButton = new LevelSelectionButton(this.game, level);
                    levelSelectionButton.x =  - 43.75 * (1 - col);
                    levelSelectionButton.y =  - 43.75 * (1.5 - row);
                    this.add(levelSelectionButton);
                    this.levelSelectionButtons[col].push(levelSelectionButton);
                    
                }
            }
        }

        public setNavComponents(first: boolean): void {

            for (let col = 0; col < 3; col++) {
                for (let row = 0; row < 4; row++) {

                    const level = this.i * 12 + (col + 1 ) + 3 * row;

                    if (level <= GameVars.achievedLevel) {
                        this.navManager.addComponent(this.levelSelectionButtons[col][row].button, this.levelSelectionButtons[col][row]);

                        if (col > 0) {
                            this.navManager.setLeftComponent(level.toString(), (level - 1).toString());
                        } else if (this.i > 0) {
                            this.navManager.setLeftComponent(level.toString(), LevelSelectionState.PREVIOUS);
                        }

                        if (col < 2) {
                            if ((level + 1) <= GameVars.achievedLevel) {
                                this.navManager.setRightComponent(level.toString(), (level + 1).toString());
                            } else {
                                this.navManager.setRightComponent(level.toString(), LevelSelectionState.NEXT)
                            }
                        } else {
                            this.navManager.setRightComponent(level.toString(), LevelSelectionState.NEXT)
                        }

                        if (row > 0) {
                            this.navManager.setUpComponent(level.toString(), (level - 3).toString());
                        } else {
                            this.navManager.setUpComponent(level.toString(), "audio");
                        }

                        if (row < 3 && (level + 3) <= GameVars.achievedLevel) {
                            this.navManager.setDownComponent(level.toString(), (level + 3).toString());
                        }

                        if (first) {
                            this.navManager.setDefaultComponent(this.levelSelectionButtons[col][row].button);
                        }
                    }
                }
            }
        }
    }
}
