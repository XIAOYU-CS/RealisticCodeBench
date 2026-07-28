package org.real.temp;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

// ChangedFile 类
class ChangedFile {
    public String file_name;
    public String old_content;
    public String new_content;
    public int lines_added;
    public int lines_removed;

    public ChangedFile(String fileName) {
        this.file_name = fileName;
        this.old_content = "";
        this.new_content = "";
        this.lines_added = 0;
        this.lines_removed = 0;
    }

    public Map<String, Object> modelDump() {
        Map<String, Object> map = new HashMap<>();
        map.put("file_name", file_name);
        map.put("old_content", old_content);
        map.put("new_content", new_content);
        map.put("lines_added", lines_added);
        map.put("lines_removed", lines_removed);
        return map;
    }
}

// ChangedFiles 类
class ChangedFiles {
    public List<Map<String, Object>> files;

    public ChangedFiles(List<Map<String, Object>> files) {
        this.files = files;
    }
}

public class Answer {
    /**
     * Parse the Git diff string, extract the list of changed files and count the number of newly added and deleted lines
     *
     * @param diff Git diff output string
     * @param repoPath The root directory path of the warehouse (for path processing)
     * @return The ChangedFiles object contains information about the changed files and line count statistics
     */
    public static ChangedFiles gitDiffToChangedFiles(String diff, String repoPath) {
        List<ChangedFile> changedFiles = new ArrayList<>();
        ChangedFile currentFile = null;
        boolean inContentBlock = false;
        int linesAdded = 0;
        int linesRemoved = 0;

        String[] lines = diff.split("\n");
        int i = 0;
        while (i < lines.length) {
            String line = lines[i];

            if (line.startsWith("diff --git")) {
                if (currentFile != null) {
                    currentFile.lines_added = linesAdded;
                    currentFile.lines_removed = linesRemoved;
                    changedFiles.add(currentFile);
                }

                String[] parts = line.split("\\s+");
                String fileName = null;
                if (parts.length >= 4) {
                    // 提取文件名，格式为 a/filename b/filename
                    String filePart = parts[3];
                    if (filePart.startsWith("a/")) {
                        fileName = filePart.substring(2);
                    } else if (filePart.startsWith("b/")) {
                        fileName = filePart.substring(2);
                    } else {
                        fileName = filePart;
                    }
                }
                currentFile = new ChangedFile(fileName);
                linesAdded = 0;
                linesRemoved = 0;
                inContentBlock = false;
            } else if (line.startsWith("---") || line.startsWith("+++")) {
                inContentBlock = true;
            } else if (line.startsWith("@@")) {
                // hunk header, do nothing
            } else if (inContentBlock && currentFile != null) {
                if (line.startsWith("-") && !line.startsWith("---")) {
                    currentFile.old_content += line.substring(1) + "\n";
                    linesRemoved++;
                } else if (line.startsWith("+") && !line.startsWith("+++")) {
                    currentFile.new_content += line.substring(1) + "\n";
                    linesAdded++;
                } else if (line.startsWith(" ")) {
                    currentFile.old_content += line.substring(1) + "\n";
                    currentFile.new_content += line.substring(1) + "\n";
                }
            }

            i++;
        }

        if (currentFile != null) {
            currentFile.lines_added = linesAdded;
            currentFile.lines_removed = linesRemoved;
            changedFiles.add(currentFile);
        }

        List<Map<String, Object>> filesList = new ArrayList<>();
        for (ChangedFile file : changedFiles) {
            filesList.add(file.modelDump());
        }

        return new ChangedFiles(filesList);
    }
}
