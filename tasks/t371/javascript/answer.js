const nodeFs = require('fs');
const nodePath = require('path');

/**
 * Copy file from source path to destination path with multiple feature options
 *
 * @param {string} sourcePath - Source file path
 * @param {string} destPath - Destination file path
 * @param {boolean} overwrite - Whether to overwrite if destination file exists, default false
 * @param {boolean} preserveMetadata - Whether to preserve file metadata, default true
 * @param {boolean} followSymlinks - Whether to follow symbolic links, default false
 * @param {number} bufferSize - Buffer size used for copying, default 1MB
 *
 * @returns {Array} Array with two elements: [success, result_message]
 */
function copyFile(
    sourcePath,
    destPath,
    overwrite = false,
    preserveMetadata = true,
    followSymlinks = false,
    bufferSize = 1024 * 1024 // 1MB buffer
) {
    // Parameter validation
    if (!sourcePath || !destPath) {
        return [false, "[invalid argument]"];
    }

    try {
        // Resolve paths
        const resolvedSource = nodePath.resolve(sourcePath);
        const resolvedDest = nodePath.resolve(destPath);

        // Check source file
        if (!nodeFs.existsSync(resolvedSource)) {
            return [false, "[cannot resolve source path]"];
        }

        const sourceStats = nodeFs.statSync(resolvedSource);
        const isSymlink = nodeFs.lstatSync(resolvedSource).isSymbolicLink();

        if (isSymlink && !followSymlinks) {
            return [false, "[source is symlink, not followed]"];
        }

        if (!sourceStats.isFile()) {
            return [false, "[source is not a file]"];
        }

        // Check destination file
        if (nodeFs.existsSync(resolvedDest)) {
            const destStats = nodeFs.statSync(resolvedDest);
            if (!overwrite) {
                return [false, "[destination exists, not overwritten]"];
            }
            if (destStats.isDirectory()) {
                return [false, "[destination is a directory]"];
            }
        }

        // Ensure destination directory exists
        const destDir = nodePath.dirname(resolvedDest);
        nodeFs.mkdirSync(destDir, { recursive: true });

        // Choose copy method based on options
        if (followSymlinks) {
            // Handle symbolic link special case - manually copy file content
            const sourceFd = nodeFs.openSync(resolvedSource, 'r');
            const destFd = nodeFs.openSync(resolvedDest, 'w');

            try {
                const buffer = Buffer.alloc(bufferSize);
                let bytesRead;

                while ((bytesRead = nodeFs.readSync(sourceFd, buffer, 0, bufferSize, null)) > 0) {
                    nodeFs.writeSync(destFd, buffer, 0, bytesRead);
                }

                // If metadata preservation is needed, copy it manually
                if (preserveMetadata) {
                    const sourceStats = nodeFs.fstatSync(sourceFd);
                    nodeFs.futimesSync(destFd, sourceStats.atime, sourceStats.mtime);
                }
            } finally {
                nodeFs.closeSync(sourceFd);
                nodeFs.closeSync(destFd);
            }
        } else {
            nodeFs.copyFileSync(resolvedSource, resolvedDest);
            if (preserveMetadata) {
                nodeFs.utimesSync(resolvedDest, sourceStats.atime, sourceStats.mtime);
            }
        }

        // Verify copy result
        const sourceSize = nodeFs.statSync(resolvedSource).size;
        const destSize = nodeFs.statSync(resolvedDest).size;

        if (sourceSize !== destSize) {
            nodeFs.unlinkSync(resolvedDest);
            return [false, "[file size mismatch after copy]"];
        }

        return [true, "[file copied successfully]"];

    } catch (error) {
        // Clean up partially created file
        try {
            if (nodeFs.existsSync(destPath)) {
                nodeFs.unlinkSync(destPath);
            }
        } catch (cleanupError) {
            // Ignore cleanup errors
        }
        return [false, `[copy failed: ${error.message}]`];
    }
}
