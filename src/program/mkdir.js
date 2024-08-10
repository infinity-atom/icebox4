import { Program } from "../baseProgram.js";
import { Filesystem } from "../lib/sys/filesystem.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Mkdir extends Program {
    constructor() {
        super("mkdir", "Make Directory", [1, 0, 0]);
    }

    async main(args, workingDir) {
        if (typeof args !== "string") {
            Stdout.write("Unspecified directory name\n");
            return 1;
        }

        let path;
        if (args[0] !== "/") {
            path = `${workingDir}/${args}`;
        } else {
            path = args;
        }

        Filesystem.mkdir(path);
        return 0;
    }
}
