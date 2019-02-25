
namespace HappyKittensPuzzle {

    export class NavigationManager {

        private game: Phaser.Game

        private enterKey: Phaser.Key;
        private leftKey: Phaser.Key;
        private rightKey: Phaser.Key;
        private upKey: Phaser.Key;
        private downKey: Phaser.Key;

        public currentComponentPosition: number;
        public components: {button: any, parent: any, left?: any, right?: any, up?: any, down?: any}[];

        constructor(game: Phaser.Game) {

            this.game = game;

            this.currentComponentPosition = 0;
            this.components = [];

            this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
            this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
            this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
            this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
            this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);

            window.onkeypress = (e: any) => {
                console.log(e);
            }
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
                this.components[this.currentComponentPosition].button.getChildAt(0).visible = false;
            }

            for (let i = 0; i < this.components.length; i++) {

                if (this.components[i].button.name === button.name) {    
                    this.currentComponentPosition = i;
                    button.getChildAt(0).visible = true;
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

            if (this.enterKey.justDown) {

                let currentComponent = this.components[this.currentComponentPosition];
                currentComponent.parent.onClick(currentComponent.button);

            } else if (this.leftKey.justDown) {

                let currentComponent = this.components[this.currentComponentPosition];

                if (currentComponent.left) {

                    // desmarcamos el boton anterior

                    currentComponent.button.getChildAt(0).visible = false;

                    for (let i = 0; i < this.components.length; i++) {

                        if (this.components[i].button.name === currentComponent.left) {
                            let nextComponent = this.components[i];
                            this.currentComponentPosition = i;
                            nextComponent.button.getChildAt(0).visible = true;
                        }
                    }
                }  

            } else if (this.rightKey.justDown) {

                let currentComponent = this.components[this.currentComponentPosition];

                if (currentComponent.right) {

                    // desmarcamos el boton anterior

                    currentComponent.button.getChildAt(0).visible = false;

                    for (let i = 0; i < this.components.length; i++) {

                        if (this.components[i].button.name === currentComponent.right) {
                            let nextComponent = this.components[i];
                            this.currentComponentPosition = i;
                            nextComponent.button.getChildAt(0).visible = true;
                        }
                    }
                }  

            } else if (this.upKey.justDown) {

                let currentComponent = this.components[this.currentComponentPosition];

                if (currentComponent.up) {

                    // desmarcamos el boton anterior

                    currentComponent.button.getChildAt(0).visible = false;

                    for (let i = 0; i < this.components.length; i++) {

                        if (this.components[i].button.name === currentComponent.up) {
                            let nextComponent = this.components[i];
                            this.currentComponentPosition = i;
                            nextComponent.button.getChildAt(0).visible = true;
                        }
                    }
                } 

            } else if (this.downKey.justDown) {

                let currentComponent = this.components[this.currentComponentPosition];

                if (currentComponent.down) {

                    // desmarcamos el boton anterior

                    currentComponent.button.getChildAt(0).visible = false;

                    for (let i = 0; i < this.components.length; i++) {

                        if (this.components[i].button.name === currentComponent.down) {
                            let nextComponent = this.components[i];
                            this.currentComponentPosition = i;
                            nextComponent.button.getChildAt(0).visible = true;
                        }
                    }
                } 

            }
        }
    }
}