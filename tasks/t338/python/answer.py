def check_winner_general(board, required=None, n=None):
    """
    Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.

    Args:
        board: N×N list of lists, with elements being player marks (e.g. 'X', 'O') or empty ('')
        required: Number of consecutive marks needed to win (default: n)
        n: Board size (default: inferred from board)

    Returns:
        If win: (winner, win_type, win_position)
                e.g. ('X', 'row', 0) means player X wins on row 0
        If draw: ('draw', None, None)
        If ongoing: (None, None, None)
    """
    # 1. Infer board size and validate square shape
    n = n or len(board)
    for row in board:
        if len(row) != n:
            raise ValueError(f"Invalid board: must be {n}x{n}, got row length {len(row)}")

    # 2. Set required win length
    required = required or n
    if required < 2 or required > n:
        raise ValueError(f"Win length must be between 2 and {n}, got {required}")

    # 3. Helper: Check if a line has 'required' same non-empty cells
    def is_winning(line):
        for i in range(len(line) - required + 1):
            window = line[i:i + required]
            if all(cell == window[0] and cell != '' for cell in window):
                return window[0]  # Return the winner
        return None

    # 4. Check rows
    for row_idx in range(n):
        winner = is_winning(board[row_idx])
        if winner:
            return (winner, 'row', row_idx)

    # 5. Check columns
    transposed = list(zip(*board))
    for col_idx in range(n):
        winner = is_winning(transposed[col_idx])
        if winner:
            return (winner, 'column', col_idx)

    # 6. Check diagonals
    def get_all_diagonals(board, length):
        n = len(board)
        diagonals = []

        # Main diagonals (top-left to bottom-right)
        for i in range(n - length + 1):
            for j in range(n - length + 1):
                diag = [board[i + k][j + k] for k in range(length)]
                diagonals.append((diag, 'diag_main', (i, j)))

        # Anti-diagonals (top-right to bottom-left)
        for i in range(n - length + 1):
            for j in range(length - 1, n):
                diag = [board[i + k][j - k] for k in range(length)]
                diagonals.append((diag, 'diag_secondary', (i, j)))

        return diagonals

    for diag, diag_type, start_pos in get_all_diagonals(board, required):
        winner = is_winning(diag)
        if winner:
            return (winner, diag_type, start_pos)

    # 7. Check for draw
    if all(cell != '' for row in board for cell in row):
        return ('draw', None, None)

    # 8. Game not over
    return (None, None, None)