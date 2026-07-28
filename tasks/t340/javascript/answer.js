class ChangedFile {
    /**
     * Create a ChangedFile instance
     * @param {string} fileName - Name of the file
     * @param {string} oldContent - Original content of the file
     * @param {string} newContent - Modified content of the file
     * @param {number} linesAdded - Number of lines added
     * @param {number} linesRemoved - Number of lines removed
     */
    constructor(fileName, oldContent = "", newContent = "", linesAdded = 0, linesRemoved = 0) {
        this.fileName = fileName;
        this.oldContent = oldContent;
        this.newContent = newContent;
        this.linesAdded = linesAdded;
        this.linesRemoved = linesRemoved;
    }

    /**
     * Convert to plain object
     * @returns {Object} Object containing file information
     */
    modelDump() {
        return {
            file_name: this.fileName,
            old_content: this.oldContent,
            new_content: this.newContent,
            lines_added: this.linesAdded,
            lines_removed: this.linesRemoved
        };
    }
}

class ChangedFiles {
    /**
     * Create a ChangedFiles collection
     * @param {Array<Object>} files - List of changed files
     */
    constructor(files) {
        this.files = files;
    }
}

/**
 * Parse Git diff string to extract changed files and count line changes
 * @param {string} diff - Git diff output string
 * @param {string} repoPath - Repository root directory path
 * @returns {ChangedFiles} Object containing information about changed files
 */
function gitDiffToChangedFiles(diff, repoPath) {
    const changedFiles = [];
    let currentFile = null;
    let inContentBlock = false;
    let linesAdded = 0;
    let linesRemoved = 0;

    const lines = diff.split("\n");
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.startsWith("diff --git")) {
            if (currentFile) {
                currentFile.linesAdded = linesAdded;
                currentFile.linesRemoved = linesRemoved;
                changedFiles.push(currentFile);
            }

            const parts = line.split(" ");
            let fileName = null;
            if (parts.length >= 4) {
                fileName = parts[3].startsWith("b/") ? parts[3].slice(2) : parts[3];
            }
            currentFile = new ChangedFile(fileName);

            linesAdded = 0;
            linesRemoved = 0;
            inContentBlock = false;
        }
        else if (line.startsWith("---") || line.startsWith("+++")) {
            inContentBlock = true;
        }
        else if (line.startsWith("@@")) {
        }
        else if (inContentBlock && currentFile) {
            if (line.startsWith("-") && !line.startsWith("---")) {
                currentFile.oldContent += line.slice(1) + "\n";
                linesRemoved++;
            }
            else if (line.startsWith("+") && !line.startsWith("+++")) {
                currentFile.newContent += line.slice(1) + "\n";
                linesAdded++;
            }
            else if (line.startsWith(" ")) {
                currentFile.oldContent += line.slice(1) + "\n";
                currentFile.newContent += line.slice(1) + "\n";
            }
        }

        i++;
    }

    if (currentFile) {
        currentFile.linesAdded = linesAdded;
        currentFile.linesRemoved = linesRemoved;
        changedFiles.push(currentFile);
    }

    const filesData = changedFiles.map(file => file.modelDump());
    return new ChangedFiles(filesData);
}