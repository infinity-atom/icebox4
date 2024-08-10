import { Stdout } from "./stdout.js";
import { IOStream } from "./stream.js";

/**
 * @class Stdin
 * @description Standard Input stdin steam
 * @extends IOStream
 */
export class Stdin extends IOStream {
    /**
     * @description Reads from stdin until a newline is spotted. Trailing newline not included in final string.
     * @returns {String}
     */
    static async readLine() {
        return new Promise((resolve) => {
            let line = "";
            const inputHandler = (event) => {
                if (event.key.length === 1) {
                    line += event.key;
                    Stdout.moveCursor(1);
                } else if (event.key === "Backspace") {
                    if (line === "") {
                        event.preventDefault();
                        Stdout.ringBell();
                        return;
                    }
                    line = line.slice(0, -1);
                    Stdout.moveCursor(-1);
                } else if (event.key === "Enter" || event.key === "Return") {
                    event.preventDefault();
                    document
                        .querySelector("textarea")
                        .removeEventListener("keydown", inputHandler);
                    resolve(line);
                }
            };

            document
                .querySelector("textarea")
                .addEventListener("keydown", inputHandler);
        });
    }
}
