function emptyDirectory(directoryPath) {
    /**
     * Empties all files and subdirectories in the specified directory.
     * @param {string} directoryPath - The path to the directory whose contents are to be emptied.
     * @returns {Promise<void>} A promise that resolves when the directory is emptied or rejects with an error.
     */
    
    return new Promise((resolve, reject) => {
        const fsLocal = require('fs');
        const pathLocal = require('path');

        if (!fsLocal.existsSync(directoryPath)) {
            return reject(new Error(`The specified path ${directoryPath} does not exist.`));
        }

        if (!fsLocal.lstatSync(directoryPath).isDirectory()) {
            return reject(new Error(`${directoryPath} is not a directory.`));
        }

        fsLocal.readdir(directoryPath, (err, files) => {
            if (err) {
                return reject(err);
            }

            const promises = files.map(file => {
                const filePath = pathLocal.join(directoryPath, file);

                return new Promise((resolve, reject) => {
                    fsLocal.lstat(filePath, (err, stats) => {
                        if (err) {
                            return reject(err);
                        }

                        if (stats.isDirectory()) {
                            fsLocal.promises.rm(filePath, { recursive: true, force: true })
                                .then(resolve)
                                .catch(reject);
                        } else {
                            fsLocal.promises.unlink(filePath)
                                .then(resolve)
                                .catch(reject);
                        }
                    });
                });
            });

            Promise.all(promises)
                .then(() => resolve())
                .catch(reject);
        });
    });
}
