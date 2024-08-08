const terminal = document.querySelector("textarea");
const charsize = {
    x: 6.9,
    y: 22
};

/**
 * @class Terminal
 * @description Terminal utilities
 */
export class Terminal {
    /**
     * @description Get the terminal's size in rows and columns
     * @returns {{ rows: Number, cols: Number }}
     */
    static getTerminalSize() {
        const rows = Math.floor(terminal.clientHeight / charsize.y);
        const cols = Math.floor(terminal.clientWidth / charsize.x);
        return { rows, cols };
    }
}
