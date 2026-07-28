const fsForCopyDirectory = require("fs");
const pathForCopyDirectory = require("path");

function copyDirectory(sourceDir: string, targetDir: string): void {
    if (!fsForCopyDirectory.existsSync(sourceDir)) {
        throw new Error("Source directory does not exist.");
    }
    if (!fsForCopyDirectory.statSync(sourceDir).isDirectory()) {
        throw new Error("Source is not a directory.");
    }

    fsForCopyDirectory.mkdirSync(targetDir, { recursive: true });
    for (const entry of fsForCopyDirectory.readdirSync(sourceDir)) {
        const sourcePath = pathForCopyDirectory.join(sourceDir, entry);
        const targetPath = pathForCopyDirectory.join(targetDir, entry);
        if (fsForCopyDirectory.statSync(sourcePath).isDirectory()) {
            copyDirectory(sourcePath, targetPath);
        } else {
            fsForCopyDirectory.copyFileSync(sourcePath, targetPath);
        }
    }
}
