import { Program } from "../baseProgram.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Echo extends Program {
    constructor() {
        super("echo", "echo", [1, 1, 0]);
    }

    async main(args) {
        (() => {
            if (["string", "number"].includes(typeof args)) {
                Stdout.write(args);
                return 0;
            }

            const ringBell = args.ringBell || false;
            const text = args.text || "";

            if (ringBell) Stdout.ringBell();
            Stdout.write(text);
        })();

        Stdout.write("\n");
        return 0;
    }
}
