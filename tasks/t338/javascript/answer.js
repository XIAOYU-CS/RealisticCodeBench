/**
 * Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.
 *
 * @param {Array<Array<string>>} board - N×N array of player marks ('X', 'O') or empty ('')
 * @param {number} [required] - Number of consecutive marks needed to win (default: n)
 * @param {number} [n] - Board size (default: inferred from board)
 * @returns {[string|null, string|null, number|Array|null]} - [winner, win_type, win_position]
 */
function checkWinnerGeneral(board, required = null, n = null) {
    // 1. Infer board size and validate square shape
    n = n || board.length;
    for (const row of board) {
        if (row.length !== n) {
            throw new Error(`Invalid board: must be ${n}x${n}, got row length ${row.length}`);
        }
    }

    // 2. Set required win length
    required = required || n;
    if (required < 2 || required > n) {
        throw new Error(`Win length must be between 2 and ${n}, got ${required}`);
    }

    // 3. Helper: Check if a line has 'required' same non-empty cells
    function isWinning(line) {
        for (let i = 0; i <= line.length - required; i++) {
            const window = line.slice(i, i + required);
            const first = window[0];
            if (first !== '' && window.every(cell => cell === first)) {
                return first; // Return the winner
            }
        }
        return null;
    }

    // 4. Check rows
    for (let rowIdx = 0; rowIdx < n; rowIdx++) {
        const winner = isWinning(board[rowIdx]);
        if (winner) {
            return [winner, 'row', rowIdx];
        }
    }

    // 5. Check columns
    const transposed = board[0].map((_, colIdx) => board.map(row => row[colIdx]));
    for (let colIdx = 0; colIdx < n; colIdx++) {
        const winner = isWinning(transposed[colIdx]);
        if (winner) {
            return [winner, 'column', colIdx];
        }
    }

    // 6. Check diagonals
    function getAllDiagonals(board, length) {
        const n = board.length;
        const diagonals = [];

        // Main diagonals (top-left to bottom-right)
        for (let i = 0; i <= n - length; i++) {
            for (let j = 0; j <= n - length; j++) {
                const diag = Array.from({ length }, (_, k) => board[i + k][j + k]);
                diagonals.push([diag, 'diag_main', [i, j]]);
            }
        }

        // Anti-diagonals (top-right to bottom-left)
        for (let i = 0; i <= n - length; i++) {
            for (let j = length - 1; j < n; j++) {
                const diag = Array.from({ length }, (_, k) => board[i + k][j - k]);
                diagonals.push([diag, 'diag_secondary', [i, j]]);
            }
        }

        return diagonals;
    }

    const diagonals = getAllDiagonals(board, required);
    for (const [diag, diagType, startPos] of diagonals) {
        const winner = isWinning(diag);
        if (winner) {
            return [winner, diagType, startPos];
        }
    }

    // 7. Check for draw
    const isDraw = board.every(row => row.every(cell => cell !== ''));
    if (isDraw) {
        return ['draw', null, null];
    }

    // 8. Game not over
    return [null, null, null];
}