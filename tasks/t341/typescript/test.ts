import * as assert from 'assert';
import * as fsTest from 'fs';
import * as os from 'os';
import * as path from 'path';

function vlq(value: number): Buffer {
    const bytes = [value & 0x7f];
    value >>= 7;
    while (value > 0) {
        bytes.unshift((value & 0x7f) | 0x80);
        value >>= 7;
    }
    return Buffer.from(bytes);
}

function midiEvent(delta: number, bytes: number[]): Buffer {
    return Buffer.concat([vlq(delta), Buffer.from(bytes)]);
}

function metaEvent(delta: number, type: number, data: number[]): Buffer {
    const body = Buffer.from(data);
    return Buffer.concat([vlq(delta), Buffer.from([0xff, type]), vlq(body.length), body]);
}

function writeMidi(tracks: Buffer[][]): string {
    const header = Buffer.alloc(14);
    header.write('MThd', 0, 'ascii');
    header.writeUInt32BE(6, 4);
    header.writeUInt16BE(tracks.length > 1 ? 1 : 0, 8);
    header.writeUInt16BE(tracks.length, 10);
    header.writeUInt16BE(480, 12);

    const chunks = tracks.map((events) => {
        const data = Buffer.concat([...events, metaEvent(0, 0x2f, [])]);
        const chunk = Buffer.alloc(8);
        chunk.write('MTrk', 0, 'ascii');
        chunk.writeUInt32BE(data.length, 4);
        return Buffer.concat([chunk, data]);
    });

    const file = path.join(os.tmpdir(), `t341-${process.pid}-${Math.random()}.mid`);
    fsTest.writeFileSync(file, Buffer.concat([header, ...chunks]));
    return file;
}

function closeTo(actual: number, expected: number, delta: number): void {
    assert.ok(Math.abs(actual - expected) <= delta, `${actual} not within ${delta} of ${expected}`);
}

function cleanup(files: string[]): void {
    for (const file of files) {
        if (fsTest.existsSync(file)) {
            fsTest.unlinkSync(file);
        }
    }
}

test('parseMidiFile reads a basic note with tempo', () => {
    const files: string[] = [];
    try {
        const basic = writeMidi([[
            metaEvent(0, 0x51, [0x07, 0xa1, 0x20]),
            midiEvent(0, [0x90, 69, 64]),
            midiEvent(480, [0x80, 69, 64]),
        ]]);
        files.push(basic);

        const result = parseMidiFile(basic);
        assert.strictEqual(result.length, 1);
        assert.strictEqual(result[0].length, 1);
        closeTo(result[0][0][0], 440, 0.1);
        closeTo(result[0][0][1], 500, 10);
    } finally {
        cleanup(files);
    }
});

test('parseMidiFile can include or suppress silence', () => {
    const files: string[] = [];
    try {
        const silence = writeMidi([[
            midiEvent(240, [0x90, 60, 64]),
            midiEvent(480, [0x80, 60, 64]),
        ]]);
        files.push(silence);
        const withSilence = parseMidiFile(silence);
        assert.strictEqual(withSilence[0].length, 2);
        assert.strictEqual(withSilence[0][0][0], 0);
        assert.strictEqual(parseMidiFile(silence, false)[0].length, 1);
    } finally {
        cleanup(files);
    }
});

test('parseMidiFile can include MIDI note numbers', () => {
    const files: string[] = [];
    try {
        const basic = writeMidi([[
            metaEvent(0, 0x51, [0x07, 0xa1, 0x20]),
            midiEvent(0, [0x90, 69, 64]),
            midiEvent(480, [0x80, 69, 64]),
        ]]);
        files.push(basic);
        assert.strictEqual(parseMidiFile(basic)[0][0].length, 2);
        const withNumbers = parseMidiFile(basic, true, true);
        assert.strictEqual(withNumbers[0][0].length, 3);
        assert.strictEqual(withNumbers[0][0][2], 69);
    } finally {
        cleanup(files);
    }
});

test('parseMidiFile keeps separate tracks', () => {
    const files: string[] = [];
    try {
        const multi = writeMidi([
            [midiEvent(0, [0x90, 60, 64]), midiEvent(480, [0x80, 60, 64])],
            [midiEvent(0, [0x90, 64, 64]), midiEvent(480, [0x80, 64, 64])],
        ]);
        files.push(multi);
        const multiResult = parseMidiFile(multi);
        assert.strictEqual(multiResult.length, 2);
        assert.strictEqual(multiResult[0].length, 1);
        assert.strictEqual(multiResult[1].length, 1);
    } finally {
        cleanup(files);
    }
});

test('parseMidiFile reports missing and invalid files', () => {
    const files: string[] = [];
    try {
        assert.throws(() => parseMidiFile('nonexistent_file.mid'), /MIDI file not found/);
        const invalid = path.join(os.tmpdir(), `t341-invalid-${process.pid}-${Math.random()}.mid`);
        fsTest.writeFileSync(invalid, Buffer.from('Not a MIDI file'));
        files.push(invalid);
        assert.throws(() => parseMidiFile(invalid), /Invalid MIDI file/);
    } finally {
        cleanup(files);
    }
});
