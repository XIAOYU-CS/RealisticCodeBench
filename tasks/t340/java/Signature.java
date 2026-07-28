class ChangedFiles {
    public List<Map<String, Object>> files;

    public ChangedFiles(List<Map<String, Object>> files) {
        this.files = files;
    }
}
/**
* Parse the Git diff string, extract the list of changed files and count the number of newly added and deleted lines
*
* @param diff Git diff output string
* @param repoPath The root directory path of the warehouse (for path processing)
* @return The ChangedFiles object contains information about the changed files and line count statistics
*/
public static ChangedFiles gitDiffToChangedFiles(String diff, String repoPath) {}