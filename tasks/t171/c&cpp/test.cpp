TEST_CASE("extract_octaves_and_roots_from_midi") {
    SECTION("correctly separates MIDI notes into octaves and root notes") {
        std::vector<int> midiNotes = {60, 61, 62};  // C4, C#4, D4
        NoteSeparation result = extract_octaves_and_roots_from_midi(midiNotes);
        REQUIRE(result.octaveNotes == std::vector<int>{5, 5, 5});
        REQUIRE(result.rootNotes == std::vector<int>{0, 1, 2});
    }

    SECTION("handles single MIDI note input") {
        std::vector<int> midiNotes = {24};  // C1
        NoteSeparation result = extract_octaves_and_roots_from_midi(midiNotes);
        REQUIRE(result.octaveNotes == std::vector<int>{2});
        REQUIRE(result.rootNotes == std::vector<int>{0});
    }

    SECTION("returns empty arrays for an empty input array") {
        std::vector<int> midiNotes = {};
        NoteSeparation result = extract_octaves_and_roots_from_midi(midiNotes);
        REQUIRE(result.octaveNotes.empty());
        REQUIRE(result.rootNotes.empty());
    }

    SECTION("throws an error for negative MIDI note values") {
        REQUIRE_THROWS_AS(extract_octaves_and_roots_from_midi({60, -1}), std::invalid_argument);
    }

    SECTION("handles MIDI notes from different octaves") {
        std::vector<int> midiNotes = {12, 25, 37};  // C1, C#2, D#3
        NoteSeparation result = extract_octaves_and_roots_from_midi(midiNotes);
        REQUIRE(result.octaveNotes == std::vector<int>{1, 2, 3});
        REQUIRE(result.rootNotes == std::vector<int>{0, 1, 1});
    }

    SECTION("handles MIDI boundary notes") {
        NoteSeparation result = extract_octaves_and_roots_from_midi({0, 127});
        REQUIRE(result.octaveNotes == std::vector<int>{0, 10});
        REQUIRE(result.rootNotes == std::vector<int>{0, 7});
    }
}
