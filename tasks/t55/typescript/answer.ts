const fs = require('fs');
import xregexp = require('xregexp');

interface Mapping {
    regex: RegExp;
    replacement: string;
}

function loadRegexMappingsFromFile(mappingFilePath: string): Mapping[] {
    const mappings: Mapping[] = [];

    try {
        const data = fs.readFileSync(mappingFilePath, 'utf-8');
        const lines = data.split('\n');
        if (lines[lines.length - 1] === '') {
            lines.pop();
        }

        for (const line of lines) {
            if (!line.includes(',')) {
                throw new Error("Each line must contain exactly one comma separating the pattern and the replacement.");
            }

            const commaIndex = line.indexOf(',');
            const oldPattern = line.slice(0, commaIndex);
            const newWord = line.slice(commaIndex + 1);
            const trimmedOldPattern = oldPattern.trim().replace(/^'|'$/g, '');
            const trimmedNewWord = newWord.trim().replace(/^'|'$/g, '');

            mappings.push({
                regex: xregexp(trimmedOldPattern),
                replacement: trimmedNewWord
            });
        }
    } catch (error) {
        if (error instanceof Error && error.message === "Each line must contain exactly one comma separating the pattern and the replacement.") {
            throw error;
        }
        if ((error as NodeJS.ErrnoException).code === 'ENOENT' || error instanceof Error && error.message.includes('ENOENT')) {
            throw new Error(`Unable to find the specified file: ${mappingFilePath}`);
        } else {
            throw error;
        }
    }

    return mappings;
}
