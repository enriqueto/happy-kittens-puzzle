/// <reference path="Game.ts"/>
window.onload = () => {

    const game: HappyKittensPuzzle.Game = new HappyKittensPuzzle.Game();

    if (HappyKittensPuzzle.GameConstants.SPONSOR === HappyKittensPuzzle.GameConstants.GAMEPIX) {

        GamePix.on.pause = function(): void {
           HappyKittensPuzzle.Game.currentInstance.paused = true;
        };

        GamePix.on.resume = function(): void {
           HappyKittensPuzzle.Game.currentInstance.paused = false;
        };

        GamePix.on.soundOn = function(): void {
            if (!HappyKittensPuzzle.AudioManager.getInstance().isMuted) {
                HappyKittensPuzzle.Game.currentInstance.sound.mute = false;
            }
        };

        GamePix.on.soundOff = function(): void {
            HappyKittensPuzzle.Game.currentInstance.sound.mute = true;
        };
    }
};
