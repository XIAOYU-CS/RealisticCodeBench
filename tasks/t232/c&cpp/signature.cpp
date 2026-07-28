/**
 * @brief Parses Markdown text and extracts headings (H1, H2, H3) by level.
 *
 * This function scans the input Markdown string and identifies headings defined using:
 * - ATX style: `# Heading`, `## Subheading`, `### Subsubheading`
 * - (Optionally, if supported) Setext style: underlined headings with `=` or `-`
 *
 * @param[in] markdown A string containing Markdown-formatted content.
 * @return An `std::unordered_map` with the following keys:
 *         - `"level1"`: vector of H1 titles,
 *         - `"level2"`: vector of H2 titles,
 *         - `"level3"`: vector of H3 titles.
 *         Vectors preserve the order of appearance in the input.
 */
std::unordered_map<std::string, std::vector<std::string>>
extract_markdown_titles_by_level(const std::string& markdown);