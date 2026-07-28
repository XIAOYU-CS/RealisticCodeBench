function copyDirectory(sourceDir, targetDir) {
    const fs = require('fs');

    if (!fs.existsSync(sourceDir)) {
        throw new Error('Source directory does not exist.');
    }
    if (!fs.statSync(sourceDir).isDirectory()) {
        throw new Error('Source is not a directory.');
    }

    fs.cpSync(sourceDir, targetDir, { recursive: true, force: true });
}
