describe('checkWinnerGeneral', () => {
  test('3x3 row winner', () => {
    const board = [
      ['X', 'X', 'X'],
      ['O', '', ''],
      ['', 'O', '']
    ];
    expect(checkWinnerGeneral(board)).toEqual(['X', 'row', 0]);
  });

  test('4x4 column winner with custom required', () => {
    const board = [
      ['X', 'O', '', ''],
      ['X', 'O', '', ''],
      ['X', 'O', '', ''],
      ['', '', '', '']
    ];
    expect(checkWinnerGeneral(board, 3, 4)).toEqual(['X', 'column', 0]);
  });

  test('5x5 main diagonal winner with custom required', () => {
    const board = [
      ['X', '', '', '', ''],
      ['', 'X', '', '', ''],
      ['', '', 'X', '', ''],
      ['', '', '', 'X', ''],
      ['', '', '', '', 'O']
    ];
    expect(checkWinnerGeneral(board, 4, 5)).toEqual(['X', 'diag_main', [0, 0]]);
  });

  test('6x6 anti diagonal winner partial win', () => {
    const board = [
      ['', '', '', '', 'O', ''],
      ['', '', '', 'O', '', ''],
      ['', '', 'O', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', ''],
      ['', '', '', '', '', '']
    ];
    expect(checkWinnerGeneral(board, 3, 6)).toEqual(['O', 'diag_secondary', [0, 4]]);
  });

  test('large board no winner in progress', () => {
    const board = [
      ['X', 'O', 'X', 'O', ''],
      ['O', 'X', 'O', '', ''],
      ['X', 'O', '', '', ''],
      ['O', '', '', '', ''],
      ['', '', '', '', '']
    ];
    expect(checkWinnerGeneral(board, null, 5)).toEqual([null, null, null]);
  });

  test('4x4 draw custom required', () => {
    const board = [
      ['X', 'O', 'X', 'O'],
      ['O', 'X', 'O', 'X'],
      ['O', 'X', 'O', 'X'],
      ['X', 'O', 'X', 'O']
    ];
    expect(checkWinnerGeneral(board, 3, 4)).toEqual(['draw', null, null]);
  });

  test('5x5 middle row winner', () => {
    const board = [
      ['', '', '', '', ''],
      ['O', 'O', '', '', ''],
      ['X', 'X', 'X', 'X', 'X'],
      ['', '', 'O', '', ''],
      ['', '', '', '', '']
    ];
    expect(checkWinnerGeneral(board, null, 5)).toEqual(['X', 'row', 2]);
  });

  test('column winner', () => {
    const board = [
      ['X', 'O', ''],
      ['X', 'O', ''],
      ['X', '', 'O']
    ];
    expect(checkWinnerGeneral(board)).toEqual(['X', 'column', 0]);
  });

  test('main diagonal winner', () => {
    const board = [
      ['X', '', ''],
      ['', 'X', ''],
      ['', '', 'X']
    ];
    expect(checkWinnerGeneral(board)).toEqual(['X', 'diag_main', [0, 0]]);
  });

  test('anti diagonal winner', () => {
    const board = [
      ['', '', 'O'],
      ['', 'O', ''],
      ['O', '', '']
    ];
    expect(checkWinnerGeneral(board)).toEqual(['O', 'diag_secondary', [0, 2]]);
  });

  test('draw game', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'O', 'X'],
      ['O', 'X', 'O']
    ];
    expect(checkWinnerGeneral(board)).toEqual(['draw', null, null]);
  });
});