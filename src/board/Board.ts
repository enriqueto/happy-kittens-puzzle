namespace HappyKittensPuzzle {

    export class Board extends Phaser.Group {

        private static TUTORIAL_CELLS: number[][] = [[2, 2], [0, 0], [4, 4]];

        public cells: Cell[][];
        public handIcon: HandIcon;

        private purringAudio: boolean;

        private navManager: NavigationManager

        constructor(game: Phaser.Game, navManager?: NavigationManager) {

            super(game, null, "board");

            this.navManager = navManager;

            this.scale.y = GameVars.scaleY;

            this.x = GameConstants.GAME_WIDTH / 2;
            this.y = 168;

            this.cells = [];
            this.handIcon = null;

            this.purringAudio = false;

            let cell: Cell;
            let state: string;

            for (let col = 0; col < 5; col++) {

                this.cells[col] = [];

                for (let row = 0; row < 5; row++) {

                    if (GameConstants.EDITING_LEVELS) {
                        state = GameConstants.HAPPY;
                    } else {
                        state = GameVars.cellStates[col][row];
                    }

                    cell = new Cell(this.game, state, col, row);
                    cell.name = (col * 5 + row).toString();
                    cell.x = col * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
                    cell.y = row * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
                    this.add(cell);

                    this.cells[col].push(cell);
                }
            }
        }

        public setNavComponents(): void {

            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {

                    this.navManager.addComponent(this.cells[col][row], this.cells[col][row]);

                    let level = (col * 5 + row);

                    if (col > 0) {
                        this.navManager.setLeftComponent(level.toString(), (level - 5).toString());
                    }
    
                    if (col < 4) {
                        this.navManager.setRightComponent(level.toString(), (level + 5).toString());
                    }
    
                    if (row > 0) {
                        this.navManager.setUpComponent(level.toString(), (level - 1).toString());
                    } else {
                        this.navManager.setUpComponent(level.toString(), "audio");
                    }
    
                    if (row < 4) {
                        this.navManager.setDownComponent(level.toString(), (level + 1).toString());
                    } else {
                        this.navManager.setDownComponent(level.toString(), "reset");
                    }
                }
            }

            this.navManager.setDefaultComponent(this.cells[0][0]);
        }

        public activateTutorial(): void {

            const c = Board.TUTORIAL_CELLS[GameVars.currentLevel - 1][0];
            const r = Board.TUTORIAL_CELLS[GameVars.currentLevel - 1][1];

            // desactivar todas las celdas menos las que conforman el tutorial
            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    this.cells[col][row].activated = false;
                }
            }

            this.cells[c][r].activated = true;

            const x = c * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;
            const y = r * GameConstants.SQUARE_WIDTH - 2 * GameConstants.SQUARE_WIDTH;

            this.handIcon = new HandIcon(this.game, x, y);
            this.add(this.handIcon);
        }

        public levelPassed(): void {

            if (this.handIcon) {
                this.handIcon.hide();
            }

            for (let col = 0; col < 5; col++) {

                for (let row = 0; row < 5; row++) {
                    if (Math.random() > .7) {
                          this.cells[col][row].endAnimation();
                    }
                }
            }
        }

        public makeOneKittenSleep(): void {

            // pillar un gato y hacerlo dormir
            let kittens: Cell[] = [];

             for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    let kitten = this.cells[col][row];
                    if (kitten.state === GameConstants.HAPPY && !kitten.sleeping) {
                        kittens.push(kitten);
                    }
                }
            }

            if (kittens.length > 0) {
                let kitten = Phaser.ArrayUtils.getRandomItem(kittens);
                kitten.sleep();

                if (!this.purringAudio) {
                    this.purringAudio = true;
                    AudioManager.getInstance().playSound("cat_purring", false, .5);
                }
            }
        }

        public awakeSleepingKitten(): void {

            for (let col = 0; col < 5; col++) {
                for (let row = 0; row < 5; row++) {
                    let kitten = this.cells[col][row];
                    if (kitten.sleeping) {
                        kitten.awake();
                    }
                }
            }

            if (this.purringAudio) {
                this.purringAudio = false;
                AudioManager.getInstance().stopSound("cat_purring");
            }
        }
    }
}
