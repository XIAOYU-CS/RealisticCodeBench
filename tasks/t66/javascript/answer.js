function parseDurationStringToTimedelta(timeString) {
    const unitToMilliseconds = {
        d: 24 * 60 * 60 * 1000,
        h: 60 * 60 * 1000,
        m: 60 * 1000,
        s: 1000,
        ms: 1
    };
    const pattern = /(\d+)\s*(ms|[dhms])/g;
    let total = 0;
    let match;

    while ((match = pattern.exec(timeString)) !== null) {
        total += Number(match[1]) * unitToMilliseconds[match[2]];
    }

    return total;
}
