/**
 * Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.
 *
 * @param {Array<Array<string>>} board - N×N array of arrays, with elements being player marks (e.g. 'X', 'O') or empty ('')
 * @param {number} [required] - Number of consecutive marks needed to win (default: n)
 * @param {number} [n] - Board size (default: inferred from board)
 * @returns {Array} Returns one of the following:
 *   - {Array} [winner, win_type, win_position] - If there's a winner
 *     - winner {string} - The winning player mark (e.g. 'X', 'O')
 *     - win_type {string} - Type of win: 'row', 'column', 'diagonal', or 'anti-diagonal'
 *     - win_position {number|Array<number, number>} - Win position (row/column index or [start_row, start_col] for diagonals)
 *   - {Array} ['draw', null, null] - If game is a draw
 *   - {Array} [null, null, null] - If game is ongoing
 */
function checkWinnerGeneral(board, required = null, n = null) {}