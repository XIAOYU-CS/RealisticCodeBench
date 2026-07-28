function trapezoidalIntegral(func, a, b, n) {
    if (n <= 0) {
        throw new Error("Number of subintervals must be greater than 0.");
    }

    const h = (b - a) / n;
    let integral = 0.5 * (func(a) + func(b));

    for (let i = 1; i < n; i++) {
        integral += func(a + i * h);
    }

    return integral * h;
}
