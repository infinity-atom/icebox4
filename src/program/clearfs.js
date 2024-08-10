import { Program } from "../baseProgram.js";
import { Stdin } from "../stdio/stdin.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Echo extends Program {
    constructor() {
        super("clearfs", "Filesystem Clear", [1, 0, 0]);
    }

    async main() {
        Stdout.write("Destructive action ahead.\n");
        Stdout.write("Continue? [Y/N] ");
        const choice = await Stdin.readLine();
        Stdout.write("\n");

        if (["y", "n"].includes(choice.toLowerCase())) {
            if (choice.toLowerCase() === "y") {
                localStorage.clear();
                location.reload();
            } else {
                Stdout.write("Operation cancelled\n");
                return;
            }
        } else {
            Stdout.write("Unknown option. Operation cancelled\n");
        }
    }
}
