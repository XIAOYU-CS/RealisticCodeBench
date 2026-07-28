/**
 * @brief Compresses an HTML string by collapsing and trimming extraneous whitespace,
 *        while preserving original formatting inside significant tags such as
 *        @c <pre>, @c <script>, @c <style>, and @c <div> (note: behavior for @c <div> may vary by implementation).
 *
 * @param htmlString The input HTML string to minify.
 * @return A @c std::string containing the compressed HTML with unnecessary whitespace removed,
 *         while respecting content integrity in preserved contexts.
 */
std::string minify_html(const std::string& htmlString);