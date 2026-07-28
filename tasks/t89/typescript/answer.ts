function formatText(inputFile: string = 'input.txt', outputFile: string = 'output.txt'): void {
    try {
        const fs = require('fs');
        const lines = fs.readFileSync(inputFile, 'utf8').replace(/\n$/, '').split('\n');
        const contentWithoutNewlines = lines.map((line: string) => line.replace(/\r$/, '')).join(' ');
        fs.writeFileSync(outputFile, contentWithoutNewlines);
        console.log("Line breaks removed and spaces added. Output written to", outputFile);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            console.log("Input file not found.");
        } else {
            throw error;
        }
    }
}
