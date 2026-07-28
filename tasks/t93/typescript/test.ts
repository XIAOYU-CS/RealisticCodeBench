import fs from 'fs';
import os from 'os';
import path from 'path';

describe('TestCheckSequences', () => {
    const testFiles: string[] = [];

    function writeSequences(lines: string[]): string {
        const filename = path.join(os.tmpdir(), `t93-${process.pid}-${testFiles.length}.dat`);
        fs.writeFileSync(filename, lines.length ? `${lines.join('\n')}\n` : '');
        testFiles.push(filename);
        return filename;
    }

    function expectResults(lines: string[], expected: Record<string, boolean>): void {
        expect(checkSequences(writeSequences(lines))).toEqual(expected);
    }

    afterAll(() => {
        for (const filename of testFiles) {
            if (fs.existsSync(filename)) {
                fs.unlinkSync(filename);
            }
        }
    });

    it('classifies mixed arithmetic sequences', () => {
        expectResults([
            "2,4,6,8",
            "1,3,5,7",
            "10,20,30",
            "1,2,4,8",
            "5,10,15,20",
        ], {
            "2,4,6,8": true,
            "1,3,5,7": true,
            "10,20,30": true,
            "1,2,4,8": false,
            "5,10,15,20": true,
        });
    });

    it('treats two values as valid and one value as not valid', () => {
        expectResults(["42,99", "7"], {
            "42,99": true,
            "7": false,
        });
    });

    it('handles zero and negative differences', () => {
        expectResults(["4,4,4,4", "9,6,3,0,-3", "0,-1,-3"], {
            "4,4,4,4": true,
            "9,6,3,0,-3": true,
            "0,-1,-3": false,
        });
    });

    it('returns an empty object for an empty file', () => {
        expectResults([], {});
    });

    it('detects a late difference change', () => {
        expectResults(["3,6,9,12,16", "100,90,80,70,60"], {
            "3,6,9,12,16": false,
            "100,90,80,70,60": true,
        });
    });
});
