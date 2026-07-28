import * as fs from 'fs';

type NoteInfo = [number, number] | [number, number, number];

function midiToFreq(midiNote: number): number {
    return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function readVarLen(buffer: Buffer, offset: number): [number, number] {
    let value = 0;
    let byte: number;
    do {
        if (offset >= buffer.length) {
            throw new Error('Invalid MIDI file');
        }
        byte = buffer[offset++];
        value = (value << 7) | (byte & 0x7f);
    } while (byte & 0x80);
    return [value, offset];
}

function ticksToMs(ticks: number, ticksPerBeat: number, microsecondsPerBeat: number): number {
    return ticks * microsecondsPerBeat / (ticksPerBeat * 1000);
}

function parseMidiFile(
    midiFilePath: string,
    includeSilence: boolean = true,
    includeNoteNumber: boolean = false,
    defaultTempo: number = 120
): NoteInfo[][] {
    let buffer: Buffer;
    try {
        buffer = fs.readFileSync(midiFilePath);
    } catch (err) {
        if ((err as NodeJS.ErrnoException).code === 'ENOENT') {
            throw new Error(`MIDI file not found: ${midiFilePath}`);
        }
        throw err;
    }

    if (buffer.length < 14 || buffer.toString('ascii', 0, 4) !== 'MThd') {
        throw new Error('Invalid MIDI file');
    }

    const headerLength = buffer.readUInt32BE(4);
    const trackCount = buffer.readUInt16BE(10);
    const ticksPerBeat = buffer.readUInt16BE(12);
    if ((ticksPerBeat & 0x8000) !== 0) {
        throw new Error('SMPTE time division is not supported');
    }

    let offset = 8 + headerLength;
    const noteTracks: NoteInfo[][] = Array.from({ length: trackCount }, () => []);

    for (let trackIdx = 0; trackIdx < trackCount && offset + 8 <= buffer.length; trackIdx++) {
        if (buffer.toString('ascii', offset, offset + 4) !== 'MTrk') {
            throw new Error('Invalid MIDI track');
        }

        const trackEnd = offset + 8 + buffer.readUInt32BE(offset + 4);
        offset += 8;

        let tempo = 60000000 / defaultTempo;
        let currentTick = 0;
        let previousTick = 0;
        let runningStatus: number | null = null;
        const active = new Map<string, number>();

        while (offset < trackEnd) {
            let delta: number;
            [delta, offset] = readVarLen(buffer, offset);
            currentTick += delta;

            let status = buffer[offset++];
            if (status < 0x80) {
                if (runningStatus === null) {
                    throw new Error('Invalid MIDI running status');
                }
                offset--;
                status = runningStatus;
            } else if (status < 0xf0) {
                runningStatus = status;
            }

            if (status === 0xff) {
                const metaType = buffer[offset++];
                let length: number;
                [length, offset] = readVarLen(buffer, offset);
                if (metaType === 0x51 && length >= 3) {
                    tempo = buffer.readUIntBE(offset, 3);
                }
                offset += length;
                if (metaType === 0x2f) {
                    break;
                }
                continue;
            }

            if (status === 0xf0 || status === 0xf7) {
                let length: number;
                [length, offset] = readVarLen(buffer, offset);
                offset += length;
                runningStatus = null;
                continue;
            }

            const command = status & 0xf0;
            const channel = status & 0x0f;
            const first = buffer[offset++];
            const second = command === 0xc0 || command === 0xd0 ? 0 : buffer[offset++];

            if (command === 0x90 && second > 0) {
                active.set(`${channel}:${first}`, currentTick);
            } else if (command === 0x80 || (command === 0x90 && second === 0)) {
                const key = `${channel}:${first}`;
                const startTick = active.get(key);
                if (startTick === undefined) {
                    continue;
                }

                if (includeSilence && startTick > previousTick) {
                    noteTracks[trackIdx].push([0, ticksToMs(startTick - previousTick, ticksPerBeat, tempo)]);
                }

                const note: NoteInfo = includeNoteNumber
                    ? [midiToFreq(first), ticksToMs(currentTick - startTick, ticksPerBeat, tempo), first]
                    : [midiToFreq(first), ticksToMs(currentTick - startTick, ticksPerBeat, tempo)];
                noteTracks[trackIdx].push(note);
                active.delete(key);
                previousTick = currentTick;
            }
        }

        offset = trackEnd;
    }

    return noteTracks;
}
