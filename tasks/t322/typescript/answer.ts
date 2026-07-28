/**
 * Enhanced batch breakpoint setup function with parameter configuration and error handling.
 *
 * Reads a series of addresses from a starting memory location and sets breakpoints at those addresses.
 * Supports configurable parameters and detailed error logging for memory access and breakpoint creation failures.
 */

declare namespace gdb {
    class GdbError extends Error {}
    function parse_and_eval(expr: string): bigint;
    function execute(command: string, to_string: boolean): string;
}

interface BatchBreakpointResult {
    success: Array<[string, number]>;  // [targetAddress, breakpointNumber]
    failed: Array<[string, string]>;   // [memoryAddress, errorReason]
}

class GdbBatchBreakpoint {
    /**
     * Main function for batch breakpoint setting
     * @param arg Command line arguments in format: "start_address [count=53] [step=8]"
     * @param fromTty Whether the command was invoked from TTY
     * @returns Result object containing successful and failed operations
     */
    invoke(arg: string, fromTty: boolean): BatchBreakpointResult {
        const args = this.parseArguments(arg);

        const { startAddr, count, step } = this.validateParameters(args);

        const xFormat = step === 4 ? 'w' : 'g';
        const xCmd = `x/${xFormat}x`;

        const results: BatchBreakpointResult = {
            success: [],
            failed: []
        };

        for (let i = 0; i < count * step; i += step) {
            const currentAddr = startAddr + BigInt(i);
            try {
                const memResult = gdb.execute(`${xCmd} ${this.toHexString(currentAddr)}`, true);
                if (!memResult.includes(':')) {
                    throw new Error(`Unexpected memory output format: ${memResult}`);
                }

                const targetHex = memResult.split(':')[1].trim().split(/\s+/)[0];
                const targetAddr = this.parseHexString(targetHex);

                const breakResult = gdb.execute(`break *${this.toHexString(targetAddr)}`, true);
                if (!breakResult.includes('Breakpoint')) {
                    throw new Error(`Breakpoint command failed: ${breakResult}`);
                }

                const bpNum = parseInt(breakResult.split(' ')[1].replace(':', ''), 10);
                if (isNaN(bpNum)) {
                    throw new Error(`Failed to parse breakpoint number from: ${breakResult}`);
                }

                results.success.push([this.toHexString(targetAddr), bpNum]);

            } catch (e) {
                const errorMsg = e instanceof Error ? e.message : String(e);
                results.failed.push([this.toHexString(currentAddr), errorMsg]);
            }
        }

        this.printSummary(results);

        return results;
    }

    private parseArguments(arg: string): string[] {
        const args = arg.match(/"[^"]*"|\S+/g)?.map(s => s.replace(/"/g, '')) || [];

        if (args.length < 1) {
            throw new gdb.GdbError("Invalid arguments: Requires start_address [count] [step]");
        }

        return args;
    }

    private validateParameters(args: string[]): { startAddr: bigint; count: number; step: number } {
        try {
            const startAddr = gdb.parse_and_eval(args[0]);

            const count = args.length > 1 ? parseInt(args[1], 10) : 53;
            if (isNaN(count) || count <= 0) {
                throw new Error(`Invalid count value: ${args[1]}`);
            }

            const step = args.length > 2 ? parseInt(args[2], 10) : 8;
            if (isNaN(step) || !([4, 8].includes(step))) {
                throw new Error(`Unsupported step size ${step}. Use 4 (32-bit) or 8 (64-bit)`);
            }

            return { startAddr, count, step };
        } catch (e) {
            const errorMsg = e instanceof Error ? e.message : String(e);
            throw new gdb.GdbError(`Failed to parse arguments: ${errorMsg}`);
        }
    }

    private toHexString(num: bigint | number): string {
        return `0x${num.toString(16)}`;
    }

    private parseHexString(hexString: string): bigint {
        try {
            return BigInt(hexString);
        } catch (e) {
            throw new Error(`Invalid hexadecimal value: ${hexString}`);
        }
    }

    private printSummary(results: BatchBreakpointResult): void {
        console.log('\nBatch breakpoint summary:');
        console.log(`  Successful: ${results.success.length} breakpoints`);
        results.success.forEach(([addr, bpNum]) => {
            console.log(`    Breakpoint #${bpNum} at ${addr}`);
        });

        if (results.failed.length > 0) {
            console.log(`  Failed: ${results.failed.length} operations`);
            results.failed.forEach(([addr, err]) => {
                console.log(`    Address ${addr}: ${err}`);
            });
        }
    }
}
