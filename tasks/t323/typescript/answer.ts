import debug from 'debug';

type Σ = number;  // Tape symbol type
type St = number; // State type
type Dir = number; // Direction type (-1: left, 1: right, 0: no movement)

export const Σ0: Σ = 0; // Default symbol for empty tape cells
const log = debug('turing:step');

export class Trans {
    constructor(
        public nxt: St,    // Next state
        public dir: Dir,   // Movement direction
        public out: Σ      // Output symbol
    ) {}
}

export class ListES {
    constructor(
        public l: Σ[],     // Left tape
        public r: Σ[],     // Right tape
        public m: Σ,       // Current symbol
        public s: St       // Current state
    ) {}

    /**
     * Compares two ListES instances for equality
     * @param other The ListES instance to compare with
     * @returns True if all properties are equal, false otherwise
     */
    equals(other: ListES): boolean {
        return (
            this.s === other.s &&
            this.m === other.m &&
            arraysEqual(this.l, other.l) &&
            arraysEqual(this.r, other.r)
        );
    }
}

/**
 * Helper function to check array equality
 */
function arraysEqual(a: Σ[], b: Σ[]): boolean {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

/**
 * Executes a single step of the Turing machine, updating the configuration
 * according to transition rules and outputting logs.
 *
 * @param tr Transition rule to apply
 * @param x Current machine configuration
 * @returns New machine configuration after applying the transition
 */
function listESStepPrime(tr: Trans, x: ListES): ListES {
    log(`Current config: left=${x.l}, right=${x.r}, current symbol=${x.m}, state=${x.s}`);
    log(`Transition rule: next state=${tr.nxt}, direction=${tr.dir}, write symbol=${tr.out}`);

    const { l: l0, r: r0, m: m0, s: s0 } = x;
    const { nxt: s1, dir: d, out: o } = tr;
    let newConfig: ListES;

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
    } else { // No movement
        newConfig = new ListES(l0, r0, o, s1);
    }

    log(`New config: left=${newConfig.l}, right=${newConfig.r}, current symbol=${newConfig.m}, state=${newConfig.s}\n`);
    return newConfig;
}