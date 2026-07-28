def midi_to_freq(midi_note):
    return 440 * (2 ** ((midi_note - 69) / 12))


def _read_var_len(data, offset, end):
    value = 0
    while True:
        if offset >= end:
            raise RuntimeError("Invalid MIDI file")
        byte = data[offset]
        offset += 1
        value = (value << 7) | (byte & 0x7f)
        if byte < 0x80:
            return value, offset


def _ticks_to_ms(ticks, ticks_per_beat, microseconds_per_beat):
    return ticks * microseconds_per_beat / (ticks_per_beat * 1000)


def parse_midi_file(
        midi_file_path,
        include_silence=True,
        include_note_number=False,
        default_tempo=120
):
    try:
        with open(midi_file_path, "rb") as f:
            data = f.read()
    except FileNotFoundError:
        raise FileNotFoundError(f"MIDI file not found: {midi_file_path}")
    except OSError as e:
        raise RuntimeError(f"Error reading file: {e}")

    if len(data) < 14 or data[:4] != b"MThd":
        raise RuntimeError("Invalid MIDI file")

    header_length = int.from_bytes(data[4:8], "big")
    track_count = int.from_bytes(data[10:12], "big")
    ticks_per_beat = int.from_bytes(data[12:14], "big")
    if ticks_per_beat & 0x8000:
        raise RuntimeError("SMPTE time division is not supported")

    offset = 8 + header_length
    note_tracks = [[] for _ in range(track_count)]

    for track_idx in range(track_count):
        if offset + 8 > len(data) or data[offset:offset + 4] != b"MTrk":
            raise RuntimeError("Invalid MIDI track")

        track_end = offset + 8 + int.from_bytes(data[offset + 4:offset + 8], "big")
        if track_end > len(data):
            raise RuntimeError("Invalid MIDI track")
        offset += 8

        tempo = 60000000 / default_tempo
        current_tick = 0
        previous_tick = 0
        running_status = None
        active = {}

        while offset < track_end:
            delta, offset = _read_var_len(data, offset, track_end)
            current_tick += delta
            if offset >= track_end:
                raise RuntimeError("Invalid MIDI event")

            status = data[offset]
            offset += 1
            if status < 0x80:
                if running_status is None:
                    raise RuntimeError("Invalid MIDI running status")
                offset -= 1
                status = running_status
            elif status < 0xf0:
                running_status = status

            if status == 0xff:
                if offset >= track_end:
                    raise RuntimeError("Invalid MIDI meta event")
                meta_type = data[offset]
                offset += 1
                length, offset = _read_var_len(data, offset, track_end)
                if offset + length > track_end:
                    raise RuntimeError("Invalid MIDI meta event")
                if meta_type == 0x51 and length >= 3:
                    tempo = int.from_bytes(data[offset:offset + 3], "big")
                offset += length
                if meta_type == 0x2f:
                    break
                continue

            if status in (0xf0, 0xf7):
                length, offset = _read_var_len(data, offset, track_end)
                if offset + length > track_end:
                    raise RuntimeError("Invalid MIDI sysex event")
                offset += length
                running_status = None
                continue

            command = status & 0xf0
            channel = status & 0x0f
            if offset >= track_end:
                raise RuntimeError("Invalid MIDI channel event")
            note_number = data[offset]
            offset += 1
            if command in (0xc0, 0xd0):
                velocity = 0
            else:
                if offset >= track_end:
                    raise RuntimeError("Invalid MIDI channel event")
                velocity = data[offset]
                offset += 1

            key = (channel, note_number)
            if command == 0x90 and velocity > 0:
                active[key] = current_tick
            elif command == 0x80 or (command == 0x90 and velocity == 0):
                if key not in active:
                    continue
                start_tick = active.pop(key)
                if include_silence and start_tick > previous_tick:
                    note_tracks[track_idx].append(
                        (0, _ticks_to_ms(start_tick - previous_tick, ticks_per_beat, tempo))
                    )

                note = (
                    midi_to_freq(note_number),
                    _ticks_to_ms(current_tick - start_tick, ticks_per_beat, tempo),
                )
                if include_note_number:
                    note = (*note, note_number)
                note_tracks[track_idx].append(note)
                previous_tick = current_tick

        offset = track_end

    return note_tracks
