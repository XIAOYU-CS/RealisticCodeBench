const fsForSequences = require("fs");

function isArithmeticSequence(sequence: number[]): boolean {
    if (sequence.length < 2) {
        return false;
    }
    const difference = sequence[1] - sequence[0];
    for (let i = 2; i < sequence.length; i += 1) {
        if (sequence[i] - sequence[i - 1] !== difference) {
            return false;
        }
    }
    return true;
}

function checkSequences(filename: string): { [key: string]: boolean } {
    const content = fsForSequences.readFileSync(filename, "utf8");
    const result: { [key: string]: boolean } = {};
    for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed) {
            continue;
        }
        const sequence = trimmed.split(",").map((value: string) => Number.parseInt(value, 10));
        result[sequence.toString()] = isArithmeticSequence(sequence);
    }
    return result;
}
