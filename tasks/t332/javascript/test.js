function setSeed(seed) {
    Math.random = (() => {
        let x = seed;
        return () => {
            x = Math.sin(x) * 10000;
            return x - Math.floor(x);
        };
    })();
}

describe('computeQKV', () => {
    beforeEach(() => {
        setSeed(42);
    });

    test('basic computation', () => {
        const seqLen = 3, dModel = 4, dK = 2, dV = 2, nHeads = 2;

        const inputSeq = Array(seqLen).fill().map(() =>
            Array(dModel).fill().map(() => Math.random() * 2 - 1)
        );

        const W_Q = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random() * 0.1)
        );

        const W_K = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random() * 0.1)
        );

        const W_V = Array(dModel).fill().map(() =>
            Array(dV * nHeads).fill().map(() => Math.random() * 0.1)
        );

        const { Q, K, V } = computeQKV(inputSeq, W_Q, W_K, W_V, nHeads);
        expect(Q.length).toBe(seqLen);
        expect(Q[0].length).toBe(nHeads);
        expect(Q[0][0].length).toBe(dK);

        expect(K.length).toBe(seqLen);
        expect(K[0].length).toBe(nHeads);
        expect(K[0][0].length).toBe(dK);

        expect(V.length).toBe(seqLen);
        expect(V[0].length).toBe(nHeads);
        expect(V[0][0].length).toBe(dV);
        expect(typeof Q[0][0][0]).toBe('number');
        expect(typeof K[0][0][0]).toBe('number');
        expect(typeof V[0][0][0]).toBe('number');
    });

    test('single head', () => {
        setSeed(123);
        const seqLen = 2, dModel = 3, dK = 1, dV = 1, nHeads = 1;
        const inputSeq = [
            [1.0, 2.0, 3.0],
            [4.0, 5.0, 6.0]
        ];
        const W_Q = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random())
        );
        const W_K = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random())
        );
        const W_V = Array(dModel).fill().map(() =>
            Array(dV * nHeads).fill().map(() => Math.random())
        );
        const { Q, K, V } = computeQKV(inputSeq, W_Q, W_K, W_V, nHeads);
        expect(Q.length).toBe(seqLen);
        expect(Q[0].length).toBe(nHeads);
        expect(Q[0][0].length).toBe(dK);
        expect(K.length).toBe(seqLen);
        expect(K[0].length).toBe(nHeads);
        expect(K[0][0].length).toBe(dK);
        expect(V.length).toBe(seqLen);
        expect(V[0].length).toBe(nHeads);
        expect(V[0][0].length).toBe(dV);
    });

    test('large dimensions', () => {
        setSeed(456);

        const seqLen = 10, dModel = 128, dK = 64, dV = 64, nHeads = 8;

        const inputSeq = Array(seqLen).fill().map(() =>
            Array(dModel).fill().map(() => Math.random() * 2 - 1)
        );

        const W_Q = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random() * 0.1)
        );

        const W_K = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random() * 0.1)
        );

        const W_V = Array(dModel).fill().map(() =>
            Array(dV * nHeads).fill().map(() => Math.random() * 0.1)
        );

        const { Q, K, V } = computeQKV(inputSeq, W_Q, W_K, W_V, nHeads);
        expect(Q.length).toBe(seqLen);
        expect(Q[0].length).toBe(nHeads);
        expect(Q[0][0].length).toBe(dK);

        expect(K.length).toBe(seqLen);
        expect(K[0].length).toBe(nHeads);
        expect(K[0][0].length).toBe(dK);

        expect(V.length).toBe(seqLen);
        expect(V[0].length).toBe(nHeads);
        expect(V[0][0].length).toBe(dV);
        const checkFinite = (arr) => {
            if (Array.isArray(arr[0])) {
                return arr.every(checkFinite);
            } else {
                return arr.every(val => isFinite(val));
            }
        };

        expect(checkFinite(Q)).toBe(true);
        expect(checkFinite(K)).toBe(true);
        expect(checkFinite(V)).toBe(true);
    });

    test('zero input', () => {
        const seqLen = 4, dModel = 5, dK = 3, dV = 3, nHeads = 2;

        const inputSeq = Array(seqLen).fill().map(() => Array(dModel).fill(0));

        const W_Q = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random())
        );

        const W_K = Array(dModel).fill().map(() =>
            Array(dK * nHeads).fill().map(() => Math.random())
        );

        const W_V = Array(dModel).fill().map(() =>
            Array(dV * nHeads).fill().map(() => Math.random())
        );

        const { Q, K, V } = computeQKV(inputSeq, W_Q, W_K, W_V, nHeads);
        const isZeroArray = (arr) => {
            if (Array.isArray(arr[0])) {
                return arr.every(isZeroArray);
            } else {
                return arr.every(val => Math.abs(val) < 1e-10);
            }
        };

        expect(isZeroArray(Q)).toBe(true);
        expect(isZeroArray(K)).toBe(true);
        expect(isZeroArray(V)).toBe(true);
    });

    test('identity weights', () => {
        const seqLen = 2, dModel = 4, dK = 2, dV = 2, nHeads = 2;
        const inputSeq = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, 1.0, 0.0, 0.0]
        ];
        const W_Q = Array(dModel).fill().map(() => Array(dK * nHeads).fill(0));
        const W_K = Array(dModel).fill().map(() => Array(dK * nHeads).fill(0));
        const W_V = Array(dModel).fill().map(() => Array(dV * nHeads).fill(0));
        W_Q[0][0] = 1.0;
        W_Q[1][1] = 2.0;
        W_K[0][0] = 0.5;
        W_K[1][1] = 1.5;
        W_V[0][0] = 3.0;
        W_V[1][1] = 4.0;
        const { Q, K, V } = computeQKV(inputSeq, W_Q, W_K, W_V, nHeads);
        expect(Q[0][0][0]).toBeCloseTo(1.0);
        expect(Q[1][0][1]).toBeCloseTo(2.0);
        expect(K[0][0][0]).toBeCloseTo(0.5);
        expect(K[1][0][1]).toBeCloseTo(1.5);
        expect(V[0][0][0]).toBeCloseTo(3.0);
        expect(V[1][0][1]).toBeCloseTo(4.0);
    });
});