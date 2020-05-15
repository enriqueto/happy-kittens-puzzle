import { BoardManager } from "./BoardManager";
import { Board } from "./Board";
import { GUI } from "./GUI";
import { HUD } from "./HUD";
import { GameConstants } from "../GameConstants";
import { GameVars } from "../GameVars";
import { PassedLevelKittenAnimation } from "./PassedLevelKittenAnimation";
import { GameManager } from "../GameManager";

export class BoardState extends Phaser.State {

    public static currentInstance: BoardState;
    public static funoStartWithoutAudio: boolean = false;

    public board: Board;
    public gui: GUI;
    public hud: HUD;

    public init(): void {

        BoardState.currentInstance = this;
        BoardManager.init(this.game);
    }

    public create(): void {

        const background = this.add.image(GameConstants.GAME_WIDTH / 2, GameConstants.GAME_HEIGHT / 2, "texture_atlas_1", "board.png");
        background.anchor.set(.5);
        background.scale.y = GameVars.scaleY;

        this.board = new Board(this.game);
        this.add.existing(this.board);

       
        this.hud = new HUD(this.game);
        this.add.existing(this.hud);

        this.gui = new GUI(this.game);
        this.add.existing(this.gui);

        if (!GameVars.tutorialSeen) {

            console.log("ARRIBA ESPAÑA!");
            this.board.activateTutorial();
        }


        this.game.camera.flash(0x000000, GameConstants.TIME_FADE, false);
    }

    public shutdown(): void {

        BoardState.currentInstance = null;

        super.shutdown();
    }

    public update(): void {

        super.update();

        BoardManager.update();
    }

    public onMove(): void {

        this.hud.updateMoves();
        this.hud.updateScore();

        this.board.onMove();
    }

    public levelPassed(): void {

        this.board.levelPassed();

        const passedLevelKittenAnimation = new PassedLevelKittenAnimation(this.game);
        passedLevelKittenAnimation.activate();
        this.add.existing(passedLevelKittenAnimation);

        this.game.time.events.add(1000, GameManager.levelPassed, this);
    }
}
