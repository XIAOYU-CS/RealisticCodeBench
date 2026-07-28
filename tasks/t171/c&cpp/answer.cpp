#include <vector>
#include <stdexcept>
#include <iostream>

struct NoteSeparation {
    std::vector<int> octaveNotes;
    std::vector<int> rootNotes;
};

NoteSeparation extract_octaves_and_roots_from_midi(const std::vector<int>& midiNotes) {
    for (int note : midiNotes) {
        if (note < 0) {
            throw std::invalid_argument("Input must be an array of non-negative integers.");
        }
    }

    NoteSeparation result;

    for (int note : midiNotes) {
        int octave = note / 12;  // Calculate the octave
        int rootNote = note % 12; // Calculate the root note
        result.octaveNotes.push_back(octave);
        result.rootNotes.push_back(rootNote);
    }

    return result;
}
