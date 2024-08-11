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

document.querySelector("textarea").value = "";

const preloaded_programs = [
    "clear",
    "clearfs",
    "echo",
    "gbash",
    "gnano",
    "ls",
    "mkdir",
    "touch"
];

// Main entrypoint for the operating system.
Stdout.write("icebox4\n\n");

for (const program of preloaded_programs) {
    await import(`./program/${program}.js`);
    Stdout.write(`[OK] Preload program ${program}.js\n`);
}

const Program_GBash = (await import("./program/gbash.js")).Program_GBash;

Stdout.clear();

document.querySelector("textarea").focus();

const gbash_main = new Program_GBash();
await gbash_main.main([]);
