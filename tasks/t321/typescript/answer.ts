import * as nodeFs from 'fs';

/**
 * Process file: insert content at specified location and replace function calls with specific prefix.
 *
 * @param filePath - Path to the original file
 * @param newFilePath - Path where the processed file will be saved
 * @param insertContent - Code content to be inserted (e.g., macro definitions)
 * @param functionPrefix - Function prefix to be replaced (e.g., "ti_")
 * @param includeKeyword - Keyword to locate insertion position (default "#include")
 * @returns void
 */
function processCppFile(
    filePath: string,
    newFilePath: string,
    insertContent: string,
    functionPrefix: string,
    includeKeyword: string = '#include'
): void {
    // Read original file content
    const content = nodeFs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    // Locate insertion position: after the last line containing the specified keyword
    let includeSectionEnd = -1;
    for (let index = 0; index < lines.length; index++) {
        if (lines[index].startsWith(includeKeyword)) {
            includeSectionEnd = index;
        }
    }

    // Insert custom content after the last include line, or at the beginning if no include found
    if (includeSectionEnd >= 0) {
        lines.splice(includeSectionEnd + 1, 0, insertContent);
    } else {
        lines.unshift(insertContent);
    }

    // Build function matching pattern (based on specified prefix)
    const escapedPrefix = functionPrefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const funcPattern = new RegExp(`(${escapedPrefix}[a-zA-Z0-9_]+)\\s*\\(`, 'g');

    // Replace function call format
    const processedLines = lines.map(line => {
        // Replace with CALL_C_API_FUNC(function_name)( format
        return line.replace(funcPattern, 'CALL_C_API_FUNC($1)(');
    });

    // Add newlines back and save the processed file
    const processedContent = processedLines.join('\n') + (processedLines.length > 0 ? '\n' : '');
    nodeFs.writeFileSync(newFilePath, processedContent, 'utf8');
}
