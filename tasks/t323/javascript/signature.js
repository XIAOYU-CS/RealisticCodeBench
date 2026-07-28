/**
 * @typedef {number} Σ - Tape symbol type
 * @typedef {number} St - State type
 * @typedef {number} Dir - Movement direction type (-1: left, 1: right, 0: no movement)
 */

const Σ0 = 0;

/**
 * Turing machine transition rule class
 */
class Trans {
    /**
     * @param {St} nxt - Next state
     * @param {Dir} dir - Movement direction
     * @param {Σ} out - Output symbol
     */
    constructor(nxt, dir, out) {
        this.nxt = nxt;
        this.dir = dir;
        this.out = out;
    }
}

/**
 * Turing machine configuration class
 */
class ListES {
    /**
     * @param {Σ[]} l - Left tape
     * @param {Σ[]} r - Right tape
     * @param {Σ} m - Current symbol
     * @param {St} s - Current state
     */
    constructor(l, r, m, s) {
        this.l = l;
        this.r = r;
        this.m = m;
        this.s = s;
    }

    /**
     * Used in tests to compare if objects are equal
     * @param {ListES} other - Another ListES instance to compare with
     * @returns {boolean} Whether they are equal
     */
    equals(other) {
        return (
            JSON.stringify(this.l) === JSON.stringify(other.l) &&
            JSON.stringify(this.r) === JSON.stringify(other.r) &&
            this.m === other.m &&
            this.s === other.s
        );
    }
}
/**
 * Executes a single step of the Turing machine, updates configuration according to
 * transition rules and outputs logs
 * @param {Trans} tr - Transition rule
 * @param {ListES} x - Current configuration
 * @returns {ListES} New configuration
 */
function listEsStepPrime(tr, x) {}