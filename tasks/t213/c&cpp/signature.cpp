/**
 * Parsing a string containing the contents of a Git diff returns a vector of objects with details of each file's changes
 *
 * @param diffText - The Git diff text to parse.
 * @returns A vector of objects representing the diff for each file.
 */
std::vector<GitDiffFile> parse_git_diff_text_to_file_changes_array(const std::string& diffText);