// audiosprite --e "mp3" --o ../assets/audio/audiosprite *.mp3
namespace SquaresOut {

    export class AudioManager {

        private static _instance: AudioManager = null;

        public isMuted: boolean;

        private game: Phaser.Game;
        private audioSprite: Phaser.AudioSprite;
        private loopPlayingKey: string;

        public static getInstance(): AudioManager {

            if (AudioManager._instance === null) {
                AudioManager._instance = new AudioManager();
            }

            return AudioManager._instance;
        }

        constructor() {

            if (AudioManager._instance) {
                throw new Error("Error: Instantiation failed: Use GameVars.getInstance() instead of new");
            } else {
                AudioManager._instance = this;
            }
        }

        public init(game: Phaser.Game): void {

            this.game = game;

            this.loopPlayingKey = null;

            // mirar en el localstorage
            this.audioSprite = this.game.add.audioSprite("audio-sprite");

            let audioStateStr: string = GameVars.getLocalStorageData(GameConstants.AUDIO_STATE_KEY);

            if (audioStateStr !== "") {
               this.isMuted = JSON.parse(audioStateStr);
            } else {
                this.isMuted = false;
            }

            this.game.sound.mute = this.isMuted;
        }

        public mute(): void {

            this.isMuted = true;

            this.game.sound.mute = true;

            GameVars.setLocalStorageData(GameConstants.AUDIO_STATE_KEY, JSON.stringify(this.isMuted ));
        }

        public unmute(): void {

            this.isMuted = false;

            this.game.sound.mute = false;

            GameVars.setLocalStorageData(GameConstants.AUDIO_STATE_KEY, JSON.stringify(this.isMuted ));
        }

        public playSound(key: string, loop?: boolean, volume?: number): void {

            loop = loop || false;

            this.audioSprite.play(key, volume);

            if (loop) {

                if (this.loopPlayingKey && (this.loopPlayingKey !== key)) {
                    this.stopSound(this.loopPlayingKey, false, true);
                }

                this.loopPlayingKey = key;
            }
        }

        public stopSound(key: string, fade?: boolean, loop?: boolean): void {

            if (key === null || typeof key === "undefined") {
                return;
            }

            if (fade) {
                let sound: Phaser.Sound = this.audioSprite.get(key);
                sound.fadeOut(850);
            }else {
                this.audioSprite.stop(key);
            }

            if (loop) {
                this.loopPlayingKey = null;
            }
        }
    }
}
