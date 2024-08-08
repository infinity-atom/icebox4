/**
 * @class FilesystemError
 * @description Error relating to the filesystem
 * @extends {Error}
 */
export class FilesystemError extends Error {
    constructor(message) {
        super(message);
    }
}

/**
 * @class ReadError
 * @description Error relating to reading a file
 * @extends {FilesystemError}
 */
export class ReadError extends FilesystemError {
    constructor(path) {
        super(`Read file error: ${path}`);
    }
}

/**
 * @class WriteError
 * @description Error relating to writing to a file
 * @extends {FilesystemError}
 */
export class WriteError extends FilesystemError {
    constructor(path) {
        super(`Write file error: ${path}`);
    }
}

/**
 * @class FSModifyError
 * @description Error relating to modification of the filesystem, such as directory creation/deletion
 * @extends {FilesystemError}
 */
export class FSModifyError extends FilesystemError {
    constructor(path) {
        super(`Modify FS object error: ${path}`);
    }
}
