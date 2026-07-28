function formatText(inputFile = 'input.txt', outputFile = 'output.txt') {
    try {
        const fs = require('fs');
        const lines = fs.readFileSync(inputFile, 'utf8').replace(/\n$/, '').split('\n');
        const contentWithoutNewlines = lines.map(line => line.replace(/\r$/, '')).join(' ');
        fs.writeFileSync(outputFile, contentWithoutNewlines);
        console.log("Line breaks removed and spaces added. Output written to", outputFile);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log("Input file not found.");
        } else {
            throw error;
        }
    }
}
