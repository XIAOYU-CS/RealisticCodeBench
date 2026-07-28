/**
 * Query minimization function supporting whitespace modes and custom comment rules
 *
 * @param {string} query - Original text to be processed
 * @param {string} [whitespace_mode="collapse"] - Whitespace line processing mode, optional values: preserve/remove/collapse
 * @param {Object} [comment_rules=null] - Comment rule dictionary
 * @returns {string} after process str
 */
function cleanQuery(query, whitespace_mode = "collapse", comment_rules = null) {
    // Default comment rules (if not specified)
    const default_rules = {
        "line_comment": ["#"],
        "block_comment": []
    };

    comment_rules = {
        ...default_rules,
        ...(comment_rules || {})
    };

    // Validate parameter validity
    if (!["preserve", "remove", "collapse"].includes(whitespace_mode)) {
        throw new Error("whitespace_mode must be 'preserve'/'remove'/'collapse'");
    }

    // Split original text by lines
    const lines = query.split('\n');
    const result = [];
    let in_block_comment = false;  // Whether currently in a block comment
    let current_block_end = null;   // Current block comment end marker
    let previous_was_blank = false; // Whether previous line was blank (for collapse mode)

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Handle block comment state (across multiple lines)
        if (in_block_comment) {
            // Check if current line contains block comment end marker
            if (current_block_end && line.includes(current_block_end)) {
                // Extract content after block comment end marker
                const parts = line.split(current_block_end, 2);
                line = parts.length > 1 ? parts[1] : "";
                in_block_comment = false;
                current_block_end = null;
            } else {
                // Entire line is within block comment, skip
                line = "";
            }
        }

        let processedLine = line;

        // Process non-block comment content
        if (!in_block_comment && processedLine) {
            // Handle line comments (truncate from line comment marker)
            for (const marker of comment_rules["line_comment"]) {
                if (processedLine.includes(marker)) {
                    processedLine = processedLine.split(marker, 1)[0];
                    break;  // Only process the first line comment marker
                }
            }

            // Handle block comment start (block comments within a single line)
            for (const [start, end] of comment_rules["block_comment"]) {
                if (processedLine.includes(start)) {
                    // Split at block comment start marker
                    const parts = processedLine.split(start, 2);
                    processedLine = parts[0];  // Keep content before start marker
                    const remaining = parts[1] || "";

                    // Check if end marker exists on the same line
                    if (remaining.includes(end)) {
                        // Keep content after end marker
                        const endParts = remaining.split(end, 2);
                        processedLine += endParts.length > 1 ? endParts[1] : "";
                    } else {
                        // Block comment spans multiple lines
                        in_block_comment = true;
                        current_block_end = end;
                    }
                    break;  // Only process the first block comment start marker
                }
            }
        }

        // Process whitespace within line (remove leading/trailing whitespace, preserve internal spaces)
        const strippedLine = processedLine.trim();
        const is_blank = (strippedLine === "");  // Whether current line is blank

        // Handle according to whitespace mode
        if (is_blank) {
            if (whitespace_mode === "preserve") {
                result.push("");
                previous_was_blank = true;
            } else if (whitespace_mode === "collapse") {
                // Only keep the first of consecutive blank lines
                if (!previous_was_blank) {
                    result.push("");
                    previous_was_blank = true;
                }
            }
            // In remove mode, don't add blank lines
        } else {
            // Add non-blank line and reset blank line flag
            result.push(strippedLine);
            previous_was_blank = false;
        }
    }

    let final_result = result.join('\n');
    if (whitespace_mode === "remove") {
        // Remove consecutive newlines and trim
        final_result = final_result.replace(/\n\s*\n/g, '\n').trim();
    }

    return final_result;
}
