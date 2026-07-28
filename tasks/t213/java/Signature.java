class GitDiffChange {
    private String diff;
    private String code;

    public GitDiffChange(String diff, String code) {
        this.diff = diff;
        this.code = code;
    }

    // Getters and setters (or use Lombok for brevity)
    public String getDiff() {
        return diff;
    }

    public void setDiff(String diff) {
        this.diff = diff;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}

class GitDiffFile {
    private String oldPath;
    private String newPath;
    private List<GitDiffChange> changes;
    private String newFileMode;
    private String deletedFileMode;
    private String index;

    public GitDiffFile(String oldPath, String newPath) {
        this.oldPath = oldPath;
        this.newPath = newPath;
        this.changes = new ArrayList<>();
        this.newFileMode = null;
        this.deletedFileMode = null;
        this.index = null;
    }

    // Getters and setters (or use Lombok for brevity)
    public String getOldPath() {
        return oldPath;
    }

    public String getNewPath() {
        return newPath;
    }

    public List<GitDiffChange> getChanges() {
        return changes;
    }

    public String getNewFileMode() {
        return newFileMode;
    }

    public void setNewFileMode(String newFileMode) {
        this.newFileMode = newFileMode;
    }

    public String getDeletedFileMode() {
        return deletedFileMode;
    }

    public void setDeletedFileMode(String deletedFileMode) {
        this.deletedFileMode = deletedFileMode;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }
}
/**
 * Parsing a string containing the contents of a Git diff returns a list of objects with details of each file's changes
 *
 * @param diffText The Git diff text to parse.
 * @return A list of objects representing the diff for each file.
 */
public static List<GitDiffFile> parseGitDiffTextToFileChangesArray(String diffText) {}