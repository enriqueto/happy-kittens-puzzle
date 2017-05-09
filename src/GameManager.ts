namespace HappyKittensPuzzle {

    export class GameManager {

        private static game: Phaser.Game;

        private static passedLevels: number = 0;
        private static newScore: boolean;

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

            for (let i = 0; i < GameConstants.TOTAL_LEVELS; i++) {
                if (GameVars.levelsBestResults[i] === 0) {
                        GameVars.currentLevel = i + 1;
                        break;
                }
            }

            GameVars.achievedLevel = GameVars.currentLevel;

            // leer el score del localstorage
            let scoreStr = GameVars.getLocalStorageData(GameConstants.SCORE_KEY);

            if (scoreStr !== "") {
                GameVars.score = JSON.parse(scoreStr);
            }else {
                GameVars.score = 0;
            }

            GameVars.gameFinished = false;
        }

        public static levelSelected(level: number): void {

            GameVars.currentLevel = level;

            LevelSelectionState.currentInstance.goToBoardScene();
        }

        public static levelPassed(): void {

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

            if (GameConstants.SPONSOR === GameConstants.COOLGAMES) {
                
                GameManager.newScore = false;

                if (GameVars.currentLevel === GameVars.achievedLevel) {

                    GameVars.achievedLevel++;
                    GameVars.levelsBestResults[GameVars.achievedLevel - 1] = 0;

                    GameManager.newScore = true;

                    // calcular una puntuacion basada en el tiempo y en el numero de movimientos
                    GameVars.score += GameManager.getLevelScore();
                    GameVars.setLocalStorageData(GameConstants.SCORE_KEY, JSON.stringify(GameVars.score));
                }
            }

            if (GameVars.currentLevel < GameConstants.TOTAL_LEVELS ) {
                GameVars.currentLevel++;
            }

            GameVars.setLocalStorageData(GameConstants.LEVEL_BEST_KEY, JSON.stringify(GameVars.levelsBestResults));

            this.sponsorsAPIs();
        }

        private static sponsorsAPIs(): void {

            if (GameConstants.SPONSOR === GameConstants.GAMEPIX) {
                GamePix.game.ping("level_complete", {score : 0, level : GameVars.currentLevel, achievements : {/*INSERT HERE IF AVAILABLE*/} });
            }

            if (GameConstants.SPONSOR === GameConstants.COOLGAMES) {

                if (GameManager.newScore) {
                    
                    community.submitScore({
                        score: GameVars.score, // This is an int value
                        callback: function (): void {
                                if (adSense) {
                                    adSense.showAdvertising();
                                }
                            }
                    });
                
                    analytics.level(GameVars.achievedLevel);
                    analytics.score(GameVars.score);

                } else {
                    if (adSense) {
                        adSense.showAdvertising();
                    }
                }
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

        private static getLevelScore(): number {
            
            let score = 0;

            // por el nivel
            if (GameVars.currentLevel < 10) {
                score += 100;
            } else if (GameVars.currentLevel < 20) {
                score += 500;
            } else if (GameVars.currentLevel < 45) {
                score += 1000;
            } else {
                score += 2000;
            } 

            // por el numero de movimientos
            // esto no es correcto. Lo que se deberia hacer es puntuar segun la diferencia entre los movimientos
            // usados y el minimo necesario para solucionar el nivel
            if (GameVars.moves < 4) {
                score += 10;
            } else if (GameVars.moves < 10) {
                score += 20;
            } else if (GameVars.moves < 15) {
                score += 25;
            } 

            // por el tiempo
            if (GameVars.time < 5) {
                score += 100;
            } else if (GameVars.time < 10) {
                score += 50;
            } else if (GameVars.time < 20) {
                score += 25;
            } else if (GameVars.time < 30) {
                score += 10;
            }

            return score;
        }
    }
}
