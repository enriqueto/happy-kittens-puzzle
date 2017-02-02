namespace HappyKittensPuzzle {

    export class GameManager {

        private static game: Phaser.Game;

        private static passedLevels: number = 0;

        public static init(game: Phaser.Game): void {

           GameManager.game = game;

           // si no hubiese nada en el local storage
           let bestResultsStr: string = GameVars.getLocalStorageData(GameConstants.LEVEL_BEST_KEY);

           if (bestResultsStr !== "") {
                GameVars.levelsBestResults = JSON.parse(bestResultsStr);
           } else {

                GameVars.levelsBestResults = [];
                GameVars.levelsBestResults[0] = 0;

                for (let i: number = 1; i < GameConstants.TOTAL_LEVELS; i++) {
                    GameVars.levelsBestResults[i] = -1;
                }

                GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));
           }

           // determinar el nivel actual
           GameVars.currentLevel = GameConstants.TOTAL_LEVELS;

           for (let i: number = 0; i < GameConstants.TOTAL_LEVELS; i++) {
               if (GameVars.levelsBestResults[i] === 0) {
                    GameVars.currentLevel = i + 1;
                    break;
               }
           }

           GameVars.achievedLevel = GameVars.currentLevel;
        }

        public static levelSelected(level: number): void {

            GameVars.currentLevel = level;

            LevelSelectionState.currentInstance.goToBoardScene();
        }

        public static levelPassed(): void {

            this.sponsorsAPIs();

            // sacar cual es el ultimo nivel alcanzado
            GameVars.achievedLevel = 1;

            for (let i: number = 0; i < GameVars.levelsBestResults.length; i++) {
                if (GameVars.levelsBestResults[i] === 0) {
                    GameVars.achievedLevel = i + 1;
                    break;
                }
            }

            // comprobar si se ha superado el record para este nivel y actualizar el array
            const record: number = GameVars.levelsBestResults[GameVars.currentLevel - 1];

            if (record === 0 || GameVars.moves <= record) {
                GameVars.levelsBestResults[GameVars.currentLevel - 1] = GameVars.moves;
            }

            if (GameVars.currentLevel === GameVars.achievedLevel) {
                GameVars.achievedLevel++;
                GameVars.levelsBestResults[GameVars.achievedLevel - 1] = 0;
            }

            if (GameVars.currentLevel < GameConstants.TOTAL_LEVELS ) {
                GameVars.currentLevel++;
            }

            GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));
        }

        public static sponsorsAPIs(): void {

            if (GameConstants.SPONSOR === GameConstants.GAMEPIX) {
                GamePix.game.ping("level_complete", {score : 0, level : GameVars.currentLevel, achievements : {/*INSERT HERE IF AVAILABLE*/} });
            }

            if (GameConstants.SPONSOR === GameConstants.LAGGED) {

                let awardID: string = null;

                if (GameVars.currentLevel === 12) {
                    awardID = "happy_kitpuz_ah01";
                } else if (GameVars.currentLevel === 24) {
                    awardID = "happy_kitpuz_ah02";
                } else if (GameVars.currentLevel === 36) {
                    awardID = "happy_kitpuz_ah03";
                } else if (GameVars.currentLevel === 48) {
                    awardID = "happy_kitpuz_ah04";
                } else if (GameVars.currentLevel === 60) {
                    awardID = "happy_kitpuz_ah05";
                }

                if (awardID) {
                    var api_awards: string[] = [];
                    api_awards.push(awardID);
                    LaggedAPI.Achievements.save(api_awards, function(response: any): any {

                        if (response.success) {
                            console.log("achievement saved");
                        } else {
                            console.log(response.errormsg);
                        }
                    });
                }

                GameManager.passedLevels++;

                if ( GameManager.passedLevels % 10 === 0) {

                    if (typeof prerollStart === "undefined") {
                        console.log("skip ad, prerollStart not found");
                    } else {

                        LaggedAPI.APIAds.show("interstitial", "happy-kittens-puzzle","happy-kittens-puzzle-game.jpg", function(response: any): void {

                        if (response.success) {
                            console.log("ad done");
                        }else {
                            console.log("ad error, continue");
                        }
                        });
                    }
                }
            }
        }
    }
}
