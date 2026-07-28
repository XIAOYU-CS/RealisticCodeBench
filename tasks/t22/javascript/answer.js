class OrthogonalPolynomial {
    constructor(alpha, beta, gamma, quadratureRule) {
        this.alpha = alpha;
        this.beta = beta;
        this.gamma = gamma;
        this.quadratureRule = quadratureRule;
    }
}

function dotProduct(...arrays) {
    return arrays[0].reduce((sum, _, i) => sum + arrays.reduce((product, array) => product * array[i], 1), 0);
}

function lanczos(n, quadratureRule) {
    if (n === 0) {
        return { alpha: [], beta: [], gamma: [], quadratureRule };
    }
    if (n < 0 || n > quadratureRule.x.length) {
        throw new Error('n must be between 1 and len(x).');
    }

    let x = quadratureRule.x;
    let w = quadratureRule.w;
    
    let alpha = new Array(n).fill(0);
    let beta = n > 1 ? new Array(n - 1).fill(0) : [];
    let gamma = new Array(n).fill(0);

    let p0 = new Array(x.length).fill(1);  // Initial polynomial p_0(x) = 1
    let p1 = new Array(x.length).fill(0);  // p_-1(x) = 0 (non-existent, thus ignored in calculations)

    for (let i = 0; i < n; i++) {
        let pi;
        if (i > 0) {
            pi = x.map((xi, j) => (xi - alpha[i - 1]) * p0[j]);
        } else {
            pi = [...p0];
        }

        gamma[i] = dotProduct(w, pi, pi);
        alpha[i] = dotProduct(w, x, pi, pi) / gamma[i];

        if (i < n - 1) {
            beta[i] = dotProduct(w, pi, pi, pi) / gamma[i];
            // Update polynomials for next iteration
            [p1, p0] = [p0, pi];
        }
    }

    return { alpha, beta, gamma, quadratureRule };
}
