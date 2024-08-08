import { IOStream } from "./stream.js";

/**
 * @class Stdout
 * @description Standard Input stdout stream
 * @extends IOStream
 */
export class Stdout extends IOStream {
    static cursorPos = 0;
    /**
     * @description Writes to stdout stream (terminal text)
     * @param {String} text String to write into stream
     */
    static write(text) {
        const cleanText = text.replaceAll("\u0007", "");
        document.querySelector("textarea").value += cleanText;
        document.querySelector("textarea").scrollTop =
            document.querySelector("textarea").scrollHeight;

        // Terminal bell
        if (text.includes("\u0007")) {
            new Audio("../bell.wav").play();
        }

        this.cursorPos += cleanText.length;
    }

    /**
     * @description Read from the stdout stream (terminal text)
     * @returns {String}
     */
    static readAll() {
        return document.querySelector("textarea").value;
    }

    /**
     * @description Clears the terminal
     */
    static clear() {
        document.querySelector("textarea").value = "";
        this.cursorPos = 0;
    }

    /**
     * @description Erases characters from end of stdout and moves cursor to new position
     * @param {Number} length Characters to erase
     */
    static erase(length) {
        if (this.cursorPos === document.querySelector("textarea").value.length)
            this.cursorPos--;
        document.querySelector("textarea").value = document
            .querySelector("textarea")
            .value.slice(0, -length);
    }
}
