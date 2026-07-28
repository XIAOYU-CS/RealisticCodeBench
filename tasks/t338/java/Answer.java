package org.real.temp;

public class Answer {

    /**
     * Generalized win-checker for N×N Tic-Tac-Toe with customizable win-length.
     *
     * @param board N×N array of arrays, with elements being player marks (e.g. 'X', 'O') or empty ("")
     * @param required Number of consecutive marks needed to win (default: n)
     * @param n Board size (default: inferred from board)
     * @return If win: {winner, win_type, win_position}
     *         e.g. {"X", "row", "0"} means player X wins on row 0
     *         If draw: {"draw", null, null}
     *         If ongoing: {null, null, null}
     */
    public static String[] checkWinnerGeneral(String[][] board, Integer required, Integer n) {
        // 1. Infer board size and validate square shape
        if (n == null) {
            n = board.length;
        }

        for (String[] row : board) {
            if (row.length != n) {
                throw new IllegalArgumentException(
                    String.format("Invalid board: must be %dx%d, got row length %d", n, n, row.length));
            }
        }

        // 2. Set required win length
        if (required == null) {
            required = n;
        }
        if (required < 2 || required > n) {
            throw new IllegalArgumentException(
                String.format("Win length must be between 2 and %d, got %d", n, required));
        }

        // 4. Check rows
        for (int rowIdx = 0; rowIdx < n; rowIdx++) {
            String winner = isWinning(board[rowIdx], required);
            if (winner != null) {
                return new String[]{winner, "row", String.valueOf(rowIdx)};
            }
        }

        // 5. Check columns
        String[][] transposed = transpose(board);
        for (int colIdx = 0; colIdx < n; colIdx++) {
            String winner = isWinning(transposed[colIdx], required);
            if (winner != null) {
                return new String[]{winner, "column", String.valueOf(colIdx)};
            }
        }

        // 6. Check diagonals
        DiagonalResult[] diagonals = getAllDiagonals(board, required);
        for (DiagonalResult diagResult : diagonals) {
            String winner = isWinning(diagResult.diagonal, required);
            if (winner != null) {
                return new String[]{winner, diagResult.diagType, diagResult.startPos};
            }
        }

        // 7. Check for draw
        boolean isDraw = true;
        for (String[] row : board) {
            for (String cell : row) {
                if (cell.equals("")) {
                    isDraw = false;
                    break;
                }
            }
            if (!isDraw) break;
        }

        if (isDraw) {
            return new String[]{"draw", null, null};
        }

        // 8. Game not over
        return new String[]{null, null, null};
    }

    /**
     * Overloaded method with default parameters
     */
    public static String[] checkWinnerGeneral(String[][] board) {
        return checkWinnerGeneral(board, null, null);
    }

    /**
     * Helper: Check if a line has 'required' same non-empty cells
     */
    private static String isWinning(String[] line, int required) {
        for (int i = 0; i <= line.length - required; i++) {
            boolean isWin = true;
            String firstCell = line[i];

            if (firstCell.equals("")) {
                continue;
            }

            for (int j = 0; j < required; j++) {
                if (!line[i + j].equals(firstCell)) {
                    isWin = false;
                    break;
                }
            }

            if (isWin) {
                return firstCell; // Return the winner
            }
        }
        return null;
    }

    /**
     * Helper: Transpose the board
     */
    private static String[][] transpose(String[][] board) {
        int n = board.length;
        String[][] transposed = new String[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                transposed[j][i] = board[i][j];
            }
        }
        return transposed;
    }

    /**
     * Helper class to store diagonal information
     */
    private static class DiagonalResult {
        String[] diagonal;
        String diagType;
        String startPos;

        DiagonalResult(String[] diagonal, String diagType, String startPos) {
            this.diagonal = diagonal;
            this.diagType = diagType;
            this.startPos = startPos;
        }
    }

    /**
     * Helper: Get all diagonals of specified length
     */
    private static DiagonalResult[] getAllDiagonals(String[][] board, int length) {
        int n = board.length;
        // Estimate capacity - this is a rough estimate
        java.util.List<DiagonalResult> diagonals = new java.util.ArrayList<>();

        // Main diagonals (top-left to bottom-right)
        for (int i = 0; i <= n - length; i++) {
            for (int j = 0; j <= n - length; j++) {
                String[] diag = new String[length];
                for (int k = 0; k < length; k++) {
                    diag[k] = board[i + k][j + k];
                }
                diagonals.add(new DiagonalResult(diag, "diag_main", i + "," + j));
            }
        }

        // Anti-diagonals (top-right to bottom-left)
        for (int i = 0; i <= n - length; i++) {
            for (int j = length - 1; j < n; j++) {
                String[] diag = new String[length];
                for (int k = 0; k < length; k++) {
                    diag[k] = board[i + k][j - k];
                }
                diagonals.add(new DiagonalResult(diag, "diag_secondary", i + "," + j));
            }
        }

        return diagonals.toArray(new DiagonalResult[0]);
    }
}