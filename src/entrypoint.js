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
    }
});

document.querySelector("textarea").addEventListener("click", () => {
    document.querySelector("textarea").selectionStart = Stdout.cursorPos;
});

// Main entrypoint for the operating system.
Stdout.write("Loading icebox4 web operating system...\n");
Stdout.write("Load gbash...");

Stdout.clear();
const gbash_main = new Program_GBash();
await gbash_main.main([]);

Stdout.write("");
