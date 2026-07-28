/**
 * @brief Enhanced function to convert relative paths to absolute paths with multiple path processing features
 *
 * This function provides comprehensive path resolution capabilities including:
 * - Expanding user home directory symbols (~)
 * - Resolving relative paths against a base directory
 * - Normalizing paths to remove redundant components
 * - Optionally checking path existence
 * - Optionally resolving symbolic links
 * - Handling various edge cases and error conditions
 *
 * @param path Input path (can be relative path, absolute path, or path containing ~ symbol)
 * @param base_dir Base directory for resolving relative paths, defaults to current working directory
 * @param normalize Whether to normalize the path (remove redundant ./ and ../ and duplicate separators)
 * @param check_exists Whether to check if the path actually exists
 * @param resolve_symlinks Whether to resolve symbolic links
 * @param allow_non_existent When check_exists=false, whether to allow returning non-existent absolute paths
 *
 * @return std::string Resolved absolute path string; returns empty string on failure
 */
#include <string>

std::string resolve_path(
    const std::string& path,
    const std::string& base_dir = "",
    bool normalize = true,
    bool check_exists = false,
    bool resolve_symlinks = true,
    bool allow_non_existent = true
);
