function functionToIntegrate(x) {
    return x * x;
}

function simpsonsRule(a, b, n) {
    if (n <= 0 || n % 2 !== 0) {
        throw new RangeError("n must be a positive even integer.");
    }

    const h = (b - a) / n;
    let sum = 0;

    for (let i = 0; i <= n; i++) {
        const x = a + i * h;
        const fx = functionToIntegrate(x);

        if (i === 0 || i === n) {
            sum += fx;
        } else if (i % 2 === 1) {
            sum += 4 * fx;
        } else {
            sum += 2 * fx;
        }
    }

    return (h / 3) * sum;
}
