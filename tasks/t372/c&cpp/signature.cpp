/**
 * Enhanced version of the Unix 'cat' command.
 * 
 * @param filenames List of file names to read. If empty, reads from stdin.
 * @param number_lines Number all non-blank lines.
 * @param show_ends Show '$' at the end of each line.
 * @param squeeze_blank Replace multiple consecutive blank lines with a single blank line.
 */
void cat(const std::vector<std::string>& filenames, bool number_lines = false, bool show_ends = false, bool squeeze_blank = false);
