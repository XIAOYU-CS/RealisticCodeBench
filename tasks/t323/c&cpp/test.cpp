TEST_CASE("move_right_with_non_empty_right_tape") {
    ListES current({1, 2}, {3, 4}, 0, 0);
    Trans trans(1, 1, 5);

    ListES result = ListES_step_prime(trans, current);

    REQUIRE(result == ListES({5, 1, 2}, {4}, 3, 1));
}

TEST_CASE("move_right_with_empty_right_tape") {
    ListES current({1}, {}, 0, 0);
    Trans trans(2, 1, 2);

    ListES result = ListES_step_prime(trans, current);

    REQUIRE(result == ListES({2, 1}, {}, Σ0, 2));
}

TEST_CASE("move_left_with_non_empty_left_tape") {
    ListES current({3, 4}, {5}, 0, 0);
    Trans trans(3, -1, 6);

    ListES result = ListES_step_prime(trans, current);

    REQUIRE(result == ListES({4}, {6, 5}, 3, 3));
}

TEST_CASE("move_left_with_empty_left_tape") {
    ListES current({}, {7, 8}, 0, 0);
    Trans trans(4, -1, 9);

    ListES result = ListES_step_prime(trans, current);

    REQUIRE(result == ListES({}, {9, 7, 8}, Σ0, 4));
}

TEST_CASE("no_movement") {
    ListES current({10}, {11}, 0, 0);
    Trans trans(5, 0, 12);

    ListES result = ListES_step_prime(trans, current);

    REQUIRE(result == ListES({10}, {11}, 12, 5));
}
