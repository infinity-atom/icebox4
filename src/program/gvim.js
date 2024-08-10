import { Program } from "../baseProgram.js";
import { Stdout } from "../stdio/stdout.js";
import { Stdin } from "../stdio/stdin.js";
import { Terminal } from "../lib/sys/terminal.js";

export class Program_Gvim extends Program {
    constructor() {
        super("gvim", "gayvim", [1, 0, 0]);
    }

    async main() {
        // Save terminal state
        const saved_state = Stdout.readAll();

        let fcontent = "";

        while (true) {
            Stdout.clear();

            let linesCount = (fcontent.match(/\n/g) || []).length;
            // Render gvim
            Stdout.write(fcontent + "\n");
            for (
                var i = 1;
                i < Terminal.getTerminalSize().rows - (2 + linesCount);
                i++
            ) {
                Stdout.write("~\n");
            }

            Stdout.write(
                "\u2588".repeat(Terminal.getTerminalSize().cols - 8) +
                    " gayvim\n"
            );

            const input = await Stdin.readLine();

            if (input.startsWith(";")) {
                fcontent += input.slice(1);
                fcontent += "\n";
            }

            if (input === ":q") {
                break;
            }
        }

        // When the program has finished, rewrite terminal.
        Stdout.clear();
        Stdout.write(saved_state + "\n");
    }
}
