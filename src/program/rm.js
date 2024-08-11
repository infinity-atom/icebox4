import { Program } from "../baseProgram.js";
import { Filesystem } from "../lib/sys/filesystem.js";
import { Stdout } from "../stdio/stdout.js";

export class Program_Rm extends Program {
    constructor() {
        super("rm", "Remove", [1, 0, 0]);
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
            Filesystem.rmfile(file);
            return 0;
        } else {
            if (Filesystem.existsDir(file)) {
                if (args.recurse) {
                    Filesystem.rmdir(file);
                    return 0;
                } else {
                    Stdout.write("Path is a directory.\n");
                    return 1;
                }
            }

            Stdout.write("Path not found\n");
            return 1;
        }
    }
}
