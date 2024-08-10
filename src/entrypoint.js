import { Program_GBash } from "./program/gbash.js";
import { Stdout } from "./stdio/stdout.js";

// Prevent unauthorized cursor movement
document.querySelector("textarea").addEventListener("keydown", (event) => {
    if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    ) {
        event.preventDefault();
        return;
    }

    if (
        document.querySelector("textarea").selectionStart !== Stdout.cursorPos
    ) {
        event.preventDefault();
        return;
    }
});

document.querySelector("textarea").addEventListener("click", () => {
    document.querySelector("textarea").selectionStart = Stdout.cursorPos;
});

// Main entrypoint for the operating system.
Stdout.write("icebox4\n\n");
Stdout.write("[START] Load gbash");

Stdout.clear();

document.querySelector("textarea").focus();

const gbash_main = new Program_GBash();
await gbash_main.main({ disableSplash: true });
