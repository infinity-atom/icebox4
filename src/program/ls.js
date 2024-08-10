import { Program } from "../baseProgram.js";
import { Filesystem } from "../lib/sys/filesystem.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Ls extends Program {
    constructor() {
        super("ls", "Directory Listing", [1, 0, 0]);
    }

    async main(args, workingDir) {
        Stdout.write(`Directory listing for ${workingDir}\n`);
        const list = Filesystem.readDir(workingDir).map((item) => {
            return `${item.type.toUpperCase()}: ${item.name}`;
        });

        Stdout.write(list.join("\n"));
        Stdout.write("\n");

        return 0;
    }
}
