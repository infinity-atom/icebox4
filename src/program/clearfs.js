import { Program } from "../baseProgram.js";
import { Stdin } from "../stdio/stdin.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Clearfs extends Program {
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
                return 0;
            } else {
                Stdout.write("Operation cancelled\n");
                return 1;
            }
        } else {
            Stdout.write("Unknown option. Operation cancelled\n");
        }

        return 0;
    }
}
