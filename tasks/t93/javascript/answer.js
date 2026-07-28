const fsForSequences = require("fs");

function isMunodiSequence(sequence) {
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

function checkSequences(filename) {
    const results = {};
    const content = fsForSequences.readFileSync(filename, "utf8");
    for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed) {
            continue;
        }
        const sequence = trimmed.split(",").map((value) => Number.parseInt(value, 10));
        results[JSON.stringify(sequence)] = isMunodiSequence(sequence);
    }
    return results;
}
