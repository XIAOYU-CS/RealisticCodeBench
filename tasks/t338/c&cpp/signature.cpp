/**
 * Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.
 *
 * @param board N×N vector of vectors, with elements being player marks (e.g. 'X', 'O') or empty ('')
 * @param required Number of consecutive marks needed to win (default: n, -1 means use board size)
 * @param n Board size (default: inferred from board, -1 means infer from board)
 * @return Returns one of the following:
 *         - std::make_tuple(winner, win_type, win_position) - If there's a winner
 *           - winner: The winning player mark (e.g. 'X', 'O')
 *           - win_type: Type of win: 'row', 'column', 'diag_main', or 'diag_secondary'
 *           - win_position: Row/column anchor or diagonal start as {row, col}
 *         - std::make_tuple("draw", "", {-1, -1}) - If game is a draw
 *         - std::make_tuple("", "", {-1, -1}) - If game is ongoing
 */
std::tuple<std::string, std::string, std::pair<int, int>> check_winner_general(
    const std::vector<std::vector<std::string>>& board,
    int required = -1,
    int n = -1
);
