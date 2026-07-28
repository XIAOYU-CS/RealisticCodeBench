package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import static org.real.temp.Answer.*;
public class Tester {

    @Test
    public void test_3x3_row_winner() {
        String[][] board = {
            {"X", "X", "X"},
            {"O", "", ""},
            {"", "O", ""}
        };
        String[] result = Answer.checkWinnerGeneral(board);
        assertArrayEquals(new String[]{"X", "row", "0"}, result);
    }

    @Test
    public void test_4x4_column_winner_with_custom_required() {
        String[][] board = {
            {"X", "O", "", ""},
            {"X", "O", "", ""},
            {"X", "O", "", ""},
            {"", "", "", ""}
        };
        String[] result = Answer.checkWinnerGeneral(board, 3, 4);
        assertArrayEquals(new String[]{"X", "column", "0"}, result);
    }

    @Test
    public void test_5x5_main_diagonal_winner_with_custom_required() {
        String[][] board = {
            {"X", "", "", "", ""},
            {"", "X", "", "", ""},
            {"", "", "X", "", ""},
            {"", "", "", "X", ""},
            {"", "", "", "", "O"}
        };
        String[] result = Answer.checkWinnerGeneral(board, 4, 5);
        assertArrayEquals(new String[]{"X", "diag_main", "0,0"}, result);
    }

    @Test
    public void test_6x6_anti_diagonal_winner_partial_win() {
        String[][] board = {
            {"", "", "", "", "O", ""},
            {"", "", "", "O", "", ""},
            {"", "", "O", "", "", ""},
            {"", "", "", "", "", ""},
            {"", "", "", "", "", ""},
            {"", "", "", "", "", ""}
        };
        String[] result = Answer.checkWinnerGeneral(board, 3, 6);
        assertArrayEquals(new String[]{"O", "diag_secondary", "0,4"}, result);
    }

    @Test
    public void test_large_board_no_winner_in_progress() {
        String[][] board = {
            {"X", "O", "X", "O", ""},
            {"O", "X", "O", "", ""},
            {"X", "O", "", "", ""},
            {"O", "", "", "", ""},
            {"", "", "", "", ""}
        };
        String[] result = Answer.checkWinnerGeneral(board, null, 5);
        assertArrayEquals(new String[]{null, null, null}, result);
    }

    @Test
    public void test_4x4_draw_custom_required() {
        String[][] board = {
            {"X", "O", "X", "O"},
            {"O", "X", "O", "X"},
            {"O", "X", "O", "X"},
            {"X", "O", "X", "O"}
        };
        String[] result = Answer.checkWinnerGeneral(board, 3, 4);
        assertArrayEquals(new String[]{"draw", null, null}, result);
    }

    @Test
    public void test_5x5_middle_row_winner() {
        String[][] board = {
            {"", "", "", "", ""},
            {"O", "O", "", "", ""},
            {"X", "X", "X", "X", "X"},
            {"", "", "O", "", ""},
            {"", "", "", "", ""}
        };
        String[] result = Answer.checkWinnerGeneral(board, null, 5);
        assertArrayEquals(new String[]{"X", "row", "2"}, result);
    }

    @Test
    public void test_row_winner() {
        String[][] board = {
            {"X", "X", "X"},
            {"O", "", ""},
            {"", "O", ""}
        };
        String[] result = Answer.checkWinnerGeneral(board);
        assertArrayEquals(new String[]{"X", "row", "0"}, result);
    }

    @Test
    public void test_column_winner() {
        String[][] board = {
            {"X", "O", ""},
            {"X", "O", ""},
            {"X", "", "O"}
        };
        String[] result = Answer.checkWinnerGeneral(board);
        assertArrayEquals(new String[]{"X", "column", "0"}, result);
    }

    @Test
    public void test_main_diagonal_winner() {
        String[][] board = {
            {"X", "", ""},
            {"", "X", ""},
            {"", "", "X"}
        };
        String[] result = Answer.checkWinnerGeneral(board);
        assertArrayEquals(new String[]{"X", "diag_main", "0,0"}, result);
    }

    @Test
    public void test_anti_diagonal_winner() {
        String[][] board = {
            {"", "", "O"},
            {"", "O", ""},
            {"O", "", ""}
        };
        String[] result = Answer.checkWinnerGeneral(board);
        assertArrayEquals(new String[]{"O", "diag_secondary", "0,2"}, result);
    }

    @Test
    public void test_draw_game() {
        String[][] board = {
            {"X", "O", "X"},
            {"O", "O", "X"},
            {"O", "X", "O"}
        };
        String[] result = Answer.checkWinnerGeneral(board);
        assertArrayEquals(new String[]{"draw", null, null}, result);
    }

    private void assertArrayEquals(String[] expected, String[] actual) {
        assertNotNull("Actual result should not be null", actual);
        assertEquals("Array length should match", expected.length, actual.length);
        for (int i = 0; i < expected.length; i++) {
            if (expected[i] == null) {
                assertNull("Element at index " + i + " should be null", actual[i]);
            } else {
                assertEquals("Element at index " + i + " should match", expected[i], actual[i]);
            }
        }
    }
}