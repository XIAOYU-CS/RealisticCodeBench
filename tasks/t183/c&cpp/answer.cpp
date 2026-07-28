#include <regex>
#include <string>
#include <vector>

std::string determine_background_light_level(const std::string& computed_style) {
    std::vector<int> rgb;

    std::regex number_re(R"(\d+)");
    for (auto it = std::sregex_iterator(computed_style.begin(), computed_style.end(), number_re);
         it != std::sregex_iterator(); ++it) {
        rgb.push_back(std::stoi(it->str()));
    }

    int r = rgb[0];
    int g = rgb[1];
    int b = rgb[2];
    double brightness = (r * 299 + g * 587 + b * 114) / 1000.0;

    const double darkThreshold = 125.0;
    const double brightThreshold = 200.0;

    if (brightness < darkThreshold) {
        return "dark";
    } else if (brightness > brightThreshold) {
        return "bright";
    } else {
        return "normal";
    }
}
