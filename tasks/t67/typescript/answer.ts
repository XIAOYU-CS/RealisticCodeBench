import fs from 'fs';

function getMinSeqNumAndDistance(filePath: string, word1: string, word2: string): [number | null, number] {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const lines = data.split('\n');

        let minLine: number | null = null;
        let minDist: number = Infinity;

        for (let i = 0; i < lines.length; i++) {
            const words = lines[i].split(/\s+/);
            const word1Indices: number[] = [];
            const word2Indices: number[] = [];
            words.forEach((word, index) => {
                if (word === word1) word1Indices.push(index);
                if (word === word2) word2Indices.push(index);
            });

            for (const idx1 of word1Indices) {
                for (const idx2 of word2Indices) {
                    const dist = Math.abs(idx1 - idx2);
                    if (dist < minDist) {
                        minDist = dist;
                        minLine = i + 1;
                    }
                }
            }
        }

        return [minLine, minDist];
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error);
        return [null, Infinity];
    }
}
