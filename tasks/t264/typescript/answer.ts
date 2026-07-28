const fsForLineProcessing = require("fs");

function readFileAndProcessLines(path: string): string[] {
    const content = fsForLineProcessing.readFileSync(path, "utf8");
    const processed: string[] = [];

    for (const line of content.split(/\r?\n/)) {
        const withoutComment = line.split("#")[0].trim();
        if (withoutComment) {
            processed.push(withoutComment);
        }
    }

    return processed;
}
