package org.real.temp;

import org.junit.Test;
import static org.junit.Assert.*;
import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import static org.real.temp.Answer.*;
public class Tester {

    private final char[][] board1 = {
        {'X', 'O', 'X'},
        {' ', 'X', 'O'},
        {'O', ' ', ' '}
    };

    private final char[][] board2 = {
        {' ', ' ', ' '},
        {' ', ' ', ' '},
        {' ', ' ', ' '}
    };

    private final char[][] board3 = {
        {'X', 'X', 'X'},
        {'O', 'O', ' '},
        {' ', ' ', ' '}
    };

    private final char[][] board4 = {
        {'O', 'O', 'O'},
        {'X', 'X', 'X'},
        {'X', 'O', ' '}
    };

    private final char[][] board5 = {
        {'X', ' ', ' '},
        {' ', 'X', ' '},
        {' ', ' ', 'X'}
    };

    private final char[][] board6 = {
        {' ', 'O', ' '},
        {'O', ' ', 'O'},
        {' ', 'O', ' '}
    };

    @Test
    public void testMixedBoard() {
        assertPrintBoardOutput(board1, "-------------\n| X | O | X | \n-------------\n|   | X | O | \n-------------\n| O |   |   | \n-------------\n");
    }

    @Test
    public void testEmptyBoard() {
        assertPrintBoardOutput(board2, "-------------\n|   |   |   | \n-------------\n|   |   |   | \n-------------\n|   |   |   | \n-------------\n");
    }

    @Test
    public void testTopRowWinBoard() {
        assertPrintBoardOutput(board3, "-------------\n| X | X | X | \n-------------\n| O | O |   | \n-------------\n|   |   |   | \n-------------\n");
    }

    @Test
    public void testFullRowsBoard() {
        assertPrintBoardOutput(board4, "-------------\n| O | O | O | \n-------------\n| X | X | X | \n-------------\n| X | O |   | \n-------------\n");
    }

    @Test
    public void testDiagonalBoard() {
        assertPrintBoardOutput(board5, "-------------\n| X |   |   | \n-------------\n|   | X |   | \n-------------\n|   |   | X | \n-------------\n");
    }

    @Test
    public void testCrossBoard() {
        assertPrintBoardOutput(board6, "-------------\n|   | O |   | \n-------------\n| O |   | O | \n-------------\n|   | O |   | \n-------------\n");
    }

    private void assertPrintBoardOutput(char[][] board, String expectedOutput) {
        PrintStream originalOut = System.out;
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        try {
            System.setOut(new PrintStream(output));
            printBoard(board);
        } finally {
            System.setOut(originalOut);
        }
        assertEquals(expectedOutput, output.toString());
    }

}
