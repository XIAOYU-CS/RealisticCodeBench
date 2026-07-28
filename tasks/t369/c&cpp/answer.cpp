#include <filesystem>
#include <stdexcept>
#include <string>
#include <utility>
#include <variant>
#include <vector>

using MvResult = std::pair<std::vector<std::string>, std::vector<std::pair<std::string, std::string>>>;
namespace stdfs = std::filesystem;

static std::vector<std::string> normalize_sources(
    const std::variant<std::string, std::vector<std::string>>& sources) {
    if (std::holds_alternative<std::string>(sources)) {
        return {std::get<std::string>(sources)};
    }
    return std::get<std::vector<std::string>>(sources);
}

MvResult mv(const std::variant<std::string, std::vector<std::string>>& sources,
            const std::string& destination,
            bool overwrite = false) {
    auto source_list = normalize_sources(sources);
    std::vector<std::string> success_list;
    std::vector<std::pair<std::string, std::string>> fail_list;
    stdfs::path destination_path(destination);

    if (source_list.size() > 1 && !stdfs::is_directory(destination_path)) {
        throw std::invalid_argument(
            "When moving multiple sources, destination must be an existing directory: " + destination);
    }

    for (const auto& source : source_list) {
        stdfs::path source_path(source);
        if (!stdfs::exists(source_path)) {
            fail_list.emplace_back(source, "Source path does not exist");
            continue;
        }

        auto target_path =
            stdfs::is_directory(destination_path) && (source_list.size() > 1 || stdfs::is_directory(source_path))
                ? destination_path / source_path.filename()
                : destination_path;

        if (stdfs::exists(target_path)) {
            if (!overwrite) {
                fail_list.emplace_back(source,
                                       "Destination already exists and overwrite is disabled: " +
                                           target_path.string());
                continue;
            }
            try {
                stdfs::remove_all(target_path);
            } catch (const std::exception& e) {
                fail_list.emplace_back(source, std::string("Failed to remove existing destination: ") + e.what());
                continue;
            }
        }

        try {
            stdfs::rename(source_path, target_path);
            success_list.push_back(source);
        } catch (const std::exception& e) {
            fail_list.emplace_back(source, e.what());
        }
    }

    return {success_list, fail_list};
}

MvResult mv(const std::string& source, const std::string& destination, bool overwrite = false) {
    return mv(std::variant<std::string, std::vector<std::string>>(source), destination, overwrite);
}

MvResult mv(const std::vector<std::string>& sources, const std::string& destination, bool overwrite = false) {
    return mv(std::variant<std::string, std::vector<std::string>>(sources), destination, overwrite);
}
