#include <vector>

namespace {

struct CodepointRange {
    int first;
    int last;
};

constexpr CodepointRange kShiftJisNotGbkRanges[] = {
    // BMP codepoints encodable by Python's shift_jis codec but rejected by gbk.
    {0x00A2, 0x00A3}, {0x00A5, 0x00A5}, {0x00AC, 0x00AC},
    {0x00B4, 0x00B4}, {0x00B6, 0x00B6}, {0x2020, 0x2021},
    {0x203E, 0x203E}, {0x212B, 0x212B}, {0x21D2, 0x21D2},
    {0x21D4, 0x21D4}, {0x2200, 0x2200}, {0x2202, 0x2203},
    {0x2207, 0x2207}, {0x220B, 0x220B}, {0x2212, 0x2212},
    {0x222C, 0x222C}, {0x226A, 0x226B}, {0x2282, 0x2283},
    {0x2286, 0x2287}, {0x25EF, 0x25EF}, {0x266A, 0x266A},
    {0x266D, 0x266D}, {0x266F, 0x266F}, {0x301C, 0x301C},
    {0x30FB, 0x30FB}, {0xFF61, 0xFF9F},
};

}  // namespace

std::vector<wchar_t> find_shiftjis_not_gbk() {
    std::vector<wchar_t> unique_to_shiftjis;
    for (const auto& range : kShiftJisNotGbkRanges) {
        for (int codepoint = range.first; codepoint <= range.last; ++codepoint) {
            unique_to_shiftjis.push_back(static_cast<wchar_t>(codepoint));
        }
    }
    return unique_to_shiftjis;
}
