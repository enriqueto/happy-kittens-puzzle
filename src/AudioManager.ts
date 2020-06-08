// audiosprite --e "mp3" --o ../assets/audio/audiosprite *.mp3
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

        this.isMuted = !GAMESNACKS.isAudioEnabled();
    }

    public init(game: Phaser.Game): void {

        this.game = game;

        this.loopPlayingKey = null;

        this.audioSprite = this.game.add.audioSprite("audio-sprite");

        GAMESNACKS.subscribeToAudioUpdates((isAudioEnabled: boolean) => {
            if (isAudioEnabled) {
                AudioManager.getInstance().unmute();
            } else {
                AudioManager.getInstance().mute();
            }
        });
    }

    public mute(): void {

        this.isMuted = true;

        this.game.sound.mute = true;
    }

    public unmute(): void {

        this.isMuted = false;

        this.game.sound.mute = false;
    }

    public playSound(key: string, loop?: boolean, volume?: number): void {

        if (!GAMESNACKS.isAudioEnabled() || this.isMuted) {
            return;
        }

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

        if (key === null || typeof key === "undefined" || !GAMESNACKS.isAudioEnabled()) {
            return;
        }

        if (fade) {
            let sound: Phaser.Sound = this.audioSprite.get(key);
            sound.fadeOut(850);
        } else {
            this.audioSprite.stop(key);
        }

        if (loop) {
            this.loopPlayingKey = null;
        }
    }
}

