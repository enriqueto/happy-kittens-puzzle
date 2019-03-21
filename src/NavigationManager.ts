
namespace HappyKittensPuzzle {

    export class NavigationManager {

        public currentComponentPosition: number;
        public components: {button: any, parent: any, left?: any, right?: any, up?: any, down?: any}[];

        private game: Phaser.Game;
        private enterKey: Phaser.Key;
        private leftKey: Phaser.Key;
        private rightKey: Phaser.Key;
        private upKey: Phaser.Key;
        private downKey: Phaser.Key;
        private zeroKey: Phaser.Key;
        private twoKey: Phaser.Key;
        private fourKey: Phaser.Key;
        private sixKey: Phaser.Key;
        private eightKey: Phaser.Key;
        private fiveKey: Phaser.Key;

        constructor(game: Phaser.Game) {

            this.game = game;

            this.currentComponentPosition = 0;
            this.components = [];

            this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
            this.zeroKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ZERO);
            this.twoKey = this.game.input.keyboard.addKey(Phaser.Keyboard.TWO);
            this.fourKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FOUR);
            this.sixKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SIX);
            this.eightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.EIGHT);
            this.fiveKey = this.game.input.keyboard.addKey(Phaser.Keyboard.FIVE);
        }

        public resetComponents(): void {

            if (this.components[this.currentComponentPosition]) {
                this.components[this.currentComponentPosition].button.getChildAt(0).visible = false;
            }

            this.currentComponentPosition = 0;
            this.components = [];
        }

        public setDefaultComponent(button: any): void {

            if (this.components[this.currentComponentPosition]) {
                this.unselectButton(this.components[this.currentComponentPosition]);
            }

            for (let i = 0; i < this.components.length; i++) {

                if (this.components[i].button.name === button.name) {    
                    this.currentComponentPosition = i;
                    this.selectButton(this.components[i]);
                }
            }
        }

        public addComponent(button: any, parent: any): void {

            let component = {button: button, parent: parent};
            this.components.push(component)
        }

        public setLeftComponent(buttonName: string, newtButtonName: string): void {

            for (let i = 0; i < this.components.length; i++) {

                if (this.components[i].button.name === buttonName) {
                    this.components[i].left = newtButtonName;
                }
            }
        }

        public setRightComponent(buttonName: string, newtButtonName: string): void {

            for (let i = 0; i < this.components.length; i++) {

                if (this.components[i].button.name === buttonName) {
                    this.components[i].right = newtButtonName;
                }
            }
        }

        public setUpComponent(buttonName: string, newtButtonName: string): void {

            for (let i = 0; i < this.components.length; i++) {

                if (this.components[i].button.name === buttonName) {
                    this.components[i].up = newtButtonName;
                }
            }
        }

        public setDownComponent(buttonName: string, newtButtonName: string): void {

            for (let i = 0; i < this.components.length; i++) {

                if (this.components[i].button.name === buttonName) {
                    this.components[i].down = newtButtonName;
                }
            }
        }

        public update(): void {

            if (this.enterKey.justDown || this.fiveKey.justDown) {

                if (BoardState.currentInstance && BoardState.currentInstance.instructionsLayer) {
                    BoardState.currentInstance.instructionsLayer.removeInstructions();
                    return;
                }

                let currentComponent = this.components[this.currentComponentPosition];
                currentComponent.parent.onClick(currentComponent.button);

            } 
           
            if (this.zeroKey.justDown && BoardState.currentInstance && !BoardState.currentInstance.instructionsLayer) {
                
                if (GameVars.paused) {
                    BoardManager.resumeGame();
                } else {
                    BoardManager.pauseGame();
                }
            }
            
            if (GameVars.wrongOrientation) {

                if (this.leftKey.justDown || this.fourKey.justDown) {
                
                    this.justDown();
    
                } else if (this.rightKey.justDown || this.sixKey.justDown) {
    
                    this.justUp(); 
    
                } else if (this.upKey.justDown || this.twoKey.justDown) {
    
                    this.justLeft(); 
    
                } else if (this.downKey.justDown || this.eightKey.justDown) {
    
                    this.justRight();
                }
            } else {

                if (this.leftKey.justDown || this.fourKey.justDown) {
                
                    this.justLeft();
    
                } else if (this.rightKey.justDown || this.sixKey.justDown) {
    
                    this.justRight(); 
    
                } else if (this.upKey.justDown || this.twoKey.justDown) {
    
                    this.justUp(); 
    
                } else if (this.downKey.justDown || this.eightKey.justDown) {
    
                    this.justDown();
                } 
            }
            
        }

        public selectButton(component: any): void {

            component.button.getChildAt(0).visible = true;

            if (component.button.name.indexOf("cell") !== -1) {
                component.button.onOver();
            }
        }

        public unselectButton(component: any): void {
            
            component.button.getChildAt(0).visible = false;

            if (component.button.name.indexOf("cell") !== -1) {
                component.button.onOut();
            }
        }

        private justLeft(): void {

            let currentComponent = this.components[this.currentComponentPosition];

                if (currentComponent.left) {

                    this.unselectButton(currentComponent);

                    for (let i = 0; i < this.components.length; i++) {

                        if (this.components[i].button.name === currentComponent.left) {
                            let nextComponent = this.components[i];
                            this.currentComponentPosition = i;
                            this.selectButton(nextComponent);
                        }
                    }
                } 
        }

        private justRight(): void {

            let currentComponent = this.components[this.currentComponentPosition];

            if (currentComponent.right) {

                this.unselectButton(currentComponent);

                for (let i = 0; i < this.components.length; i++) {

                    if (this.components[i].button.name === currentComponent.right) {
                        let nextComponent = this.components[i];
                        this.currentComponentPosition = i;
                        this.selectButton(nextComponent);
                    }
                }
            } 
        }

        private justUp(): void {

            let currentComponent = this.components[this.currentComponentPosition];

            if (currentComponent.up) {

                this.unselectButton(currentComponent);

                for (let i = 0; i < this.components.length; i++) {

                    if (this.components[i].button.name === currentComponent.up) {
                        let nextComponent = this.components[i];
                        this.currentComponentPosition = i;
                        this.selectButton(nextComponent);
                    }
                }
            } 
        }

        private justDown(): void {

            let currentComponent = this.components[this.currentComponentPosition];

            if (currentComponent.down) {

                this.unselectButton(currentComponent);

                for (let i = 0; i < this.components.length; i++) {

                    if (this.components[i].button.name === currentComponent.down) {
                        let nextComponent = this.components[i];
                        this.currentComponentPosition = i;
                        this.selectButton(nextComponent);
                    }
                }
            } 
        }
    }
}