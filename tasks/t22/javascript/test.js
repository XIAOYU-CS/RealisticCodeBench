class QuadratureRule {
    constructor(x, w) {
        this.x = x;
        this.w = w;
    }
}

describe('OrthogonalPolynomial Tests', () => {
    test('lanczos basic', () => {
        const x = [0.0, 0.5, 1.0];
        const w = [0.333, 0.333, 0.334];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 2;
        const { alpha, beta, gamma } = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
    });


    test('lanczos weights nonuniform', () => {
        const x = [0.0, 0.5, 1.0];
        const w = [0.1, 0.4, 0.5];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 3;
        const { alpha, beta, gamma } = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(g => g > 0)).toBe(true);
    });

    test('lanczos single node', () => {
        const x = [0.5];
        const w = [1.0];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 1;
        const { alpha, beta, gamma } = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(g => g >= 0)).toBe(true);
    });

        test('lanczos with n = 0 should handle gracefully', () => {
        const x = [0.0, 0.5, 1.0];
        const w = [0.333, 0.333, 0.334];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 0;
        const result = lanczos(n, quadratureRule);
        expect(result.alpha.length).toBe(0);
        expect(result.beta.length).toBe(0);
        expect(result.gamma.length).toBe(0);
    });

    test('lanczos with duplicate nodes and positive weights', () => {
        const x = [0.0, 0.0, 1.0];
        const w = [0.25, 0.25, 0.5];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 2;
        const { alpha, beta, gamma } = lanczos(n, quadratureRule);
        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(g => g >= 0)).toBe(true);
    });

    test('lanczos large n with sufficient nodes', () => {
        const x = [-1, -0.5, 0, 0.5, 1];
        const w = [0.2, 0.2, 0.2, 0.2, 0.2];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 5;
        const { alpha, beta, gamma } = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(g => g >= 0)).toBe(true);
    });
});
