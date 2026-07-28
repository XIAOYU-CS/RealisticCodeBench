function findMaxDifference(l) {
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
