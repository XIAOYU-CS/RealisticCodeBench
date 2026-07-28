function findMaxDifference(l: number[]): number {
    if (l.length < 2) {
        return 0;
    }

    let minVal = l[0];
    let maxDiff = 0;

    for (let i = 1; i < l.length; i++) {
        maxDiff = Math.max(maxDiff, l[i] - minVal);
        minVal = Math.min(minVal, l[i]);
    }

    return maxDiff;
}

function main(): void {
    const n: number = Number(prompt("Enter the number of elements:"));
    const l: number[] = [];

    for (let i = 0; i < n; i++) {
        l[i] = Number(prompt(`Enter element ${i + 1}:`));
    }

    const maxDiff: number = findMaxDifference(l);
    console.log(maxDiff);
}
