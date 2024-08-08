import { Program } from "../baseProgram.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Clear extends Program {
    constructor() {
        super("clear", "Console Clear", [1, 0, 0]);
    }

    async main() {
        Stdout.clear();
    }
}
