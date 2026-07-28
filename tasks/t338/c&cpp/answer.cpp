
#include <vector>
#include <string>
#include <utility>
#include <stdexcept>
#include <tuple>

using namespace std;

tuple<string, string, pair<int, int>> check_winner_general(const vector<vector<string>>& board, int required = -1, int n = -1) {
    // 1. Infer board size and validate square shape
    if (n == -1) {
        n = board.size();
    }
    for (const auto& row : board) {
        if (row.size() != n) {
            throw invalid_argument("Invalid board: must be " + to_string(n) + "x" + to_string(n) + ", got row length " + to_string(row.size()));
        }
    }

    // 2. Set required win length
    if (required == -1) {
        required = n;
    }
    if (required < 2 || required > n) {
        throw invalid_argument("Win length must be between 2 and " + to_string(n) + ", got " + to_string(required));
    }

    // 3. Helper: Check if a line has 'required' same non-empty cells
    auto is_winning = [required](const vector<string>& line) -> string {
        for (int i = 0; i <= line.size() - required; ++i) {
            bool win = true;
            string first = line[i];
            if (first == "") {
                continue;
            }
            for (int j = 1; j < required; ++j) {
                if (line[i + j] != first) {
                    win = false;
                    break;
                }
            }
            if (win) {
                return first;
            }
        }
        return "";
    };

    // 4. Check rows
    for (int row_idx = 0; row_idx < n; ++row_idx) {
        string winner = is_winning(board[row_idx]);
        if (!winner.empty()) {
            return make_tuple(winner, "row", make_pair(row_idx, 0));
        }
    }

    // 5. Check columns
    vector<vector<string>> transposed(n, vector<string>(n));
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            transposed[j][i] = board[i][j];
        }
    }
    for (int col_idx = 0; col_idx < n; ++col_idx) {
        string winner = is_winning(transposed[col_idx]);
        if (!winner.empty()) {
            return make_tuple(winner, "column", make_pair(0, col_idx));
        }
    }

    // 6. Check diagonals
    auto get_all_diagonals = [](const vector<vector<string>>& board, int length) -> vector<tuple<vector<string>, string, pair<int, int>>> {
        int n = board.size();
        vector<tuple<vector<string>, string, pair<int, int>>> diagonals;

        // Main diagonals (top-left to bottom-right)
        for (int i = 0; i <= n - length; ++i) {
            for (int j = 0; j <= n - length; ++j) {
                vector<string> diag;
                for (int k = 0; k < length; ++k) {
                    diag.push_back(board[i + k][j + k]);
                }
                diagonals.emplace_back(diag, "diag_main", make_pair(i, j));
            }
        }

        // Anti-diagonals (top-right to bottom-left)
        for (int i = 0; i <= n - length; ++i) {
            for (int j = length - 1; j < n; ++j) {
                vector<string> diag;
                for (int k = 0; k < length; ++k) {
                    diag.push_back(board[i + k][j - k]);
                }
                diagonals.emplace_back(diag, "diag_secondary", make_pair(i, j));
            }
        }

        return diagonals;
    };

    auto diagonals = get_all_diagonals(board, required);
    for (const auto& entry : diagonals) {
        vector<string> diag = get<0>(entry);
        string diag_type = get<1>(entry);
        pair<int, int> start_pos = get<2>(entry);
        string winner = is_winning(diag);
        if (!winner.empty()) {
            return make_tuple(winner, diag_type, start_pos);
        }
    }

    // 7. Check for draw
    bool is_draw = true;
    for (const auto& row : board) {
        for (const auto& cell : row) {
            if (cell.empty()) {
                is_draw = false;
                break;
            }
        }
        if (!is_draw) break;
    }
    if (is_draw) {
        return make_tuple("draw", "", make_pair(-1, -1));
    }

    // 8. Game not over
    return make_tuple("", "", make_pair(-1, -1));
}
