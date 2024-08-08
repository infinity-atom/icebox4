import { Stdin } from "../stdio/stdin.js";
import { Stdout } from "../stdio/stdout.js";
import { Program } from "../baseProgram.js";

export class Program_GBash extends Program {
    constructor() {
        super("gbash", "gaybash", [1, 0, 0]);
    }

    async main() {
        Stdout.write(
            `${this.friendlyName} (${this.name}) v${this.versionString}\n`
        );
        while (true) {
            Stdout.write("] ");
            const input = await Stdin.readLine();
            const split_arguments = input.split(" ");

            if (input === "" || input[0] === "*") {
                Stdout.write("\n");
                continue;
            }

            Stdout.write("\n");

            // check if exit intent
            if (input === "exit") {
                Stdout.write("exit\n");
                break;
            }

            // Locate in ./
            let program;
            try {
                program = await import(`./${split_arguments[0]}.js`);
            } catch {
                Stdout.write("Could not locate program\n");
                continue;
            }

            const entrypointIndex = Object.keys(program).findIndex((item) =>
                /Program_.*?/g.test(item)
            );
            let programClass = Object.entries(program)[entrypointIndex][1];
            let arguments_parsed;
            if (split_arguments.length <= 1) {
                arguments_parsed = [];
            } else {
                try {
                    arguments_parsed = JSON.parse(
                        split_arguments.slice(1).join(" ")
                    );
                } catch (error) {
                    Stdout.write(
                        `Could not parse arguments\n${error.message}\n`
                    );
                    continue;
                }
            }
            await new programClass().main(arguments_parsed);
        }
    }
}
