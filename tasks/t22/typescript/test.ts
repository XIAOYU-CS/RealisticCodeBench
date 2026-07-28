class QuadratureRule {
    x: number[];
    w: number[];

    constructor(x: number[], w: number[]) {
        this.x = x;
        this.w = w;
    }
}
describe('OrthogonalPolynomial', () => {

    test('test_lanczos_basic', () => {
        const x = [0.0, 0.5, 1.0];
        const w = [0.333, 0.333, 0.334];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 2;
        const [alpha, beta, gamma] = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
    });


    test('test_lanczos_weights_nonuniform', () => {
        const x = [0.0, 0.5, 1.0];
        const w = [0.1, 0.4, 0.5];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 3;
        const [alpha, beta, gamma] = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(value => value > 0)).toBe(true);
    });

    test('test_lanczos_single_node', () => {
        const x = [0.5];
        const w = [1.0];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 1;
        const [alpha, beta, gamma] = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(value => value >= 0)).toBe(true);
    });


        test('test_lanczos_duplicate_nodes_valid_n', () => {
        const x = [0.0, 0.0, 1.0]; // duplicate node
        const w = [0.25, 0.25, 0.5];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 2;

        const [alpha, beta, gamma] = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(value => value >= 0)).toBe(true);
    });

    test('test_lanczos_max_n_equals_node_count', () => {
        const x = [-1, -0.5, 0, 0.5, 1];
        const w = [0.2, 0.2, 0.2, 0.2, 0.2];
        const quadratureRule = new QuadratureRule(x, w);
        const n = x.length;

        const [alpha, beta, gamma] = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(value => value > 0)).toBe(true);
    });

    test('test_lanczos_small_positive_weights', () => {
        const x = [0.0, 1.0, 2.0];
        const w = [1e-8, 0.99999999, 1e-8];
        const quadratureRule = new QuadratureRule(x, w);
        const n = 3;

        const [alpha, beta, gamma] = lanczos(n, quadratureRule);

        expect(alpha.length).toBe(n);
        expect(beta.length).toBe(n - 1);
        expect(gamma.length).toBe(n);
        expect(gamma.every(value => value >= 0)).toBe(true);
        expect(gamma.some(value => value > 1e-12)).toBe(true);
    });
});
