import { Program } from "../baseProgram.js";
import { Filesystem } from "../lib/sys/filesystem.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Touch extends Program {
    constructor() {
        super("touch", "Touch", [1, 0, 0]);
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

        const containingDir = file.substring(0, file.lastIndexOf("/"));

        if (!Filesystem.existsDir(containingDir)) {
            Stdout.write("Directory does not exist\n");
            return 1;
        }

        Filesystem.touch(file);
        return 0;
    }
}
