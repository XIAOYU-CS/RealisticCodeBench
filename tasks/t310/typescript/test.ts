describe('classifyMemoryMapping', () => {
    test('heap mapping', () => {
        const maps_line = "55c12b4d6000-55c12b4f7000 rw-p 00000000 00:00 0 [heap]";
        const result = classifyMemoryMapping(maps_line);
        expect(result).toEqual({type: 'heap'});
    });

    test('stack mapping', () => {
        const maps_line = "7fff5c1a2000-7fff5c1c3000 rw-p 00000000 00:00 0 [stack]";
        const result = classifyMemoryMapping(maps_line);
        expect(result).toEqual({type: 'stack'});
    });

    test('vdso mapping', () => {
        const maps_line = "7fff5c1c3000-7fff5c1c5000 r-xp 00000000 00:00 0 [vdso]";
        const result = classifyMemoryMapping(maps_line);
        expect(result).toEqual({type: 'vdso'});
    });

    test('file backed mapping', () => {
        const maps_line = "7f8b8c000000-7f8b8c021000 r--p 00000000 08:01 123456 /lib/x86_64-linux-gnu/libc.so.6";
        const result = classifyMemoryMapping(maps_line);
        expect(result).toEqual({type: 'file'});
    });

    test('device mapping', () => {
        const maps_line = "7f8b8c021000-7f8b8c022000 rw-p 00000000 08:01 789012 /dev/zero";
        const result = classifyMemoryMapping(maps_line);
        expect(result).toEqual({type: 'device'});
    });

    test('anonymous mapping', () => {
        const maps_line = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0";
        const result = classifyMemoryMapping(maps_line);
        expect(result).toEqual({type: 'anonymous'});
    });

    test('unknown mapping', () => {
        const maps_line = "55c12b4d5000-55c12b4d6000 rw-p 00000000 00:00 0 special_mapping";
        const result = classifyMemoryMapping(maps_line);
        expect(result).toEqual({type: 'unknown'});
    });
});