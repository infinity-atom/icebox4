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
        document.querySelector("textarea").value += text;
        document.querySelector("textarea").scrollTop =
            document.querySelector("textarea").scrollHeight;

        this.cursorPos += text.length;
    }

    /**
     * @description Moves the cursor an amount of characters relative to the current location
     * @param {Number} pos The relative position to move it to
     */
    static moveCursor(pos) {
        this.cursorPos += pos;
        document.querySelector("textarea").selectionStart = this.cursorPos;
    }

    /**
     * @description Ring the terminal bell
     */
    static ringBell() {
        new Audio("../bell.mp3").play();
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
