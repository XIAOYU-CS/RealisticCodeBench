/**
 * Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.
 *
 * @param board - N×N array of arrays, with elements being player marks (e.g. 'X', 'O') or empty ('')
 * @param required - Number of consecutive marks needed to win (default: n)
 * @param n - Board size (default: inferred from board)
 * @returns Returns one of the following:
 *   - [winner, win_type, win_position] - If there's a winner
 *     - winner: The winning player mark (e.g. 'X', 'O')
 *     - win_type: Type of win: 'row', 'column', 'diagonal', or 'anti-diagonal'
 *     - win_position: Win position (row/column index or [start_row, start_col] for diagonals)
 *   - ['draw', null, null] - If game is a draw
 *   - [null, null, null] - If game is ongoing
 */
function checkWinnerGeneral(
  board: string[][],
  required: number | null = null,
  n: number | null = null
): [string | null, string | null, number | [number, number] | null] {}