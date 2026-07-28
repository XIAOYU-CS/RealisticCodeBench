import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

describe('readBinaryFrames', () => {
    let filePath: string;

    beforeEach(() => {
        filePath = path.join(os.tmpdir(), `test_${Date.now()}.bin`);
    });

    afterEach(() => {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });

    test('should read integer frames correctly', () => {
        const buf = Buffer.alloc(24);
        buf.writeUInt32LE(10, 0);
        buf.writeUInt32LE(20, 4);
        buf.writeUInt32LE(30, 8);
        buf.writeUInt32LE(40, 12);
        buf.writeUInt32LE(50, 16);
        buf.writeUInt32LE(60, 20);
        fs.writeFileSync(filePath, buf);

        const frames = readBinaryFrames(filePath, [2, '<I']);
        expect(frames).toEqual([
            [10, 20],
            [30, 40],
            [50, 60]
        ]);
    });

    test('should read float frames with big-endian format', () => {
        const buf = Buffer.alloc(24);
        buf.writeFloatBE(1.1, 0);
        buf.writeFloatBE(2.2, 4);
        buf.writeFloatBE(3.3, 8);
        buf.writeFloatBE(4.4, 12);
        buf.writeFloatBE(5.5, 16);
        buf.writeFloatBE(6.6, 20);
        fs.writeFileSync(filePath, buf);

        const frames = readBinaryFrames(filePath, [3, '>f']);
        expect(frames.length).toBe(2);
        expect(frames[0][0]).toBeCloseTo(1.1, 5);
        expect(frames[1][2]).toBeCloseTo(6.6, 5);
    });

    test('should handle incomplete frames properly', () => {
        const buf = Buffer.alloc(12);
        buf.writeFloatLE(1.0, 0);
        buf.writeFloatLE(2.0, 4);
        buf.writeFloatLE(3.0, 8);
        fs.writeFileSync(filePath, buf);

        const frames = readBinaryFrames(filePath, [2, '<f'], false);
        expect(frames.length).toBe(1);
        expect(frames[0]).toEqual([1.0, 2.0]);
    });

    test('should throw error for negative elements per frame', () => {
        expect(() => readBinaryFrames(filePath, [-1, '<I'])).toThrow();
    });

    test('should throw error for invalid data format', () => {
        expect(() => readBinaryFrames(filePath, [2, 'invalid'])).toThrow();
    });

    test('should throw error when file not found', () => {
        expect(() => readBinaryFrames(filePath, [2, '<I'])).toThrow();
    });
});