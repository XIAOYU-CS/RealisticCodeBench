def check_winner_general(board, required=None, n=None):
    """
    Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.

    Args:
        board: N×N list of lists, with elements being player marks (e.g. 'X', 'O') or empty ('')
        required: Number of consecutive marks needed to win (default: n)
        n: Board size (default: inferred from board)

    Returns:
        If win: (winner, win_type, win_position)
                win_type can be:
                    - 'row': win on a row, win_position is the row index
                    - 'column': win on a column, win_position is the column index
                    - 'diagonal': win on main diagonal (top-left to bottom-right), win_position is (start_row, start_col)
                    - 'anti-diagonal': win on anti-diagonal (top-right to bottom-left), win_position is (start_row, start_col)
        If draw: ('draw', None, None)
        If ongoing: (None, None, None)
    """