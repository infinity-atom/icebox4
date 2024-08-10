const defaultFs = {
    version: [1, 0, 0],
    root: [
        {
            type: "dir",
            meta: {
                name: "home"
            },
            contents: [
                {
                    type: "file",
                    meta: {
                        name: "helloWorld.py",
                        dateCreated: 1723249169,
                        dateModified: 1723249169
                    },
                    // eslint-disable-next-line prettier/prettier
                    contents: "print(\"Hello, World!\")\n"
                },
                {
                    type: "dir",
                    meta: {
                        name: "Documents"
                    },
                    contents: []
                }
            ]
        }
    ]
};

let fs;
if (localStorage.getItem("fsdisk")) {
    fs = JSON.parse(localStorage.fsdisk);
} else {
    fs = defaultFs;
}

const saveDisk = () => {
    localStorage.fsdisk = JSON.stringify(fs);
};

// Make sure the disk is saved
saveDisk();

/**
 * @class Filesystem
 * @description Filesystem related utility functions
 */
export class Filesystem {
    /**
     * @description Helper function to find a directory by path
     * @param {String} path The path to the directory
     * @returns {Object|null} The directory object or null
     */
    static findDir(path) {
        const parts = path.split("/").filter(Boolean);
        let current = fs.root;

        for (const part of parts) {
            const dir = current.find(
                (item) => item.type === "dir" && item.meta.name === part
            );
            if (!dir) return null;
            current = dir.contents; // Continue searching within the contents
        }

        return current; // Return contents of the directory (could be empty)
    }

    /**
     * @description Creates a directory at the path
     * @param {String} path The path to do the operation on
     */
    static mkdir(path) {
        const parts = path.split("/").filter(Boolean);
        const dirName = parts.pop();
        const parentDir = Filesystem.findDir(parts.join("/"));

        if (
            parentDir &&
            !parentDir.find(
                (item) => item.type === "dir" && item.meta.name === dirName
            )
        ) {
            parentDir.push({
                type: "dir",
                meta: { name: dirName },
                contents: []
            });
        }

        saveDisk();
    }

    /**
     * @description Removes a directory specified by the path
     * @param {String} path The path to do the operation on
     */
    static rmdir(path) {
        const parts = path.split("/").filter(Boolean);
        const dirName = parts.pop();
        const parentDir = Filesystem.findDir(parts.join("/"));

        if (parentDir) {
            const index = parentDir.findIndex(
                (item) => item.type === "dir" && item.meta.name === dirName
            );
            if (index !== -1) parentDir.splice(index, 1);
        }

        saveDisk();
    }

    /**
     * @description Removes a file specified by the path
     * @param {String} path The path to do the operation on
     */
    static rmfile(path) {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop();
        const parentDir = Filesystem.findDir(parts.join("/"));

        if (parentDir) {
            const index = parentDir.findIndex(
                (item) => item.type === "file" && item.meta.name === fileName
            );
            if (index !== -1) parentDir.splice(index, 1);
        }

        saveDisk();
    }

    /**
     * @description Creates a file at the path
     * @param {String} path The path to do the operation on
     */
    static touch(path) {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop();
        const parentDir = Filesystem.findDir(parts.join("/"));

        if (
            parentDir &&
            !parentDir.find(
                (item) => item.type === "file" && item.meta.name === fileName
            )
        ) {
            parentDir.push({
                type: "file",
                meta: {
                    name: fileName,
                    dateCreated: Date.now(),
                    dateModified: Date.now()
                },
                contents: ""
            });
        }

        saveDisk();
    }

    /**
     * @description Read the file at the path
     * @param {String} path The path to do the operation on
     * @returns {String} The contents of the file
     */
    static read(path) {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop();
        const parentDir = Filesystem.findDir(parts.join("/"));

        if (parentDir) {
            const file = parentDir.find(
                (item) => item.type === "file" && item.meta.name === fileName
            );
            if (file) return file.contents;
        }

        return null;
    }

    /**
     * @description Get all files/directories in a directory
     * @param {String} path The path to do the operation on
     */
    static readDir(path) {
        const dir = Filesystem.findDir(path);
        if (dir) {
            return dir.map((item) => ({
                name: item.meta.name,
                type: item.type
            }));
        }
        return [];
    }

    /**
     * @description Write to the file at the path
     * @param {String} path The path to do the operation on
     */
    static write(path, contents) {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop();
        const parentDir = Filesystem.findDir(parts.join("/"));

        if (parentDir) {
            const file = parentDir.find(
                (item) => item.type === "file" && item.meta.name === fileName
            );
            if (file) {
                file.contents = contents;
                file.meta.dateModified = Date.now();
            }
        }

        saveDisk();
    }

    /**
     * @description Check if a directory exists at the given path
     * @param {String} path The path to check
     * @returns {Boolean} True if the directory exists, false otherwise
     */
    static existsDir(path) {
        const dir = Filesystem.findDir(path);
        return dir !== null;
    }

    /**
     * @description Check if a file exists at the given path
     * @param {String} path The path to check
     * @returns {Boolean} True if the file exists, false otherwise
     */
    static existsFile(path) {
        const parts = path.split("/").filter(Boolean);
        const fileName = parts.pop();
        const parentDir = Filesystem.findDir(parts.join("/"));

        if (parentDir) {
            return parentDir.some(
                (item) => item.type === "file" && item.meta.name === fileName
            );
        }
        return false;
    }
}
