const debug = require('debug')('turing:step');
debug.enabled = true; // Enable debug logging

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
function listEsStepPrime(tr, x) {
    debug(`Current config: left=${JSON.stringify(x.l)}, right=${JSON.stringify(x.r)}, current symbol=${x.m}, state=${x.s}`);
    debug(`Transition rule: next state=${tr.nxt}, direction=${tr.dir}, write symbol=${tr.out}`);

    const l0 = x.l;
    const r0 = x.r;
    const m0 = x.m;
    const s0 = x.s;
    const s1 = tr.nxt;
    const d = tr.dir;
    const o = tr.out;
    let newConfig;

    if (d > 0) { // Move right
        if (r0.length > 0) {
            const m1 = r0[0];
            const r1 = r0.slice(1);
            newConfig = new ListES([o, ...l0], r1, m1, s1);
        } else {
            newConfig = new ListES([o, ...l0], [], Σ0, s1);
        }
    } else if (d < 0) { // Move left
        if (l0.length > 0) {
            const m1 = l0[0];
            const l1 = l0.slice(1);
            newConfig = new ListES(l1, [o, ...r0], m1, s1);
        } else {
            newConfig = new ListES([], [o, ...r0], Σ0, s1);
        }
    } else {
        newConfig = new ListES(l0, r0, o, s1);
    }

    debug(`New config: left=${JSON.stringify(newConfig.l)}, right=${JSON.stringify(newConfig.r)}, current symbol=${newConfig.m}, state=${newConfig.s}\n`);
    return newConfig;
}