import unittest


class TestCheckWinnerGeneral(unittest.TestCase):

    def test_3x3_row_winner(self):
        board = [
            ['X', 'X', 'X'],
            ['O', '', ''],
            ['', 'O', '']
        ]
        result = check_winner_general(board)
        self.assertEqual(result, ('X', 'row', 0))

    def test_4x4_column_winner_with_custom_required(self):
        board = [
            ['X', 'O', '', ''],
            ['X', 'O', '', ''],
            ['X', 'O', '', ''],
            ['', '', '', '']
        ]
        result = check_winner_general(board, required=3, n=4)
        self.assertEqual(result, ('X', 'column', 0))

    def test_5x5_main_diagonal_winner_with_custom_required(self):
        board = [
            ['X', '', '', '', ''],
            ['', 'X', '', '', ''],
            ['', '', 'X', '', ''],
            ['', '', '', 'X', ''],
            ['', '', '', '', 'O']
        ]
        result = check_winner_general(board, required=4, n=5)
        self.assertEqual(result, ('X', 'diag_main', (0, 0)))

    def test_6x6_anti_diagonal_winner_partial_win(self):
        board = [
            ['', '', '', '', 'O', ''],
            ['', '', '', 'O', '', ''],
            ['', '', 'O', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', ''],
            ['', '', '', '', '', '']
        ]
        result = check_winner_general(board, required=3, n=6)
        self.assertEqual(result, ('O', 'diag_secondary', (0, 4)))

    def test_large_board_no_winner_in_progress(self):
        board = [
            ['X', 'O', 'X', 'O', ''],
            ['O', 'X', 'O', '', ''],
            ['X', 'O', '', '', ''],
            ['O', '', '', '', ''],
            ['', '', '', '', '']
        ]
        result = check_winner_general(board, n=5)
        self.assertEqual(result, (None, None, None))

    def test_4x4_draw_custom_required(self):
        board = [
            ['X', 'O', 'X', 'O'],
            ['O', 'X', 'O', 'X'],
            ['O', 'X', 'O', 'X'],
            ['X', 'O', 'X', 'O']
        ]
        result = check_winner_general(board, required=3, n=4)
        self.assertEqual(result, ('draw', None, None))

    def test_5x5_middle_row_winner(self):
        board = [
            ['', '', '', '', ''],
            ['O', 'O', '', '', ''],
            ['X', 'X', 'X', 'X', 'X'],
            ['', '', 'O', '', ''],
            ['', '', '', '', '']
        ]
        result = check_winner_general(board, n=5)
        self.assertEqual(result, ('X', 'row', 2))

    def test_row_winner(self):
        board = [
            ['X', 'X', 'X'],
            ['O', '', ''],
            ['', 'O', '']
        ]
        result = check_winner_general(board)
        self.assertEqual(result, ('X', 'row', 0))

    def test_column_winner(self):
        board = [
            ['X', 'O', ''],
            ['X', 'O', ''],
            ['X', '', 'O']
        ]
        result = check_winner_general(board)
        self.assertEqual(result, ('X', 'column', 0))

    def test_main_diagonal_winner(self):
        board = [
            ['X', '', ''],
            ['', 'X', ''],
            ['', '', 'X']
        ]
        result = check_winner_general(board)
        self.assertEqual(result, ('X', 'diag_main', (0, 0)))

    def test_anti_diagonal_winner(self):
        board = [
            ['', '', 'O'],
            ['', 'O', ''],
            ['O', '', '']
        ]
        result = check_winner_general(board)
        self.assertEqual(result, ('O', 'diag_secondary', (0, 2)))

    def test_draw_game(self):
        board = [
            ['X', 'O', 'X'],
            ['O', 'O', 'X'],
            ['O', 'X', 'O']
        ]
        result = check_winner_general(board)
        self.assertEqual(result, ('draw', None, None))