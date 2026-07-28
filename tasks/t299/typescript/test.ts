describe('checkXorConstraints', () => {
  test('exact match single row', () => {
    const data = [[0x10, 0x20, 0x08, 0x30, 0x40, 0x1a, 0x4b, 0x16]];
    const xorGroups = [[0, 3, 6], [1, 4, 7], [2, 5]];
    const targetValues = [0x6b, 0x76, 0x12];

    const result = checkXorConstraints(data, xorGroups, targetValues);
    expect(result).toEqual([true]);
  });

  test('no match single row', () => {
    const data = [[0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]];
    const xorGroups = [[0, 3, 6], [1, 4, 7], [2, 5]];
    const targetValues = [0x6b, 0x76, 0x12];

    const result = checkXorConstraints(data, xorGroups, targetValues);
    expect(result).toEqual([false]);
  });

  test('multiple rows mixed results', () => {
    const data = [
      [0x10, 0x20, 0x08, 0x30, 0x40, 0x1a, 0x4b, 0x36],
      [0x10, 0x20, 0x08, 0x30, 0x40, 0x1a, 0x4b, 0x00],
      [0xff, 0xff, 0x12, 0xff, 0xff, 0x00, 0xff, 0xff],
    ];
    const xorGroups = [[0, 3, 6], [1, 4, 7], [2, 5]];
    const targetValues = [0x6b, 0x76, 0x12];

    const result = checkXorConstraints(data, xorGroups, targetValues);
    const expected = [false, false, false];
    expect(result).toEqual(expected);
  });

  test('empty group skipped', () => {
    const data = [[1, 2, 3], [4, 5, 6]];
    const xorGroups = [[0, 1], [], [2]];
    const targetValues = [3, 0xdead, 3];

    const result = checkXorConstraints(data, xorGroups, targetValues);
    const expected = [true, false];
    expect(result).toEqual(expected);
  });

  test('single column group', () => {
    const data = [[10, 40], [30, 40]];
    const xorGroups = [[0], [1]];
    const targetValues = [10, 40];

    const result = checkXorConstraints(data, xorGroups, targetValues);
    const expected = [true, false];
    expect(result).toEqual(expected);
  });
});