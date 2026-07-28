interface BibEntry {
    title: string | null;
    author: string | null;
    year: string | null;
}

function extractBibInfo(bibFile: string): BibEntry[] {
    /**
     * Extracts the title, author, and year from a BibTeX file.
     *
     * @param {string} bibFile - The path to the BibTeX file.
     * @returns {BibEntry[]} - A list containing dictionaries with title, author, and year for each article.
     */
    
    const results: BibEntry[] = [];
    const titlePattern = /title\s*=\s*{([^}]*)}/i;
    const authorPattern = /author\s*=\s*{([^}]*)}/i;
    const yearPattern = /year\s*=\s*{([^}]*)}/i;

    let fileContent: string;
    try {
        fileContent = require('fs').readFileSync(bibFile, 'utf-8');
    } catch (error: any) {
        if (error && error.code === 'ENOENT') {
            console.error(`Error: The file '${bibFile}' was not found.`);
            return results;
        }
        throw error;
    }
    
    for (const entry of fileContent.split('@').slice(1)) {
        const title = entry.match(titlePattern);
        const author = entry.match(authorPattern);
        const year = entry.match(yearPattern);

        results.push({
            title: title ? title[1] : null,
            author: author ? author[1] : null,
            year: year ? year[1] : null
        });
    }
    
    return results;
}
