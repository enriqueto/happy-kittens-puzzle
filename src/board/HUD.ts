namespace HappyKittensPuzzle {

    export class HUD extends Phaser.Group {

        public yellowStripe: YellowStripe;
        public lowerStripe: Phaser.Group;

        private moves: Phaser.Text; 
        private time: Phaser.Text;

        constructor(game: Phaser.Game) {

            super(game, null, "hud");

            this.yellowStripe = new YellowStripe(this.game, "LEVEL " + GameVars.currentLevel);
            this.yellowStripe.y = GameVars.upperStripe_py;
            this.add(this.yellowStripe);

            this.lowerStripe = new Phaser.Group(this.game);
            this.lowerStripe.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
            this.lowerStripe.x = GameConstants.GAME_WIDTH / 2;
            this.lowerStripe.y = GameVars.lowerStripe_py;
            this.lowerStripe.scale.set(GameVars.stripesScale, GameVars.stripesScale * GameVars.scaleY);
            this.add(this.lowerStripe);

            const stripeBackground: Phaser.Sprite = new Phaser.Sprite(this.game, 0 , 0, this.game.cache.getBitmapData(GameConstants.BLACK_SQUARE));
            stripeBackground.scale.set(1.5 * GameConstants.GAME_WIDTH / 64, 31.25 / 64);
            stripeBackground.anchor.x = .5;
            stripeBackground.alpha = .5;
            this.lowerStripe.add(stripeBackground);

            const movesLabel = new Phaser.Text(this.game, -106.25 / GameVars.stripesScale, 1.56, "MOVES:", { font: "12.5px Concert One", fill: "#FFFFFF"});
            this.lowerStripe.add(movesLabel);

            this.moves = new Phaser.Text(this.game, -53.125 / GameVars.stripesScale, 1.56, GameVars.moves.toString(), { font: "12.5px Concert One", fill: "#FFFFFF"});
            this.lowerStripe.add(this.moves);

            const levelBest: number = GameVars.levelsBestResults[GameVars.currentLevel - 1];

            if (levelBest > 0) {

                const bestLabel = new Phaser.Text(this.game, -106.25 / GameVars.stripesScale, 15.625, "LEVEL'S BEST:", { font: "12.5px Concert One", fill: "#FFFFFF"});
                this.lowerStripe.add(bestLabel);

                const best = new Phaser.Text(this.game, -31.25 / GameVars.stripesScale, 15.625,  levelBest.toString(), { font: "12.5px Concert One", fill: "#FFFFFF"});
                this.lowerStripe.add(best);

            } else {

                movesLabel.y = 7.2;
                movesLabel.fontSize = "16.25px";

                this.moves.y = 7.2;
                this.moves.fontSize = "16.25px";
            }
        }

        public updateTime(): void {

            this.time.text = "TIME: " + GameVars.formatTime(GameVars.time);
        }

        public updateMoves(): void {

            this.moves.text = GameVars.moves.toString();
        }

        public showGameFinishedMessage(): void {

            GameManager.congratulationsMessageShown();

            const backgroundSprite = BoardState.currentInstance.add.sprite(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, this.game.cache.getBitmapData(GameConstants.DARK_CYAN_SQUARE));
            backgroundSprite.anchor.set(.5);
            backgroundSprite.scale.y = GameVars.scaleY;
            backgroundSprite.scale.set(GameConstants.GAME_WIDTH / 64, 110 / 64);
           
            const congratulationsMessage = new Phaser.Text(this.game, GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "MEOW! CONGRATULATIONS ALL LEVELS CLEARED", { font: "23.75px Concert One", fill: "#FFFFFF"});
            congratulationsMessage.align = "center";
            congratulationsMessage.wordWrap = true;
            congratulationsMessage.wordWrapWidth = 125;
            congratulationsMessage.lineSpacing = -8;
            congratulationsMessage.setShadow(1.25, 1.25, "rgba(8, 87, 137, 1)", 0);
            congratulationsMessage.anchor.set(.5);
            congratulationsMessage.scale.y = GameVars.scaleY;
            BoardState.currentInstance.add.existing(congratulationsMessage);
        }
    }
}
