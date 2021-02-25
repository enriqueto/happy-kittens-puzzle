import "pixi";
import "phaser";

import { Game } from "./Game";

window.onload = () => {

    var game = new Game();

    window.addEventListener('keydown', ev => {
        if (['ArrowDown', 'ArrowUp', ' '].includes(ev.key)) {
            ev.preventDefault();
        }
    });
    window.addEventListener('wheel', ev => ev.preventDefault(), { passive: false });
};
