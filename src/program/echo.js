import { Program } from "../baseProgram.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Echo extends Program {
    constructor() {
        super("echo", "echo", [1, 0, 0]);
    }

    async main(args) {
        Stdout.write(String(args) || "");
        Stdout.write("\n");
    }
}
