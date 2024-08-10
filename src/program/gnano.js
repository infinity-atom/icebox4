import { Program } from "../baseProgram.js";
import { Filesystem } from "../lib/sys/filesystem.js";
import { Stdin } from "../stdio/stdin.js";
import { Stdout } from "../stdio/stdout.js";
import { Terminal } from "../lib/sys/terminal.js";

export class Program_GNano extends Program {
    constructor() {
        super("gnano", "gaynano", [1, 0, 0]);
        this.buffer = ""; // Text buffer to store the input
        this.cursorPosition = 0; // Current cursor position
        this.file = "";
        this.stdOld = "";
    }

    async main(args, workingDir) {
        let file;
        if (typeof args === "string") {
            if (args[0] === "/") {
                file = args;
            } else {
                file = `${workingDir === "/" ? "" : workingDir}/${args}`;
            }
        } else if (args.file) {
            if (args.file[0] === "/") {
                file = args.file;
            } else {
                file = `${workingDir === "/" ? "" : workingDir}/${args.file}`;
            }
        } else {
            Stdout.write("File not passed error\n");
            return 1;
        }

        if (Filesystem.existsFile(file)) {
            this.buffer = Filesystem.read(file);
            this.cursorPosition = this.buffer.length;
        } else {
            Stdout.write("File does not exist!\n");
            return 1;
        }

        this.stdOld = Stdout.readAll();
        Stdout.clear();
        Stdout.write(
            `[^D Exit] GNano v${this.versionString}: Editing ${file}\n`
        );
        Stdout.write("=".repeat(Terminal.getTerminalSize().cols));
        Stdout.write(this.buffer);

        this.file = file;
        await this.eventLoop();
        return 0;
    }

    async eventLoop() {
        while (true) {
            const char = await Stdin.readChar();

            if (char === "^d") {
                break;
            } else if (char === "backspace") {
                // Handle Backspace
                if (this.cursorPosition > 0) {
                    this.buffer =
                        this.buffer.slice(0, this.cursorPosition - 1) +
                        this.buffer.slice(this.cursorPosition);
                    this.cursorPosition--;
                    Stdout.moveCursor(-1);
                    Stdout.erase(1);
                } else {
                    Stdout.ringBell(); // Ring bell if there's nothing to delete
                }
            } else if (char.length === 1) {
                this.buffer =
                    this.buffer.slice(0, this.cursorPosition) +
                    char +
                    this.buffer.slice(this.cursorPosition);
                Stdout.write(char);
                this.cursorPosition++;
            }
        }

        Stdout.clear();
        Stdout.write(this.stdOld);
        Stdout.write("Confirm save? [Y/n] ");
        const choice = await Stdin.readLine();
        Stdout.write("\n");

        if (["y", "n"].includes(choice.toLowerCase())) {
            if (choice.toLowerCase() !== "y") {
                Stdout.write("Operation cancelled\n");
                return 1;
            }
        }

        Filesystem.write(this.file, this.buffer);
        Stdout.write(`Wrote ${this.buffer.length} bytes\n`);
        return 0;
    }
}
