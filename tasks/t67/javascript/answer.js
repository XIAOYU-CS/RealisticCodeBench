const fs = require('fs');

function getMinSeqNumAndDistance(filePath, word1, word2) {
    let minLine = null;
    let minDistance = Infinity;

    try {
        const lines = fs.readFileSync(filePath, 'utf8').split('\n');
        for(let i = 0; i < lines.length; i++) {
            const words = lines[i].split(/\s+/);
            const word1Indices = [];
            const word2Indices = [];
            words.forEach((word, j) => {
                if(word === word1) word1Indices.push(j);
                if(word === word2) word2Indices.push(j);
            });
            for (const index1 of word1Indices) {
                for (const index2 of word2Indices) {
                    const distance = Math.abs(index1 - index2);
                    if(distance < minDistance) {
                        minDistance = distance;
                        minLine = i + 1;
                    }
                }
            }
        }
    } catch (error) {
        return [null, Infinity];
    }

    return [minLine, minDistance];
}
