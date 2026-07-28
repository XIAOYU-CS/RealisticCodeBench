/**
 * Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.
 *
 * @param board N×N array of arrays, with elements being player marks (e.g. 'X', 'O') or empty ('')
 * @param required Number of consecutive marks needed to win (default: n)
 * @param n Board size (default: inferred from board)
 * @return Returns one of the following:
 *         - String[]{winner, win_type, win_position} - If there's a winner
 *           - winner: The winning player mark (e.g. 'X', 'O')
 *           - win_type: Type of win: 'row', 'column', 'diagonal', or 'anti-diagonal'
 *           - win_position: Win position as string (row/column index or "start_row,start_col" for diagonals)
 *         - String[]{"draw", null, null} - If game is a draw
 *         - String[]{null, null, null} - If game is ongoing
 */
public static String[] checkWinnerGeneral(String[][] board, Integer required, Integer n) {}