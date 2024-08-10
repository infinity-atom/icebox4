const terminal = document.querySelector("textarea");
const charsize = {
    x: 9.6,
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
        const rows = Math.floor(
            terminal.getBoundingClientRect().height / charsize.y
        );
        const cols = Math.floor(
            terminal.getBoundingClientRect().width / charsize.x
        );
        return { rows, cols };
    }
}
