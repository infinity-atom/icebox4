export class Program {
    /**
     * @description Base class for all programs
     * @param {String} name The system name of the program
     * @param {String} friendlyName The user friendly name of the program
     * @param {Number[]} version The major, minor, patch version of the program
     */
    constructor(name, friendlyName, version) {
        this.name = name;
        this.friendlyName = friendlyName;
        this.version = version;
        this.versionString = version.join(".");
    }
}
