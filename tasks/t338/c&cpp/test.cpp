TEST_CASE("3x3_row_winner") {
    vector<vector<string>> board = {
        {"X", "X", "X"},
        {"O", "", ""},
        {"", "O", ""}
    };
    auto result = check_winner_general(board);
    REQUIRE(result == make_tuple("X", "row", make_pair(0, 0)));
}

TEST_CASE("4x4_column_winner_with_custom_required") {
    vector<vector<string>> board = {
        {"X", "O", "", ""},
        {"X", "O", "", ""},
        {"X", "O", "", ""},
        {"", "", "", ""}
    };
    auto result = check_winner_general(board, 3, 4);
    REQUIRE(result == make_tuple("X", "column", make_pair(0, 0)));
}

TEST_CASE("5x5_main_diagonal_winner_with_custom_required") {
    vector<vector<string>> board = {
        {"X", "", "", "", ""},
        {"", "X", "", "", ""},
        {"", "", "X", "", ""},
        {"", "", "", "X", ""},
        {"", "", "", "", "O"}
    };
    auto result = check_winner_general(board, 4, 5);
    REQUIRE(result == make_tuple("X", "diag_main", make_pair(0, 0)));
}

TEST_CASE("6x6_anti_diagonal_winner_partial_win") {
    vector<vector<string>> board = {
        {"", "", "", "", "O", ""},
        {"", "", "", "O", "", ""},
        {"", "", "O", "", "", ""},
        {"", "", "", "", "", ""},
        {"", "", "", "", "", ""},
        {"", "", "", "", "", ""}
    };
    auto result = check_winner_general(board, 3, 6);
    REQUIRE(result == make_tuple("O", "diag_secondary", make_pair(0, 4)));
}

TEST_CASE("large_board_no_winner_in_progress") {
    vector<vector<string>> board = {
        {"X", "O", "X", "O", ""},
        {"O", "X", "O", "", ""},
        {"X", "O", "", "", ""},
        {"O", "", "", "", ""},
        {"", "", "", "", ""}
    };
    auto result = check_winner_general(board, 5);
    REQUIRE(result == make_tuple("", "", make_pair(-1, -1)));
}

TEST_CASE("4x4_draw_custom_required") {
    vector<vector<string>> board = {
        {"X", "O", "X", "O"},
        {"O", "X", "O", "X"},
        {"O", "X", "O", "X"},
        {"X", "O", "X", "O"}
    };
    auto result = check_winner_general(board, 3, 4);
    REQUIRE(result == make_tuple("draw", "", make_pair(-1, -1)));
}

TEST_CASE("5x5_middle_row_winner") {
    vector<vector<string>> board = {
        {"", "", "", "", ""},
        {"O", "O", "", "", ""},
        {"X", "X", "X", "X", "X"},
        {"", "", "O", "", ""},
        {"", "", "", "", ""}
    };
    auto result = check_winner_general(board, 5);
    REQUIRE(result == make_tuple("X", "row", make_pair(2, 0)));
}

TEST_CASE("row_winner") {
    vector<vector<string>> board = {
        {"X", "X", "X"},
        {"O", "", ""},
        {"", "O", ""}
    };
    auto result = check_winner_general(board);
    REQUIRE(result == make_tuple("X", "row", make_pair(0, 0)));
}

TEST_CASE("column_winner") {
    vector<vector<string>> board = {
        {"X", "O", ""},
        {"X", "O", ""},
        {"X", "", "O"}
    };
    auto result = check_winner_general(board);
    REQUIRE(result == make_tuple("X", "column", make_pair(0, 0)));
}

TEST_CASE("main_diagonal_winner") {
    vector<vector<string>> board = {
        {"X", "", ""},
        {"", "X", ""},
        {"", "", "X"}
    };
    auto result = check_winner_general(board);
    REQUIRE(result == make_tuple("X", "diag_main", make_pair(0, 0)));
}

TEST_CASE("anti_diagonal_winner") {
    vector<vector<string>> board = {
        {"", "", "O"},
        {"", "O", ""},
        {"O", "", ""}
    };
    auto result = check_winner_general(board);
    REQUIRE(result == make_tuple("O", "diag_secondary", make_pair(0, 2)));
}

TEST_CASE("draw_game") {
    vector<vector<string>> board = {
        {"X", "O", "X"},
        {"O", "O", "X"},
        {"O", "X", "O"}
    };
    auto result = check_winner_general(board);
    REQUIRE(result == make_tuple("draw", "", make_pair(-1, -1)));
}
