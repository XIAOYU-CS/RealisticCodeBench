const fsForMinDistance = require("fs");

function readFileAsSequences(filePath: string): string[][] {
    const content = fsForMinDistance.readFileSync(filePath, "utf8");
    return content
        .split(/\r?\n/)
        .filter((line: string) => line.trim().length > 0)
        .map((line: string) => line.trim().split(/\s+/));
}

function closestWordDistance(sequence: string[], word1: string, word2: string): number {
    const word1Indices: number[] = [];
    const word2Indices: number[] = [];

    sequence.forEach((word, index) => {
        if (word === word1) {
            word1Indices.push(index);
        } else if (word === word2) {
            word2Indices.push(index);
        }
    });

    let minDistance = Infinity;
    for (const i of word1Indices) {
        for (const j of word2Indices) {
            minDistance = Math.min(minDistance, Math.abs(i - j));
        }
    }
    return minDistance;
}

function getMinDistance(filePath: string, word1: string, word2: string): [number | null, number | null] {
    const sequences = readFileAsSequences(filePath);
    let minDistance = Infinity;
    let minSequence: number | null = null;

    sequences.forEach((sequence, index) => {
        const distance = closestWordDistance(sequence, word1, word2);
        if (distance < minDistance) {
            minDistance = distance;
            minSequence = index;
        }
    });

    return minDistance === Infinity ? [null, null] : [minSequence, minDistance];
}
